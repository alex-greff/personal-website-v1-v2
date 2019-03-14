import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

import { MdIcon } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.config.productionTip = false;

// Material UI 
Vue.use(MdIcon);


// Bind axios to vue
// Note: the default request url can be set with axios.defaults.baseURL = <some url>;
Vue.use(VueAxios, axios);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
