import Vue from 'vue';
import update from "immutability-helper";
import Utilities from "@/utilities";

import { getterTypes, mutationTypes, actionTypes } from '@/store/types';

// -----------------------
// --- Check Functions ---
// -----------------------

const _artistProfileExists = (i_oState, i_sArtistProfileID) => {
    if (!i_oState[i_sArtistProfileID]) {
        throw `Error: artist profile '${i_sArtistProfileID}' does not exist`;
    }
};

const _artistProfileDoesNotExist = (i_oState, i_sArtistProfileID) => {
    if(i_oState[i_sArtistProfileID]) {
        throw `Error: artist profile '${i_sArtistProfileID}' exists already`;
    }
};


// -------------------
// --- Store Setup ---
// -------------------

const state = {
    // Empty initial state
};

const getters = {
    [getterTypes.GET_ALL_ARTIST_PROFILES]: (i_oState) => {
        return i_oState;
    },
    [getterTypes.GET_ARTIST_PROFILE]: (i_oState) => {
        return (i_sArtistProfileID) => { // Getter with a parameter
            return i_oState[i_sArtistProfileID];
        }
    },
    [getterTypes.GET_ALL_TRACKS]: (i_oState) => {
        return Object.values(i_oState).reduce((acc, artistProfile) => {
            return [
                ...acc,
                ...artistProfile.tracks
            ];
        }, []);
    },
};

const mutations = {
    [mutationTypes.ADD_ARTIST_PROFILE]: (i_oState, i_oPayload) => {
        const { id, data, override } = i_oPayload;

        const sID = (id) ? id : Utilities.generateUniqueID("artist-profile");

        if (!override) {
            _artistProfileDoesNotExist(i_oState, sID);
        }

        // Add the artist profile
        Vue.set(i_oState, sID, data);
    },
    [mutationTypes.REMOVE_ARTIST_PROFILE]: (i_oState, i_oPayload) => {
        const { id } = i_oPayload;

        _artistProfileExists(i_oState, id);

        // Remove the artist profile
        Vue.delete(i_oState, id);
    },
    [mutationTypes.EDIT_ARTIST_PROFILE]: (i_oState, i_oPayload) => {
        const { id, data } = i_oPayload;

        _artistProfileExists(i_oState, id);

        const oArtistProfile = i_oState[id];
        let oUpdatedArtistProfile = update(oArtistProfile, {
            $merge: data
        });

        // Deal with track update manually
        if (data["tracks"]) {
            oUpdatedArtistProfile = update(oUpdatedArtistProfile, {
                tracks: { $set: data["tracks"] }
            });
        }

        // Edit the artist profile
        Vue.set(i_oState, id, oUpdatedArtistProfile);
    }
};

const actions = {
    [actionTypes.POPULATE_ARTIST_PROFILES]: async ({ dispatch }) => {
        try {
            // Get artist profile data
            const res = await Vue.axios.get('/api/music/artists');

            res.data.artistProfiles.forEach(artistProfile => {
                const currData = Object.entries(artistProfile).reduce((acc, [field, value]) => {
                    return {
                        ...acc,
                        [field]: value
                    };
                }, {});

                dispatch(actionTypes.ADD_ARTIST_PROFILE, {
                    data: currData,
                    override: true
                });
            })
        } catch(err) {
            console.error("Unable to retrieve artist profiles from server\n", err);
        }
    },
    [actionTypes.ADD_ARTIST_PROFILE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.ADD_ARTIST_PROFILE, i_oPayload);
    },
    [actionTypes.REMOVE_ARTIST_PROFILE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.REMOVE_ARTIST_PROFILE, i_oPayload);
    },
    [actionTypes.EDIT_ARTIST_PROFILE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.EDIT_ARTIST_PROFILE, i_oPayload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};