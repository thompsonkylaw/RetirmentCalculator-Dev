// LanguageSwitcher.jsx
import React from 'react';
import { Card, Box, Button } from '@mui/material';

const LanguageSwitcher = ({
  onReset,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  currentVersion,
  onVersionSwitch,
}) => {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: 70,
        margin: '20px 0',
        borderRadius: '10px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
        {/* Reset Button */}
        <Button
          variant="contained"
          onClick={onReset}
          sx={{
            backgroundColor: '#219a52',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1b7e43', // Darker shade on hover
            },
          }}
        >
          Reset
        </Button>

        {/* Undo Button */}
        <Button
          variant="contained"
          onClick={onUndo}
          disabled={undoDisabled}
          sx={{
            backgroundColor: '#219a52',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1b7e43',
            },
            '&.Mui-disabled': {
              backgroundColor: '#b0b0b0', // Custom disabled color
              color: '#e0e0e0',
            },
          }}
        >
          Undo
        </Button>

        {/* Redo Button */}
        <Button
          variant="contained"
          onClick={onRedo}
          disabled={redoDisabled}
          sx={{
            backgroundColor: '#219a52',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1b7e43',
            },
            '&.Mui-disabled': {
              backgroundColor: '#b0b0b0',
              color: '#e0e0e0',
            },
          }}
        >
          Redo
        </Button>

        {/* Version Buttons */}
        {[1, 2, 3, 4].map((ver) => (
          <Button
            key={ver}
            variant={currentVersion === `ver${ver}` ? 'contained' : 'outlined'}
            onClick={() => onVersionSwitch(`ver${ver}`)}
            sx={{
              minWidth: '60px',
              padding: '4px 10px',
              ...(currentVersion === `ver${ver}`
                ? {
                    backgroundColor: '#219a52',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1b7e43',
                    },
                  }
                : {
                    borderColor: '#219a52',
                    color: '#219a52',
                    '&:hover': {
                      backgroundColor: '#e0f2e9', // Light green on hover
                    },
                  }),
            }}
          >
            Ver. {ver}
          </Button>
        ))}
      </Box>
    </Card>
  );
};

export default LanguageSwitcher;