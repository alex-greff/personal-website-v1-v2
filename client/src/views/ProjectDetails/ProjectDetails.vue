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
                            <!-- {{ projectData.summary }} -->
                            <pd-description 
                                :description-markdown="projectData.summary"
                            />
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
                    tab-selector-list-class="ProjectDetails__tab-selectors"
                    tab-selector-class="ProjectDetails__tab-selector"
                    tab-view-class="ProjectDetails__tab-view"
                    :tab-selector-list-styles="tabSelectorAlignment"
                    :tabs="tabs"
                    :initial-selected-tab="initialTab"
                >
                    <template v-slot:description_selector>
                        <pd-tab-selector 
                            tab-name="description"
                            :height="tabSelectorHeight"
                            :width="tabSelectorWidth"
                            :tilt="tabSelectorTilt"
                            :space-between="tabSelectorSpaceBetween"
                        >
                            Description
                        </pd-tab-selector>
                    </template>

                    <template v-slot:description>
                        <tab>
                            <pd-description 
                                :description-markdown="projectData.description"    
                            />
                        </tab>
                    </template>

                    <template v-if="hasGalleryImages" v-slot:gallery_selector>
                        <pd-tab-selector 
                            tab-name="gallery"
                            :height="tabSelectorHeight"
                            :width="tabSelectorWidth"
                            :tilt="tabSelectorTilt"
                            :space-between="tabSelectorSpaceBetween"
                        >
                            Gallery
                        </pd-tab-selector>
                    </template>

                    <template v-if="hasGalleryImages" v-slot:gallery>
                        <tab>
                            <gallery 
                                class="ProjectDetails__gallery"
                                :images="galleryImageList"
                            />
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
import ProjectDetailsTabSelector from "@/views/ProjectDetails/ProjectDetailsTabSelector.vue";

import TagItem from "@/components/tags/TagItem.vue";
import LinkItem from "@/components/links/LinkItem.vue";

import Tabs from "@/components/tabs/Tabs.vue";
import Tab from "@/components/tabs/Tab.vue";

import ImageCarousel from "@/components/carousel/ImageCarousel.vue";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

