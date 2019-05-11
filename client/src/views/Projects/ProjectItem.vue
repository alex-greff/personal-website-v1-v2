<template>
    <div class="ProjectItem">
        <router-link
            :to="detailsRouterPath"
            tag="div"
            :class="['ProjectItem__content', contentClass]"
        >
            <!-- Note: this first anchor tag is used by router-link -->
            <a>
                <div class="ProjectItem__tint">
                    <div 
                        class="ProjectItem__thumbnail-image" 
                        :style="thumbnailImageLinkStyles" 
                    />
                </div>
            </a>

            <div class="ProjectItem__project-info-container">
                <div class="ProjectItem__project-info">
                    <div class="ProjectItem__title"> 
                        {{ projectData.name }}
                    </div>

                    <div v-if="hasLinks" class="ProjectItem__links">
                        <link-item
                            v-for="(link, linkType, index) in links"
                            :key="index"
                            class="ProjectItem__link-item"
                            :link-type="linkType"
                            :title="linkType"
                            :href="`//${link}`"
                        />
                    </div>
                    <div v-if="hasTags" class="ProjectItem__tags" :style="tagAlignment">
                        <tag-item
                            v-for="(tag, index) in tags"
                            :key="index"
                            class="ProjectItem__tag-item"
                        >
                            {{ tag }}
                        </tag-item>
                        <div v-if="tagsOverflow" class="ProjectItem__tag-ellipis">
                            <span>...</span>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import TagItem from "@/components/tags/TagItem.vue";
import LinkItem from "@/components/links/LinkItem.vue";

export default {
    components: {
        tagItem: TagItem,
        linkItem: LinkItem,
    },
    props: {
        projectData: { 
            type: Object, 
            required: true 
        },
        maxTags: {
            type: Number,
            default: 10, // TODO: this might need some adjusting
        },
        contentClass: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            tagHeight: 3, //rem
            tagTilt: 60, //deg
            tagSpaceBetween: 0.5, //rem
        };
    },
    computed: {
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
        },
        links() {
            const links = this.projectData.links;
            return (links) ? links : {};
        },
        tags() {
            const tags = this.projectData.tags;
            const tagsCleaned = (tags) ? tags : [];
            return tagsCleaned.length > this.maxTags ? tagsCleaned.slice(0, this.maxTags) : tagsCleaned;
        },
        tagsOverflow() {
            const tags = this.projectData.tags;
            return (tags) ? tags.length > this.maxTags : false;
        },
        hasLinks() {
            return Object.keys(this.links).length > 0;
        },
        hasTags() {
            return this.tags.length > 0;
        },
        tagAlignment() {
            const gutterLength = this.tagHeight / Math.tan(this.tagTilt * Math.PI/180);

            return {
                marginLeft: (this.tagSpaceBetween - gutterLength) + "rem"
            }
        }
    },
}
</script>


<style lang="scss" scoped>
    .ProjectItem {
        $transition-time: 0.4s;
        position: relative;

        // Force 16:9 aspect ratio
        width: 100%;
        @include aspect-ratio(16/9);

        cursor: pointer;

        & .ProjectItem__content {
            // Remove stylings from anchor tag
            & > a {
                color: inherit;
                text-decoration: none;
            }

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

                // background-color: theme-link("page", "bg-color", "primary", 0);
                background-color: rgba(0, 0, 0, 0);

                transition: background-color $transition-time;
            }

            $margin-amount: 2rem;

            & .ProjectItem__thumbnail-image {
                will-change: filter, transform;
                // -webkit-backface-visibility: hidden;

                z-index: -1;

                position: relative;
                width: 100%;
                height: 100%;

                background-size: cover;
                background-position: center center;

                transition: transform $transition-time, filter $transition-time;
            }

            & .ProjectItem__project-info-container {
                pointer-events: none;
                z-index: 3;

                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;

                opacity: 0; 

                transition: opacity $transition-time;

                & .ProjectItem__project-info {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);

                    // This is needed in order for the margins to be setup properly
                    width: calc(100% -  #{$margin-amount * 2});
                    margin: 0 $margin-amount 0 $margin-amount;

                    & > div:not(:last-child) {
                        margin-bottom: 0.7rem;
                    }

                    & .ProjectItem__title {
                        text-align: center;

                        font-weight: 500;
                    }

                    & .ProjectItem__links {
                        display: flex;
                        justify-content: center;
                    }

                    & .ProjectItem__tags {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        flex-wrap: wrap;

                        & .ProjectItem__tag-item {
                            margin-top: 0.3rem;
                        }

                        & .ProjectItem__tag-ellipis {
                            position: relative;

                            font-size: 1.5rem;
                            letter-spacing: 0.2rem;

                            & > span {
                                position: absolute;
                                bottom: 0;
                                vertical-align: text-bottom;
                            }
                        }
                    }
                }
            }
        }

        // -----------------
        // --- Modifiers ---
        // -----------------
        &:hover {
            & .ProjectItem__content {

                & .ProjectItem__thumbnail-image {
                    // transform: scale(1.05);
                    // filter: grayscale(100%) brightness(10%);
                }
                
                & .ProjectItem__tint {
                    // background-color: theme-link("page", "bg-color", "primary", 0.9);
                    background-color: rgba(0, 0, 0, 0.85);
                }

                & .ProjectItem__project-info-container {
                    opacity: 1;
                }
            }
        }
    }
</style>
