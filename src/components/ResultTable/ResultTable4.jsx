import React from 'react';
import Card from '@mui/material/Card';

const ResultTable4 = (props) => {
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;

  return (
    <Card sx={{ padding: '1rem' }}>
      <table className="result" style={{ color: 'black' }}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Stock(Year)</th>
            <th>MPF</th>
            <th>Other Servings</th>
            <th>Extra Servings</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((tableData4) => (
            <tr key={tableData4.year}>
              <td>{Math.round(tableData4.year)}</td>
              <td>{Math.round(tableData4.age)}</td>
              <td>{formatCurrency(Math.round(tableData4.stock))}</td>
              <td>{formatCurrency(Math.round(tableData4.mpf))}</td>
              <td>{formatCurrency(Math.round(tableData4.other))}</td>
              <td>{formatCurrency(Math.round(tableData4.extra))}</td>
              <td>{formatCurrency(Math.round(tableData4.sum))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default ResultTable4;