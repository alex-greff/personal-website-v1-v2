import Vue from 'vue';
import update from 'immutability-helper';
import Utilities from "@/utilities";

import { getterTypes, mutationTypes, actionTypes } from '@/store/types';

// -----------------------
// --- Check Functions ---
// -----------------------

const _projectExists = (i_oState, i_sProjectName) => {
    if (!i_oState[i_sProjectName]) {
        throw `Error: project '${i_sProjectName}' does not exist`;
    }
};

const _projectDoesNotExist = (i_oState, i_sProjectName) => {
    if (i_oState[i_sProjectName]) {
        throw `Error: project '${i_sProjectName}' exists already`;
    }
};

// -------------------
// --- Store Setup ---
// -------------------

const state =  {
    // Empty initial state
};

const getters = {
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
        let oUpdatedProjectData = update(oProjectData, {
            $merge: data
        });

        // Deal with gallery image update manually
        if (data["galleryImages"]) {
            oUpdatedProjectData = update(oUpdatedProjectData, {
                galleryImages: { $set: data["galleryImages"] }
            });
        }

        // Deal with links update manually
        if (data["links"]) {
            oUpdatedProjectData = update(oUpdatedProjectData, {
                links: { $set: data["links"] }
            });
        }

        // Deal with tags update manually
        if (data["tags"]) {
            oUpdatedProjectData = update(oUpdatedProjectData, {
                tags: { $set: data["tags"] }
            });
        }

        // Edit the project
        Vue.set(i_oState, name, oUpdatedProjectData);
    }
};

const actions = {
    // Retrieves the project data from the server
    [actionTypes.POPULATE_PROJECTS]: async ({ dispatch }) => {
        try {
            // Get all the projects from the server
            const res = await Vue.axios.get('/api/projects');

            // Construct our in-memory projects object
            res.data.projects.forEach(project => {
                const currData = Object.entries(project).reduce((acc, [field, value]) => {
                    // Don't need the _id field
                    if (field === "_id") {
                        return acc;
                    }

                    return {
                        ...acc,
                        [field]: value
                    };
                }, {});

                const sThumbnailImagePath = currData['thumbnailImage'];
                if (sThumbnailImagePath) {
                    currData['thumbnailImage'] = sThumbnailImagePath;
                    // Preload the thumbnail
                    Utilities.preloadImage(sThumbnailImagePath);
                }

                const galleryImages = currData['galleryImages'];
                if (galleryImages) {
                    const newGalleryImages = {};

                    Object.entries(galleryImages).forEach(([ID, path]) => {
                        const sCurrGalleryImagePath = path;
                        newGalleryImages[ID] = sCurrGalleryImagePath;
                        // Preload the current gallery image
                        Utilities.preloadImage(sCurrGalleryImagePath);
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
    getters,
    mutations,
    actions
};