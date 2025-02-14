import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ( props) => {
  // Ensure data exists and is in correct format
//   const formattedData = chartData?.map(item => ({
//     name: item.name.toString(),
//     sum: Number(item.sum)
//   })) || [];
  console.log("chartData from app",props.data);

  return (
    <div style={{ width: '100%', height: '400px', margin: '20px 0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={props.data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="name" 
            label={{ 
              value: 'Age', 
              position: 'bottom',
              offset: 0 
            }}
            tick={{ fill: '#666' }}
          />
          <YAxis
            label={{ 
              value: 'Amount', 
              angle: -90, 
              position: 'left',
              offset: 10
            }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fill: '#666' }}
          />
          <Tooltip 
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
            labelFormatter={(label) => `Age: ${label}`}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => <span style={{ color: '#333' }}>Total Savings</span>}
          />
          <Line
            type="monotone"
            dataKey="sum"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: '#8884d8', strokeWidth: 2 }}
            activeDot={{ r: 8, fill: '#fff', stroke: '#8884d8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Type checking and default props
ChartComponent.defaultProps = {
  chartData: []
};

export default ChartComponent;