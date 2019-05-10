import Vue from 'vue';

import { getterTypes, mutationTypes, actionTypes } from '@/store/types';

// -------------------
// --- Store Setup ---
// -------------------

const state = {
    // Empty initial state
};

const getters = {
    [getterTypes.GET_ABOUT]: (i_oState) => {
        return i_oState;
    }
};

const mutations = {
    [mutationTypes.SET_ABOUT]: (i_oState, i_oPayload) => {
        const { data } = i_oPayload;

        // Reactively set the object
        Object.entries(data).forEach(([key, val]) => {
            Vue.set(i_oState, key, val);
        })
    }
};

const actions = {
    [actionTypes.POPULATE_ABOUT]: async ({ dispatch }) => {
        try {
            // Get about data
            const res = await Vue.axios.get('/api/about');

            console.log("About get successful", res);
        
            // Construct data object
            const oData = {
                description: res.data.description,
                profileImage: res.data.profileImage,
                links: res.data.links
            };

            // Set about data in the store
            dispatch(actionTypes.SET_ABOUT, {
                data: oData
            });
        } catch(err) {
            console.error("Unabled to retrieve about data from server\n", err);
        }
    },
    // Sets the about data
    [actionTypes.SET_ABOUT]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.SET_ABOUT, i_oPayload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};