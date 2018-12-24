const state = {
    currentTheme: "default",
    themes: {}
};

const getters = {
    getCurrentTheme: state => {
        return state.currentTheme;
    }
};

const mutations =  {

};

const actions = {
    populateThemes() {
        console.log("populating themes");
        // TODO: this will be done soon, gotta do all the API calls here
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
