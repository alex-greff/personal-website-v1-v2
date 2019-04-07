<template>
    <div :class="projectItemClassList">
        <router-link
            :to="detailsRouterPath"
            tag="div"
            class="ProjectItem__content"
        >
            <a>
                <div class="ProjectItem__project-info-container">
                    <div class="ProjectItem__project-info">
                        <div class="ProjectItem__title"> 
                            {{ projectData.name }}
                        </div>

                        <div v-if="hasLinks" class="ProjectItem__links">
                            <a 
                                v-for="(link, linkType, index) in links"
                                :key="index"
                                class="ProjectItem__link-item"
                                :title="linkType"
                            >
                                <fa-icon :name="getIconMapping(linkType)" />
                            </a>
                        </div>
                        <div v-if="hasTags" class="ProjectItem__tags" :style="tagAlignment">
                            <tag-item
                                v-for="(tag, index) in tags"
                                :key="index"
                            >
                                {{ tag }}
                            </tag-item>
                        </div>
                    </div>
                </div>

                <div class="ProjectItem__tint">
                    <div class="ProjectItem__thumbnail-image" :style="thumbnailImageLinkStyles">
                    </div>
                </div>
            </a>
        </router-link>
    </div>
</template>

<script>
import TagItem from "@/components/tags/TagItem.vue";
import ICON_MAPPINGS from "@/constants/iconMappings";

export default {
    components: {
        tagItem: TagItem
    },
    props: {
        projectData: { type: Object, required: true }
    },
    data() {
        return {
            tagHeight: 3, //rem
            tagTilt: 59, //deg
            spaceBetween: 0.5, //rem
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
        },
        links() {
            const links = this.projectData.links;
            return (links) ? links : {};
        },
        tags() {
            const tags = this.projectData.tags;
            return (tags) ? tags : [];
        },
        hasLinks() {
            return Object.keys(this.links).length > 0;
        },
        hasTags() {
            return this.tags.length > 0;
        },
        tagAlignment() {
            const gutterLength = this.tagHeight / Math.tan(this.tagTilt * Math.PI/180);
            const spaceBetween = 0.5; // rem
            const numCells = this.tags.length;

            return {
                marginLeft: (spaceBetween - gutterLength) * numCells + "rem"
            }
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        getIconMapping(i_sIconType) {
            const iconMapping = ICON_MAPPINGS[i_sIconType];
            return (iconMapping) ? iconMapping : ICON_MAPPINGS["default"];
        }
    }
}
</script>


<style lang="scss" scoped>
// TODO: i need to convert this back to scoped
    .ProjectItem {
        $transition-time: 0.4s;
        position: relative;

        // Force 16:9 aspect ratio
        width: 100%;
        padding-bottom: 56.25%;

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

                background-color: theme-link("page", "bg-color", "secondary", 0);

                transition: background-color $transition-time;
            }

            $margin-amount: 2rem;

            & .ProjectItem__thumbnail-image {
                z-index: -1;

                position: relative;
                width: 100%;
                height: 100%;

                background-size: cover;
                background-position: center center;

                transition: transform $transition-time, filter $transition-time;
            }

            & .ProjectItem__project-info-container {
                z-index: 3;

                position: absolute;
                width: 100%;
                height: 100%;

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
                        z-index: 5;

                        & .ProjectItem__link-item {
                            $icon-size: 2rem;

                            position: relative;
                            width: $icon-size;
                            height: $icon-size;

                            margin-right: 0.3rem;
                            margin-left: 0.3rem;

                            text-decoration: none;
                            color: theme-link("projects-item", "text-color", "primary");

                            transition: color 0.5s;

                            & > svg {
                                width: 100%;
                                height: 100%;
                                
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                            }

                            &:hover {
                                color: theme-link("projects-item", "accent-color", "primary");
                            }
                        }
                    }

                    & .ProjectItem__tags {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
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
                    transform: scale(1.05);
                    filter: grayscale(100%) brightness(10%);
                }
                
                & .ProjectItem__tint {
                    background-color: theme-link("page", "bg-color", "secondary", 0.3);
                }

                & .ProjectItem__project-info-container {
                    opacity: 1;
                }
            }
        }
    }
</style>
