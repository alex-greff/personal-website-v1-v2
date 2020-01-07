import Vue from 'vue';
import Themer from 'themer';

import { schema, mixins } from '../../theme/definition';

import { getterTypes, mutationTypes, actionTypes } from '../types/index';

// -----------------------
// --- Check Functions ---
// -----------------------

const _checkThemeExists = (state, themeName) => {
    if (!state.themes[themeName]) {
        throw `Error: theme '${themeName}' does not exist`;
    }
};

const _checkThemeDoesNotExist = (state, themeName) => {
    if (state.themes[themeName]) {
        throw `Error: theme '${themeName}' already exists`;
    }
};

const _checkNamespaceExists = (state, namespaceID) => {
    if (!state.namespaces[namespaceID]) {
        throw `Error: namespace '${namespaceID}' does not exist`;
    }
};

const _checkNamespaceDoesNotExist = (state, namespaceID) => {
    if (state.namespaces[namespaceID]) {
        throw `Error: namespace '${namespaceID}' already exists`;
    }
};


// -------------------
// --- Store Setup ---
// -------------------

const state = {
    themes: {}, // Theme schemas
    namespaces: {}
};

const getters = {
    // Theme getters
    [getterTypes.GET_ALL_NAMESPACES]: (state) => {
        return state.themes;
    },
    [getterTypes.GET_THEME]: (state) => {
        return (themeID) => {
            return state.themes[themeID];
        }
    },
    // Namespace getters
    [getterTypes.GET_ALL_NAMESPACES]: (state) => {
        return state.namespaces;
    },
    [getterTypes.GET_NAMESPACE]: (state) => {
        return (namespaceID) => {
            return state.namespaces[namespaceID];
        }
    }
};

const mutations = {
    // Theme mutations
    [mutationTypes.ADD_THEME]: (state, payload) => {
        const { name, theme, override } = payload;

        // Make sure theme does not exist if we are not overriding it
        if (!override) {
            _checkThemeDoesNotExist(state, name);
        }

        // Generate the theme
        const generateOptions = {
            PREFIX: "--",
            CONDENSE_KEYS: true
        };
        const generatedTheme = Themer.generate(theme, schema, mixins, {}, generateOptions);

        // Add the theme
        Vue.set(state.themes, name, { name, properties: generatedTheme});
    },
    [mutationTypes.REMOVE_THEME]: (state, payload) => {
        const { name } = payload;

        _checkThemeExists(name);

        // Remove the theme
        Vue.delete(state.themes, name);
    },
    [mutationTypes.EDIT_THEME]: (state, payload) => {
        const { name, theme } = payload;

        _checkThemeExists(state, name);

        // Generate the updated theme
        const updatedGeneratedTheme = Themer.generate(theme, schema, mixins, {}, { PREFIX: "--" });

        // Update the theme's data
        Vue.set(state.themes, name, { name, properties: updatedGeneratedTheme });
    },
    // Namespace mutations
    [mutationTypes.ADD_NAMESPACE]: (state, payload) => {
        const { name, targetTheme, override } = payload;

        if (!override) {
            _checkNamespaceDoesNotExist(state, name);
        }

        // Add the namespace
        Vue.set(state.namespaces, name, targetTheme);
    },
    [mutationTypes.REMOVE_NAMESPACE]: (state, payload) => {
        const { name } = payload;

        _checkNamespaceExists(state, name);

        // Remove the namespace
        Vue.delete(state.namespaces, name);
    },
    [mutationTypes.EDIT_NAMESPACE]: (state, payload) => {
        const { name, targetTheme } = payload;

        _checkNamespaceExists(state, name);

        // Edit the theme target        
        Vue.set(state.namespaces, name, targetTheme);
    }
};

const actions = {
    // Theme actions
    [actionTypes.ADD_THEME]: ({ commit }, payload) => {        
        commit(mutationTypes.ADD_THEME, payload);
    },
    [actionTypes.REMOVE_THEME]: ({ commit }, payload) => {
        commit(mutationTypes.REMOVE_THEME, payload);
    },
    [actionTypes.EDIT_THEME]: ({ commit }, payload) => {
        commit(mutationTypes.EDIT_THEME, payload);
    },
    // Namespace actions
    [actionTypes.ADD_NAMESPACE]: ({ commit }, payload) => {
        commit(mutationTypes.ADD_NAMESPACE, payload);
    },
    [actionTypes.REMOVE_NAMESPACE]: ({ commit }, payload) => {
        commit(mutationTypes.REMOVE_NAMESPACE, payload);
    },
    [actionTypes.EDIT_NAMESPACE]: ({ commit }, payload) => {
        commit(mutationTypes.EDIT_NAMESPACE, payload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};