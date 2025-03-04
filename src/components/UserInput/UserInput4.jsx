import React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const UserInput4 = ({ inputs, setInputs, onCalculate }) => {
  const formatCurrency = (value) => `$${parseInt(value).toLocaleString('en-US')}`;
  const parseCurrency = (value) => parseInt(value.replace(/\D/g, ''), 10) || 0;

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
        padding: '0.3rem',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
        minHeight: 362,
      }}
    >
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
          border-radius: 6px;
          font-size: 1rem;
        }
        .grid-label {
          font-weight: 600;
          color: #2c3e50;
          padding: 0.3rem;
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

      <h2>Saving & Investment</h2>
      <div style={{ overflowX: 'auto' }}>
        <div className="input-grid" style={{ minWidth: '515px' }}>
          {/* Headers */}
          <div />
          <div className="grid-header">Stock</div>
          <div className="grid-header">MPF</div>
          <div className="grid-header">Other</div>
          <div className="grid-header">Extra</div>

          {/* Monthly Savings Row */}
          <div className="grid-label">Monthly Savings</div>
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
                          backgroundColor: '#219a52',
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
          <div className="grid-label">Existing Assets</div>
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
          <div className="grid-label">Expected Return</div>
          {['stock', 'mpf', 'other', 'extra'].map((field) => (
            <TextField
              key={field}
              value={`${inputs.expectedReturn[field]}%`}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  expectedReturn: {
                    ...inputs.expectedReturn,
                    [field]: parseCurrency(e.target.value),
                  },
                })
              }
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