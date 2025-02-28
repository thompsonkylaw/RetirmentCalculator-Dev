import React from 'react';
import Card from '@mui/material/Card';

const UserInput4 = ({ inputs, setInputs, onCalculate }) => {
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  //const parseCurrency = (value) => value.replace(/[^0-9]/g, '');
  const parseCurrency = (value) => parseInt(value.replace(/\D/g, ''), 10) || 0;

  const handleCurrencyChange = (category, field, value) => {
    value = parseCurrency(value);
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [field]: value
      }
    });
  };

  return (
    <Card
      sx={{
        background: '#fff',
        padding: '0.4rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        height: 310,
      }}
    >
      <style>{`
        .input-grid {
          display: grid;
          grid-template-columns: 1fr repeat(4, 1fr) auto; /* Flexible columns */
          gap: 0.1rem;
          align-items: center;
        }

        .grid-header {
          font-weight: 600;
          color: #2c3e50;
          text-align: center;
          padding: 0.8rem;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .grid-label {
          font-weight: 600;
          color: #2c3e50;
          padding: 0.3rem;
          text-align: right;
        }

        .currency-input, .number-input {
          width: 100%;
          padding: 0.6rem;
          border: 2px solid #2c3e50;
          border-radius: 6px;
          text-align: center;
          font-size: 0.8rem;
        }

        .seek-button {
          background: #27ae60;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .seek-button:hover {
          background: #219a52;
          transform: translateY(-1px);
        }

        .grid-spacer {
          width: 100px;
        }

        @media (max-width: 600px) {
          .input-grid {
            grid-template-columns: 1fr; /* Stack vertically */
          }

          .grid-label, .grid-header, .currency-input, .number-input, .seek-button {
            grid-column: 1 / -1; /* Full width */
            text-align: center;
          }

          .grid-spacer {
            display: none; /* Hide spacers */
          }
        }
      `}</style>

      <h2>Saving & Investment</h2>
      <div className="input-grid">
        <div className="grid-spacer" />
        <div className="grid-header">Stock</div>
        <div className="grid-header">MPF</div>
        <div className="grid-header">Other</div>
        <div className="grid-header">Extra</div>
        <div className="grid-spacer" />

        <div className="grid-label">Monthly Savings</div>
        {['stock', 'mpf', 'other', 'extra'].map((field) => (
          <input
            key={field}
            type="text"
            className="currency-input"
            step="any"
            value={formatCurrency(inputs.monthlySavings[field])}
            onChange={(e) => handleCurrencyChange('monthlySavings', field, e.target.value)}
            inputMode="decimal"
          />
        ))}
        <button className="seek-button" onClick={onCalculate}>Seek</button>

        <div className="grid-label">Existing Assets</div>
        {['stock', 'mpf', 'other', 'extra'].map((field) => (
          <input
            key={field}
            type="text"
            className="currency-input"
            value={formatCurrency(inputs.existingAssets[field])}
            onChange={(e) => handleCurrencyChange('existingAssets', field, e.target.value)}
          />
        ))}
        <div className="grid-spacer" />

        <div className="grid-label">Expected Return</div>
        {['stock', 'mpf', 'other', 'extra'].map((field) => (
          <input
            key={field}
            type="text"
            className="number-input"
            step="1"
            value={`${inputs.expectedReturn[field]}%`}
            onChange={(e) => setInputs({
              ...inputs,
              expectedReturn: {
                ...inputs.expectedReturn,
                [field]: parseCurrency(e.target.value)
              }
            })}
          />
        ))}
        <div className="grid-spacer" />
      </div>
    </Card>
  );
};

export default UserInput4;