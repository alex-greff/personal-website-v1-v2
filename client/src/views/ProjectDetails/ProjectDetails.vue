<template>
    <div>
        <div 
            class="ProjectDetails"
        >
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
                    <div class="ProjectDetails__tags">
                        <!-- Generate tags -->
                        <tag-item
                            v-for="(tag, index) in projectData.tags"
                            :key="index"
                            class="ProjectDetails__tag-item"
                        >
                            {{ tag }}
                        </tag-item>
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
                        />
                    </div>
                </div>
                <div class="ProjectDetails__synopsis">
                    <div class="ProjectDetails__tint">
                        <div 
                            class="ProjectDetails__thumbnail-image" 
                            :style="thumbnailImageLinkStyles"
                        />
                    </div>
                    <div class="ProjectDetails__summary-container">
                        <div class="ProjectDetails__summary">
                            <div class="ProjectDetails__summary-text">
                                {{ projectData.summary }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                Loading...
            </div>            
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';
import Utilities from "@/utilities";

import TagItem from "@/components/tags/TagItem.vue";
import LinkItem from "@/components/links/LinkItem.vue";


export default {
    components: {
        tagItem: TagItem,
        linkItem: LinkItem,
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
    mounted() {
        
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
                display: grid;
                grid-template-columns: 7fr 2fr;
                margin-top: 0.7rem;

                & .ProjectDetails__tags {
                    display: flex;
                    flex-wrap: wrap;

                    & .ProjectDetails__tag-item {
                        margin-top: 0.3rem;
                    }
                }

                & .ProjectDetails__links {
                    display: flex;
                    justify-content: flex-end;
                    flex-wrap: wrap;

                    & .ProjectDetails__link-item {
                        margin-top: 0.3rem;
                    }
                }

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(tab-port) {
                    grid-template-columns: 1fr;
                }
            }

            & .ProjectDetails__synopsis {
                display: grid;
                grid-template-columns: [thumbnail-start] 1fr 1fr 1fr 1fr 1fr [summary-start] 1fr [thumbnail-end] 1fr 1fr 1fr 1fr 1fr 1fr [summary-end];
                grid-column-gap: 0.7rem;
                margin-top: 1.5rem;

                & .ProjectDetails__tint {
                    grid-column: thumbnail-start / thumbnail-end;
                    grid-row: 1 / 1;

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

                & .ProjectDetails__summary-container {
                    grid-column: summary-start / summary-end;
                    grid-row: 1 / 1;

                    position: relative;

                    transition: opacity $transition-time;

                    & .ProjectDetails__summary {
                        @include V_Align(absolute);

                        $padding-sides: 3rem;
                        $padding-top: 1rem;

                        width: 100%;
                        min-height: 16rem;
                        padding: $padding-top $padding-sides;

                        background-color: theme-link("page", "bg-color", "secondary");

                        transition: border-left $transition-time;

                        // ---------------------
                        // --- Media Queries ---
                        // ---------------------
                        @include respond(big-desktop) {
                            min-height: 17rem;
                        }
                        @include respond(normal) {
                            min-height: 16rem;
                        }
                        @include respond(tab-land) {
                            min-height: 15rem;
                        }
                        @include respond(tab-port) {
                            min-height: 14rem;
                        }
                        @include respond(phone) {
                            min-height: 16rem;
                        }

                        &::before {
                            content: "";
                            will-change: width, background-color;

                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 5px;
                            background-color: theme-link("page", "accent-color", "secondary", 0.7);

                            transition: width $transition-time, background-color $transition-time;
                        }

                        &:hover {
                            &::before {
                                width: 7px;
                                background-color: theme-link("page", "accent-color", "secondary", 1);
                            }
                        }

                        & .ProjectDetails__summary-text {
                            @include V_Align(absolute);

                            width: calc(100% - #{$padding-sides * 2});
                            max-height: calc(100% - #{$padding-top * 2});


                            // NOTE: because the summary is more than 1 line we can't use the ellipsis when it overflows
                            // text-overflow: ellipsis;
                            // white-space: nowrap;
                            // overflow: hidden;
                            
                            // So giving a scrollbar is the only way to (nicely) deal with the text overflow
                            // Either way the summary shouldn't be that long in the first place
                            overflow: auto;
                        }
                    }
                }

                // ---------------------
                // --- Media Queries ---
                // ---------------------
                @include respond(big-desktop) {
                    grid-template-columns: [thumbnail-start] 1fr 1fr 1fr 1fr [summary-start] 1fr [thumbnail-end] 1fr 1fr 1fr 1fr 1fr 1fr 1fr [summary-end];
                }

                @include respond(tab-port) {
                    grid-template-columns: [thumbnail-start] 1fr 1fr 1fr 1fr 1fr [summary-start] 1fr 1fr [thumbnail-end] 1fr 1fr 1fr 1fr 1fr [summary-end];
                }

                @include respond(phone) {
                    grid-template-columns: [thumbnail-start summary-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [summary-end thumbnail-end];

                    & .ProjectDetails__tint {
                        background-color: rgba(0, 0, 0, 0.8);
                    }

                    &:hover {
                        & .ProjectDetails__tint {
                            background-color: rgba(0, 0, 0, 0);
                        }

                        & .ProjectDetails__summary-container {
                            pointer-events: none;
                            opacity: 0;
                        }
                    }
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
                margin-right: 20rem;
                margin-left: 20rem;
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