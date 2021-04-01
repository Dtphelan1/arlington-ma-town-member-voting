import React from 'react';
import { NavLink } from 'react-router-dom';

function AppHeader({routes}) {
  return (
    <header>
      <nav className="nav">
        {routes.map((route) => (
          <NavLink key={route.name} exact={route.exact} className='nav-link' activeClassName="active" to={route.path}>{route.name}</NavLink>
        ))}
      </nav>
    </header>
  );
}

export default AppHeader;