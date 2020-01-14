// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueWaypoint from "vue-waypoint";
import VueScrollReveal from "vue-scroll-reveal";
import VueScrollTo from "vue-scrollto";

import store from '@/store/store';

import { MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

import Icon from 'vue-awesome/components/Icon';
import "vue-awesome/icons/brands/github";
import "vue-awesome/icons/brands/linkedin";
import "vue-awesome/icons/envelope";
import 'vue-awesome/icons/brands/soundcloud';
import "vue-awesome/icons/external-link-alt";
import "vue-awesome/icons/brands/facebook";
import "vue-awesome/icons/brands/instagram";
import "vue-awesome/icons/brands/pinterest";
import "vue-awesome/icons/brands/snapchat";
import "vue-awesome/icons/brands/youtube";
import "vue-awesome/icons/brands/vimeo-v";
import "vue-awesome/icons/brands/docker";
import "vue-awesome/icons/brands/twitter";
import "vue-awesome/icons/link";
import "vue-awesome/icons/download";
import "vue-awesome/icons/angle-right";
import "vue-awesome/icons/angle-left";
import "vue-awesome/icons/angle-up";
import "vue-awesome/icons/angle-down";
import "vue-awesome/icons/times";

import DefaultLayout from '@/layouts/Default.vue';

import "@/styling/main.scss";


export default function (Vue, { router, head, isClient, appOptions }) {
    // Material UI 
    Vue.use(MdIcon);

    // Font Awesome
    Vue.component('fa-icon', Icon);

    // Vee-Validate
    Vue.use(VeeValidate);

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);

    // Vue-Waypoint
    Vue.use(VueWaypoint);

    // Vue-Scroll-Reveal
    Vue.use(VueScrollReveal, {
        // Custom default options
        class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
        duration: 1000,
        scale: 1,
        distance: '20px',
        origin: "left",
        easing: "ease",
        mobile: true
    });

    // Vue-ScrollTo
    Vue.use(VueScrollTo, {
        container: "body",
        duration: 700,
        easing: "ease",
        offset: 0,
        force: true,
        cancelable: true,
        onStart: false,
        onDone: false,
        onCancel: false,
        x: false,
        y: true
    });

    // Setup Vuex store
    Vue.use(Vuex);
    appOptions.store = new Vuex.Store(store);
}
