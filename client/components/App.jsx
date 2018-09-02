import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Welcome from './Welcome';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Route path="/" component={Welcome} exact />
    </div>
  </BrowserRouter>
);

export default App;
