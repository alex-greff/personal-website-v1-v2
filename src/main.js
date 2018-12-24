import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false

// Setup axios
axios.defaults.baseURL = "http://localhost:3000/api";

// Bind axios to vue
Vue.use(VueAxios, axios);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
