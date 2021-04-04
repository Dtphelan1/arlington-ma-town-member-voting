import React from 'react';
import { NavLink } from 'react-router-dom';

function AppHeader({ routes }) {
  return (
    <header className="navbar">
      <NavLink className="navbar-brand" to={routes.find(r => r.path === '/').path}>
        Vote Smart Arlington
      </NavLink>
      <nav className="nav">
        {routes.map(route => (
          <NavLink key={route.name} exact={route.exact} className="nav-link" activeClassName="active" to={route.path}>
            {route.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default AppHeader;
