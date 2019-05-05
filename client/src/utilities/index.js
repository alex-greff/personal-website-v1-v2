import { BREAKPOINT_PHONE, BREAKPOINT_TAB_PORT, BREAKPOINT_TAB_LAND, BREAKPOINT_BIG_DESKTOP } from "@/constants/breakpoints";

// -----------------------------------------------
// --- Helpers for the helpers (helperception) ---
// -----------------------------------------------

// Serializes an given element
function serializeInputEl(i_el, i_bSelectRoot = false) {
    if (i_el && isElement(i_el)) {
        // Return the element since it's already one
        return i_el;
    } else if (i_el) {
        // Select the element
        return document.querySelector(i_el);
    } else {
        // Return root
        if (i_bSelectRoot) {
            return document.documentElement;
        } else {
            throw new Error(`Error: ${i_el} is an invalid element`);
        }
    }
}


// -----------------------
// --- Utility methods ---
// -----------------------

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
 * Fills and returns an array with sequential numbers from the given start to end values.
 * 
 * @param {Number} i_nStart The start number (inclusive).
 * @param {Number} i_nEnd The end number (inclusive).
 */
export const arrayFillRange = (i_nStart, i_nEnd) => {
    return Array(i_nEnd - i_nStart + 1).fill().map((item, nIndex) => i_nStart + nIndex);
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
    const el = serializeInputEl(i_el, true);
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
    const el = serializeInputEl(i_el, true);
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
    const el = serializeInputEl(i_el, true);
    // Set the custom property
    return el.style.getPropertyValue(i_sPropertyName);
}

export function addClass(i_sClassname, i_el) {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);

    // Add the class
    el.classList.add(i_sClassname);
}

export function removeClass(i_sClassname, i_el) {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);

    // Remove the class
    el.classList.remove(i_sClassname);
}

