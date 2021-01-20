import Parse from 'parse';

export const initParseServer = () => {
  let PARSE_SERVER_URL =
    process.env.NODE_ENV === 'development'
      ? 'https://chesss.rastaiha.ir/parse_server'
      : 'https://chesss.rastaiha.ir/parse_server';

  let liveQueryServerURL =
    process.env.NODE_ENV === 'development'
      ? 'wss://chesss.rastaiha.ir/ws/'
      : 'wss://chesss.rastaiha.ir/ws/';
  Parse.initialize('asdfEWFkej2l3kj2lfjasfjasdf9', 'AKjdfkebfj323k238s9dfsdf');
  Parse.serverURL = PARSE_SERVER_URL;
  Parse.liveQueryServerURL = liveQueryServerURL;
};
