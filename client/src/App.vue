<template>
    <theme-provider id="app" ref="baseRef" namespace="default" use-root>
        <theme-provider id="app__base" :namespace="currThemeNamespace">
            <block-loader v-if="loading" :is-open="true" :z-index="100" controlled />
            <nav-bar v-if="!loading" ref="navBarRef" animate-in />
            <div v-if="!loading" ref="contentEl" class="content">
                <transition 
                    mode="out-in" 
                    appear
                    @appear="contentAppearAnim"
                    @enter="contentEnterAnim" 
                    @leave="contentLeaveAnim"
                >
                    <router-view></router-view>
                </transition>
            </div>
            <general-footer v-if="!loading" animate-in></general-footer>
            <svg class="svg-def">
                <symbol id="logo-symbol">
                    <path
                        d="m 11.179235,7.310372 -2.7239749,0.1951489 -0.034753,-0.044358 5.2322789,-5.1436935 0.03475,0.044358 z m 0.788388,2.596036 1.423603,-0.063707 C 13.798222,8.9739775 14.24077,8.1058539 14.769801,7.3705088 14.71024,7.3149401 14.21707,7.2307488 13.136088,7.2555925 L 15.426707,2.5441747 C 15.611633,2.1532809 15.998465,1.4155541 16.006837,0.95603813 16.014,0.56216696 15.775125,0.01095582 15.401851,0.00470403 14.601972,-0.00869291 12.432685,1.9468182 10.658434,3.6900625 L 6.6026645,7.6933761 C 6.5315635,7.6921853 5.8019885,7.7237429 5.5171884,7.7408608 5.4283137,7.739372 5.2691345,7.6929303 5.271925,7.5397572 5.279101,7.1458861 6.5730942,7.3645547 6.58027,6.9706835 6.5858511,6.6643398 5.6228072,6.8233173 4.9243964,7.0961688 3.9755397,7.4523795 2.6444718,9.2687114 2.6368974,9.6844637 c -0.010366,0.5689243 0.5778075,0.4912233 1.7162103,0.4665133 -1.5363773,1.615795 -4.38425759,5.042558 -4.35590824,5.541235 0.06483432,0.352854 0.17777776,0.298653 0.44440399,0.30312 C 1.0815064,16.006033 1.773703,15.09833 2.209873,14.580314 L 5.9350902,10.177473 9.8128499,10.0892 c -1.6287895,3.51864 -1.3617648,3.501224 -1.3649539,3.676277 -0.012756,0.700217 0.2427073,1.317368 0.8826103,1.328088 1.2620307,0.02118 2.8052047,-1.725977 3.6775447,-2.762009 l -0.309587,-0.574284 c -1.06627,0.94523 -1.266181,1.182655 -1.586134,1.177296 -0.17775,-0.003 -0.31756,-0.136651 -0.313572,-0.355468 z"
                    />
                </symbol>
            </svg>
        </theme-provider>
    </theme-provider>
</template>

<script>
import Utilities from "@/utilities";

import { getterTypes, actionTypes } from "@/store/types";
import { mapActions, mapGetters } from "vuex";
import { pageData, getAllPageThemes } from "@/constants/pageData";

import ThemeProvider from "@/components/hoc/ThemeProvider.vue";

// @ is an alias for /src
import NavBar from "@/components/NavBar/NavBar.vue";
import Footer from "@/components/Footer.vue";
import BlockLoader from "@/components/loaders/BlockLoader.vue";

import Home from "@/views/Home/Home.vue";
import Projects from "@/views/Projects/Projects.vue";
import ProjectDetails from "@/views/ProjectDetails/ProjectDetails.vue";
import Experience from "@/views/Experience/Experience.vue";
import Music from "@/views/Music/Music.vue";
import About from "@/views/About/About.vue";
import Contact from "@/views/Contact/Contact.vue";
import NotFound from "@/views/404/404.vue";

// TODO: export this somewhere else (if possible)
const PAGE_ANIM_FUNCTIONS = {
    home: { introAnim: Home.introAnim, enterAnim: Home.enterAnim, leaveAnim: Home.leaveAnim },
    projects: { enterAnim: Projects.enterAnim, leaveAnim: Projects.leaveAnim },
    projectDetails: { enterAnim: ProjectDetails.enterAnim, leaveAnim: ProjectDetails.leaveAnim },
    experience: { enterAnim: Experience.enterAnim, leaveAnim: Experience.leaveAnim },
    music: { enterAnim: Music.enterAnim, leaveAnim: Music.leaveAnim },
    about: { enterAnim: About.enterAnim, leaveAnim: About.leaveAnim },
    contact: { enterAnim: Contact.enterAnim, leaveAnim: Contact.leaveAnim },
    notFound: { enterAnim: NotFound.enterAnim, leaveAnim: NotFound.leaveAnim },
};

const DEBOUNCE_RATE = 20;

