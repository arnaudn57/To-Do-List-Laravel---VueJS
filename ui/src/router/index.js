import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { authGuard } from '../_helpers/auth-guard';

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth) {
        authGuard();
    }
    next();
});

export default router;
