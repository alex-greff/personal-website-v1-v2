<template>
    <div class="ExperienceItem">
        <div :class="['ExperienceItem__content', contentClass]">
            <div class="ExperienceItem__information">
                <div class="ExperienceItem__title">
                    {{ experienceItemData.title }}
                    <span class="ExperienceItem__title-dash">-</span>
                </div>
                <div class="ExperienceItem__company">
                    <component 
                        :is="companyComponentTag"
                        :href="companyComponentLink"
                        target="__blank"
                        class="ExperienceItem__company-link"
                    >
                        {{ experienceItemData.company }}
                    </component>
                </div>
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
            </div>

            <experience-item-summary
                class="ExperienceItem__summary"
                :summary-markdown="experienceItemData.summary"
            />
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
            return Utilities.getFormattedStartDate(this.startDate, false);
        },
        endDateFormatted() {
            return Utilities.getFormattedEndDate(this.endDate, false);
        },
    }
}
</script>

<style lang="scss" scoped>
    .ExperienceItem {
        width: 100%;
        height: 100%;

        & .ExperienceItem__content {
            position: relative;
            display: grid;

            grid-column-gap: 1rem;
            grid-row-gap: 1rem;
            grid-template-columns: auto;
            grid-template-rows: auto;
            grid-template-areas:
                "information"
                "summary";

            color: theme-link("page", "text-color", "primary");
            background-color: theme-link("page", "bg-color", "secondary");

            padding: 1.8rem;

            z-index: 1;

            & .ExperienceItem__information {
                grid-area: information;

                z-index: 1;

                margin: 0 0 auto 0;

                display: grid;
                grid-row-gap: 0.5rem;
                grid-column-gap: 0.5rem;
                grid-template-columns: auto 1fr auto;
                grid-template-rows: auto auto;
                grid-template-areas: 
                    "title company date"
                    "tags tags tags";

                & .ExperienceItem__title {
                    grid-area: title;
                    align-self: center;

                    $font-size: 2.5rem;
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

                    & .ExperienceItem__company-link {
                        $font-size: 2.5rem;
                        font-size: $font-size;
                        line-height: $font-size;

                        text-decoration: none;
                        color: theme-link("projects-item", "selected-color", "primary");

                        transition: color 0.5s;
                    }

                    & a.ExperienceItem__company-link {
                        cursor: pointer;

                        &:hover {
                            color: theme-link("projects-item", "accent-color", "primary");
                        }
                    }
                }
                
                & .ExperienceItem__date {
                    grid-area: date;

                    font-size: 1.5rem;
                    line-height: 1.5rem;

                    align-self: center;

                    color: theme-link("page", "text-color", "secondary");
                }

                & .ExperienceItem__tags {
                    grid-area: tags;

                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    margin-right: 1rem;

                    & .ExperienceItem__tag-item {
                        margin-top: 0.3rem;
                    }
                }

                @include respond(tab-port) {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto;
                    grid-template-areas: 
                        "title"
                        "company"
                        "date"
                        "tags";

                    & .ExperienceItem__title {
                        & .ExperienceItem__title-dash {
                            display: none;
                        }
                    }
                }
            }

            & .ExperienceItem__summary {
                grid-area: summary;
            }

            @include respond(phone) {
                padding: 1.6rem;

                grid-column-gap: 1rem;
                grid-row-gap: 1rem;
                grid-template-columns: 1fr;
                grid-template-rows: auto auto;
                grid-template-areas:
                    "information"
                    "summary";
            }
        }
    }
</style>