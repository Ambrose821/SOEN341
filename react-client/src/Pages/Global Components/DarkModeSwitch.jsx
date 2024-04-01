import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkModeSwitch = ({ isDarkMode, onToggle }) => {
  return (
    <div>
      <button
        className="dark-mode-button"
        onClick={onToggle}
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          outline: 'none',
          padding: 0,
        }}
      >
        {isDarkMode ? <LightModeIcon style={{ color: '#fff' }}/> : <DarkModeIcon />}
      </button>
    </div>
  );
};

export default DarkModeSwitch;