export default {
    components: {
        themeProvider: ThemeProvider,
        navBar: NavBar,
        generalFooter: Footer,
        blockLoader: BlockLoader
    },
    data() {
        return {
            lastNavBarHeight: -1,
            pageThemes: {
                ...getAllPageThemes()
            },

            loading: true,

            // Track the previous route name
            prevRouteName: "",

            // Setup a debounced version of alignContent
            alignContentDebounced: Utilities.debounce(this.alignContent, DEBOUNCE_RATE),

            // ------------------------------------------
            // --- Page Transition Animation Handlers ---
            // ------------------------------------------
            pageLoadAnim: async () => {
                // Run spoof anim
                await BlockLoader.spoofLoadAnim(this.$refs.baseRef.$el);

                this.loading = false;
            },
            contentAppearAnim: async (el, done) => {
                const routeName = this.$route.name;
                const routeAnims = PAGE_ANIM_FUNCTIONS[routeName];
                // If the page has an intro animation then run it
                if (routeAnims && routeAnims.introAnim) {
                    // Update theme
                    this.updateRouteTheme(routeName);

                    await routeAnims.introAnim(el);

                    done();
                } else {
                    // If not then run the page enter animation
                    this.contentEnterAnim(el, done);
                }
            },
            contentEnterAnim: async (el, done) => {
                const routeName = this.$route.name;
                const routeAnims = (routeName) ? PAGE_ANIM_FUNCTIONS[routeName] : PAGE_ANIM_FUNCTIONS.notFound;

                // Update theme
                this.updateRouteTheme(routeName);

                if (!routeAnims || !routeAnims.enterAnim) {
                    console.log(`No anim found for '${routeName}'...skipping`);
                    return done();
                }

                // Wait for animation to finish
                await routeAnims.enterAnim(el);

                // Complete the animation
                done();
            },
            contentLeaveAnim: async (el, done) => {
                const routeName = this.prevRouteName;
                const routeAnims = (routeName) ? PAGE_ANIM_FUNCTIONS[routeName] : PAGE_ANIM_FUNCTIONS.notFound;

                if (!routeAnims || !routeAnims.leaveAnim) {
                    console.log(`No anim found for '${routeName}'...skipping`);
                    return done();
                }

                // Wait for animation to finish
                await routeAnims.leaveAnim(el);

                // Complete the animation
                done();
            }
        };
    },
    computed: {
        ...mapGetters({
            currThemeNamespace: getterTypes.GET_CURRENT_THEME_NAMESPACE
        })
    },
    watch: {
        $route(newRoute, oldRoute) {
            this.prevRouteName = oldRoute.name;
        },
        loading(isLoading) {
            // When loading toggles off
            if (!isLoading) {
                // Align the content 
                // NOTE: I'm using the debounce method here b/c it allows for time for the refs to be set
                this.alignContentDebounced();
            }
        }
    },
    created() {
        // Instantiate vuex data
        this.populateThemes();
        this.populateProjects();
        this.populateExperience();
        this.populateAbout();
        this.populateArtistProfiles();

        // Add default namespace
        this.addNamespace({
            name: "default",
            targetTheme: "default",
            override: true
        });

        // Setup initial auto theme system
        this.setAutoThemeEnabled(true);
        this.setCurrAutoThemeNamespace({ namespace: "default" });
        this.setCurrStaticThemeNamespace({ namespace: "default" });

        // Add the page-specific namespaces
        Object.entries(this.pageThemes).forEach(([namespace, targetTheme]) => {
            this.addNamespace({ name: namespace, targetTheme, override: true });
        });
    },
    mounted() {
        // Initialize the page theme
        this.updateRouteTheme(this.$route.name);

        // Setup resize listener
        this.$nextTick(function() {
            window.addEventListener("resize", this.onResize);

            this.pageLoadAnim();
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        ...mapActions({
            // AutoTheme store
            setAutoThemeEnabled: actionTypes.SET_AUTO_THEME_ENABLED,
            setCurrAutoThemeNamespace: actionTypes.SET_CURRENT_AUTO_THEME_NAMESPACE,
            setCurrStaticThemeNamespace: actionTypes.SET_CURRENT_STATIC_THEME_NAMESPACE,

            // Theme store
            populateThemes: actionTypes.POPULATE_THEMES,
            addNamespace: actionTypes.ADD_NAMESPACE,
            // Projects store
            populateProjects: actionTypes.POPULATE_PROJECTS,
            // Experience store
            populateExperience: actionTypes.POPULATE_EXPERIENCE,
            // About store
            populateAbout: actionTypes.POPULATE_ABOUT,
            // Music store
            populateArtistProfiles: actionTypes.POPULATE_ARTIST_PROFILES,
        }),
        updateRouteTheme(i_sRouteName) {
            const currPageData = pageData.pages[i_sRouteName];

            if (!currPageData) {
                console.warn(`Warning: route '${i_sRouteName}' does not contain any data`); // TODO: remove
                return;
            }

            const currRouteNamespace = currPageData.theme.namespace;

            // Only apply if there is a namespace mapped to the current route
            if (this.pageThemes[currRouteNamespace]) {
                this.setCurrAutoThemeNamespace({ namespace: currRouteNamespace });
            }
        },
        alignContent() {
            if (!this.$refs.navBarRef) {
                return;
            }

            const navBarEl = this.$refs.navBarRef.$el;
            const contentEl = this.$refs.contentEl;
            let navBarHeight = navBarEl.offsetHeight;

            // If no change occurs
            if (navBarHeight === this.lastNavBarHeight) {
                return;
            }

            // If the navbar is in phone mode then remove any offset
            if (Utilities.isInBreakpoint("phone", window.innerWidth)) {
                navBarHeight = 0;   
            }

            // Align the content so that it is under the nav bar
            contentEl.style.marginTop = navBarHeight + "px";

            // Record change
            this.lastNavBarHeight = navBarHeight;
        },
        // Event handlers
        onResize() {
            this.alignContentDebounced(); 
        }
    },
};
</script>

<style lang="scss">
    #app {
        height: 100%;
    }

    .svg-def {
        position: fixed;
        top: -100%;

        pointer-events: none;
    }
</style>
