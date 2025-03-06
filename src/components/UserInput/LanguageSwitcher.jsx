import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Radio, RadioGroup, FormControlLabel, Button, Card, Box, Tooltip, Dialog } from '@mui/material'; // Add Dialog
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Setting from './Setting'; // Import new Setting component

const LanguageSwitcher = ({
  onReset,
  onUndo,
  onRedo,
  undoDisabled,
  redoDisabled,
  currentVersion,
  onVersionSwitch,
  setAppBarColor, 
  appBarColor,// Add setAppBarColor prop
}) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  const [settingsOpen, setSettingsOpen] = useState(false); // State for dialog

  useEffect(() => {
    if (!selectedLanguage) {
      setSelectedLanguage('en');
      i18n.changeLanguage('en');
    }
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Handlers for opening and closing the settings dialog
  const handleOpenSettings = () => setSettingsOpen(true);
  const handleCloseSettings = () => setSettingsOpen(false);

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
                  minWidth: { xs: '60px', sm: '160px' },
                  padding: '4px 10px',
                  backgroundColor: currentVersion === `ver${ver}` ? appBarColor : 'transparent',
                  color: currentVersion === `ver${ver}` ? 'white' : appBarColor,
                  borderColor: appBarColor,
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
                backgroundColor: appBarColor,
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
                    backgroundColor: appBarColor,
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
                    backgroundColor: appBarColor,
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
                control={<Radio sx={{ color: appBarColor, '&.Mui-checked': { color: appBarColor } }} />}
                label="English"
              />
              <FormControlLabel
                value="zh-HK"
                control={<Radio sx={{ color: appBarColor, '&.Mui-checked': { color: appBarColor } }} />}
                label="繁體中文"
              />
              <FormControlLabel
                value="zh-CN"
                control={<Radio sx={{ color: appBarColor, '&.Mui-checked': { color: appBarColor } }} />}
                label="简體中文"
              />
            </RadioGroup>
          </Box>
        </Grid>

        {/* Settings Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleOpenSettings}>Settings</Button>
          </Box>
        </Grid>
      </Grid>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={handleCloseSettings}>
        <Setting setAppBarColor={setAppBarColor} onClose={handleCloseSettings} />
      </Dialog>
    </Card>
  );
};

export default LanguageSwitcher;