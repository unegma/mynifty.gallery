import React from 'react';
import './global.scss';
import HomePage from "./pages/HomePage";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

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
      <MuiThemeProvider theme={theme}>
        <HomePage />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
