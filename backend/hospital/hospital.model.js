const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message:
          "Location coordinates must be an array of length 2 [longitude, latitude].",
      },
    },
  },
  bedTypes: {
    ICU: {
      capacity: {
        type: Number,
        required: true,
      },
      availableCapacity: {
        type: Number,
        required: true,
      },
      serviceRate: {
        type: Number,
        required: true,
      },
      arrivalRate: {
        type: Number,
        required: true,
      },
      dischargeRate: {
        type: Number,
        required: true,
      },
      waitingUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      allottedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    General: {
      capacity: {
        type: Number,
        required: true,
      },
      availableCapacity: {
        type: Number,
        required: true,
      },
      serviceRate: {
        type: Number,
        required: true,
      },
      arrivalRate: {
        type: Number,
        required: true,
      },
      dischargeRate: {
        type: Number,
        required: true,
      },
      waitingUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      allottedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    Emergency: {
      capacity: {
        type: Number,
        required: true,
      },
      availableCapacity: {
        type: Number,
        required: true,
      },
      serviceRate: {
        type: Number,
        required: true,
      },
      arrivalRate: {
        type: Number,
        required: true,
      },
      dischargeRate: {
        type: Number,
        required: true,
      },
      waitingUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      allottedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  },
});

hospitalSchema.methods.assignPatient = function (bedType, user) {
  if (
    this.bedTypes[bedType].availableCapacity > 0 &&
    this.bedTypes[bedType].waitingUsers.includes(user)
  ) {
    this.bedTypes[bedType].availableCapacity--;
    this.bedTypes[bedType].waitingUsers = this.bedTypes[
      bedType
    ].waitingUsers.filter((waitingUser) => waitingUser != user);
    this.bedTypes[bedType].allottedUsers.push(user);
    return true;
  } else {
    return false;
  }
};

hospitalSchema.methods.queuePatient = function (bedType, user) {
  this.bedTypes[bedType].waitingUsers.push(user);
};

hospitalSchema.methods.dischargePatient = function (bedType, user) {
  if (
    this.bedTypes[bedType].availableCapacity < this.bedTypes[bedType].capacity
  ) {
    this.bedTypes[bedType].availableCapacity++;
    const index = this.bedTypes[bedType].allottedUsers.indexOf(user);
    if (index > -1) {
      this.bedTypes[bedType].allottedUsers.splice(index, 1);
    }
    return true;
  } else {
    return false;
  }
};

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
