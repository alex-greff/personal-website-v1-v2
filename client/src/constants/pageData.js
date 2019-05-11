import Home from '@/views/Home.vue'
import Projects from '@/views/Projects/Projects.vue';
import ProjectDetails from '@/views/ProjectDetails/ProjectDetails.vue';
import Music from '@/views/Music.vue';
import Experience from '@/views/Experience/Experience.vue';
import Contact from '@/views/Contact.vue';
import About from '@/views/About/About.vue';
import NotFound from '@/views/404.vue';

export const pageData = {
    navPageOrder: ["home", "projects", "experience", "music", "about", "contact"],
    pages: {
        home: {
            name: "home",
            route: {
                path: '/', name: 'home', component: Home
            },
            routerLink: { 
                name: 'home', path: "/", exact: true 
            },
            theme: {
                namespace: "route_home",
                targetTheme: "blue"
            }
        },
        projects: {
            name: "projects",
            route: { 
                path: '/projects', name: 'projects', component: Projects, 
            },
            routerLink: {
                name: 'projects', path: "/projects", exact: false
            },
            theme: {
                namespace: "route_project",
                targetTheme: "red"
            }
        },
        projectDetails: {
            name: "projectDetails",
            route: {
                path: '/projects/:id', name: 'projectDetails', component: ProjectDetails
            },
            routerLink: {
                name: 'projects:id', path: "/projects:id", exact: false
            },
            theme: {
                namespace: "route_projectItem",
                targetTheme: "red"
            }
        },
        experience: {
            name: "experience",
            route: { 
                path: '/experience', name: 'experience', component: Experience,
                children: [
                    { name: 'experience_item', path: ':id', component: Experience } // TODO: make dynamic???
                ]
            },
            routerLink: {
                name: 'experience', path: "/experience", exact: false
            },
            theme: {
                namespace: "route_experience",
                targetTheme: "cyan"
            }
        },
        music: {
            name: "music",
            route: { 
                path: '/music', name: 'music', component: Music
            },
            routerLink: {
                name: 'music', path: "/music", exact: false
            },
            theme: {
                namespace: "route_music",
                targetTheme: "orange"
            }
        },
        about: {
            name: "about",
            route: { 
                path: '/about', name: 'about', component: About 
            },
            routerLink: {
                name: 'about', path: "/about", exact: false
            },
            theme: {
                namespace: "route_about",
                targetTheme: "green"
            }
        },
        contact: {
            name: "contact",
            route: { 
                path: '/contact', name: 'contact', component: Contact 
            },
            routerLink: {
                name: "contact", path: "/contact", exact: false
            },
            theme: {
                namespace: "route_contact",
                targetTheme: "purple"
            }
        }
    },
    miscRoutes: [
        { path: '/home', redirect: { name: 'home' }}, // Redirect /home to home page
        { path: '*', component: NotFound } // 404 redirect
    ]
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

const _getPageRoutes = (i_sPageList) => {
    return i_sPageList.reduce((i_sAccumulator, i_sCurrPageName) => {
        const sCurrRouteData = [ getPageRoute(i_sCurrPageName) ];

        return [
            ...i_sAccumulator,
            ...sCurrRouteData
        ];
    }, []);
};

const _getRouterRoutes = (i_sPageList) => {
    return i_sPageList.reduce((i_sAccumulator, i_sCurrPageName) => {
        const oCurrRouterLink = getRouterLink(i_sCurrPageName);

        return [
            ...i_sAccumulator,
            oCurrRouterLink
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

// -------------------
// --- Page routes ---
// -------------------

export const getPageRoute = (i_sPageName) => {
    return pageData.pages[i_sPageName].route;
};

export const getAllPageRoutes = () => {
    return pageData.miscRoutes.reduce((i_sAccumulator, i_oCurrRoute) => {
        return [
            ...i_sAccumulator,
            i_oCurrRoute
        ];
    }, [ ..._getPageRoutes(Object.keys(pageData.pages)) ]);
};

export const getAllNavPageRoutes = () => {
    return _getPageRoutes(this.navPageOrder);
};

// --------------------
// --- Router links ---
// --------------------

export const getRouterLink = (i_sPageName) => {
    return pageData.pages[i_sPageName].routerLink;
};

export const getAllRouterLinks = () => {
    return _getRouterRoutes(Object.keys(pageData.pages));
};

export const getAllNavRouterLinks = () => {
    return _getRouterRoutes(pageData.navPageOrder)
};

export default {
    pageData,
    getPageTheme,
    getAllPageThemes,
    getAllNavPageThemes,
    getPageRoute,
    getAllPageRoutes,
    getAllNavPageRoutes,
    getRouterLink,
    getAllRouterLinks,
    getAllNavRouterLinks,
};