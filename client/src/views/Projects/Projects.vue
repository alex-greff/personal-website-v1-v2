<template>
    <div ref="baseEl" class="Projects">
        <div class="Projects__content">
            <h1 class="Projects__title">
                Projects
            </h1>

            <project-filter
                class="Projects__filter"
                tag-class="Projects__filter-item"
                sub-script-class="Projects__filter-sub-script"
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
                <empty-filter-display 
                    key="empty-filter-display"
                    :filter-empty="emptyFilter"
                >
                    No projects found
                </empty-filter-display>

                <project-item 
                    v-for="project in projectsFiltered"
                    :key="project.name"
                    class="Projects__item"
                    content-class="Projects__item-content"
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
import Vue from "vue";
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/types";
import { wrapGrid } from "animate-css-grid";
import Utilities from "@/utilities";

import ProjectItem from "@/views/Projects/ProjectItem.vue";
import ProjectFilter from "@/views/Projects/ProjectFilter.vue";
import EmptyFilterDisplay from "@/components/ui/EmptyFilterDisplay.vue";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

let pageAnimatedIn = false;
let forceRunProjectElsAnims = false;

export default {
    components: {
        projectItem: ProjectItem,
        projectFilter: ProjectFilter,
        emptyFilterDisplay: EmptyFilterDisplay,
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
        sortedProjectsList() {
            // Sort the projects
            let aSortedProjects = Utilities.sortStandardItemsObject(this.projects, "name", "endDate");
            return aSortedProjects;
        },
        emptyFilter() {
            return (!this.projectsFiltered) ? false : Object.keys(this.projectsFiltered).length <= 0;
        }
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
            // Filter projects
            const aProjectsFiltered = Utilities.filterStandardItemsArray(this.sortedProjectsList, i_bShowAll, i_filterSet, "tags");

            Vue.set(this, "projectsFiltered", aProjectsFiltered);
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

const STAGGER_DURATION = 0.3, DEFAULT_STAGGER_TIME = 0.1;
const FILTER_MAX_TIME = 1;
const PROJECT_ITEMS_MAX_TIME = 1;

const _animateInProjectEls = (el, ignoreFlags = false) => {
    return new Promise((resolve, reject) => {
        // Dont run the project els animation if the page hasn't been animated in yet, unless the force flag is active
        if (!ignoreFlags && !forceRunProjectElsAnims && !pageAnimatedIn) {
            resolve();
            return;
        }

        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const filterSubScriptEl = el.querySelector(".Projects__filter-sub-script");
        const projectItemEls = el.querySelectorAll(".Projects__item-content");

        // Kill any running animations
        TweenLite.killTweensOf([...filterItemEls, ...projectItemEls]);

        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.fromTo(filterSubScriptEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1 }));

        const nRegTotalFitlerTime = Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, filterItemEls.length);
        const nFilterStagger = (nRegTotalFitlerTime > FILTER_MAX_TIME) ? Utilities.calculateStagger(FILTER_MAX_TIME, STAGGER_DURATION, filterItemEls.length) : DEFAULT_STAGGER_TIME;
        const nFilterTotalTime = (nRegTotalFitlerTime > FILTER_MAX_TIME) ? FILTER_MAX_TIME : Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, filterItemEls.length);
        tl.add(
            TweenMax.staggerFromTo(
                filterItemEls,
                STAGGER_DURATION,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                nFilterStagger
            ),
            "-=0.5"
        );
        
        const nRegTotalProjectItemsTime = Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, projectItemEls.length);
        const nProjectItemsStagger = (nRegTotalProjectItemsTime > PROJECT_ITEMS_MAX_TIME) ? Utilities.calculateStagger(PROJECT_ITEMS_MAX_TIME, STAGGER_DURATION, projectItemEls.length, DEFAULT_STAGGER_TIME) : DEFAULT_STAGGER_TIME;
        tl.add(
            TweenMax.staggerFromTo(
                projectItemEls,
                STAGGER_DURATION,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                nProjectItemsStagger
            ),
            `-=${Math.max(0, nFilterTotalTime - 0.3)}`
        );
    })
};

const _enterAnim = (el) => {
    return new Promise((resolve, reject) => {
        // Get DOM references
        const titleEl = el.querySelector(".Projects__title");
        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const projectItemEls = el.querySelectorAll(".Projects__item-content");

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
        // Reset
        pageAnimatedIn = false;
        forceRunProjectElsAnims = false;

        // Get DOM references
        const titleEl = el.querySelector(".Projects__title");
        const filterItemEls = el.querySelectorAll(".Projects__filter-item");
        const filterSubScriptEl = el.querySelector(".Projects__filter-sub-script");
        const projectItemEls = el.querySelectorAll(".Projects__item-content");

        // Kill any running animations
        TweenLite.killTweensOf([titleEl, ...filterItemEls, ...projectItemEls]);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.to(titleEl, 0.5, { x: 20, opacity: 0 }));
        tl.add(TweenLite.to(filterSubScriptEl, 0.5, { x: 20, opacity: 0}), "-=0.25");

        const nRegTotalFitlerTime = Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, filterItemEls.length);
        const nFilterStagger = (nRegTotalFitlerTime > FILTER_MAX_TIME) ? Utilities.calculateStagger(FILTER_MAX_TIME, STAGGER_DURATION, filterItemEls.length) : DEFAULT_STAGGER_TIME;
        const nFilterTotalTime = (nRegTotalFitlerTime > FILTER_MAX_TIME) ? FILTER_MAX_TIME : Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, filterItemEls.length);
        tl.add(
            TweenMax.staggerTo(
                filterItemEls,
                STAGGER_DURATION,
                { x: 20, opacity: 0 },
                nFilterStagger
            ), 
            "-=0.5"
        );

        const nRegTotalProjectItemsTime = Utilities.totalStaggerTime(STAGGER_DURATION, DEFAULT_STAGGER_TIME, projectItemEls.length);
        const nProjectItemsStagger = (nRegTotalProjectItemsTime > PROJECT_ITEMS_MAX_TIME) ? Utilities.calculateStagger(PROJECT_ITEMS_MAX_TIME, STAGGER_DURATION, projectItemEls.length, DEFAULT_STAGGER_TIME) : DEFAULT_STAGGER_TIME;
        tl.add(
            TweenMax.staggerTo(
                projectItemEls,
                STAGGER_DURATION,
                { x: 20, opacity: 0 },
                nProjectItemsStagger
            ),
            `-=${nFilterTotalTime}`
        );
    });
};
</script>

<style lang="scss" scoped>    
    $grid-padding: 2.5rem;

    .Projects {
        & .Projects__content {
            position: relative;
        
            margin-top: 4.5rem;

            & .Projects__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & .Projects__filter {
                margin-top: 2rem;
            }

            & .Projects__grid {
                position: relative; // For empty filter display

                margin-top: 2.5rem;
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
