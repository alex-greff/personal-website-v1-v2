import Vue from 'vue'
import Router from 'vue-router'

import { getAllRoutes } from '@/constants/pageData';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...getAllRoutes()
    ]
});
