import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const UserInput4 = ({ inputs, setInputs, onCalculate, appBarColor }) => {
  const { t } = useTranslation();

  // Format currency values with a dollar sign and thousands separator
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;

  // Parse currency input by removing non-digits
  const parseCurrency = (value) => parseInt(value.replace(/\D/g, ''), 10) || 0;

  // Handle changes for currency fields (Monthly Savings and Existing Assets)
  const handleCurrencyChange = (category, field, value) => {
    value = parseCurrency(value);
    setInputs({
      ...inputs,
      [category]: {
        ...inputs[category],
        [field]: value,
      },
    });
  };

  // Common TextField styling
  const textFieldSx = {
    position: 'relative',
    '& .MuiInputBase-input': {
      padding: '0.6rem',
      textAlign: 'center',
      fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      '& fieldset': {
        borderColor: '#2c3e50',
      },
      '&:focus-within': {
        borderColor: '#2c3e50',
        boxShadow: '0 0 0 3px rgba(52,152,219,0.2)',
      },
      '&:hover fieldset': {
        borderColor: '#2c3e50',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2c3e50',
      },
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '0',
      marginRight: '0',
    },
    '& .MuiIconButton-root': {
      padding: '0.2rem',
    },
  };

  return (
    <Card
      sx={{
        background: '#fff',
        padding: '0.2rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        minHeight: 320,
      }}
    >
      {/* Inline CSS for grid layout */}
      <style>{`
        .input-grid {
          display: grid;
          grid-template-columns: 1fr repeat(4, 2fr);
          gap: 0.5rem;
          align-items: center;
          font-size: 1rem;
        }
        .grid-header {
          font-weight: 600;
          color: #2c3e50;
          text-align: center;
          padding: 0.8rem;
          background: #f8f9fa;
          borderRadius: 6px;
          font-size: 1rem;
        }
        .grid-label {
          font-weight: 600;
          color: #2c3e50;
          padding: 0.1rem;
          text-align: right;
        }
        @media (max-width: 1300px) {
          .input-grid .MuiTextField-root {
            padding-right: 0;
          }
          .input-grid .MuiInputAdornment-root {
            position: absolute;
            right: 0;
          }
          .input-grid .MuiIconButton-root {
            padding: 0;
          }
        }
      `}</style>

      <h2 style={{ color: appBarColor }}>{t('savingAndInvestment')}</h2>
      <div style={{ overflowX: 'auto' }}>
        <div className="input-grid" style={{ minWidth: '515px' }}>
          {/* Headers */}
          <div />
          <div
          className="grid-header"
          style={{ backgroundColor: 'rgb(57, 102, 248)', color: 'white' }}
        >
          {t('stock')}
        </div>
        
          <div
          className="grid-header"
          style={{ backgroundColor: 'rgb(255, 165, 0)', color: 'white' }}
        >
          {t('mpf')}
        </div>
        <div
          className="grid-header"
          style={{ backgroundColor: 'rgb(255, 192, 0)', color: 'white' }}
        >
          {t('other')}
        </div>
        <div
          className="grid-header"
          style={{ backgroundColor: 'rgb(15, 175, 63)', color: 'white' }}
        >
          {t('extra')}
        </div>
         

          {/* Monthly Savings Row */}
          <div className="grid-label">{t('monthlySavings')}</div>
          {['stock', 'mpf', 'other', 'extra'].map((field) => {
            const isExtra = field === 'extra';
            const inputProps = isExtra
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(event) => {
                          onCalculate();
                          if (event) event.currentTarget.blur();
                        }}
                        sx={{
                          backgroundColor: appBarColor,
                          '&:hover': {
                            backgroundColor: '#1e8f4a',
                          },
                        }}
                      >
                        <SearchIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : {};
            const fieldSx = isExtra
              ? {
                  ...textFieldSx,
                  '& .MuiOutlinedInput-root fieldset': { borderWidth: '4px' },
                }
              : textFieldSx;
            return (
              <TextField
                key={field}
                value={formatCurrency(inputs.monthlySavings[field])}
                onChange={(e) => handleCurrencyChange('monthlySavings', field, e.target.value)}
                inputProps={{ inputMode: 'decimal' }}
                InputProps={inputProps}
                sx={fieldSx}
              />
            );
          })}

          {/* Existing Assets Row */}
          <div className="grid-label">{t('existingAssets')}</div>
          {['stock', 'mpf', 'other', 'extra'].map((field) => (
            <TextField
              key={field}
              value={formatCurrency(inputs.existingAssets[field])}
              onChange={(e) => handleCurrencyChange('existingAssets', field, e.target.value)}
              inputProps={{ inputMode: 'decimal' }}
              sx={textFieldSx}
            />
          ))}

          {/* Expected Return Row */}
          {/* Note: Values are stored as strings to allow decimal input (e.g., "5.5").
               Parse with parseFloat(inputs.expectedReturn[field]) || 0 in calculations. */}
          <div className="grid-label">{t('expectedReturn')}</div>
          {['stock', 'mpf', 'other', 'extra'].map((field) => (
            <TextField
              key={field}
              value={inputs.expectedReturn[field]} // Stored as string, e.g., "5", "5.", "5.5"
              onChange={(e) => {
                let value = e.target.value;
                // Replace commas with periods to support both decimal separators
                value = value.replace(',', '.');
                setInputs({
                  ...inputs,
                  expectedReturn: {
                    ...inputs.expectedReturn,
                    [field]: value,
                  },
                });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box sx={{ marginRight: '8px' }}>%</Box>
                  </InputAdornment>
                ),
              }}
              inputProps={{ inputMode: 'decimal' }}
              sx={textFieldSx}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UserInput4;