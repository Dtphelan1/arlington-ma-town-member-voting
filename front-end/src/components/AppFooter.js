import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/footer.scss';

const footerCopy = {
  disclaimers: [
    {
      label: 'Not affiliated with the City of Arlington, MA'
    },
    {
      label: 'All data displayed has been derived from:',
      link: 'https://arlingtonma.gov'
    },
    {
      label: 'All code is available on:',
      link: 'https://github.com/dtphelan1/arlington-ma-town-member-voting'
    }
  ]
};

function AppFooter({ routes }) {
  return (
    <footer className="pl-5 pr-5 pt-3 pb-3">
      <nav className="nav text-dark">
        {routes.map(route => (
          <NavLink key={route.name} exact={route.exact} className="nav-link" activeClassName="active" to={route.path}>
            {route.name}
          </NavLink>
        ))}
      </nav>
      <div id="footer-disclaimers">
        {footerCopy.disclaimers.map(({ label, link }) => (
          <p key={label} className="text-light">
            {label} {link && <a href={link}>{link}</a>}
          </p>
        ))}
      </div>
    </footer>
  );
}

export default AppFooter;
