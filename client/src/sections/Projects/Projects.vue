<template>
    <section-wrapper
        class="Projects"
        section-name="projects"
        margin-mode="wide"
    >
        <div class="Projects__content">
            <h1 
                class="Projects__title"
                v-scroll-reveal="{
                    delay: 0,
                    duration: 800
                }"
            >
                Projects
            </h1>

            <project-filter
                class="Projects__filter"
                tag-class="Projects__filter-item"
                sub-script-class="Projects__filter-sub-script"
                :all-filters="allTags"
                :filter-updated="filterUpdated"
                v-scroll-reveal="{
                    delay: 300,
                    duration: 800
                }"
            />

            <transition-group 
                class="Projects__grid"
                tag="div"
                ref="gridRef"

                @enter="projectItemEnterAnim"
                @leave="projectItemLeaveAnim"
                v-scroll-reveal="{
                    delay: 500,
                    duration: 800
                }"
            >
                <empty-filter-display 
                    key="empty-filter-display"
                    :filter-empty="emptyFilter"
                >
                    No projects found
                </empty-filter-display>

                <!-- Project items before the opened project info -->
                <project-item 
                    v-for="(project, idx) in projectsFilteredBeforeOpened"
                    :key="project.id"
                    class="Projects__item"
                    content-class="Projects__item-content"
                    :project-data="project"
                    :open="project.id === openedProjectId"
                    @click="onProjectItemClick"
                />

                <!-- Info on the currently opened project -->
                <project-info 
                    v-if="openedProjectIndex > -1"
                    :key="`project-info-${rowProjectInfoIsOn}`"
                    class="Projects__project-info"
                    :project-data="openedProjectData"
                    @close="closeOpenedProject"
                />

                <!-- Project items after the opened project info -->
                <project-item 
                    v-for="(project, idx) in projectsFilteredAfterOpened"
                    :key="project.id"
                    class="Projects__item"
                    content-class="Projects__item-content"
                    :project-data="project"
                    :open="project.id === openedProjectId"
                    @click="onProjectItemClick"
                />
            </transition-group>
        </div>
    </section-wrapper>
</template>

<script>
import Vue from "vue";
import Utilities from "../../utilities";
import { wrapGrid } from "animate-css-grid";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import ProjectFilter from "@/sections/Projects/ProjectFilter.vue";
import EmptyFilterDisplay from "@/components/ui/EmptyFilterDisplay.vue";
import ProjectItem from "@/sections/Projects/ProjectItem.vue";
import ProjectInfo from "@/sections/Projects/ProjectInfo.vue";

const RESIZE_DEBOUNCE_RATE = 20;

