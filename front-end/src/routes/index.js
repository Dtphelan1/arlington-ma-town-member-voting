import HomePage from './HomePage';
import FAQPage from './FAQPage';
import DataPage from './DataPage';

const routes = [
  {
    name: 'Home Page',
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    name: 'FAQ Page',
    path: '/faq',
    component: FAQPage
  },
  {
    name: 'Data Viewer',
    path: '/data',
    component: DataPage
  }
];

export { routes };
