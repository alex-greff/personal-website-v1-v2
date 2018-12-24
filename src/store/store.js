import Vue from 'vue';
import Vuex from 'vuex';

// Global imports
import * as state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

// Module imports
import theme from './modules/theme';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        theme
    }
});
