import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

const { VITE_TARGET_ENV = '' } = import.meta.env;
const isHashMode = ['pages', 'hash'].includes(VITE_TARGET_ENV);

const router = createRouter({
  history: !isHashMode
    ? createWebHistory(import.meta.env.BASE_URL)
    : createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
