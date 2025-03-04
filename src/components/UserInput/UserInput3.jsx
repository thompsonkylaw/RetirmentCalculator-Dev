import React from 'react';
import { useTranslation } from 'react-i18next'; // Import for i18n support
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const UserInput3 = ({ inputs, setInputs, onCalculate }) => {
  const { t } = useTranslation(); // Hook to access translation function

  // Formatting functions
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  const parseCurrency = (value) => parseInt(value.replace(/\D/g, ''), 10) || 0;

  // Handlers
  const handleRetirementGoal = (e) => {
    const rawValue = parseCurrency(e.target.value);
    setInputs({ ...inputs, retirementGoal: rawValue });
  };

  // Click handler for the search button
  const handleSearchClick = (event) => {
    onCalculate(); // Trigger the calculation function
    if (event) {
      event.currentTarget.blur(); // Remove focus from the button
    }
  };

  return (
    <Card
      sx={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        minHeight: 310,
      }}
    >
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.1rem;
          align-items: center;
        }

        .form-label {
          font-weight: 600;
          color: #2c3e50;
          padding: 0.7rem;
          font-size: 1.2rem;
        }

        .form-input {
          width: 100%;
          padding: 0.6rem;
          border: 1px solid #2c3e50;
          border-radius: 6px;
          font-size: 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #219a52;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.2);
        }

        .range-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .main-app h2 {
          text-align: center;
          color: #219a52;
        }
      `}</style>

      <h2>{t('retirementPlan')}</h2>
      <div className="form-grid">
        <label className="form-label">{t('monthlyIncomeGoal')}</label>
        <TextField
          type="text"
          value={formatCurrency(inputs.retirementGoal)}
          onChange={handleRetirementGoal}
          onBlur={() => setInputs({ ...inputs, retirementGoal: inputs.retirementGoal || 0 })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearchClick}
                  sx={{
                    backgroundColor: '#219a52',
                    '&:hover': {
                      backgroundColor: '#1e7a42',
                    },
                  }}
                >
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              border: '2px solid #2c3e50',
              borderRadius: '6px',
              '&:focus-within': {
                borderColor: '#2c3e50',
                boxShadow: '0 0 0 3px rgba(52,152,219,0.2)',
              },
              '& fieldset': {
                borderColor: '#2c3e50',
                borderWidth: '2px',
              },
            },
            '& .MuiInputBase-input': {
              textAlign: 'center',
              fontSize: '1rem',
            },
          }}
          variant="outlined"
        />

        <label className="form-label">{t('inflationAdjustment')}</label>
        <input
          type="text"
          className="form-input"
          value={`${inputs.inflationAdjustment}%`}
          onChange={(e) => setInputs({ ...inputs, inflationAdjustment: parseCurrency(e.target.value) })}
        />

        <label className="form-label">{t('currentAge')}</label>
        <input
          type="number"
          className="form-input"
          value={inputs.currentAge}
          onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
          min="1"
          max={inputs.fromAge}
        />

        <label className="form-label">{t('incomeCollectionAges')}</label>
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

        <label className="form-label">{t('postRetirementReturn')}</label>
        <input
          type="text"
          className="form-input"
          value={`${inputs.postRetirementReturn}%`}
          onChange={(e) => setInputs({ ...inputs, postRetirementReturn: parseCurrency(e.target.value) })}
          step="0.1"
        />
      </div>
    </Card>
  );
};

export default UserInput3;