<template>
    <div ref="baseEl" class="Projects">
        <div class="Projects__content">
            <h1 class="Projects__title">
                Projects
            </h1>

            <project-filter
                class="Projects__filter"
                tag-class="Projects__filter-item"
                :all-filters="allTags"
                :filter-updated="filterUpdated"
            />

            <transition-group
                v-if="projectDataLoaded"
                ref="gridRef"
                class="Projects__grid"
                tag="div"

                @enter="projectItemEnterAnim"
                @leave="projectItemLeaveAnim"
            >
                <project-item 
                    v-for="project in projectsFiltered"
                    :key="project.name"
                    class="Projects__item"

                    :project-data="project"
                />
            </transition-group>

            <div v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProjectItem from '@/views/Projects/ProjectItem.vue';
import ProjectFilter from '@/views/Projects/ProjectFilter.vue';
import { getterTypes } from '@/store/types';
import Vue from 'vue';
import { wrapGrid } from "animate-css-grid";
import Utilities from "@/utilities";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

let pageAnimatedIn = false;
let forceRunProjectElsAnims = false;

export default {
    components: {
        projectItem: ProjectItem,
        projectFilter: ProjectFilter,
    },
    data() {
        return {
            projectsFiltered: this.projects,
            animateCssGridApplied: false,
        }
    },
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        projectDataLoaded() {
            return Object.keys(this.projects).length > 0;
        },
        projectIDs() {
            return Object.entries(this.projects).map(([projectName]) => projectName);
        },
        allTags() {
            const tagsSet = new Set();

            Object.values(this.projects).forEach(project => {
                const tagsRaw = (project.tags) ? project.tags : [];
                tagsRaw.forEach(tag => tagsSet.add(tag));
            });

            return [...tagsSet];
        },
    },
    watch: {
        projectDataLoaded(isLoaded, wasLoaded) {
            // TODO: if this was fast and the spoof loader is still running, this runs anyways... I should probably fix this eventually
            if (isLoaded && !wasLoaded) {
                this.$nextTick(() => {
                    this.animateInProjectEls(this.$refs.baseEl);
                    this.initializeGridAnimations();
                });
            }
        }
    },
    mounted() {
        if (this.projectDataLoaded) {
            this.$nextTick(() => {
                this.animateInProjectEls(this.$refs.baseEl);
                this.initializeGridAnimations();
            });
        }
    },
    methods: {
        initializeGridAnimations() {
            if (this.animateCssGridApplied) {
                return;
            }

            const gridEl = this.$refs["gridRef"].$el;
            // Wrap with animate-css-grid
            wrapGrid(gridEl);
            this.animateCssGridApplied = true;
        },
        filterUpdated(i_bShowAll, i_filterSet) {
            const newProjectsFiltered = Object.values(this.projects).reduce((acc, project) => {

                const currProj = {};
                // const bHasFilter = project.tags.some(tag => i_filterSet.has(tag));
                const bMatchesFilter = Array.from(i_filterSet).every(filterItem => {
                    return project.tags.some(tag => tag === filterItem);
                });

                if (i_bShowAll || bMatchesFilter) {
                    currProj[project.name] = { ...project };
                }

                return {
                    ...acc,
                    ...currProj
                };
            }, {});

            Vue.set(this, "projectsFiltered", newProjectsFiltered);
        },
        // -------------------------------
        // --- Project Item Animations ---
        // -------------------------------
        projectItemEnterAnim(el, done) {
            // Do not run the enter animation if the page has not been animated in yet
            if (!pageAnimatedIn) {
                done();
                return;
            }

            console.log("running project item enter anim for", el);
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        projectItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        },
        animateInProjectEls(el) {
            _animateInProjectEls(el);
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return _enterAnim(el);
    },
    leaveAnim(el) {
        return _leaveAnim(el);
    }
}

