import Vue from 'vue';
import { THEME_ITEMS } from '../../constants/themeItems';

import * as actionTypes from "@/store/types/actionTypes";
import * as getterTypes from "@/store/types/getterTypes";
import * as mutationTypes from "@/store/types/mutationTypes";

// -----------------------
// --- Check Functions ---
// -----------------------

const _themeExists = (i_oState, i_sThemeID) => {
    if (!i_oState[i_sThemeID]) {
        throw `Error: theme '${i_sThemeID}' does not exist`;
    }
};

const _themeDoesNotExist = (i_oState, i_sThemeID) => {
    if (i_oState[i_sThemeID]) {
        throw `Error: theme '${i_sThemeID}' already exists`;
    }
}

// -------------------
// --- Store Setup ---
// -------------------

const state = {
    currentTheme: "default",
    currentAutoTheme: "default",
    autoThemeEnabled: true,
    themes: {} // themeName: { _id: String, colors: { --color-page-bg: "XX, XX, XX" }}
};

const getters = {
    getThemes: state => {
        return state.themes;
    },
    getCurrentTheme: state => { // TODO: remove
        return state.currentTheme;
    },
    getCurrentAutoTheme: state => {
        return state.currentAutoTheme;
    }, 
    getAutoThemeEnabled: state => {
        return state.autoThemeEnabled;
    }
};

const mutations = {
    setCurrentTheme(state, newTheme) {
        state.currentTheme = newTheme;
    },
    setCurrentAutoTheme(state, newAutoTheme) {
        state.currentAutoTheme = newAutoTheme;
    },
    setAutoThemeEnabled(state, enabled) {
        state.autoThemeEnabled = enabled;
    }
};

const actions = {
    setCurrentTheme({ commit, dispatch }, payload) {
        let newTheme = payload.theme;
        let forceAutoOff = payload.forceAutoOff || false;

        if (forceAutoOff) {
            commit('setAutoThemeEnabled', false);
        }
        commit('setCurrentTheme', newTheme);
        dispatch('updateCurrentTheme');
    },
    setCurrentAutoTheme({ commit, dispatch }, payload) {
        let newTheme = payload.theme;
        let forceAutoOn = payload.forceAutoOn || false;

        if (forceAutoOn) {
            commit('setAutoThemeEnabled', true);    
        }
        commit('setCurrentAutoTheme', newTheme);
        dispatch('updateCurrentTheme');
    },
    setAutoThemeEnabled({ commit, dispatch }, enabled) {
        commit('setAutoThemeEnabled', enabled);
        dispatch('updateCurrentTheme');
    },

    [actionTypes.POPULATE_THEMES]: async ({ dispatch }) => {
        // Get the default theme local theme (for incase we can't connect to the api server)
        let styles = getComputedStyle(document.documentElement);
        let defaultData = {};
        defaultData['name'] = 'default';
        THEME_ITEMS.forEach(THEME_ITEM => {
            defaultData[THEME_ITEM] = styles.getPropertyValue(THEME_ITEM);
        });
        Vue.set(state.themes, 'default', defaultData); // Equivalent: state.themes['default'] = defaultData;

        try {
            // Get themes from the database
            const res = await Vue.axios.get('/api/themes');

            console.log("Themes get sucessful", res); // TODO: remove

            // Construct our in-memory themes object
            res.data.themes.forEach(theme => {
                const currData = {};

                currData.name = theme.name;

                THEME_ITEMS.forEach(THEME_ITEM => {
                    currData[THEME_ITEM] = theme[THEME_ITEM];
                });

                Vue.set(state.themes, theme.name, currData); // Equivalent: state.themes[theme.name] = currData;
            });
            dispatch('updateCurrentTheme');
        } catch(err) {
            console.error("Unable to retrieve themes from server:\n", err);
        }
    },

    updateCurrentTheme() { // TODO: this is gonna be removed
        let bodyStyles = document.body.style;
        let currThemeName = (state.autoThemeEnabled) ? state.currentAutoTheme : state.currentTheme;
        let currTheme = state.themes[currThemeName];

        if (!currTheme) {
            console.warn("Warning: '" + currThemeName + "' is not a theme, using default instead");
            currThemeName = "default";
            currTheme = state.themes[currThemeName];
        }

        THEME_ITEMS.forEach(THEME_ITEM => {
            bodyStyles.setProperty(THEME_ITEM, currTheme[THEME_ITEM]);
        });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
