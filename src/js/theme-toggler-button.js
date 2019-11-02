import React from 'react';
import ReactDOM from 'react-dom';

import {ThemeContext} from './theme-context';

/* Updating Context from a Nested Component */
function ThemeTogglerButton() {
  // The Theme Toggler receives not only the theme
  // but also a toggleTheme function from the context
  return (
  <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button 
          onClick={toggleTheme}
          style={{background: theme.background}}>
          Toggle Theme    
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;