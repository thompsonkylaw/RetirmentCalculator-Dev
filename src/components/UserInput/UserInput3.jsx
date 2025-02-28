import React from 'react';
import Card from '@mui/material/Card';

const UserInput3 = ({ inputs, setInputs, onCalculate }) => {
  // Formatting functions
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  const parseCurrency = (value) => value.replace(/[^0-9]/g, '');

  // Handlers
  const handleRetirementGoal = (e) => {
    const rawValue = parseCurrency(e.target.value);
    setInputs({ ...inputs, retirementGoal: rawValue });
  };

  const handleAgeChange = (field, value) => {
    setInputs({ ...inputs, [field]: value.toString() });
  };

  return (
    <Card
      sx={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      }}
    >
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 0.1 rem;
          align-items: center;
        }

        .form-label {
          font-weight: 600;
          color: #2c3e50;
          padding: 0.7rem;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 0.6rem; //space hight
          border: 1px solid #1976d2;
          border-radius: 6px;
          font-size: 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
        }

        .seek-button {
          background: #1976d2;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          margin-left: 1rem;
        }

        .seek-button:hover {
          background: #1976d2;
          transform: translateY(-1px);
        }

        .range-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .spacer {
          width: 5.5rem;
        }

        .main-app h2 {
          text-align: center;
          color: #1976d2;
        }
      `}</style>

      <h2>退休計劃</h2>
      <div className="form-grid">
        <label className="form-label">Monthly Income Goal</label>
        <input
          type="number"
          className="form-input"
          value={inputs.retirementGoal}
          onChange={handleRetirementGoal}
          onBlur={() => setInputs({ ...inputs, retirementGoal: inputs.retirementGoal || 0 })}
          step={0.01}
        />
        <button className="seek-button" onClick={onCalculate}>
          Seek
        </button>

        <label className="form-label">Inflation Adjustment</label>
        <input
          type="number"
          className="form-input"
          value={inputs.inflationAdjustment}
          onChange={(e) => setInputs({ ...inputs, inflationAdjustment: e.target.value })}
        />
        <div className="spacer" />

        <label className="form-label">Current Age</label>
        <input
          type="number"
          className="form-input"
          value={inputs.currentAge}
          onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
          min="1"
          max={inputs.fromAge}
        />
        <div className="spacer" />

        <label className="form-label">Income Collection Ages</label>
        <div className="range-group">
          <input
            type="number"
            className="form-input"
            value={inputs.fromAge}
            onChange={(e) => setInputs({ ...inputs, fromAge: e.target.value })}
            min={inputs.currentAge}
            max={inputs.toAge}
          />
          <input
            type="number"
            className="form-input"
            value={inputs.toAge}
            onChange={(e) => setInputs({ ...inputs, toAge: e.target.value })}
            min={inputs.fromAge}
          />
        </div>
        <div className="spacer" />

        <label className="form-label">Post-Retirement Return</label>
        <input
          type="number"
          className="form-input"
          value={inputs.postRetirementReturn}
          onChange={(e) => setInputs({ ...inputs, postRetirementReturn: e.target.value })}
          step="0.1"
        />
        <div className="spacer" />
      </div>
    </Card>
  );
};

export default UserInput3;