import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { routes } from './routes';

function App() {
  return (
    <Router>
      <AppHeader routes={routes} />
      <Switch>
        {routes.map(route => {
          return (
            <Route exact={route.exact} path={route.path} key={route.path}>
              <route.component />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
