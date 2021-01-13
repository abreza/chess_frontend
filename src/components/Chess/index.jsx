import React from 'react';
import { connect } from 'react-redux';

import Board from './Board.jsx';

function Chess() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default connect()(Chess);
