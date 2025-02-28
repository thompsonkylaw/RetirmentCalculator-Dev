import React from 'react';
import Card from '@mui/material/Card';

const ResultTable3 = (props) => {
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;

  return (
    <Card sx={{ padding: '1rem' }}>
      <table className="result" style={{ color: 'black' }}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>D</th>
            <th>E</th>
            <th>F</th>
            <th>G</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((tableData3) => (
            <tr key={tableData3.year}>
              <td>{Math.round(tableData3.year)}</td>
              <td>{Math.round(tableData3.age)}</td>
              <td>{formatCurrency(Math.round(tableData3.D))}</td>
              <td>{formatCurrency(Math.round(tableData3.E))}</td>
              <td>{formatCurrency(Math.round(tableData3.F))}</td>
              <td>{formatCurrency(Math.round(tableData3.G))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ResultTable3;