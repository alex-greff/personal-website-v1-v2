<template>
    <div class="Projects">
        <div class="Projects__content">
            <h1 class="Projects__title">
                Projects
            </h1>

            <project-filter
                class="Projects__filter"
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

/* global Power1 */
import { TweenLite } from "gsap/all";

export default {
    components: {
        projectItem: ProjectItem,
        projectFilter: ProjectFilter,
    },
    data() {
        return {
            projectsFiltered: this.projects,
        }
    },
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        projectDataLoaded() {
            return !!(this.projects);
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
        }
    },
    mounted() {
        this.initializeGridAnimations();
    },
    methods: {
        initializeGridAnimations() {
            const gridEl = this.$refs["gridRef"].$el;
            // Wrap with animate-css-grid
            wrapGrid(gridEl);
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
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        projectItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Projects enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Projects leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
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
