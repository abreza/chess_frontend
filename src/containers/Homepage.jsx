import React from 'react';
import { connect } from 'react-redux';

import Chess from '../components/Chess/index.jsx';

function Homepage() {
  return <Chess />;
}

export default connect()(Homepage);
