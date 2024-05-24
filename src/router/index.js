import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import Login from '../components/Login.vue';
import App from '../App.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/app',
    name: 'App',
    component: App,
    beforeEnter: authGuard,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
