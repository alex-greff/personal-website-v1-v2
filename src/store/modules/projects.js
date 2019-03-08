import Vue from 'vue';

import { BACKEND_SERVER_ADDRESS } from '../../constants/backendServer';
import { PROJECT_ITEMS } from '../../constants/projectItems';

const state =  {
    projects: {}
};

const getters =  {
    getProjects: (state) => {
        return state.projects;
    },
    getProject: (state) => { // Getter with parameter
        return (projectName) => {
            return state.projects[projectName];
        }
    }, 
};

const mutations = {

};

const actions = {
    populateProjects({ dispatch }) {
        // Get all the projects from the database
        Vue.axios.get('projects')
            .then(res => {
                console.log("Projects get successful", res); // TODO: remove

                // Construct our in-memory projects object
                res.data.projects.forEach(project => {
                    const currData = {};

                    PROJECT_ITEMS.forEach(PROJECT_ITEM => {
                        currData[PROJECT_ITEM] = project[PROJECT_ITEM];
                    });

                    // Append the backend server address to the thumbnail image so the front end
                    // knows where to access it
                    const thumbnailImage = currData['thumbnailImage'];
                    if (thumbnailImage) {
                        currData['thumbnailImage'] = `${BACKEND_SERVER_ADDRESS}/${thumbnailImage}`.replace('\\', '/');
                    }

                    const galleryImages = currData['galleryImages'];
                    if (galleryImages) {
                        const newGalleryImages = {};

                        Object.entries(galleryImages).forEach(([ID, path]) => {
                            newGalleryImages[ID] = `${BACKEND_SERVER_ADDRESS}/${path}`.replace('\\', '/');
                        });

                        currData['galleryImages'] = newGalleryImages;
                    }

                    Vue.set(state.projects, project.name, currData);
                });
            });
    }
};

export default {
    state, 
    mutations,
    actions,
    getters
}