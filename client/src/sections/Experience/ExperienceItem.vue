<template>
    <div class="ExperienceItem">
        <expandable-container
            :class="['ExperienceItem__content', contentClass]"
        >
            <template #fixedContent>
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
                            class="ExperienceItem__tag-item"
                            :height="2.5"
                        >
                            {{ tag }}
                        </tag-item>
                    </div>
                </div>
            </template>

            <template #expandableContent>
                <div class="ExperienceItem__summary">
                    <themed-markdown-display 
                        class="ExperienceItem__summary-markdown"
                        :compiled-markdown="experienceItemData.content"
                    />
                </div>
            </template>
        </expandable-container>
    </div>
</template>

<script>
import Utilities from "@/utilities";

import ExpandableContainer from "@/components/containers/ExpandableContainer.vue";
import TagItem from "@/components/tags/TagItem.vue";
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";

export default {
    components: {
        ExpandableContainer,
        TagItem,
        ThemedMarkdownDisplay
    },
    props: {
        experienceItemData: { 
            type: Object, 
            required: true 
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

        $padding-amount: 1.5rem;

        & .ExperienceItem__content {
            height: 100%;

            color: color-link("current_section", "text_color", "primary");
            background-color: color-link("current_section", "background_color", "secondary");

            z-index: 1;

            & .ExperienceItem__information {
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
                
                padding: $padding-amount $padding-amount 0.75rem $padding-amount;

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
                        color: color-link("current_section", "accent_color", "primary");

                        transition: color 0.5s;
                    }

                    & a.ExperienceItem__company-link {
                        cursor: pointer;

                        &:hover {
                            color: color-link("current_section", "selected_color", "primary");
                        }
                    }
                }
                
                & .ExperienceItem__date {
                    grid-area: date;

                    font-size: 1.5rem;
                    line-height: 1.5rem;

                    align-self: center;

                    color: color-link("current_section", "text_color", "secondary");
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
                padding: 0.75rem $padding-amount $padding-amount $padding-amount;

                & .ExperienceItem__summary-markdown {
                    @include markdown-theme(2.3rem, 1.7rem);
                }
            }
        }
    }
</style>