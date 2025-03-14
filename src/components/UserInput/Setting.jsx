import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Setting = ({ setAppBarColor, onClose }) => {
  const colors = [' #009739', '#E4002B', ' #FFCD00', ' #00008F', '  #004A9F','#ed1b2e '];

  const handleColorSelect = (color) => {
    setAppBarColor(color); // Update the AppBar color
    onClose(); // Close the dialog
  };

  return (
    <>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <h3>Select AppBar Color</h3>
        <div>
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => handleColorSelect(color)}
              style={{
                backgroundColor: color,
                color: color === 'yellow' ? 'black' : 'white', // Improve readability
                margin: '5px',
              }}
            >
              {color}
            </Button>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  );
};

export default Setting;