export const pageData = {
    navPageOrder: ["home", "about", "projects", "experience", "contact"],
    pages: {
        home: {
            name: "home",
            link: "home",
            theme: {
                namespace: "section_home",
                targetTheme: "blue"
            }
        },
        about: {
            name: "about",
            link: "about",
            theme: {
                namespace: "section_about",
                targetTheme: "cyan"
            }
        },
        projects: {
            name: "projects",
            link: "projects",
            theme: {
                namespace: "section_projects",
                targetTheme: "red"
            }
        },
        experience: {
            name: "experience",
            link: "experience",
            theme: {
                namespace: "section_experience",
                targetTheme: "lime"
            }
        },
        contact: {
            name: "contact",
            link: "contact",
            theme: {
                namespace: "section_contact",
                targetTheme: "purple"
            }
        }
    }
};

const _getPageThemes = (i_sPageList) => {
    return i_sPageList.reduce((i_oAccumulator, i_sCurrPageName) => {
        // Get the theme item for this page
        const oCurrPageTheme = getPageTheme(i_sCurrPageName);
        // Make sure there is associated theme data
        const oThemeItem = (oCurrPageTheme) ? { [oCurrPageTheme.namespace]: oCurrPageTheme.targetTheme } : {};

        return {
            ...i_oAccumulator,
            ...oThemeItem
        };
    }, {});
};

const _getPageLinks = (i_sPageList) => {
    return i_sPageList.reduce((i_sAccumulator, i_sCurrPageName) => {
        const sCurrLinkData = [ getPageLink(i_sCurrPageName) ];

        return [
            ...i_sAccumulator,
            ...sCurrLinkData
        ];
    }, []);
};

// ------------------
// --- Page theme ---
// ------------------

export const getPageTheme = (i_sPageName) => {
    // Get the current page's theme data, if any
    return pageData.pages[i_sPageName].theme;
};

export const getAllPageThemes = () => {
    return _getPageThemes(Object.keys(pageData.pages));
};

export const getAllNavPageThemes = () => {
    return _getPageThemes(pageData.navPageOrder);
}

// ------------------
// --- Page links ---
// ------------------

export const getPageLink = (i_sPageName) => {
    return pageData.pages[i_sPageName].link;
};

export const getAllPageLinks = () => {
    return _getPageLinks(Object.keys(pageData.pages));
};

export const getAllNavPageLinks = () => {
    return _getPageLinks(pageData.navPageOrder);
};


export default {
    pageData,
    getPageTheme,
    getAllPageThemes,
    getAllNavPageThemes,
    getPageLink,
    getAllPageLinks,
    getAllNavPageLinks
};