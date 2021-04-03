import HomePage from './HomePage';
import FAQPage from './FAQPage';
import DataPage from './DataPage';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    name: 'FAQ',
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
