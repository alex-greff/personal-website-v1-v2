import Vue from 'vue';
import update from 'immutability-helper';

import * as actionTypes from "@/store/types/actionTypes";
import * as getterTypes from "@/store/types/getterTypes";
import * as mutationTypes from "@/store/types/mutationTypes";

// -------------------
// --- Store Setup ---
// -------------------

const state = {
    autoThemeEnabled: true,
    currAutoThemeNamespace: null,
    currStaticThemeNamespace: null,
};

const getters = {
    // Auto theme getter
    [getterTypes.IS_AUTO_THEME_ENABLED]: (i_oState) => {
        return i_oState.autoThemeEnabled;
    },
    [getterTypes.GET_CURRENT_THEME_NAMESPACE]: (i_oState) => {
        const { autoThemeEnabled, currAutoThemeNamespace, currStaticThemeNamespace } = i_oState;
        return (autoThemeEnabled) ? currAutoThemeNamespace : currStaticThemeNamespace;
    },
    [getterTypes.GET_CURRENT_AUTO_THEME_NAMESPACE]: (i_oState) => {
        return i_oState.currAutoThemeNamespace;
    },
    [getterTypes.GET_CURRENT_STATIC_THEME_NAMESPACE]: (i_oState) => {
        return i_oState.currStaticThemeNamespace;
    }
};

const mutations = {
    // Auto theme mutation
    [mutationTypes.SET_AUTO_THEME_ENABLED]: (i_oState, i_bEnabled) => {
        // Set the auto theme enabled state
        Vue.set(i_oState, "autoThemeEnabled", i_bEnabled);
    },
    [mutationTypes.SET_CURRENT_AUTO_THEME_NAMESPACE]: (i_oState, i_oPayload) => {
        // Set the auto theme namespace
        Vue.set(i_oState, "currAutoThemeNamespace", i_oPayload.namespace);
    },
    [mutationTypes.SET_CURRENT_STATIC_THEME_NAMESPACE]: (i_oState, i_oPayload) => {
        // Set the static theme namespace
        Vue.set(i_oState, "currStaticThemeNamespace", i_oPayload.namespace);
    }
};

const actions = {
    // Auto theme action
    [actionTypes.SET_AUTO_THEME_ENABLED]: ({ commit }, i_bEnabled) => {
        commit(mutationTypes.SET_AUTO_THEME_ENABLED, i_bEnabled);
    },
    [actionTypes.SET_CURRENT_AUTO_THEME_NAMESPACE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.SET_CURRENT_AUTO_THEME_NAMESPACE, i_oPayload);
    },
    [actionTypes.SET_CURRENT_STATIC_THEME_NAMESPACE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.SET_CURRENT_STATIC_THEME_NAMESPACE, i_oPayload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}