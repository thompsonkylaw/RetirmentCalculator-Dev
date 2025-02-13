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
      // const newValue = Math.max(parseInt(value) || 0, 
      //   field === 'fromAge' ? inputs.currentAge : inputs.fromAge
      // );
      setInputs({ ...inputs, [field]: newValue.toString() });
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
  
          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr auto;
            gap: 1rem;
            align-items: center;
          }
  
          .form-label {
            font-weight: 600;
            color: #2c3e50;
            padding: 0.8rem;
            font-size: 0.95rem;
          }
  
          .form-input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #bdc3c7;
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
            background: #27ae60;
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
            background: #219a52;
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
          .main-app h2{
            text-align:center;
            color:#089b78;
           }
        `}</style>
        
        <h2>退休計劃</h2>
        <div className="form-grid">
          <label className="form-label">Monthly Income Goal</label>
          <input
            type="text"
            className="form-input"
            value={formatCurrency(inputs.retirementGoal)}
            onChange={handleRetirementGoal}
            onBlur={() => setInputs({...inputs, retirementGoal: inputs.retirementGoal || 0})}
          />
          <button className="seek-button" onClick={onCalculate}>Seek</button>
  
          <label className="form-label">Inflation Adjustment</label>
          <input
            type="number"
            className="form-input"
            value={inputs.inflationAdjustment}
            onChange={(e) => setInputs({...inputs, inflationAdjustment: e.target.value})}
          />
          <div className="spacer" />
  
          <label className="form-label">Current Age</label>
          <input
            type="number"
            className="form-input"
            value={inputs.currentAge}
            //onChange={(e) => handleAgeChange('currentAge', e.target.value)}
            onChange={(e) => setInputs({...inputs, currentAge: e.target.value})}
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
              //onChange={(e) => handleAgeChange('fromAge', e.target.value)}
              onChange={(e) => setInputs({...inputs, fromAge: e.target.value})}
              min={inputs.currentAge}
              max={inputs.toAge}
            />
            <input
              type="number"
              className="form-input"
              value={inputs.toAge}
              //onChange={(e) => handleAgeChange('toAge', e.target.value)}
              onChange={(e) => setInputs({...inputs, toAge: e.target.value})}
              min={inputs.fromAge}
            />
          </div>
          <div className="spacer" />
  
          <label className="form-label">Post-Retirement Return</label>
          <input
            type="number"
            className="form-input"
            value={inputs.postRetirementReturn}
            onChange={(e) => setInputs({...inputs, postRetirementReturn: e.target.value})}
            step="0.1"
          />
          <div className="spacer" />
        </div>
      </div>
    );
  };
  
  export default UserInput3;