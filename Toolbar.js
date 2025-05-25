import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import './Toolbar.css';

function Toolbar({ onAddItem }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="toolbar">
      <h3>Digital Moodboard</h3>
      <button onClick={() => onAddItem('text')}>Add Text</button>
      <button onClick={() => onAddItem('quote')}>Add Quote</button>
      {/* Add more buttons for photos, songs, videos later */}

      <div className="theme-switcher">
        <h4>Themes:</h4>
        <button
          onClick={() => toggleTheme('light')}
          className={theme === 'light' ? 'active' : ''}
        >
          Light
        </button>
        <button
          onClick={() => toggleTheme('dark')}
          className={theme === 'dark' ? 'active' : ''}
        >
          Dark
        </button>
        <button
          onClick={() => toggleTheme('pastel')}
          className={theme === 'pastel' ? 'active' : ''}
        >
          Pastel
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
