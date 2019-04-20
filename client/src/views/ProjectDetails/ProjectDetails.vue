<template>
    <div>
        <div class="ProjectDetails">
            <div 
                v-if="projectDataLoaded" 
                class="ProjectDetails__content"
            >
                <div class="ProjectDetails__heading">
                    <h1 class="ProjectDetails__title">
                        {{ projectData.name }}
                    </h1>
                    <div class="ProjectDetails__date">
                        {{ startDateFormatted }} - {{ endDateFormatted }}
                    </div>
                </div>
                <div class="ProjectDetails__sub-heading">
                    <div class="ProjectDetails__tint">
                        <div 
                            class="ProjectDetails__thumbnail-image" 
                            :style="thumbnailImageLinkStyles"
                        />
                    </div>
                    <div class="ProjectDetails__links">
                        <!-- Generate links -->
                        <link-item 
                            v-for="(link, linkType, index) in projectData.links"
                            :key="index"
                            class="ProjectDetails__link-item"
                            :link-type="linkType"
                            :title="linkType"
                            :href="`//${link}`"
                            :size="2"
                        />
                    </div>
                    <div class="ProjectDetails__summary">
                        <div class="ProjectDetails__summary-text">
                            {{ projectData.summary }}
                        </div>
                    </div>
                    <div class="ProjectDetails__tags">
                        <!-- Generate tags -->
                        <tag-item
                            v-for="(tag, index) in projectData.tags"
                            :key="index"
                            class="ProjectDetails__tag-item"
                            :height="2.5"
                        >
                            {{ tag }}
                        </tag-item>
                    </div>
                </div>

                <!-- Tabs -->
                <tabs
                    class="ProjectDetails__tabs"
                    :tabs="tabs"
                    :initial-selected-tab="initialTab"
                >
                    <template v-slot:description_selector>
                        <tab-selector name="test1">
                            Description
                        </tab-selector>
                    </template>

                    <template v-slot:description>
                        <!-- <tab name="test1">
                            Some description stuff here
                        </tab> -->
                        <description 
                            :description-markdown="projectData.description"    
                        />
                    </template>

                    <template v-slot:gallery_selector>
                        <tab-selector name="test2">
                            Gallery
                        </tab-selector>
                    </template>

                    <template v-slot:gallery>
                        <tab name="test2">
                            Gallery component here
                        </tab>
                    </template>
                </tabs>
            </div>
            <div v-else-if="projectNotFound">
                Not found
            </div>
            <div v-else>
                Loading...
            </div>            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';
import Utilities from "@/utilities";
import ProjectDetailsDescription from "@/views/ProjectDetails/ProjectDetailsDescription.vue";

import TagItem from "@/components/tags/TagItem.vue";
import LinkItem from "@/components/links/LinkItem.vue";

import Tabs from "@/components/tabs/Tabs.vue";
import Tab from "@/components/tabs/Tab.vue";
import TabSelector from "@/components/tabs/TabSelector.vue";

import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

