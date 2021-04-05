import HomePage from './HomePage';
import AboutPage from './AboutPage';
import DataPage from './DataPage';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    name: 'About',
    path: '/about',
    component: AboutPage
  },
  {
    name: 'Data Viewer',
    path: '/data',
    component: DataPage
  }
];

export { routes };
