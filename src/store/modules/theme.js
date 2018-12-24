import Vue from 'vue';
import { THEME_ITEMS } from '../../constants/themeItems';

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
    getCurrentTheme: state => {
        return state.currentTheme;
    },
    getCurrentAutoTheme: state => {
        return state.currentAutoTheme;
    }, 
    getAutoThemeEnabled: state => {
        return state.autoThemeEnabled;
    }
};

const mutations =  {
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

        console.log("force auto off: ", forceAutoOff);

        if (forceAutoOff) {
            console.log("forcing disable auto theme");
            commit('setAutoThemeEnabled', false);
        }
        commit('setCurrentTheme', newTheme);
        dispatch('updateCurrentTheme');
    },
    setCurrentAutoTheme({ commit, dispatch }, payload) {
        let newTheme = payload.theme;
        let forceAutoOn = payload.forceAutoOn || false;

        if (forceAutoOn) {
            console.log("forcing enable auto theme");
            commit('setAutoThemeEnabled', true);    
        }
        commit('setCurrentAutoTheme', newTheme);
        dispatch('updateCurrentTheme');
    },
    setAutoThemeEnabled({ commit, dispatch }, enabled) {
        commit('setAutoThemeEnabled', enabled);
        dispatch('updateCurrentTheme');
    },

    populateThemes({ dispatch }) {
        console.log("populating themes");   
        
        // Get the default theme local theme (for incase we can't connect to the api server)
        let bodyStyles = document.body.style;
        let defaultData = {};
        defaultData['name'] = 'default';
        THEME_ITEMS.forEach(THEME_ITEM => {
            defaultData[THEME_ITEM] = bodyStyles.getPropertyValue(THEME_ITEM);
        });
        state.themes['default'] = defaultData;

        // console.log("default ", state.themes["default"]);


        // Get themes from the database
        Vue.axios.get('themes')
            .then(res => {
                console.log("Get sucessful", res);

                // Construct our in-memory themes object
                res.data.themes.forEach(theme => {
                    let currData = {}

                    currData.name = theme.name;

                    THEME_ITEMS.forEach(THEME_ITEM => {
                        currData[THEME_ITEM] = theme[THEME_ITEM];
                    });

                    // state.themes[theme.name] = currData;
                    Vue.set(state.themes, theme.name, currData);
                });

                // console.log("Themes", state.themes);
                // THIS IS HOW YOU ITERATE THE OBJECT
                // for (let key in state.themes) {
                //     if (!state.themes.hasOwnProperty(key)) continue;

                //     console.log(key, state.themes[key]);
                // }

                dispatch('updateCurrentTheme');

            })
            .catch(err => {
                console.log("Get failed", err)
            });
    },

    updateCurrentTheme() {
        console.log("updating current theme");

        let bodyStyles = document.body.style;
        let currThemeName = (state.autoThemeEnabled) ? state.currentAutoTheme : state.currentTheme;
        let currTheme = state.themes[currThemeName];

        if (!currTheme) {
            console.log("Erorr: '" + currThemeName + "' is not a theme");
            currThemeName = "default";
            currTheme = state.themes[currThemeName];
            // return;
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
