import Vue from 'vue';
import Color from "color";
import Utilities from "@/utilities";
import { defaultTheme } from '@/constants/defaultTheme';
import update from 'immutability-helper';

import { getterTypes, mutationTypes, actionTypes } from '@/store/types';
import { subSections, propertyVariations, baseProperties } from "@/themes/definitions";

// -----------------------
// --- Check Functions ---
// -----------------------

const _themeExists = (i_oState, i_sThemeName) => {
    if (!i_oState.themes[i_sThemeName]) {
        throw `Error: theme '${i_sThemeName}' does not exist`;
    }
};

const _themeDoesNotExist = (i_oState, i_sThemeName) => {
    if (i_oState.themes[i_sThemeName]) {
        throw `Error: theme '${i_sThemeName}' already exists`;
    }
};

const _namespaceExists = (i_oState, i_sNamespaceID) => {
    if (!i_oState.namespaces[i_sNamespaceID]) {
        throw `Error: namespace '${i_sNamespaceID}' does not exist`;
    }
};

const _namespaceDoesNotExist = (i_oState, i_sNamespaceID) => {
    if (i_oState.namespaces[i_sNamespaceID]) {
        throw `Error: namespace '${i_sNamespaceID}' already exists`;
    }
};

const _validateTemplate = (i_oTemplate) => {
    // Checks
    if (!i_oTemplate.id) {
        throw new Error("Error: template must have and id");
    }
    if (!i_oTemplate.BASE) {
        throw new Error(`Error: template '${i_oTemplate.id}' must contain BASE`);
    }

    // Make sure all base properties are provided in the template
    const aBaseDiff = Utilities.difference(baseProperties, Object.keys(i_oTemplate.BASE));
    if (aBaseDiff.length > 0) {
        const sMissingBaseStr = aBaseDiff.join(" ");
        throw new Error(`Error: template '${i_oTemplate.id}' is missing base properties: ${sMissingBaseStr}`);
    }

    Object.entries(i_oTemplate.BASE).forEach(([i_sPropName, i_oVariations]) => {
        const aBasePropDiff = Utilities.difference(propertyVariations, Object.keys(i_oVariations));
        
        if (aBasePropDiff.length > 0) {
            const sMissingBasePropsStr = aBasePropDiff.join(" ");
            throw new Error(`Error: template '${i_oTemplate.id}' base property '${i_sPropName}' is missing variations: ${sMissingBasePropsStr}`);
        }
    });
};


// ------------------------
// --- Helper functions ---
// ------------------------

const _generateThemeFromTemplate = (i_oTemplate) => {
    // Make sure the template is valid
    _validateTemplate(i_oTemplate);

    // Compute the base 
    let oBaseProperties = _generatePropertyObject("BASE", i_oTemplate.BASE);

    // Populate base properties
    let oProperties = { ...oBaseProperties };

    const oSubsections = (i_oTemplate.subSections) ? i_oTemplate.subSections : {};
    // Populate subsection properties, if there are any
    oProperties = Object.entries(oSubsections).reduce(
        (i_oPropsAccumulator, [i_sSectionName, i_sSectionProps])=> {
            return {
                ...i_oPropsAccumulator,
                ..._generatePropertyObject(i_sSectionName, i_oTemplate.BASE), // Apply the base properties for the section
                ..._generatePropertyObject(i_sSectionName, i_sSectionProps, ) // Apply the custom overrides/additions for the secion
            };
        }, oProperties
    );

    // Populate the remaining sub sections that the theme missed
    const aSubSectionsDiff = Utilities.difference(subSections, Object.keys(oSubsections));
    oProperties = aSubSectionsDiff.reduce(
        (i_oPropsAccumulator, i_sSubSection) => {
            return {
                ...i_oPropsAccumulator,
                ..._generatePropertyObject(i_sSubSection, i_oTemplate.BASE)
            };
        }, oProperties
    );
    
    // Construct theme object
    let oTheme = {
        id: i_oTemplate.id,
        properties: { ...oProperties }
    };

    return oTheme;
};

const _generatePropertyObject = (i_sSectionName, i_oTemplateSection) => {
    // Add in the new styles
    let oProperties = Object.entries(i_oTemplateSection).reduce(
        (i_oPropsAccumulator, [i_sPropName, i_oPropVariations]) => {
            // Expand out the property variations
            const oExpandedPropertyVariations = _expandPropVariations(i_sSectionName, i_sPropName, i_oPropVariations);

            return {
                ...i_oPropsAccumulator,
                ...oExpandedPropertyVariations
            };
        }, 
        {}
    );

    return oProperties;
};

const _expandPropVariations = (i_sSectionName, i_sPropName, i_oPropVariations) => {
    const oExpanded = Object.entries(i_oPropVariations).reduce(
        (i_oAccumulator, [i_sVariationName, i_sVariationValue]) => {
            // Generate the entry item
            const sPropertyKey = `--${i_sSectionName}___${i_sPropName}--${i_sVariationName}`;
            const sPropertyVal = _convertColorToStringForm(i_sVariationValue);

            return {
                ...i_oAccumulator,
                [sPropertyKey]: sPropertyVal
            };
        },
        {}
    );

    return oExpanded;
};

