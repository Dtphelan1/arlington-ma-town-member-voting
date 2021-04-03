import HomePage from './HomePage';
import FAQPage from './FAQPage';

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
  }
];

export { routes };