export default {
    components: {
        pdDescription: ProjectDetailsDescription,
        tagItem: TagItem,
        linkItem: LinkItem,
        tabs: Tabs,
        tab: Tab,
        pdTabSelector: ProjectDetailsTabSelector,
        gallery: ImageCarousel,
    },
    data() {
        return {
            initialTab: "description",
            // Tab selector config
            tabSelectorHeight: 3.7, // rem
            tabSelectorWidth: 18, // rem
            tabSelectorTilt: 60, // rem
            tabSelectorSpaceBetween: 0.5, // rem
        }
    },
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        tabs() { // Tab configuration
            const aTabs = [];

            // Add description tab config
            aTabs.push({
                name: "description",
                selector: "description_selector",
                transition: {
                    "mode": "out-in",
                    "@enter": this.descriptionTabEnter,
                    "@leave": this.descriptionTabLeave
                }
            });

            // Add gallery tab config if this project has gallery images
            if (this.hasGalleryImages) {
                aTabs.push({
                    name: "gallery",
                    selector: "gallery_selector",
                    transition: {
                        "mode": "out-in",
                        "@enter": this.galleryTabEnter,
                        "@leave": this.galleryTabLeave
                    }
                });
            }

            return aTabs;
        },
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
        hasGalleryImages() {
            const oGalleryImages = this.projectData.galleryImages;
            return Object.values(oGalleryImages).length > 0;
        },
        galleryImageList() {
            const oGalleryImages = this.projectData.galleryImages;
            return Object.values(oGalleryImages);
        },
        // Other properties
        thumbnailImageLinkStyles() {
            return { backgroundImage: `url('${this.projectData.thumbnailImage}')` };
        },
        tabSelectorAlignment() {
            const gutterLength = this.tabSelectorHeight / Math.tan(this.tabSelectorTilt * Math.PI/180);

            return {
                marginLeft: (this.tabSelectorSpaceBetween - gutterLength) + "rem"
            }
        }
    },
    methods: {
        descriptionTabEnter(el, done) {
            TweenLite.fromTo(el, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1, onComplete: () => done() });
        },
        descriptionTabLeave(el, done) {
            TweenLite.to(el, 0.5, { x: 20, opacity: 0, onComplete: () => done() });
        },
        galleryTabEnter(el, done) {
            TweenLite.fromTo(el, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1, onComplete: () => done() });
        },
        galleryTabLeave(el, done) {
            TweenLite.to(el, 0.5, { x: 20, opacity: 0, onComplete: () => done() });
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails enter anim for", el); 

            // Get DOM references
            const titleEl = el.querySelector(".ProjectDetails__title");
            const thumbnailImageEl = el.querySelector(".ProjectDetails__tint");
            const dateEl = el.querySelector(".ProjectDetails__date");
            const summaryEl = el.querySelector(".ProjectDetails__summary");
            const linkItemEls = el.querySelectorAll(".ProjectDetails__link-item");
            const tagItemEls = el.querySelectorAll(".ProjectDetails__tag-item");

            const tabSelectorEls = el.querySelectorAll(".ProjectDetails__tab-selector");
            const tabViewEl = el.querySelector(".ProjectDetails__tab-view");

            // Kill anims
            TweenLite.killTweensOf([titleEl, dateEl, thumbnailImageEl, summaryEl, ...linkItemEls, ...tagItemEls, ...tabSelectorEls, tabViewEl]);

            const REG_ANIM_START_LEFT = { x: -30, opacity: 0 };
            const REG_ANIM_START_RIGHT = { x: 30, opacity: 0 };
            const REG_ANIM_END = { x: 0, opacity: 1, ease: Power1.easeOut };

            // Run animations
            const totalLinkItemsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, linkItemEls.length);
            const totalTagItemsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, tagItemEls.length);
            const summaryDuration = Math.max(totalLinkItemsAnimTime, totalTagItemsAnimTime);

            const tl = new TimelineLite({ onComplete: () => { resolve(); }});
            tl.add(TweenLite.fromTo(titleEl, 0.75, { ...REG_ANIM_START_LEFT }, { ...REG_ANIM_END } ));
            tl.add(TweenLite.fromTo(thumbnailImageEl, 0.75, { ...REG_ANIM_START_LEFT }, { ...REG_ANIM_END }), "-=0.5");
            tl.add(TweenLite.fromTo(dateEl, 0.75, { ...REG_ANIM_START_RIGHT }, { ...REG_ANIM_END }), "-=0.5");
            tl.add(TweenLite.fromTo(summaryEl, summaryDuration, { ...REG_ANIM_START_RIGHT }, { ...REG_ANIM_END }), "-=0.5");
            tl.add(
                TweenMax.staggerFromTo(
                    linkItemEls,
                    0.5, 
                    { ...REG_ANIM_START_RIGHT },
                    { ...REG_ANIM_END },
                    0.1
                ),
                `-=${summaryDuration}`
            );
            tl.add(
                TweenMax.staggerFromTo(
                    tagItemEls,
                    0.5, 
                    { ...REG_ANIM_START_RIGHT },
                    { ...REG_ANIM_END },
                    0.1
                ),
                `-=${totalLinkItemsAnimTime}`
            );
            const totalTabSelectorsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, tabSelectorEls.length);
            tl.add(
                TweenMax.staggerFromTo(
                    tabSelectorEls,
                    0.5, 
                    { ...REG_ANIM_START_RIGHT },
                    { ...REG_ANIM_END },
                    0.1
                ),
                "-=0.25"
            );
            tl.add(TweenLite.fromTo(tabViewEl, 1, { ...REG_ANIM_START_LEFT }, { ...REG_ANIM_END }), `-=${Math.max(0, totalTabSelectorsAnimTime + 0.5)}`);
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails leave anim for", el); 

            // Get DOM references
            const titleEl = el.querySelector(".ProjectDetails__title");
            const thumbnailImageEl = el.querySelector(".ProjectDetails__tint");
            const dateEl = el.querySelector(".ProjectDetails__date");
            const summaryEl = el.querySelector(".ProjectDetails__summary");
            const linkItemEls = Array.from(el.querySelectorAll(".ProjectDetails__link-item")).reverse();
            const tagItemEls = Array.from(el.querySelectorAll(".ProjectDetails__tag-item")).reverse();

            const tabSelectorEls = Array.from(el.querySelectorAll(".ProjectDetails__tab-selector")).reverse();
            const tabViewEl = el.querySelector(".ProjectDetails__tab-view");

            // Kill anims
            TweenLite.killTweensOf([titleEl, dateEl, thumbnailImageEl, summaryEl, ...linkItemEls, ...tagItemEls, ...tabSelectorEls, tabViewEl]);

            const REG_ANIM_END_LEFT = { x: -30, opacity: 0, ease: Power1.easeOut };
            const REG_ANIM_END_RIGHT = { x: 30, opacity: 0, ease: Power1.easeOut };

            // Run animations
            const totalLinkItemsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, linkItemEls.length);
            const totalTagItemsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, tagItemEls.length);
            const summaryDuration = Math.max(totalLinkItemsAnimTime, totalTagItemsAnimTime);

            const tl = new TimelineLite({ onComplete: () => { resolve(); }});
            tl.add(TweenLite.to(titleEl, 0.75, { ...REG_ANIM_END_LEFT }));
            tl.add(TweenLite.to(thumbnailImageEl, 0.75, { ...REG_ANIM_END_LEFT }), "-=0.5");
            tl.add(TweenLite.to(dateEl, 0.75, { ...REG_ANIM_END_RIGHT }), "-=0.75");
            tl.add(TweenLite.to(summaryEl, summaryDuration, { ...REG_ANIM_END_RIGHT }), "-=0.5");
            tl.add(
                TweenMax.staggerTo(
                    linkItemEls,
                    0.3, 
                    { ...REG_ANIM_END_RIGHT },
                    0.1
                ),
                `-=${summaryDuration}`
            );
            tl.add(
                TweenMax.staggerTo(
                    tagItemEls,
                    0.3, 
                    { ...REG_ANIM_END_RIGHT },
                    0.1
                ),
                `-=${totalLinkItemsAnimTime}`
            );
            const totalTabSelectorsAnimTime = Utilities.totalStaggerTime(0.3, 0.1, tabSelectorEls.length);
            tl.add(
                TweenMax.staggerTo(
                    tabSelectorEls,
                    0.3, 
                    { ...REG_ANIM_END_RIGHT },
                    0.1
                ),
                "-=0.25"
            );
            tl.add(TweenLite.to(tabViewEl, 1, { ...REG_ANIM_END_RIGHT }), `-=${Math.max(0, totalTabSelectorsAnimTime + 0.5)}`);
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
                        @include aspect-ratio("16:9");

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

            & .ProjectDetails__tabs {
                margin-top: 4rem;
                margin-bottom: 4rem;

                // TODO: /deep/ is getting depricated soon... I gotta figure out an alternative to it
                & /deep/ .ProjectDetails__tab-selectors {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                & /deep/ .ProjectDetails__tab-view {
                    margin-top: 0.7rem;
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