<template>
    <!-- <div class="project-list-item">
        <div class="thumbnail">
            <div class="image-tint">
                <div class="thumbnail-image" :style="thumbnailImageStyles"></div>
            </div>
        </div>
        <div class="project-info">
            <div class="project-info-container">
                <div class="project-name">
                    {{ projectData.name }}
                </div>
                <div class="project-summary">
                    {{ projectData.summary }}
                </div>
                <div class="project-tags">
                    <div class="tag-header">
                        Tags:
                    </div>
                    <div class="tag">
                        {{ tagStringList }}
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <!-- <div class="ProjectItem">
        <div class="ProjectItem__title"> 
            {{ projectData.name }}
        </div> 

        <router-link
            :to="detailsRouterPath"
            tag="div"
            class="ProjectItem__details-btn"
            @click.native="toggleIsExpanded"
        >
            <md-icon v-if="!isExpanded" class="ProjectItem__details-icon">keyboard_arrow_down</md-icon>
            <md-icon v-else class="ProjectItem__details-icon">keyboard_arrow_up</md-icon>
        </router-link>

        <slot v-if="isExpanded && isOnCurrDetailsPage"></slot>
    </div> -->

    <div :class="projectItemClassList">
        <router-link
            :to="detailsRouterPath"
            tag="div"
            class="ProjectItem__content"
        >
            <div class="ProjectItem__project-info">
                <div class="ProjectItem__title"> 
                    {{ projectData.name }}
                </div>
            </div>

            <div class="ProjectItem__tint">
                <div class="ProjectItem__thumbnail-image" :style="thumbnailImageLinkStyles">
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        projectData: { type: Object, required: true }
    },
    data() {
        return {
        };
    },
    computed: {
        projectItemClassList() {
            return `ProjectItem ${(this.hover ? "hover" :  "")}`.trim();
        },
        thumbnailImageLinkStyles() {
            return { backgroundImage: `url('${this.projectData.thumbnailImage}')` };
        },
        tagStringList() {
            let stringList = "";
            this.projectData.tags.forEach((tag) => stringList += tag + ', ' );
            return stringList.trim().replace(/,$/, "");
        },
        detailsRouterPath() {
            return `/projects/${this.projectData.name}`;
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .ProjectItem {
        // background-color: red;

        // Force 16:9 aspect ratio
        width: 100%;
        padding-bottom: 56.25%;

        position: relative;

        cursor: pointer;

        $transition-time: 0.4s;

        & .ProjectItem__content {
            // Strech content container to fit and not stretch the aspect ratio
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

            overflow: hidden;

            & .ProjectItem__tint {
                z-index: 2;
                // Note: this can't have position: absolute on it or it will dissapear behind the thumbnail image
                width: 100%;
                height: 100%;

                background-color: theme-link("page", "selected-color", "primary", 0);

                transition: background-color $transition-time;
            }

            & .ProjectItem__thumbnail-image {
                z-index: -1;

                position: relative;
                width: 100%;
                height: 100%;

                background-size: cover;
                background-position: center center;

                transition: transform $transition-time, filter $transition-time;
            }

            & .ProjectItem__project-info {
                z-index: 3;

                position: absolute;
                width: 100%;
                height: 100%;

                opacity: 0;

                transition: opacity $transition-time;
            }

            // & .ProjectItem__details-btn {
            //     cursor: pointer;
            //     $details-btn-size: 4rem;

            //     & .ProjectItem__details-icon {
                    
            //         @include icon-size($details-btn-size);
            //     }
            // }
        }

        // -----------------
        // --- Modifiers ---
        // -----------------
        &:hover {
            & .ProjectItem__content {
                & .ProjectItem__thumbnail-image {
                    transform: scale(1.2);
                    filter: grayscale(100%) brightness(10%);
                }
                
                & .ProjectItem__tint {
                    background-color: theme-link("page", "selected-color", "primary", 0.3);
                }

                & .ProjectItem__project-info {
                    opacity: 1;
                }
            }
        }
    }
</style>
