function allocateBeds(arrivalRates, serviceRates, numBeds) {
  const alpha = [0.5, 0.5, 0.5];
  const transitionMatrix = [
    [0.1, 0.9, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], // W_ICU to O_ICU
    [0.1, 0.8, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], // O_ICU to D_ICU
    [0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1, 0.1, 0.1], // W_ER to O_ER
    [0.1, 0.1, 0.1, 0.8, 0.1, 0.1, 0.1, 0.1, 0.1], // O_ER to D_ER
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.9, 0.1, 0.1, 0.1], // W_GEN to O_GEN
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 0.1, 0.1, 0.1], // O_GEN to D_GEN
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.9, 0.1], // D_ICU to Discharged state
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 0.2], // D_ER to Discharged state
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 1.0], // D_GEN to Discharged state
  ];
  const numTypes = 3; // ICU, ER, General
  let waitingTimes = [];
  let futureLoad = [];
  let steadyStateProbabilities = [];

  for (let i = 0; i < numTypes; i++) {
    const lambda = arrivalRates[i];
    const mu = serviceRates[i];
    const c = numBeds[i];
    const rho = lambda / (c * mu);

    let P0 = 0;
    for (let n = 0; n < c; n++) {
      P0 += Math.pow(lambda / mu, n) / factorial(n);
    }
    P0 += (Math.pow(lambda / mu, c) / factorial(c)) * (1 / (1 - rho));
    P0 = 1 / P0;

    const L =
      ((((lambda / mu) * Math.pow(lambda / mu, c)) / factorial(c)) * P0) /
        Math.pow(1 - rho, 2) +
      lambda / mu;

    const Wq = (L - lambda / mu) / lambda;

    console.log(rho, P0, L, Wq);
    waitingTimes.push(Wq);
  }
  console.log("Waiting times:", waitingTimes);

  function computeSteadyStateProbabilities(
    P,
    epsilon = 1e-2,
    maxIterations = 1000
  ) {
    const numStates = P.length;

    let pi = new Array(numStates).fill(1 / numStates);

    let iteration = 0;
    while (iteration < maxIterations) {
      let newPi = new Array(numStates).fill(0);
      for (let i = 0; i < numStates; i++) {
        for (let j = 0; j < numStates; j++) {
          newPi[i] += pi[j] * P[j][i];
        }
      }

      let maxDiff = Math.max(
        ...newPi.map((val, idx) => Math.abs(val - pi[idx]))
      );
      if (maxDiff < epsilon) {
        break;
      }

      pi = newPi;
      iteration++;
    }

    const sum = pi.reduce((a, b) => a + b, 0);
    pi = pi.map((x) => x / sum);

    return pi;
  }

  steadyStateProbabilities = computeSteadyStateProbabilities(transitionMatrix);
  console.log("Steady state: ", steadyStateProbabilities);

  for (let i = 0; i < numTypes; i++) {
    let load = 0;
    for (let j = i * 2; j < (i + 1) * 2; j++) {
      load += steadyStateProbabilities[j] * arrivalRates[i];
    }
    futureLoad.push(load);
  }
  console.log("Future load: ", futureLoad);

  let allocation = [];
  for (let i = 0; i < numTypes; i++) {
    const optimalAllocation = waitingTimes[i] + alpha[i] * futureLoad[i];
    allocation.push(optimalAllocation);
  }
  let min = 10000;
  let index = -1;
  for (let i = 0; i < allocation.length; i++) {
    if (allocation[i] < min) {
      index = i;
      min = allocation[i];
    }
  }
  const beds = ["ICU", "Emergency", "General"];
  return beds[index];
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

module.exports = allocateBeds;