const _animateInProjectEls = (el, ignoreFlags = false) => {
    return new Promise((resolve, reject) => {
        // Dont run the project els animation if the page hasn't been animated in yet, unless the force flag is active
        if (!ignoreFlags && !forceRunProjectElsAnims && !pageAnimatedIn) {
            resolve();
            return;
        }

        console.log("Running project els animation", el);
        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const projectItemEls = el.querySelectorAll(".Projects__item");

        // Kill any running animations
        TweenLite.killTweensOf([...filterItemEls, ...projectItemEls]);

        // TODO: consolidate these animations with the same ones that are in _enterAnim
        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(
            TweenMax.staggerFromTo(
                filterItemEls,
                0.3,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.1
            ),
        );
        const totalFilterAnimTime = Utilities.totalStaggerTime(0.3, 0.1, filterItemEls.length);
        tl.add(
            TweenMax.staggerFromTo(
                projectItemEls,
                0.3,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1,  },
                0.1
            ),
            `-=${Math.max(0, totalFilterAnimTime - 0.3)}`
        );
    })
};

const _enterAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Projects enter anim for", el);

        // Get DOM references
        const titleEl = el.querySelector(".Projects__title");
        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const projectItemEls = el.querySelectorAll(".Projects__item");

        // Kill any running animations (that we know are for sure there)
        TweenLite.killTweensOf(titleEl);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => { pageAnimatedIn = true; resolve(); }});
        tl.add(TweenLite.fromTo(titleEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1}));

        // Activate the force flag if there are no filter project els present
        // This combats the issue where projectItemEls does not get rendered right away
        if (filterItemEls.length <= 0 || projectItemEls.length <= 0) {
            forceRunProjectElsAnims = true;
            return;
        }

        // Run the project els animations, ignoring any flags
        _animateInProjectEls(el, true);
    });
};

const _leaveAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Projects leave anim for", el); 

        // Reset
        pageAnimatedIn = false;
        forceRunProjectElsAnims = false;

        // Get DOM references
        const titleEl = el.querySelector(".Projects__title");
        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const projectItemEls = el.querySelectorAll(".Projects__item");

        // Kill any running animations
        TweenLite.killTweensOf([titleEl, ...filterItemEls, ...projectItemEls]);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.to(titleEl, 0.5, { x: 20, opacity: 0 }));
        tl.add(
            TweenMax.staggerTo(
                filterItemEls,
                0.3,
                { x: 20, opacity: 0 },
                0.1
            ), 
            "-=0.25"
        );
        const totalFilterAnimTime = Utilities.totalStaggerTime(0.3, 0.1, filterItemEls.length);
        tl.add(
            TweenMax.staggerTo(
                projectItemEls,
                0.3,
                { x: 20, opacity: 0 },
                0.1
            ),
            `-=${totalFilterAnimTime}`
        );
    });
}
</script>

<style lang="scss" scoped>    
    $grid-padding: 2.5rem;

    .Projects {
        & .Projects__content {
            position: relative;
        
            margin: 5rem 0 0 0;

            & .Projects__title {
                text-align: center;

                font-size: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & .Projects__filter {
                margin-top: 3rem;
            }

            & .Projects__grid {
                margin-top: 3rem;
                margin-bottom: 3rem;

                display: grid;
                grid-column-gap: 2rem;
                grid-row-gap: 2rem;

                $item-width: 30rem;

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(big-desktop) {
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                }

                @include respond(normal) {
                    grid-template-columns: 1fr 1fr 1fr;
                }

                @include respond(tab-land) {
                    grid-template-columns: 1fr 1fr;
                }

                @include respond(tab-port) {
                    grid-template-columns: 1fr 1fr;
                }

                @include respond(phone) {
                    grid-template-columns: 1fr;
                }
            }

            // ---------------------
            // --- Media Queries ---
            // ---------------------
            @include respond(big-desktop) {
                margin-right: 20rem;
                margin-left: 20rem;
            }

            @include respond(normal) {
                margin-right: 15rem;
                margin-left: 15rem;
            }

            @include respond(tab-land) {
                margin-right: 10rem;
                margin-left: 10rem;
            }

            @include respond(tab-port) {
                margin-right: 5rem;
                margin-left: 5rem;
            }

            @include respond(phone) {
                margin-right: 3rem;
                margin-left: 3rem;
            }
        }
    }
</style>
