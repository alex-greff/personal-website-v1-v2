// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex';
import store from '@/store/store';

import DefaultLayout from '@/layouts/Default.vue';

import "@/styling/main.scss";

export default function (Vue, { router, head, isClient, appOptions }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);

    // Setup Vuex store
    Vue.use(Vuex);
    appOptions.store = new Vuex.Store(store);
}
