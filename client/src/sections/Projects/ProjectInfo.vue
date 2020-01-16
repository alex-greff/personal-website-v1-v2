<template>
    <div 
        class="ProjectInfo"
    >
        <div class="ProjectInfo__header">
            <div class="ProjectInfo__title">
                {{ projectData.title }}
            </div>

            <clickable-icon 
                class="ProjectInfo_close"
                name="times"
                @click="onClose"
            />
        </div>

        <div class="ProjectInfo__sub-header">
            <div class="ProjectInfo__links">
                <!-- Generate links -->
                <link-item 
                    v-for="(linkData, index) in projectData.links"
                    :key="index"
                    class="ProjectInfo__link-item"
                    :link-type="linkData.type"
                    :title="linkData.type"
                    :href="`//${linkData.link}`"
                    size="2rem"
                />
            </div>

            <div class="ProjectInfo__date-range">
                {{ startDateFormatted }} - {{ endDateFormatted }}
            </div>
        </div>

        <div class="ProjectInfo__tags">
            <tag-item
                v-for="(tag, index) in projectData.tags"
                :key="index"
                class="ProjectInfo__tag-item"
                :height="2.5"
            >
                {{ tag }}
            </tag-item>
        </div>

        <themed-markdown-display 
            class="ProjectInfo__description"
            :compiled-markdown="projectData.content"
        />
    </div>
</template>

<script>
import Utilities from "../../utilities";

import ClickableIcon from "@/components/ui/ClickableIcon.vue";
import TagItem from "@/components/tags/TagItem.vue";
import LinkItem from "@/components/links/LinkItem.vue";
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";

export default {
    components: {
        ClickableIcon,
        TagItem,
        LinkItem,
        ThemedMarkdownDisplay
    },
    props: {
        projectData: {
            type: Object,
            required: true,
        }
    },
    computed: {
        // Date properties
        startDate() {
            const sStartDate = this.projectData.startDate;
            return (sStartDate) ? new Date(sStartDate) : null;
        },
        endDate() {
            const sEndDate = this.projectData.endDate;
            return (sEndDate) ? new Date(sEndDate) : null;
        },
        startDateFormatted() {
            return Utilities.getFormattedStartDate(this.startDate, false);
        },
        endDateFormatted() {
            return Utilities.getFormattedEndDate(this.endDate, false);
        },
    },
    methods: {
        onClose() {
            this.$emit('close', this.projectData.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .ProjectInfo {
        display: flex;
        flex-direction: column;

        // height: 50rem;

        font-size: 1.5rem;
        padding: 1.5rem;

        background-color: color-link("current_page", "background_color", "secondary");
        // background-color: rgb(95, 59, 95);

        @include respond(phone) {
            grid-column-end: span 1;

            // height: 20rem;
        }

        & .ProjectInfo__header {
            display: flex;
            justify-content: space-between;

            & .ProjectInfo__title {
                font-weight: 600;
                font-size: 3rem;
                line-height: 3rem;

                color: color-link("current_section", "accent_color", "primary");
            }

            & .ProjectInfo__close {

            }
        }

        & .ProjectInfo__sub-header {
            display: flex;
            justify-content: space-between;

            margin-top: 1.2rem;

            & .ProjectInfo__links {
                display: flex;
                flex-wrap: wrap;
            }

            & .ProjectInfo__date-range {
                text-align: right;
                color: color-link("current_section", "text_color", "secondary");
            }

            @include respond(phone) {
                flex-direction: column;
                justify-content: initial;

                & .ProjectInfo__date-range {
                    text-align: left;
                }
            }
        }

        & .ProjectInfo__tags {
            display: flex;
            flex-wrap: wrap;
            
            margin-top: 0.2rem;

            & .ProjectInfo__tag-item {
                margin-top: 0.3rem;
            }
        }

        & /deep/ .ProjectInfo__description {
            margin-top: 1.2rem;

            @include markdown-theme(2.3rem, 1.7rem);
        }
    }
</style>