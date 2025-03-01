import React, { useRef, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Line } from 'recharts';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography'; // Import Typography for the title

const ChartComponent = (props) => {
  let { title, data, currentAge, fromAge, toAge } = props; // Add title to props
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Define the specific ages to show on the X-axis
  const specificAges = [currentAge, fromAge - 1, toAge];

  // Define toAge as fromAge for clarity
  toAge = fromAge;

  // Filter data for the highlighted range (currentAge to fromAge - 1)
  const dataInRange = props.data.filter(d => parseFloat(d.name) >= currentAge && parseFloat(d.name) <= fromAge - 1);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '';
    const absNum = Math.abs(num);

    if (absNum >= 1000000) {
      const kValue = Math.round(absNum / 1000000);
      return `${num < 0 ? '-' : ''}${kValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}M`;
    } else if (absNum >= 1000) {
      const kValue = Math.round(absNum / 1000);
      return `${num < 0 ? '-' : ''}${kValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`;
    }
    return num.toString();
  };

  return (
    <Card
      ref={containerRef}
      sx={{
        width: '100%',
        height: '400px',
        margin: '20px 0',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      }}
    >
      {/* Add the title here */}
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <AreaChart
        width={dimensions.width}
        height={dimensions.height - 40} // Adjust height to make room for the title
        data={props.data}
        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
      >
        <defs>
          <linearGradient id="gradientFillFirst" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#219a52" stopOpacity={1} />
            <stop offset="100%" stopColor="#219a52" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="gradientFillSecond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="100%" stopColor="#FF002BFF" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#CA828EFF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis
          dataKey="name"
          type="number"
          domain={[currentAge, toAge]}
          ticks={specificAges}
          label={{ value: 'Age', position: 'bottom', offset: 0 }}
          tick={{ fill: '#667' }}
        />
        <YAxis
          label={{
            value: 'Amount',
            angle: -90,
            position: 'left',
            offset: 10,
          }}
          tickFormatter={(value) => formatNumber(value)}
          tick={{ fill: '#666' }}
        />
        <Tooltip
          formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']}
          labelFormatter={(label) => `Age: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="sum"
          data={props.data}
          fill="url(#gradientFillSecond)"
          stroke="none"
        />
        <Area
          type="monotone"
          dataKey="sum"
          data={dataInRange}
          fill="url(#gradientFillFirst)"
          stroke="none"
        />
        <Line
          type="monotone"
          dataKey="sum"
          data={props.data}
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <ReferenceLine
          y={0}
          stroke="#000"
          strokeWidth={2}
        />
      </AreaChart>
    </Card>
  );
};

// Set default props, including a default title
ChartComponent.defaultProps = {
  title: 'Retirement Savings', // Default title if none is provided
  data: [],
};

export default ChartComponent;