export default {
    components: {
        SectionWrapper,
        ProjectFilter,
        EmptyFilterDisplay,
        ProjectItem,
        ProjectInfo
    },
    data() {
        return {
            projectsFiltered: this.$projects,
            animateCssGridApplied: false,

            numGridColumns: 1,
            openedProjectId: null, // The id of the project item that is opened

            onResizeDebounced: Utilities.debounce(this.onResize, RESIZE_DEBOUNCE_RATE)
        }
    },
    computed: {
        $projects() {
            return this.$static.allProjectData.edges.map(edge => edge.node);
        },
        allTags() {
            const tagsSet = new Set();

            Object.values(this.$projects).forEach(project => {
                const tagsRaw = (project.tags) ? project.tags : [];
                tagsRaw.forEach(tag => tagsSet.add(tag));
            });

            return [...tagsSet];
        },
        sortedProjectsList() {
            // Sort the projects
            let aSortedProjects = Utilities.sortStandardItemsObject(this.$projects, "title", "endDate");
            return aSortedProjects;
        },
        emptyFilter() {
            return (!this.projectsFiltered) ? false : Object.keys(this.projectsFiltered).length <= 0;
        },
        openedProjectIndex() {
            return this.sortedProjectsList.findIndex(project => project.id === this.openedProjectId);
        },
        openedProjectData() {
            return this.sortedProjectsList.find(project => project.id === this.openedProjectId);
        },
        rowProjectInfoIsOn() {
            const rowOpenedIsOn = Math.floor(this.openedProjectIndex / this.numGridColumns);
            const lastRow = Math.ceil(this.projectsFiltered.length / this.numGridColumns) - 1;
            const isLastRow = (rowOpenedIsOn === lastRow);

            return (isLastRow && this.numGridColumns > 1) ? rowOpenedIsOn : rowOpenedIsOn + 1;
        },
        projectsFilteredBeforeOpened() {
            if (!this.projectsFiltered) {
                return;
            }

            const rowOpenedIsOn = Math.floor(this.openedProjectIndex / this.numGridColumns);
            const lastRow = Math.ceil(this.projectsFiltered.length / this.numGridColumns) - 1;
            const isLastRow = (rowOpenedIsOn === lastRow);

            if (isLastRow && this.numGridColumns > 1) {
                // Filter everything but the last row
                return this.projectsFiltered.filter((project, index) => {
                    const currRow = Math.floor(index / this.numGridColumns);

                    return currRow < lastRow;
                });
            }

            // Get all filtered project items that are on and before the row that the opened project is on
            return this.projectsFiltered.filter((project, index) => {
                const currRow = Math.floor(index / this.numGridColumns);

                return currRow <= rowOpenedIsOn;
            });
        },
        projectsFilteredAfterOpened() {
            if (!this.projectsFiltered) {
                return;
            }

            const rowOpenedIsOn = Math.floor(this.openedProjectIndex / this.numGridColumns);
            const lastRow = Math.ceil(this.projectsFiltered.length / this.numGridColumns) - 1;
            const isLastRow = (rowOpenedIsOn === lastRow);

            if (isLastRow && this.numGridColumns > 1) {
                // Filter only the last row
                return this.projectsFiltered.filter((project, index) => {
                    const currRow = Math.floor(index / this.numGridColumns);

                    return currRow === lastRow;
                });    
            }

            // Get all filtered project items that are after the row that the opened project is on
            return this.projectsFiltered.filter((project, index) => {
                const currRow = Math.floor(index / this.numGridColumns);

                return currRow > rowOpenedIsOn;
            });
        }
    },
    methods: {
        filterUpdated(i_bShowAll, i_filterSet) {
            // Close the currently opened project
            this.closeOpenedProject();

            // Filter projects
            const aProjectsFiltered = Utilities.filterStandardItemsArray(this.sortedProjectsList, i_bShowAll, i_filterSet, "tags");

            Vue.set(this, "projectsFiltered", aProjectsFiltered);
        },
        initializeGridAnimations() {
            if (this.animateCssGridApplied) {
                return;
            }

            const gridEl = this.$refs.gridRef.$el;
            // Wrap with animate-css-grid
            wrapGrid(gridEl);
            this.animateCssGridApplied = true;
        },
        projectItemEnterAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        projectItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        },
        updateNumGridColumns() {
            // Note: in development, reloading the page on chrome's mobile view will not compute the right number of columns
            const windowWidth = window.innerWidth;

            if (Utilities.isInBreakpoint("phone", windowWidth)) 
                this.numGridColumns = 1;
            else if (Utilities.isInBreakpoint("tab-port", windowWidth) || Utilities.isInBreakpoint("tab-land", windowWidth))
                this.numGridColumns = 2;
            else // normal, big-desktop
                this.numGridColumns = 3;
        },
        closeOpenedProject() {
            this.openedProjectId = null;
        },
        // ----------------------
        // --- Event handlers ---
        // ----------------------
        onProjectItemClick(id) {
            this.openedProjectId = id;
        },
        onResize() {
            this.updateNumGridColumns();
        },
        __onResize() {
            this.onResizeDebounced();
        }
    },
    mounted() {
        this.updateNumGridColumns();

        this.$nextTick(() => {
            this.initializeGridAnimations();
        });

        window.addEventListener('resize', this.__onResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__onResize);
    }
}
</script>

<static-query>
query {
    allProjectData {
        edges {
            node {
                id
                title
                startDate
                endDate
                tags
                links {
                    type
                    link
                }
                thumbnailImage
                galleryImages
                content   
            }
        }
    }
}
</static-query>

<style lang="scss" scoped>
    .Projects {
        & .Projects__content {
            padding-top: 5rem;

            @include respond(phone) {
                padding-top: 2rem;
            }

            @include respond(big-desktop) {
                padding-top: 10rem;
            }


            & .Projects__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: color-link("current_section", "accent_color", "primary");

                @include respond(phone) {
                    
                }
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

                & .Projects__item {
                    will-change: transform, opacity, transform-origin;
                }

                & .Projects__project-info {

                    // Note: make sure this is synced up with .Project__grid's number of columns

                    // ---------------------
                    // --- Media Queries ---
                    // ---------------------
                    @include respond(big-desktop) {
                        grid-column-end: span 3;
                    }

                    @include respond(normal) {
                        grid-column-end: span 3;
                    }

                    @include respond(tab-land) {
                        grid-column-end: span 2;
                    }

                    @include respond(tab-port) {
                        grid-column-end: span 2;
                    }

                    @include respond(phone) {
                        grid-column-end: span 1;
                    }
                }

                // Note: make sure these are synced with updateNumGridColumns

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(big-desktop) {
                    grid-template-columns: 1fr 1fr 1fr;
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
        }
    }
</style>