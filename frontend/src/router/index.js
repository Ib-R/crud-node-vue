import Vue from 'vue';
import store from '../store';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};
const isNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/auth/Login.vue'),
    beforeEnter: isNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/auth/Register.vue'),
    beforeEnter: isNotAuthenticated,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../components/auth/Profile.vue'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/companies',
    name: 'CompaniesIndex',
    component: () => import('../components/companies/index.vue'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/companies/show/:id',
    name: 'ShowCompany',
    component: () => import('../components/companies/show.vue'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/companies/update/:id',
    name: 'UpdateCompany',
    component: () => import('../components/companies/create.vue'),
    beforeEnter: isAuthenticated,
  },
  {
    path: '/companies/create',
    name: 'CreateCompany',
    component: () => import('../components/companies/create.vue'),
    beforeEnter: isAuthenticated,
  },
];

const router = new VueRouter({
  routes
});

export default router;
