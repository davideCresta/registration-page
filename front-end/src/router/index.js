import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home';
import Show from '../components/Show';
import Login from '../components/Login';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/show',
    name: 'Show',
    component: Show,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;