import React from 'react';
import './global.scss';
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

function App(): JSX.Element {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;
