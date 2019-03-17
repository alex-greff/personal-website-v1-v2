import Home from '../views/Home.vue'
import Projects from '../views/Projects/Projects.vue';
import ProjectPage from '../views/Projects/ProjectPage.vue';
import Music from '../views/Music.vue';
import Experience from '../views/Experience.vue';
import Contact from '../views/Contact.vue';
import About from '../views/About.vue';
import NotFound from '../views/404.vue';

export const pageData = {
    pageOrder: ["home", "projects", "experience", "music", "about", "contact"],
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
                children: [
                    { path: ':id', component: ProjectPage } // TODO: make dynamic???
                ]
            },
            routerLink: {
                name: 'projects', path: "/projects", exact: false
            },
            theme: {
                namespace: "route_project",
                targetTheme: "red"
            }
        },
        experience: {
            name: "experience",
            route: { 
                path: '/experience', name: 'experience', component: Experience,
                children: [
                    { path: ':id', component: Experience } // TODO: make dynamic???
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

export const getPageThemes = () => {
    return pageData.pageOrder.reduce((i_oAccumulator, i_sCurrPageName) => {
        // Get the current page's theme data, if any
        const oCurrPageTheme = pageData.pages[i_sCurrPageName].theme;
        // Make sure there is associated theme data
        const oThemeItem = (oCurrPageTheme) ? { [oCurrPageTheme.namespace]: oCurrPageTheme.targetTheme } : {};

        return {
            ...i_oAccumulator,
            ...oThemeItem
        };
    }, {});
};

export const getPageRoutes = () => {
    return pageData.pageOrder.reduce((i_sAccumulator, i_sCurrPageName) => {
        const sCurrRouteData = [{ ...pageData.pages[i_sCurrPageName].route }];

        return [
            ...i_sAccumulator,
            ...sCurrRouteData
        ];
    }, []);
};

export const getAllRoutes = () => {
    return pageData.miscRoutes.reduce((i_sAccumulator, i_oCurrRoute) => {
        return [
            ...i_sAccumulator,
            i_oCurrRoute
        ];
    }, [ ...getPageRoutes() ]);
};

export const getRouterLinks = () => {
    return pageData.pageOrder.reduce((i_sAccumulator, i_sCurrPageName) => {
        const oCurrRouterLink = pageData.pages[i_sCurrPageName].routerLink;

        return [
            ...i_sAccumulator,
            oCurrRouterLink
        ];
    }, []);
};

export default {
    pageData,
    getPageThemes,
    getPageRoutes,
    getAllRoutes,
    getRouterLinks
};