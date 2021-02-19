import Parse from 'parse';

export default function handleParseError(err) {
  alert(JSON.stringify(err));
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      break;
  }
}
