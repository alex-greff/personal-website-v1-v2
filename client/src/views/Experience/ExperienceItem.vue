<template>
    <div class="ExperienceItem">
        <div :class="['ExperienceItem__content', contentClass]">
            <div class="ExperienceItem__thumbnail-container">
                <div 
                    class="ExperienceItem__thumbnail" 
                    :style="thumbnailImageStyles"
                />
            </div>
            <div class="ExperienceItem__information">
                <!-- <div class="ExperienceItem__position-info">
                    <div class="ExperienceItem__title">
                        {{ experienceItemData.title }}
                    </div>
                    <div class="ExperienceItem__separator-container">
                        -
                    </div>
                    <component 
                        :is="companyComponentTag"
                        :href="companyComponentLink"
                        target="__blank"
                        class="ExperienceItem__company"
                    >
                        {{ experienceItemData.company }}
                    </component>
                </div> -->
                <div class="ExperienceItem__title">
                    {{ experienceItemData.title }}
                    <span class="ExperienceItem__title-dash">-</span>
                </div>
                <component 
                    :is="companyComponentTag"
                    :href="companyComponentLink"
                    target="__blank"
                    class="ExperienceItem__company"
                >
                    {{ experienceItemData.company }}
                </component>
                <div class="ExperienceItem__date">
                    {{ startDateFormatted }} - {{ endDateFormatted }}
                </div>
                <div class="ExperienceItem__tags">
                    <!-- Generate tags -->
                    <tag-item
                        v-for="(tag, index) in experienceItemData.tags"
                        :key="index"
                        class="ExperienceItems__tag-item"
                        :height="2.5"
                    >
                        {{ tag }}
                    </tag-item>
                </div>
                <experience-item-summary
                    class="ExperienceItem__summary"
                    :summary-markdown="experienceItemData.summary"
                />
            </div>
        </div>
    </div>
</template>

<script>
import TagItem from "@/components/tags/TagItem.vue";
import ExperienceItemSummary from "@/views/Experience/ExperienceItemSummary.vue";
import Utilities from "@/utilities";

