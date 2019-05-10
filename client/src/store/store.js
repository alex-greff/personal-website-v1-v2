import Vue from 'vue';
import Vuex from 'vuex';

// Global imports
// import * as state from './global/state';
// import * as getters from './global/getters';
// import * as mutations from './global/mutations';
// import * as actions from './global/actions';

// Module imports
import theme from './modules/theme';
import projects from './modules/projects';
import experience from './modules/experience';
import about from './modules/about';
import autoTheme from './modules/autoTheme';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        theme,
        projects,
        experience,
        about,
        autoTheme
    }
});
