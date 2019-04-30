import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueFragment from 'vue-fragment';
import VeeValidate from 'vee-validate';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

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

Vue.config.productionTip = false;

// Material UI 
Vue.use(MdIcon);

// Font Awesome
Vue.component('fa-icon', Icon);

// Vue Fragment
Vue.use(VueFragment.Plugin);

// Vee-Validate
Vue.use(VeeValidate);

// Bind axios to vue
// Note: the default request url can be set with axios.defaults.baseURL = <some url>;
Vue.use(VueAxios, axios);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
