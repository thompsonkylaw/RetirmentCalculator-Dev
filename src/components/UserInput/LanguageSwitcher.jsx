import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Radio, RadioGroup, FormControlLabel, Button, Card, Box, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const LanguageSwitcher = ({
  onReset,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  currentVersion,
  onVersionSwitch,
}) => {
  // Translation hook
  const { t, i18n } = useTranslation();

  // State for language selection
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  // Ensure a language is always selected
  useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage('en');
      i18n.changeLanguage('en');
    }
  }, [selectedLanguage, i18n]);

  // Handle language change
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Card sx={{ p: 1, borderRadius: 3, boxShadow: 3, mt: 0 }}>
      <Grid container spacing={1}>
        {/* Version Select Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
            {[1, 2, 3, 4].map((ver) => (
              <Button
                key={ver}
                variant={currentVersion === `ver${ver}` ? 'contained' : 'outlined'}
                onClick={() => onVersionSwitch(`ver${ver}`)}
                sx={{
                  borderRadius: '16px',
                  minWidth: { xs: '60px', sm: '160px' }, // Responsive minWidth
                  padding: '4px 10px',
                  backgroundColor: currentVersion === `ver${ver}` ? '#219a52' : 'transparent',
                  color: currentVersion === `ver${ver}` ? 'white' : '#219a52',
                  borderColor: '#219a52',
                  '&:hover': {
                    backgroundColor: currentVersion === `ver${ver}` ? '#1b7e43' : '#e0f2e9',
                  },
                }}
              >
                {t('Ver')} {ver}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Undo, Redo, and Reset Buttons */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              variant="contained"
              onClick={onReset}
              sx={{
                backgroundColor: '#219a52',
                color: 'white',
                '&:hover': { backgroundColor: '#1b7e43' },
              }}
            >
              {t('Reset Data')}
            </Button>
            <Tooltip title={t('Undo')}>
              <span>
                <Button
                  variant="contained"
                  onClick={onUndo}
                  disabled={undoDisabled}
                  sx={{
                    backgroundColor: '#219a52',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1b7e43' },
                  }}
                  aria-label={t('Undo')}
                >
                  <UndoIcon />
                </Button>
              </span>
            </Tooltip>
            <Tooltip title={t('Redo')}>
              <span>
                <Button
                  variant="contained"
                  onClick={onRedo}
                  disabled={redoDisabled}
                  sx={{
                    backgroundColor: '#219a52',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1b7e43' },
                  }}
                  aria-label={t('Redo')}
                >
                  <RedoIcon />
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Grid>

        {/* Language Radio Buttons */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <RadioGroup
              row
              aria-label="language"
              name="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              sx={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}
            >
              <FormControlLabel
                value="en"
                control={<Radio sx={{ color: '#219a52', '&.Mui-checked': { color: '#219a52' } }} />}
                label="English"
              />
              <FormControlLabel
                value="zh-HK"
                control={<Radio sx={{ color: '#219a52', '&.Mui-checked': { color: '#219a52' } }} />}
                label="繁體中文"
              />
              <FormControlLabel
                value="zh-CN"
                control={<Radio sx={{ color: '#219a52', '&.Mui-checked': { color: '#219a52' } }} />}
                label="简體中文"
              />
            </RadioGroup>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default LanguageSwitcher;