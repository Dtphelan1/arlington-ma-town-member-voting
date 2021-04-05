import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../styles/appHeader.scss';

function AppHeader({ routes }) {
  return (
    <header className="navbar app-lr-padding">
      <Navbar className="navbar app-lr-padding nav-header w-100" variant="dark" expand="md">
        <Navbar.Brand as={NavLink} to={'/'}>
          Vote Smart Arlington
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            {routes.map(route => (
              <NavLink
                key={route.name}
                exact={route.exact}
                className="nav-link"
                activeClassName="active"
                to={route.path}
              >
                {route.name}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default AppHeader;