export function toggleClass(i_sClassname, i_el) {
    // Serialize the input element/query selector/none
    const el = serializeInputEl(i_el);

    // Remove the class
    el.classList.toggle(i_sClassname);
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
export function convertRemToPixels(i_nRem) {    
    return i_nRem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

// ---------------------
// --- Array methods ---
// ---------------------

/**
 * Returns an array containing the intersecting elements of the two arrays.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [5, 10]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const intersection = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => i_aArr2.includes(x));
};

/**
 * Returns the difference elements of the first aray compared to the second array.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [7]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const difference = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => !i_aArr2.includes(x));
};

/**
 * Returns the difference of elements from both arrays.
 * Ex. [5, 7, 10] and [3, 5, 10] returns [7, 3]
 * 
 * @param {Array} i_aArr1 The first array.
 * @param {Array} i_aArr2 The second array.
 */
export const symmetricDifference = (i_aArr1, i_aArr2) => {
    return i_aArr1.filter(x => !i_aArr2.includes(x)).concat(i_aArr2.filter(x => !i_aArr1.includes(x)));
};

/**
 * Get a random floating point number between `min` and `max`.
 * 
 * @param {Number} min - min number
 * @param {Number} max - max number
 * @param {Number} rand - the random generator used
 * @return {Number} a random floating point number
 */
export function getRandomFloat(min, max, rand = Math.random) {
    return rand() * (max - min) + min;
}

/**
 * Get a random integer between `min` and `max`.
 * 
 * @param {Number} min - min number
 * @param {Number} max - max number
 * @param {Number} rand - the random generator used
 * @return {Number} a random integer
 */
export function getRandomInt(min, max, rand = Math.random) {
    return Math.floor(rand() * (max - min + 1) + min);
}

/**
 * Get a random boolean value.
 * 
 * @return {Boolean} a random true/false
 */
export function getRandomBool() {
    return Math.random() >= 0.5;
}

export function randomNormalDist(min=0, max=1, skew=1) {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randomNormalDist(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

/**
 * Returns a promise that resolves after a given amount of time, hence acting like a timeout function in async/await blocks.
 * 
 * @param {} ms The delay in milliseconds before the promise is resolved.
 */
export function timeout(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

// Taken from: https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// The JS version of the SCSS function
export function computeParallelogramClipPath(itemHeight, tiltAngle) {
    const gutterLength = itemHeight / Math.tan(tiltAngle * Math.PI/180);

    // top left, top right, bottom right, bottom left
    return `polygon(${gutterLength}rem 0%, 100% 0%, calc(100% - ${gutterLength}rem) 100%, 0% 100%)`
}

/**
 * Calculates the total running time of a stagger animation with the provided values.
 * 
 * @param {Number} i_nLength The length of each animation.
 * @param {Number} i_nStagger The stagger time.
 * @param {Number} i_nNumItems The number of items being staggered.
 */
export function totalStaggerTime(i_nLength, i_nStagger, i_nNumItems) {
    if (i_nLength <= 0) {
        return 0;
    }

    return i_nLength + (i_nNumItems - 1) * i_nStagger;
}

/**
 * Returns a formatted version of the given date.
 * 
 * @param {Date} i_dDate The date object.
 */
export function getFormattedDate(i_dDate) {
    const month_names = ["January", "Feburary", "March", "April", 
        "May", "June", "July" ,"August","September", "October",
        "November", "December"];
    
    const day = i_dDate.getDate();
    const month_index = i_dDate.getMonth();
    const month = month_names[month_index];
    const year = i_dDate.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

/**
 * Returns a formatted version of the given start date.
 * 
 * @param {Date} i_dStartDate The start date.
 */
export function getFormattedStartDate(i_dStartDate) {
    return (i_dStartDate) ? getFormattedDate(i_dStartDate) : "Unknown";
}

/**
 * Returns a formatted version of the given end date.
 * 
 * @param {Date} i_dEndDate The end date.
 */
export function getFormattedEndDate(i_dEndDate) {
    return (i_dEndDate) ? getFormattedDate(i_dEndDate) : "Present";
}

/**
 * Runs the given functions, if they are defined.
 * 
 * @param {...Function} i_fnFuncs All the functions.
 */
export function runFunctions(...i_fnFuncs) {
    i_fnFuncs.forEach(fnFunc => {
        if (fnFunc) {
            fnFunc();
        }
    });
}

/**
 * Runs the given functions, if they are defined with the given parameters inputted to each.
 * 
 * @param {Array} i_aParams 
 * @param  {...Function} i_fnFuncs 
 */
export function runFunctionsWithParams(i_aParams, ...i_fnFuncs) {
    i_fnFuncs.forEach(fnFunc => {
        if (fnFunc) {
            fnFunc(...i_aParams);
        }
    });
}

/**
 * Preloads the given image into the site.
 * 
 * @param {String} i_sImageSrc The source path to the image.
 */
export function preloadImage(i_sImageSrc) {
    // Preload the image
    new Image().src = i_sImageSrc;
}

/**
 * Generates a unique ID.
 * 
 * @param {String} [i_sPrefix] (Optional) A prefix attached to the unique ID.
 */
export const generateUniqueID = (i_sPrefix = null) => {
    const sPrefixCleaned = (i_sPrefix) ? `${i_sPrefix}-` : "";
    return `${sPrefixCleaned}${(Math.random().toString(36) + Date.now().toString(36)).substr(2, 10)}`;
};

/**
 * Resolves an async call with a minimum loading time. This is to simulate a long(er)
 * loading time even if the server responds quickly. Returns a promise.
 * 
 * @param {Function} i_fnAsyncCall The async function call. Must return a promise.
 * @param {Number} i_nMinDuration The minimum loading duration (ms).
 */
export const runSpoofedAsyncFunc = (i_fnAsyncCall, i_nMinDuration = 1500) => {
    return new Promise(async (resolve, reject) => {
        // State
        let resolveVal;
        let bAsyncCompleted = false;
        let rejectVal;
        let bAsyncRejected = false;
        let bTimeoutCompleted = false;

        // Run async call
        i_fnAsyncCall()
            .then(i_resolveVal => {
                // If async call took longer than the timeout then resolve immediately
                if (bTimeoutCompleted) {
                    resolve(i_resolveVal);
                } 
                // If the timer is still running then store the resolve state
                else {
                    bAsyncCompleted = true;
                    resolveVal = i_resolveVal;
                }
            })
            .catch(i_rejectVal => {
                // If the async call got rejected in a longer time than the timeout then
                // reject immediately
                if (bTimeoutCompleted) {
                    reject(i_rejectVal);
                } 
                // If the timer is still running then store the reject state
                else {
                    bAsyncRejected = true;
                    rejectVal = i_rejectVal;
                }
            });

        // Wait for the timeout to finish
        await timeout(i_nMinDuration);

        // Set timeout state
        bTimeoutCompleted = true;

        // If the async call has been completed then resolve
        if (bAsyncCompleted) {
            resolve(resolveVal);
        } 
        // If the async call has been rejected alreayd then reject accordingly
        else if (bAsyncRejected) {
            reject(rejectVal);
        }
    });
};


/**
 * Sorts a standard items object (i.e. containing name and date information).
 * 
 * @param {Object} i_oItems The object containing all the items data.
 * @param {String} i_sNameKey The accessor for the name field.
 * @param {String} i_sEndDateKey The accessor for the end date field.
 */
export const sortStandardItemsObject = (i_oItems, i_sNameKey = "name", i_sEndDateKey = "endDate") => {
    // Convert items object into an array
    let aSortedItems = Object.values(i_oItems).map(i_oItemData => i_oItemData);

    // Sort the items by date and sub-sorted by name, when needed
    aSortedItems.sort((oItemA, oItemB) => {
        const sNameA = oItemA[i_sNameKey];
        const sEndDateA = oItemA[i_sEndDateKey];
        const sNameB = oItemB[i_sNameKey];
        const sEndDateB = oItemB[i_sEndDateKey];

        // Case 1: both end dates are defined
        if (sEndDateA && sEndDateB) {
            const dEndDateA = new Date(sEndDateA);
            const dEndDateB = new Date(sEndDateB);

            // Case 1a: end dates are the same
            if (dEndDateA.getTime() === dEndDateB.getTime()) {
                // Sort by name
                return (`${sNameA}`).localeCompare(sNameB);
            }
            // Case 1b: end dates are different
            else {
                // Sort by end date
                return dEndDateB - dEndDateA;
            }
        } 
        // Case 2: A's end date is not defined but B's is
        else if (!sEndDateA && sEndDateB) {
            // Sort A in front of B
            return -1;
        } 
        // Case 3: B's end date is not defined by A's is
        else if (sEndDateA && !sEndDateB) {
            // Sort B in front of A
            return 1;
        }
        // Case 4: both end dates are not defined
        else {
            // Sort by name
            return (`${sNameA}`).localeCompare(sNameB);
        }
    });
    
    // Return the sorted items list
    return aSortedItems; 
};

/**
 * Returns a filtered array of the given items array that matches the filter set and show all arguments.
 * 
 * @param {Array} i_aItems The array of items to filter.
 * @param {Boolean} i_bShowAll Indicates if all items should be shown.
 * @param {Set} i_filterSet The set to filter the items array by.
 * @param {String} i_sTagsKey The accessor for the tags field.
 */
export const filterStandardItemsArray = (i_aItems, i_bShowAll, i_filterSet, i_sTagsKey = "tags") => {
    const newItemsFiltered = i_aItems.reduce((acc, item) => {
        const currItem = [];
        
        const bMatchesFilter = Array.from(i_filterSet).every(filterItem => {
            return item[i_sTagsKey].some(tag => tag === filterItem);
        });

        if (i_bShowAll || bMatchesFilter) {
            currItem.push({ ...item });
        }

        return [
            ...acc,
            ...currItem
        ];
    }, []);

    return newItemsFiltered;
};

// Public API export
export default {
    isInBreakpoint,
    injectClasses,
    isValidCSSVar,
    arrayFillRange,
    isObjectEmpty,
    saveCSSProperty,
    removeCSSProperty,
    getCSSProperty,
    addClass,
    removeClass,
    toggleClass,
    capitalize,
    decapitalize,
    isNode,
    isElement,
    convertRemToPixels,
    intersection, 
    difference,
    symmetricDifference,
    getRandomFloat,
    getRandomInt,
    getRandomBool,
    randomNormalDist,
    timeout,
    debounce,
    computeParallelogramClipPath,
    totalStaggerTime,
    getFormattedDate,
    getFormattedStartDate,
    getFormattedEndDate,
    runFunctions,
    runFunctionsWithParams,
    preloadImage,
    generateUniqueID,
    runSpoofedAsyncFunc,
    sortStandardItemsObject,
    filterStandardItemsArray,
};