export default {
    components: {
        tagItem: TagItem,
        experienceItemSummary: ExperienceItemSummary,
    },
    props: {
        experienceItemData: { 
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
        thumbnailImageStyles() {
            return { backgroundImage: `url('${this.experienceItemData.thumbnailImage}')` };
        },
        tags() {
            const tags = this.experienceItemData.tags;
            const tagsCleaned = (tags) ? tags : [];
            return tagsCleaned.length > this.maxTags ? tagsCleaned.slice(0, this.maxTags) : tagsCleaned;
        },
        tagsOverflow() {
            const tags = this.experienceItemData.tags;
            return (tags) ? tags.length > this.maxTags : false;
        },
        hasCompanyLink() {
            return !!this.experienceItemData.companyLink;
        },
        tagAlignment() {
            const gutterLength = this.tagHeight / Math.tan(this.tagTilt * Math.PI/180);

            return {
                marginLeft: (this.tagSpaceBetween - gutterLength) + "rem"
            }
        },
        companyComponentTag() {
            return (this.hasCompanyLink) ? "a" : "div";
        },
        companyComponentLink() {
            return (this.hasCompanyLink) ? `//${this.experienceItemData.companyLink}` : null;
        },
        // Date properties
        startDate() {
            const sStartDate = this.experienceItemData.startDate;
            return (sStartDate) ? new Date(sStartDate) : null;
        },
        endDate() {
            const sEndDate = this.experienceItemData.endDate;
            return (sEndDate) ? new Date(sEndDate) : null;
        },
        startDateFormatted() {
            return Utilities.getFormattedStartDate(this.startDate);
        },
        endDateFormatted() {
            return Utilities.getFormattedEndDate(this.endDate);
        },
    }
}
</script>

<style lang="scss" scoped>
    .ExperienceItem {
        width: 100%;
        height: 100%;

        & .ExperienceItem__content {
            display: grid;
            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
            grid-template-columns: 2fr 5fr;
            // grid-template-columns: 30rem 1fr;
            // grid-template-rows: 20rem;
            grid-template-rows: auto;
            grid-template-areas:
                "thumbnail information";

            color: theme-link("page", "text-color", "primary");
            background-color: theme-link("page", "bg-color", "secondary");

            padding: 1.5rem;

            & .ExperienceItem__thumbnail-container {
                grid-area: thumbnail;

                display: flex;
                flex-direction: column;
                justify-content: center;

                & .ExperienceItem__thumbnail {
                    // Force 1:1 ratio
                    width: 100%;
                    // height: 100%;
                    @include aspect-ratio("1:1"); // TODO: need to figure out how to use height with this

                    background-size: cover;
                    background-position: center center;
                }
            }

            & .ExperienceItem__information {
                grid-area: information;

                display: grid;
                grid-row-gap: 0.5rem;
                grid-column-gap: 0.5rem;
                grid-template-columns: auto 1fr;
                grid-template-rows: auto auto auto 1fr;
                grid-template-areas: 
                    "title company"
                    "date date"
                    "tags tags"
                    "summary summary";

                & .ExperienceItem__title {
                    grid-area: title;
                    align-self: center;

                    $font-size: 2rem;
                    font-size: $font-size;
                    line-height: $font-size;

                    font-weight: 500;

                    & .ExperienceItem__title-dash {
                        display: initial;
                    }
                }

                & .ExperienceItem__company {
                    grid-area: company;
                    align-self: center;

                    $font-size: 2rem;
                    font-size: $font-size;
                    line-height: $font-size;

                    text-decoration: none;
                    color: theme-link("projects-item", "selected-color", "primary");

                    transition: color 0.5s;
                }

                & a.ExperienceItem__company {
                    cursor: pointer;

                    &:hover {
                        color: theme-link("projects-item", "accent-color", "primary");
                    }
                }

                & .ExperienceItem__position-info {
                    grid-area: position;

                    display: flex;
                    align-items: center;

                    & .ExperienceItem__title, & .ExperienceItem__separator-container, & .ExperienceItem__company {
                        display: inline-block;

                        $font-size: 2.3rem;
                        font-size: $font-size;
                        line-height: $font-size;

                        // white-space: nowrap;
                        // overflow: hidden;
                    }

                    & .ExperienceItem__title {
                        font-weight: 500;
                    }

                    & .ExperienceItem__separator-container {
                        // color: theme-link("projects-item", "selected-color", "primary");

                        margin: 0 0.7rem 0 0.7rem;
                    }

                    & .ExperienceItem__company {
                        text-decoration: none;
                        color: theme-link("projects-item", "selected-color", "primary");

                        transition: color 0.5s;
                    }

                    & a.ExperienceItem__company {
                        cursor: pointer;

                        &:hover {
                            color: theme-link("projects-item", "accent-color", "primary");
                        }
                    }
                }
                
                & .ExperienceItem__date {
                    grid-area: date;

                    // text-align: right;
                    color: theme-link("page", "text-color", "secondary");
                }

                & .ExperienceItem__tags {
                    grid-area: tags;

                    display: flex;
                    // justify-content: flex-end;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    margin-right: 1rem;

                    & .ExperienceItem__tag-item {
                        margin-top: 0.3rem;
                    }
                }

                & .ExperienceItem__summary {
                    grid-area: summary;
                }

                @include respond(tab-port) {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto 1fr;
                    grid-template-areas: 
                        "title"
                        "company"
                        "date"
                        "tags"
                        "summary";

                    & .ExperienceItem__title {
                        & .ExperienceItem__title-dash {
                            display: none;
                        }
                    }
                }
            }

            @include respond(tab-port) {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                grid-template-areas:
                    "thumbnail"
                    "information";
            }
        }
    }
</style>