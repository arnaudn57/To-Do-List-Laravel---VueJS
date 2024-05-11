import { authGuard } from '../_helpers/auth-guard';

export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/public/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./views/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('./views/private/Dashboard.vue'),
        meta: { requiresAuth: true }
    }
];
