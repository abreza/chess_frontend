import './assets/styles/App.css';

import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import Parse from 'parse';
import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';

import Notifier from './components/Notifications/Notifications.jsx';
import Root from './root/Root.jsx';
import MuiTheme from './theme/MuiTheme';
import RTLMuiTheme from './theme/RTLMuiTheme';
import translations from './translations';
import jss from './utils/jssRTL';

let PARSE_SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost/parse_server'
    : 'https://chesss.rastaiha.ir/parse_server';

let liveQueryServerURL =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost/ws/'
    : 'wss://chesss.rastaiha.ir/ws/';
Parse.initialize('asdfEWFkej2l3kj2lfjasfjasdf9', 'AKjdfkebfj323k238s9dfsdf');
Parse.serverURL = PARSE_SERVER_URL;
Parse.Parse.liveQueryServerURL = liveQueryServerURL;

const AppRout = () => (
  <SnackbarProvider>
    <Notifier />
    <Root />
  </SnackbarProvider>
);

const App = ({ dir }) => {
  document.body.dir = dir;

  return (
    <IntlProvider translations={translations}>
      {dir === 'rtl' ? (
        <ThemeProvider theme={RTLMuiTheme}>
          <StylesProvider jss={jss}>
            <AppRout />
          </StylesProvider>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={MuiTheme}>
          <AppRout />
        </ThemeProvider>
      )}
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
});

export default connect(mapStateToProps)(App);
