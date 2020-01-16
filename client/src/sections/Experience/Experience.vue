<template>
    <section-wrapper
        class="Experience"
        section-name="experience"
        margin-mode="narrow"
    >
        <div class="Experience__content">
            <h1 
                class="Experience__title sr-load-hidden"

                v-if="!$isServer"
                v-scroll-reveal="{
                    delay: 0,
                    duration: 800
                }"
            >
                Experience
            </h1>

            <experience-filter 
                class="Experience__filter sr-load-hidden"
                tag-class="Experience__filter-item"
                sub-script-class="Experience__filter-sub-script"
                :all-filters="allTags"
                :filter-updated="filterUpdated"

                v-if="!$isServer"
                v-scroll-reveal="{
                    delay: 300,
                    duration: 800
                }"
            />

            <transition-group
                ref="gridRef"
                class="Experience__grid sr-load-hidden"
                tag="div"

                @enter="experienceItemEnterAnim"
                @leave="experienceItemLeaveAnim"

                v-if="!$isServer"
                v-scroll-reveal="{
                    delay: 500,
                    duration: 800
                }"
            >
                <empty-filter-display 
                    key="empty-filter-display"
                    :filter-empty="emptyFilter"
                >
                    No experience items found
                </empty-filter-display>

                <experience-item
                    v-for="experienceItem in experienceItemsFiltered"
                    :key="experienceItem.id"
                    class="Experience__item"
                    content-class="Experience__item-content"
                    :experience-item-data="experienceItem"
                />
            </transition-group>
        </div>
    </section-wrapper>
</template>

<script>
import Vue from "vue";
// import { wrapGrid } from "animate-css-grid";
import Utilities from "@/utilities";

/* global Power1 */
import { TweenLite } from "gsap/all";

import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import EmptyFilterDisplay from "@/components/ui/EmptyFilterDisplay.vue";
import ExperienceFilter from "@/sections/Experience/ExperienceFilter.vue";
import ExperienceItem from "@/sections/Experience/ExperienceItem.vue";

export default {
    components: {
        SectionWrapper,
        EmptyFilterDisplay,
        ExperienceFilter,
        ExperienceItem
    },
    data() {
        return {
            experienceItemsFiltered: this.$experienceItems,
            animateCssGridApplied: false,
        }
    },
    computed: {
        $experienceItems() {
            return this.$static.allExperienceData.edges.map(edge => edge.node);
        },
        allTags() {
            const tagsSet = new Set();

            Object.values(this.$experienceItems).forEach(experience => {
                const tagsRaw = (experience.tags) ? experience.tags : [];
                tagsRaw.forEach(tag => tagsSet.add(tag));
            });

            return [...tagsSet];
        },
        sortedExperienceItemsList() {
            // Sort the projects
            let aSortedExperiences = Utilities.sortStandardItemsObject(this.$experienceItems, "title", "endDate");
            return aSortedExperiences;
        },
        emptyFilter() {
            return (!this.experienceItemsFiltered) ? false : Object.keys(this.experienceItemsFiltered).length <= 0;
        }
    },
    methods: {
        initializeGridAnimations() {
            if (this.animateCssGridApplied) {
                return;
            }

            const gridEl = this.$refs["gridRef"].$el;
            // Wrap with animate-css-grid
            if (!this.$isServer) {
                const wrapGrid = require("animate-css-grid").wrapGrid;
                wrapGrid(gridEl);
            }
            this.animateCssGridApplied = true;
        },
        filterUpdated(i_bShowAll, i_filterSet) {
            // Filter experience items
            const aExperienceItemsFiltered = Utilities.filterStandardItemsArray(this.sortedExperienceItemsList, i_bShowAll, i_filterSet, "tags");

            Vue.set(this, "experienceItemsFiltered", aExperienceItemsFiltered);
        },
        // ----------------------------------
        // --- Experience Item Animations ---
        // ----------------------------------
        experienceItemEnterAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        experienceItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        },
    },
    mounted() {
        this.$nextTick(() => {
            // this.initializeGridAnimations();
        });
    }
}
</script>

<static-query>
query {
    allExperienceData {
        edges {
            node {
                id
                title
                company
                companyLink
                tags
                startDate
                endDate
                content
            }
        }
    }
}
</static-query>

<style lang="scss" scoped>
    .Experience {
        & .Experience__content {
            padding-top: 5rem;

            & .Experience__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: color-link("current_section", "accent_color", "primary");

                @include respond(phone) {
                    
                }
            }

            & .Experience__filter {
                margin-top: 2rem;
            }

            & > .Experience__grid {
                position: relative;

                margin-top: 2.5rem;

                display: grid;
                grid-row-gap: 2rem;
            }
        }
    }
</style>