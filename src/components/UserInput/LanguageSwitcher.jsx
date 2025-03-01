// LanguageSwitcher.jsx
import React from 'react';
import { Box, Button } from '@mui/material';

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
  );
};

export default LanguageSwitcher;