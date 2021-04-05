import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/footer.scss';

const footerCopy = {
  disclaimers: [
    {
      label: 'Not affiliated with the City of Arlington, MA'
    },
    {
      label: 'All data was derived from:',
      link: 'https://www.arlingtonma.gov/town-governance/town-meeting/2020-town-meeting'
    },
    {
      label: 'All code is available on:',
      link: 'https://github.com/dtphelan1/arlington-ma-town-member-voting'
    }
  ]
};

function AppFooter({ routes }) {
  return (
    <footer className="app-lr-padding container-fluid">
      <div className="row justify-content-between">
        <nav className="nav text-dark col-sm-4 flex-sm-column flex-row justify-content-sm-start justify-content-around">
          {routes.map(route => (
            <NavLink key={route.name} exact={route.exact} className="nav-link" activeClassName="active" to={route.path}>
              {route.name}
            </NavLink>
          ))}
        </nav>
        <div id="footer-disclaimers" className="col-sm-8">
          {footerCopy.disclaimers.map(({ label, link }) => (
            <p key={label} className="text-light">
              {label} {link && <a href={link}>{link}</a>}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
