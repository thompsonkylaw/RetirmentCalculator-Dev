import React, { useRef, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = (props) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '400px', 
        margin: '20px 0',
        display: 'flex'
      }}
    >
      <LineChart
        width={dimensions.width}
        height={dimensions.height}
        data={props.data}
        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
      >
        {/* Keep all your existing chart components here */}
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis 
          dataKey="name" 
          label={{ value: 'Age', position: 'bottom', offset: 0 }}
          tick={{ fill: '#667' }}
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
          formatter={() => <span style={{ color: '#333' }}>Total Savings</span>}
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
    </div>
  );
};

ChartComponent.defaultProps = {
  chartData: []
};

export default ChartComponent;