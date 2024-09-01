import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from './ui/chart'; // Adjust import based on your structure

const DynamicBarChart = ({
  title,
  description,
  data = [],
  dataKey = 'value',
  config = {},
  footer = { message: '', subtext: '' },
  xAxisKey = 'name', // Added xAxisKey to handle different x-axis data
}) => {
  const barColor = (config[dataKey] && config[dataKey].color) || 'rgba(75, 192, 192, 0.6)';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey={dataKey} fill={barColor} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {footer.message}
        </div>
        <div className="leading-none text-muted-foreground">
          {footer.subtext}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DynamicBarChart;
