import Vue from 'vue';
import update from 'immutability-helper';
import Utilities from "@/utilities";

import { getterTypes, mutationTypes, actionTypes } from '@/store/types';


// -----------------------
// --- Check Functions ---
// -----------------------

const _experienceExists = (i_oState, i_sExperienceID) => {
    if (!i_oState[i_sExperienceID]) {
        throw `Error: experience item '${i_sExperienceID}' does not exist`;
    }
};

const _experienceDoesNotExist = (i_oState, i_sExperienceID) => {
    if(i_oState[i_sExperienceID]) {
        throw `Error: experience item '${i_sExperienceID}' exists already`;
    }
};


// -------------------
// --- Store Setup ---
// -------------------

const state =  {
    // Empty initial state
};

const getters = {
    [getterTypes.GET_ALL_EXPERIENCE]: (i_oState) => {
        return i_oState;
    },
    [getterTypes.GET_EXPERIENCE]: (i_oState) => {
        return (i_sExperienceID) => { // Getter with a parameter
            return i_oState[i_sExperienceID];
        }
    },
};

const mutations = {
    [mutationTypes.ADD_EXPERIENCE]: (i_oState, i_oPayload) => {
        const { id, data, override } = i_oPayload;

        const sID = (id) ? id : Utilities.generateUniqueID("experience-item");

        if (!override) {
            _experienceDoesNotExist(i_oState, sID);
        }

        // Add the experience item
        Vue.set(i_oState, sID, data);
    },
    [mutationTypes.REMOVE_EXPERIENCE]: (i_oState, i_oPayload) => {
        const { id } = i_oPayload;

        _experienceExists(i_oPayload, id);

        // Remove the experience item
        Vue.delete(i_oState, id);
    },
    [mutationTypes.EDIT_EXPERIENCE]: (i_oState, i_oPayload) => {
        const { id, data } = i_oPayload;

        _experienceExists(i_oState, id);

        const oExperienceData = i_oState[id];
        let oUpdatedExperienceData = update(oExperienceData, {
            $merge: data
        });

        // Deal with tag update manually
        if (data["tags"]) {
            oUpdatedExperienceData = update(oUpdatedExperienceData, {
                tags: { $set: data["tags"] }
            });
        }

        // Edit the experience item
        Vue.set(i_oState, id, oUpdatedExperienceData);
    }
};

const actions = {
    [actionTypes.POPULATE_EXPERIENCE]: async ({ dispatch }) => {
        try {
            // Get all experience items from the server
            const res = await Vue.axios.get('/api/experience');

            console.log("Experience get successful", res); // TODO: remove

            // Construct in-memory experience object
            res.data.experience.forEach(experience => {
                const currData = Object.entries(experience).reduce((acc, [field, value]) => {
                    return {
                        ...acc,
                        [field]: value
                    };
                }, {});

                // Add the experience item to the store
                dispatch(actionTypes.ADD_EXPERIENCE, {
                    data: currData,
                    override: true
                });
            });
        } catch(err) {
            console.error("Unabled to retrieve experience items from server\n", err);
        }
    },
    // Adds an experience item
    [actionTypes.ADD_EXPERIENCE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.ADD_EXPERIENCE, i_oPayload);
    },
    // Removes an experience item
    [actionTypes.REMOVE_EXPERIENCE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.REMOVE_EXPERIENCE, i_oPayload);
    },
    // Edits an experience item
    [actionTypes.EDIT_EXPERIENCE]: ({commit}, i_oPayload) => {
        commit(mutationTypes.EDIT_EXPERIENCE, i_oPayload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};