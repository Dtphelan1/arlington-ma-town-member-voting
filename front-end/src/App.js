import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import { routes } from './routes';

function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto'
        }}
      >
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
        <AppFooter routes={routes} />
      </div>
    </Router>
  );
}

export default App;
