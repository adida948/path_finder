import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Welcome from './Welcome';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/" component={Welcome} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

