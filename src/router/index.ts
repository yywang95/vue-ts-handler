import Vue from 'vue';
import Router, { Route } from 'vue-router';

import Home from '@/pages/home/index.vue';
import Reject from '@/pages/reject/index.vue';

Vue.use(Router);

// config router page
const routeList = [
    {
        path: '/',
        redirect: 'home',
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/404',
        name: 'reject',
        component: Reject,
    },
    {
        path: '*',
        redirect: '404',
    },
];

// before enter intercept function
const routerBeforeEach = (to: Route, from: Route, next: Function) => {
    next();
};

// after enter intercept function
const routerAfterEach = () => {};

const routerInstance = new Router({
    routes: routeList,
});

routerInstance.beforeEach(routerBeforeEach);
routerInstance.afterEach(routerAfterEach);

export default routerInstance;
