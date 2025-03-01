// LanguageSwitcher.jsx
import React from 'react';
import {Card, Box, Button } from '@mui/material';

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
      <Button variant="contained" onClick={onReset}>
        Reset
      </Button>
      <Button variant="contained" onClick={onUndo} disabled={undoDisabled}>
        Undo
      </Button>
      <Button variant="contained" onClick={onRedo} disabled={redoDisabled}>
        Redo
      </Button>
      {[1, 2, 3, 4].map((ver) => (
        <Button
          key={ver}
          variant={currentVersion === `ver${ver}` ? 'contained' : 'outlined'}
          onClick={() => onVersionSwitch(`ver${ver}`)}
          sx={{
            minWidth: '60px',
            padding: '4px 10px',
            color: currentVersion === `ver${ver}` ? 'white' : 'primary.main',
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