import Vue from 'vue';

import { PROJECT_ITEMS } from '../../constants/projectItems'; // TODO: I dont using this for iterating
import update from 'immutability-helper';

import * as actionTypes from "@/store/types/actionTypes";
import * as getterTypes from "@/store/types/getterTypes";
import * as mutationTypes from "@/store/types/mutationTypes";

// -----------------------
// --- Check Functions ---
// -----------------------

const _projectExists = (i_oState, i_sProjectName) => {
    if (!i_oState[i_sProjectName]) {
        throw `Error: project '${i_sProjectName}' does not exist`;
    }
}

const _projectDoesNotExist = (i_oState, i_sProjectName) => {
    if (i_oState[i_sProjectName]) {
        throw `Error: project '${i_sProjectName}' exists already`;
    }
}

// -------------------
// --- Store Setup ---
// -------------------

const state =  {
    
};

const getters =  {
    [getterTypes.GET_ALL_PROJECTS]: (i_oState) => {
        return i_oState;
    },
    [getterTypes.GET_PROJECT]: (i_oState) => { // Getter with a parameter
        return (i_sProjectName) => {
            return i_oState[i_sProjectName];
        }
    }, 
};

const mutations = {
    [mutationTypes.ADD_PROJECT]: (i_oState, i_oPayload) => {
        const { name, data, override } = i_oPayload;

        if (!override) {
            _projectDoesNotExist(i_oState, name);
        }

        // Add the project
        Vue.set(i_oState, name, data);
    },
    [mutationTypes.REMOVE_PROJECT]: (i_oState, i_oPayload) => {
        const { name } = i_oPayload;

        _projectExists(i_oState, name);

        // Remove the project
        Vue.delete(i_oState, name);
    },
    [mutationTypes.EDIT_PROJECT]: (i_oState, i_oPayload) => {
        const { name, data } = i_oPayload;

        _projectExists(i_oState, name);

        const oProjectData = i_oState[name];
        const oUpdatedProjectData = update(oProjectData, {
            $merge: data
        });

        // Edit the project
        Vue.set(i_oState, name, oUpdatedProjectData);
    }
};

const actions = {
    // Retrieves the project data from the server
    [actionTypes.POPULATE_PROJECTS]: async ({ dispatch }) => {
        try {
            // Get all the projects from the database
            const res = await Vue.axios.get('/api/projects');

            console.log("Projects get successful", res); // TODO: remove

            // Construct our in-memory projects object
            res.data.projects.forEach(project => {
                // TODO: I can probably rewrite this with reduce
                const currData = {};
                Object.entries(project).forEach(([field, value]) => {
                    // We don't need the _id field
                    if (field === "_id") {
                        return;
                    }

                    currData[field] = value;
                });

                // TODO: this parsing really shouldn't be done here
                // ...the server should return a full, serialized URL

                // Append the backend server address to the thumbnail image so the front end
                // knows where to access it
                const thumbnailImage = currData['thumbnailImage'];
                if (thumbnailImage) {
                    currData['thumbnailImage'] = `/${thumbnailImage}`.replace('\\', '/');
                }

                const galleryImages = currData['galleryImages'];
                if (galleryImages) {
                    const newGalleryImages = {};

                    Object.entries(galleryImages).forEach(([ID, path]) => {
                        newGalleryImages[ID] = `/${path}`.replace('\\', '/');
                    });

                    currData['galleryImages'] = newGalleryImages;
                }

                // Add the project to the store
                dispatch(actionTypes.ADD_PROJECT, {
                    name: project.name, 
                    data: currData,
                    override: true
                });
            });
        } catch(err) {
            console.error("Unabled to retrieve projects from server:\n", err);
        }
    },
    // Adds a new project
    [actionTypes.ADD_PROJECT]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.ADD_PROJECT, i_oPayload);
    },
    // Removes a project
    [actionTypes.REMOVE_PROJECT]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.REMOVE_PROJECT, i_oPayload);
    },
    // Edits a project
    [actionTypes.EDIT_PROJECT]: ({commit}, i_oPayload) => {
        commit(mutationTypes.EDIT_PROJECT, i_oPayload);
    }
};

export default {
    state, 
    mutations,
    actions,
    getters
}