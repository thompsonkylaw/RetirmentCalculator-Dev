const UserInput4 = ({ inputs, setInputs, onCalculate }) => {
  // Formatting function
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  const parseCurrency = (value) => value.replace(/[^0-9]/g, '');

  // Handlers
  const handleCurrencyChange = (category, field, value) => {
    const parsedValue = parseCurrency(value);
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [field]: parsedValue
      }
    });
  };

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          background: #fff;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr repeat(4, 120px) 100px;
          gap: 1rem;
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
          padding: 0.8rem;
          text-align: right;
        }

        .currency-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #bdc3c7;
          border-radius: 6px;
          text-align: center;
          font-size: 1rem;
        }

        .number-input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #bdc3c7;
          border-radius: 6px;
          text-align: center;
          font-size: 1rem;
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
      `}</style>

      <h2>儲蓄 & 投資</h2>
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
            value={formatCurrency(inputs.monthlySavings[field])}
            onChange={(e) => handleCurrencyChange('monthlySavings', field, e.target.value)}
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
            type="number"
            className="number-input"
            step="0.1"
            value={inputs.expectedReturn[field]}
            onChange={(e) => setInputs({
              ...inputs,
              expectedReturn: {
                ...inputs.expectedReturn,
                [field]: e.target.value
              }
            })}
          />
        ))}
        <div className="grid-spacer" />
      </div>
    </div>
  );
};

export default UserInput4;