export default {
    components: {
        description: ProjectDetailsDescription,
        tagItem: TagItem,
        linkItem: LinkItem,
        tabs: Tabs,
        tab: Tab,
        tabSelector: TabSelector,
    },
    data() {
        return {
            // Tab configuration
            tabs: [
                {
                    name: "description",
                    selector: "description_selector",
                    transition: {
                        "mode": "out-in",
                        "@enter": this.descriptionTabEnter,
                        "@leave": this.descriptionTabLeave
                    }
                },
                {
                    name: "gallery",
                    selector: "gallery_selector",
                    transition: {
                        "mode": "out-in",
                        "@enter": this.galleryTabEnter,
                        "@leave": this.galleryTabLeave
                    }
                }
            ],
            initialTab: "description",
        }
    },
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        // Project properties
        projectName() {
            return this.$route.params.id;
        },
        projectData() {
            return this.projects[this.projectName];
        },
        projectDataLoaded() {
            return !!(this.projects[this.projectName]);
        },
        projectNotFound() {
            return !this.projectDataLoaded && Object.keys(this.projects).length > 0;
        },
        // Date properties
        startDate() {
            return new Date(this.projectData.startDate);
        },
        endDate() {
            return new Date(this.projectData.endDate);
        },
        startDateFormatted() {
            return Utilities.getFormattedDate(this.startDate);
        },
        endDateFormatted() {
            return Utilities.getFormattedDate(this.endDate);
        },
        // Other properties
        thumbnailImageLinkStyles() {
            return { backgroundImage: `url('${this.projectData.thumbnailImage}')` };
        },
    },
    methods: {
        descriptionTabEnter(el, done) {
            console.log("description tab enter");
            TweenLite.fromTo(el, 0.5, { opacity: 0 }, { opacity: 1, onComplete: () => done()});
        },
        descriptionTabLeave(el, done) {
            console.log("description tab leave");
            TweenLite.to(el, 0.5, { opacity: 0, onComplete: () => done() });
        },
        galleryTabEnter(el, done) {
            console.log("gallery tab enter");
            TweenLite.fromTo(el, 0.5, { x: 20 }, { x: 0, onComplete: () => done()});
        },
        galleryTabLeave(el, done) {
            console.log("gallery tab leave");
            TweenLite.to(el, 0.5, { x: 20, onComplete: () => done() });
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>
    .ProjectDetails {
        $transition-time: 0.4s;

        & .ProjectDetails__content {
            position: relative;
        
            margin: 5rem 0 0 0;

            & .ProjectDetails__heading {
                display: grid;
                grid-template-columns: 1fr 1fr;

                & .ProjectDetails__title, & .ProjectDetails__date {
                    align-self: center;
                }

                & .ProjectDetails__title {
                    font-weight: 500;

                    font-size: 4rem;
                    line-height: 4rem;
                    color: theme-link("page", "accent-color", "primary");
                }

                & .ProjectDetails__date {
                    text-align: right;
                    color: theme-link("page", "text-color", "secondary");
                }

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(tab-port) {
                    grid-template-columns: 1fr;

                    & .ProjectDetails__date {
                        text-align: left;
                    }
                }
            }

            & .ProjectDetails__sub-heading {
                // Define default grid
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto auto;
                grid-template-areas: 
                    "thumbnail links"
                    "thumbnail summary"
                    "thumbnail tags";
                grid-column-gap: 2rem;
                grid-row-gap: 1rem;

                margin-top: 1rem;

                & .ProjectDetails__tint {
                    grid-area: thumbnail;
                    align-self: center;

                    background-color: rgba(0, 0, 0, 0.5);

                    transition: background-color $transition-time;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0);
                    }

                    & .ProjectDetails__thumbnail-image {
                        // Force 16:9 aspect ratio
                        width: 100%;
                        padding-bottom: 56.25%;

                        z-index: -1;

                        position: relative;

                        background-size: cover;
                        background-position: center center;
                    }
                }

                & .ProjectDetails__links {
                    grid-area: links;
                    align-self: end;

                    display: flex;
                    justify-content: flex-end;
                    flex-wrap: wrap;

                    & .ProjectDetails__link-item {
                        margin-top: 0.3rem;
                    }
                }

                & .ProjectDetails__tags {
                    grid-area: tags;
                    align-self: start;

                    display: flex;
                    justify-content: flex-end;
                    flex-wrap: wrap;
                    margin-right: 1rem;

                    & .ProjectDetails__tag-item {
                        margin-top: 0.3rem;
                    }
                }

                & .ProjectDetails__summary {
                    grid-area: summary;
                    align-self: center;

                    position: relative;

                    $padding-sides: 3rem;
                    $padding-top: 1rem;

                    width: 100%;
                    height: 100%;
                    min-height: 15rem;
                    padding: $padding-top $padding-sides;

                    background-color: theme-link("page", "bg-color", "secondary");

                    transition: border-left $transition-time;

                    &::before {
                        content: "";
                        will-change: width, background-color;

                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 5px;
                        background-color: theme-link("page", "accent-color", "secondary", 1);

                        transition: width $transition-time, background-color $transition-time;
                    }

                    & .ProjectDetails__summary-text {
                        @include V_Align(absolute);

                        width: calc(100% - #{$padding-sides * 2});
                        max-height: calc(100% - #{$padding-top * 2});

                        // NOTE: because the summary is more than 1 line we can't use this code to show ellipsis on overflow:
                        // text-overflow: ellipsis;
                        // white-space: nowrap;
                        // overflow: hidden;
                        
                        // So giving a scrollbar is the only way to (nicely) deal with the text overflow
                        // Either way the summary shouldn't be that long in the first place
                        overflow: auto;
                    }
                }

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(big-desktop) {
                    grid-template-columns: 3fr 4fr;
                }

                @include respond(tab-port) {
                    // NOTE: this is anothe possible breakpoint config
                    // The only problem is that it gets a little too small just before the phone breakpoint
                    // grid-template-areas: 
                    //     "links links"
                    //     "thumbnail summary"
                    //     "tags tags";

                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto;
                    grid-template-areas: 
                        "links"
                        "tags"
                        "thumbnail"
                        "summary";
                }

                @include respond(phone) {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto;
                    grid-template-areas: 
                        "links"
                        "tags"
                        "thumbnail"
                        "summary";
                }
            }

            // ---------------------
            // --- Media Queries ---
            // ---------------------
            @include respond(big-desktop) {
                margin-right: 30rem;
                margin-left: 30rem;
            }

            @include respond(normal) {
                margin-right: 18rem;
                margin-left: 18rem;
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