import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const UserInput3 = ({ inputs, setInputs, onCalculate, appBarColor }) => {
  const { t } = useTranslation();

  // Formatting functions
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  const parseCurrency = (value) => parseInt(value.replace(/\D/g, ''), 10) || 0;

  // Handlers
  const handleRetirementGoal = (e) => {
    const rawValue = parseCurrency(e.target.value);
    setInputs({ ...inputs, retirementGoal: rawValue });
  };

  const handleSearchClick = (event) => {
    onCalculate();
    if (event) {
      event.currentTarget.blur();
    }
  };

  // Common styling for all TextFields
  const textFieldSx = {
    '& .MuiInputBase-input': {
      padding: '0.6rem',
      textAlign: 'center',
      fontSize: '1rem',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      '& fieldset': {
        borderColor: '#2c3e50',
        borderWidth: '1px',
      },
      '&:hover fieldset': {
        borderColor: '#2c3e50',
      },
      '&.Mui-focused fieldset': {
        borderColor: appBarColor,
        boxShadow: '0 0 0 3px rgba(52,152,219,0.2)',
      },
    },
  };

  return (
    <Card
      sx={{
        background: '#fff',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        minHeight: 320,
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
          font-size: 0.9rem;
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

<h2 style={{ color: appBarColor }}>{t('retirementPlan')}</h2>
      <div className="form-grid">
        {/* Monthly Income Goal */}
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
                    backgroundColor: appBarColor,
                    '&:hover': { backgroundColor: '#1e7a42' },
                    padding: '0.2rem',
                  }}
                >
                  <SearchIcon sx={{ color: 'white' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            ...textFieldSx,
            '& .MuiOutlinedInput-root fieldset': {
              borderWidth: 'px',
            },
          }}
          variant="outlined"
        />

        {/* Inflation Adjustment */}
        <label className="form-label">{t('inflationAdjustment')}</label>
        <TextField
          value={inputs.inflationAdjustment}
          onChange={(e) => {
            const value = e.target.value.replace(',', '.');
            setInputs({ ...inputs, inflationAdjustment: value });
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          inputProps={{ inputMode: 'decimal' }}
          sx={textFieldSx}
        />

        {/* Current Age */}
        <label className="form-label">{t('currentAge')}</label>
        <TextField
          type="number"
          value={inputs.currentAge}
          onChange={(e) => setInputs({ ...inputs, currentAge: e.target.value })}
          inputProps={{ min: 1, max: inputs.fromAge }}
          sx={textFieldSx}
        />

        {/* Income Collection Ages */}
        <label className="form-label">{t('incomeCollectionAges')}</label>
        <div className="range-group">
          <TextField
            type="number"
            value={inputs.fromAge}
            onChange={(e) => setInputs({ ...inputs, fromAge: e.target.value })}
            inputProps={{ min: inputs.currentAge, max: inputs.toAge }}
            sx={textFieldSx}
          />
          <TextField
            type="number"
            value={inputs.toAge}
            onChange={(e) => setInputs({ ...inputs, toAge: e.target.value })}
            inputProps={{ min: inputs.fromAge }}
            sx={textFieldSx}
          />
        </div>

        {/* Post-Retirement Return */}
        <label className="form-label">{t('postRetirementReturn')}</label>
        <TextField
          value={inputs.postRetirementReturn}
          onChange={(e) => {
            const value = e.target.value.replace(',', '.');
            setInputs({ ...inputs, postRetirementReturn: value });
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          inputProps={{ inputMode: 'decimal' }}
          sx={textFieldSx}
        />
      </div>
    </Card>
  );
};

export default UserInput3;