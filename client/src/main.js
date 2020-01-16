// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
// import VueWaypoint from "vue-waypoint";
// import VueScrollReveal from "vue-scroll-reveal";
import VueScrollTo from "vue-scrollto";

import store from '@/store/store';

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
import "vue-awesome/icons/check";
import "vue-awesome/icons/exclamation";

import DefaultLayout from '@/layouts/Default.vue';

import "@/styling/main.scss";

// let _VueWaypoint;
// let _VueScrollReveal;
// if (process.isClient) {
//     _VueWaypoint = require('vue-waypoint');
//     _VueScrollReveal = require('vue-scroll-reveal');
// }


export default async function (Vue, { router, head, isClient, appOptions }) {
    // Font Awesome
    Vue.component('fa-icon', Icon);

    // Vee-Validate
    Vue.use(VeeValidate);

    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);


    // Vue-Waypoint
    // console.log(VueWaypoint);
    // Vue.use(VueWaypoint);

    // Vue-Scroll-Reveal
    // Vue.use(VueScrollReveal, {
    //     // Custom default options
    //     class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
    //     duration: 1000,
    //     scale: 1,
    //     distance: '20px',
    //     origin: "left",
    //     easing: "ease",
    //     mobile: true
    // });


    // Libraries that don't play well with SSR
    if (process.isClient) {
        // const Test = await import('vue-waypoint');

        // console.log(process.isClient);

        // // Vue-Waypoint
        // const VueWaypoint_ = require('vue-waypoint');
        // console.log(VueWaypoint_);
        // Vue.use(VueWaypoint_);

        // const VueScrollReveal_ = require('vue-scroll-reveal');
        // Vue.use(VueScrollReveal_, {
        //     // Custom default options
        //     class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
        //     duration: 1000,
        //     scale: 1,
        //     distance: '20px',
        //     origin: "left",
        //     easing: "ease",
        //     mobile: true
        // });


        const _VueWaypoint = require('vue-waypoint').default;
        const _VueScrollReveal = require('vue-scroll-reveal').default;
        

        Vue.use(_VueWaypoint);

        Vue.use(_VueScrollReveal, {
            // Custom default options
            class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
            duration: 1000,
            scale: 1,
            distance: '20px',
            origin: "left",
            easing: "ease",
            mobile: true
        });


        // console.log(require("vue-waypoint"));

        // Vue.use(require("vue-waypoint").default);

        // Vue.use(require("vue-waypoint").default, {
        //     // Custom default options
        //     class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
        //     duration: 1000,
        //     scale: 1,
        //     distance: '20px',
        //     origin: "left",
        //     easing: "ease",
        //     mobile: true
        // });
    }

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