const _convertColorToStringForm = (i_sColor) => {
    const aColorRgb = Color(i_sColor).rgb().array();
    const sColorString = aColorRgb.join(", ");

    return sColorString;
};

// -------------------
// --- Store Setup ---
// -------------------

const state = {
    themes: {}, // themeID: { _id: String, colors: { --color-page-bg: "XX, XX, XX" }}
    namespaces: {}
};

const getters = {
    // Theme getters
    [getterTypes.GET_ALL_THEMES]: (i_oState) => {
        return i_oState.themes;
    },
    [getterTypes.GET_THEME]: (i_oState) => {
        return (i_sThemeID) => {
            return i_oState.themes[i_sThemeID];
        }
    },
    // Namespace getters
    [getterTypes.GET_ALL_NAMESPACES]: (i_oState) => {
        return i_oState.namespaces;
    },
    [getterTypes.GET_NAMESPACE]: (i_oState) => {
        return (i_sNamespaceID) => {
            return i_oState.namespaces[i_sNamespaceID];
        }
    }
};

const mutations = {
    // Theme mutations
    [mutationTypes.ADD_THEME]: (i_oState, i_oPayload) => {
        const { name, properties, override } = i_oPayload;

        if (!override) {
            _themeDoesNotExist(i_oState, name);
        }

        const oThemeData = {
            name,
            properties: { ...properties }
        };

        // Add the theme
        Vue.set(state.themes, name, oThemeData);
    },
    [mutationTypes.REMOVE_THEME]: (i_oState, i_oPayload) => {
        const { name } = i_oPayload;

        _themeExists(i_oState, name);

        // Remove the theme
        Vue.delete(i_oState.themes, name)
    },
    [mutationTypes.EDIT_THEME]: (i_oState, i_oPayload) => {
        const { name, properties } = i_oPayload;

        _themeExists(i_oState, name);

        const oThemeData = i_oState.themes[name];
        const oUpdateThemeData = update(oThemeData, {
            properties: { $merge: properties }
        });

        // Update the theme's properties
        Vue.set(i_oState.themes, name, oUpdateThemeData);
    },
    // Namespace mutations
    [mutationTypes.ADD_NAMESPACE]: (i_oState, i_oPayload) => {
        const { name, targetTheme, override } = i_oPayload;

        if (!override) {
            _namespaceDoesNotExist(i_oState, name);
        }

        // Add the namespace
        Vue.set(i_oState.namespaces, name, targetTheme);
    },
    [mutationTypes.REMOVE_NAMESPACE]: (i_oState, i_oPayload) => {
        const { name } = i_oPayload;

        _namespaceExists(i_oState, name);

        // Remove the namespace
        Vue.delete(i_oState.namespaces, name);
    },
    [mutationTypes.EDIT_NAMESPACE]: (i_oState, i_oPayload) => {
        const { name, targetTheme } = i_oPayload;

        _namespaceExists(i_oState, name);

        // Edit the theme target        
        Vue.set(i_oState.namespaces, name, targetTheme);
    }
};

const actions = {
    // Retrieves tab data from the server
    [actionTypes.POPULATE_THEMES]: async ({ dispatch }) => {
        // Load the offline default theme just in case the backend server cannot be connected to
        dispatch(actionTypes.ADD_THEME, { ...defaultTheme, override: true });

        try {
            // Get themes from the database
            const res = await Vue.axios.get('/api/themes');

            console.log("Themes get sucessful", res); // TODO: remove

            // Construct our in-memory themes object
            res.data.themes.forEach(theme => {
                const currData = {
                    name: theme.name,
                    properties: {
                        ...theme.properties
                    }
                };

                // Add the theme
                dispatch(actionTypes.ADD_THEME, { ...currData, override: true });
            });
        } catch(err) {
            console.error("Unable to retrieve themes from server:\n", err);
        }
    },
    // Theme actions
    [actionTypes.ADD_THEME]: ({ commit }, i_oPayload) => {        
        commit(mutationTypes.ADD_THEME, i_oPayload);
    },
    [actionTypes.REMOVE_THEME]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.REMOVE_THEME, i_oPayload);
    },
    [actionTypes.EDIT_THEME]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.EDIT_THEME, i_oPayload);
    },
    // Namespace actions
    [actionTypes.ADD_NAMESPACE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.ADD_NAMESPACE, i_oPayload);
    },
    [actionTypes.REMOVE_NAMESPACE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.REMOVE_NAMESPACE, i_oPayload);
    },
    [actionTypes.EDIT_NAMESPACE]: ({ commit }, i_oPayload) => {
        commit(mutationTypes.EDIT_NAMESPACE, i_oPayload);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
