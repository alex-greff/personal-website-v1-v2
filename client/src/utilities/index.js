import { BREAKPOINT_PHONE, BREAKPOINT_TAB_PORT, BREAKPOINT_TAB_LAND, BREAKPOINT_BIG_DESKTOP } from "@/constants/breakpoints";

/**
 * Returns if the given screen width is inside the given breakpoint.
 * 
 * @param {String} i_sBreakpointName The breakpoint name.
 * @param {Number} i_nScreenWidth The screen width.
 */
export const isInBreakpoint = (i_sBreakpointName, i_nScreenWidth) => {
    switch (i_sBreakpointName) {
        case "phone":
            return i_nScreenWidth >= 0 && i_nScreenWidth <= BREAKPOINT_PHONE;
        case "tab-port":
            return i_nScreenWidth > BREAKPOINT_PHONE && i_nScreenWidth <= BREAKPOINT_TAB_PORT;
        case "tab-land":
            return i_nScreenWidth > BREAKPOINT_TAB_PORT && i_nScreenWidth <= BREAKPOINT_TAB_LAND;
        case "normal":
            return i_nScreenWidth > BREAKPOINT_TAB_LAND && i_nScreenWidth < BREAKPOINT_BIG_DESKTOP;
        case "desktop":
            return i_nScreenWidth >= BREAKPOINT_BIG_DESKTOP;
        default:
            throw `Error: breakpoint '${i_sBreakpointName}' does not exist`;
    }
};

/**
 * Joins all the classnames together into a valid classnames string and filters out any undefined values.
 * This is used for the common classname injection passthrough pattern that is used in many components.
 * 
 * @param  {...any} i_aClassnames The classnames to join.
 */
export const injectClasses = (...i_aClassnames) => {
    // Remove any undefined indicies
    const i_aSerialized = i_aClassnames.filter(i_sClassname => !!i_sClassname);

    return i_aSerialized.join(" ");
};

/**
 * Returns if the given css custom properties name is valid.
 * E.g. --my-custom-prop-name
 * 
 * @param {String} i_sCSSVarName The custom property.
 */
export const isValidCSSVar = (i_sCSSVarName) => {
    return /^--([\w\d]+-)*([\w\d]+?)$/.test(i_sCSSVarName);
};

/**
 * Returns if the given object is empty.
 * 
 * @param {Object} i_oObj The object.
 */
export const isObjectEmpty = (i_oObj) => {
    return Object.entries(i_oObj).length === 0 && i_oObj.constructor === Object;
};


/**
 * Saves a value to a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String} i_sPropertyValue The value to set the property to.
 * @param {String | HTMLElement} [i_el] (Optional) The element or selector for the element.
 */
export const saveCSSProperty = (i_sPropertyName, i_sPropertyValue, i_el = null) => {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);
    // Set the custom property
    el.style.setProperty(i_sPropertyName, i_sPropertyValue);
}

/**
 * Removes a css property.
 * 
 * @param {Stirng} i_sPropertyName The name of the property.
 * @param {String | HTMLElement} [i_el] (Optional) The element or selector for the element.
 */
export const removeCSSProperty = (i_sPropertyName, i_el = null) => {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);
    // Remove the custom property
    el.style.removeProperty(i_sPropertyName);
}

/**
 * Gets the value of a css property.
 * 
 * @param {String} i_sPropertyName The name of the property.
 * @param {String | HTMLElement} [i_el] (Optional) The element or selector for the element.
 */
export const getCSSProperty = (i_sPropertyName, i_el = null) => {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);
    // Set the custom property
    return el.style.getPropertyValue(i_sPropertyName);
}

// Helper function for setCSSProperty, removeCSSPropery and getCSSProperty
function serializeInputEl(i_el) {
    if (i_el && isElement(i_el)) {
        // Return the element since it's already one
        return i_el;
    } else if (i_el) {
        // Select the element
        return document.querySelector(i_el);
    } else {
        // Return root
        return document.documentElement;
    }
}

/**
 * Returns a capitalized version of a given word.
 * 
 * @param {*} i_sStr The word.
 */
export const capitalize = (i_sWord) => {
    return i_sWord.charAt(0).toUpperCase() + i_sWord.slice(1);
}

/**
 * Returns a decapitalized version of a given word.
 * 
 * @param {*} i_sStr The word.
 */
export const decapitalize = (i_sWord) => {
    return i_sWord.charAt(0).toLowerCase() + i_sWord.slice(1);
}

//Returns true if it is a DOM node
export function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
}
  
//Returns true if it is a DOM element    
function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

/**
 * Converts the given number of rems into pixels/
 * 
 * @param {Number} i_nRem The number of rems
 */
function convertRemToPixels(i_nRem) {    
    return i_nRem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// Public API export
export default {
    isInBreakpoint,
    injectClasses,
    isValidCSSVar,
    isObjectEmpty,
    saveCSSProperty,
    removeCSSProperty,
    getCSSProperty,
    capitalize,
    decapitalize,
    isNode,
    isElement,
    convertRemToPixels
};