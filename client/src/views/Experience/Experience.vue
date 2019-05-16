<template>
    <div ref="baseEl" class="Experience">
        <div class="Experience__content">
            <h1 class="Experience__title">
                Experience
            </h1>

            <experience-filter 
                class="Experience__filter"
                tag-class="Experience__filter-item"
                sub-script-class="Experience__filter-sub-script"
                :all-filters="allTags"
                :filter-updated="filterUpdated"
            />

            <transition-group
                v-if="experienceDataLoaded"
                ref="gridRef"
                class="Experience__grid"
                tag="div"

                @enter="experienceItemEnterAnim"
                @leave="experienceItemLeaveAnim"
            >
                <empty-filter-display 
                    key="empty-filter-display"
                    :filter-empty="emptyFilter"
                >
                    No experience items found
                </empty-filter-display>

                <experience-item
                    v-for="experienceItem in experienceItemsFiltered"
                    :key="experienceItem._id"
                    class="Experience__item"
                    content-class="Experience__item-content"
                    :experience-item-data="experienceItem"
                />
            </transition-group>

            <div v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { getterTypes } from '@/store/types';
import { wrapGrid } from "animate-css-grid";
import Utilities from "@/utilities";

import ExperienceItem from "@/views/Experience/ExperienceItem.vue";
import ExperienceFilter from "@/views/Experience/ExperienceFilter.vue";
import EmptyFilterDisplay from "@/components/ui/EmptyFilterDisplay.vue";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

let pageAnimatedIn = false;
let forceRunExperienceElsAnims = false;

export default {
    components: {
        experienceItem: ExperienceItem,
        experienceFilter: ExperienceFilter,
        emptyFilterDisplay: EmptyFilterDisplay,
    },
    data() {
        return {
            experienceItemsFiltered: this.experienceItems,
            animateCssGridApplied: false,
        }
    },
    computed: {
        ...mapGetters({
            experienceItems: getterTypes.GET_ALL_EXPERIENCE
        }),
        experienceDataLoaded() {
            return Object.keys(this.experienceItems).length > 0;
        },
        allTags() {
            const tagsSet = new Set();

            Object.values(this.experienceItems).forEach(experienceItem => {
                const tagsRaw = (experienceItem) ? experienceItem.tags : [];
                tagsRaw.forEach(tag => tagsSet.add(tag));
            })

            return [...tagsSet];
        },
        sortedExperienceItemsList() {
            // Sort the experience items
            let aSortedExperienceItems = Utilities.sortStandardItemsObject(this.experienceItems, "title", "endDate");
            return aSortedExperienceItems;
        },
        emptyFilter() {
            return (!this.experienceItemsFiltered) ? false : Object.keys(this.experienceItemsFiltered).length <= 0;
        }
    },
    watch: {
        experienceDataLoaded(isLoaded, wasLoaded) {
            // TODO: if this was fast and the spoof loader is still running, this runs anyways... I should probably fix this eventually
            if (isLoaded && !wasLoaded) {
                this.$nextTick(() => {
                    this.animateInExperienceEls(this.$refs.baseEl);
                    this.initializeGridAnimations();
                });
            }
        }
    },
    mounted() {
        if (this.experienceDataLoaded) {
            this.$nextTick(() => {
                this.animateInExperienceEls(this.$refs.baseEl);
                this.initializeGridAnimations();
            });
        }
    },
    methods: {
        initializeGridAnimations() {
            if (this.animateCssGridApplied) {
                return;
            }

            const gridEl = this.$refs["gridRef"].$el;
            // Wrap with animate-css-grid
            wrapGrid(gridEl);
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
            // Do not run the enter animation if the page has not been animated in yet
            if (!pageAnimatedIn) {
                done();
                return;
            }

            // console.log("Running experience item enter anim for", el);
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        experienceItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        },
        animateInExperienceEls(el) {
            _animateInExperienceEls(el);
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return _enterAnim(el);
    },
    leaveAnim(el) {
        return _leaveAnim(el);
    }
}

const _animateInExperienceEls = (el, ignoreFlags = false, i_tl = null, i_nStartOffset = 0) => {
    return new Promise((resolve, reject) => {
        // Dont run the experience els animation if the page hasn't been animated in yet, unless the force flag is active
        if (!ignoreFlags && !forceRunExperienceElsAnims && !pageAnimatedIn) {
            resolve();
            return;
        }

        console.log("Running experience els animation", el);
        const filterItemEls = el.querySelectorAll(".Experience__filter-item");
        const filterSubScriptEl = el.querySelector(".Experience__filter-sub-script");
        const experienceItemEls = el.querySelectorAll(".Experience__item-content");

        // Kill any running animations
        TweenLite.killTweensOf([...filterItemEls, ...experienceItemEls]);

        const tl = (i_tl) ? i_tl : new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.fromTo(filterSubScriptEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1 }), `-=${i_nStartOffset}`);
        tl.add(
            TweenMax.staggerFromTo(
                filterItemEls,
                0.3,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.1
            ),
            "-=0.5"
        );
        const totalFilterAnimTime = Utilities.totalStaggerTime(0.3, 0.1, filterItemEls.length);
        tl.add(
            TweenMax.staggerFromTo(
                experienceItemEls,
                0.3,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.1
            ),
            `-=${Math.max(0, totalFilterAnimTime - 0.3)}`
        );

        // If we're latching onto another timeline then we don't need this promise
        if (i_tl) {
            resolve();
        }
    })
};

const _enterAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Experience enter anim for", el);

        // Get DOM references
        const titleEl = el.querySelector(".Experience__title");
        const filterItemEls = el.querySelectorAll(".Experience__filter-item");
        const experienceItemEls = el.querySelectorAll(".Experience__item-content");

        // Kill any running animations (that we know are for sure there)
        TweenLite.killTweensOf(titleEl);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => { pageAnimatedIn = true; resolve(); }});
        tl.add(TweenLite.fromTo(titleEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1}));

        // Activate the force flag if there are no filter experience els present
        // This combats the issue where experienceItemEls does not get rendered right away
        if (filterItemEls.length <= 0 || experienceItemEls.length <= 0) {
            forceRunExperienceElsAnims = true;
            return;
        }

        // Run the experience els animations, ignoring any flags
        _animateInExperienceEls(el, true, tl);
    });
};

const _leaveAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Experience leave anim for", el); 

        // Reset
        pageAnimatedIn = false;
        forceRunExperienceElsAnims = false;

        // Get DOM references
        const titleEl = el.querySelector(".Experience__title");
        const filterItemEls = el.querySelectorAll(".Experience__filter-item");
        const filterSubScriptEl = el.querySelector(".Experience__filter-sub-script");
        const experienceItemEls = el.querySelectorAll(".Experience__item-content");

        // Kill any running animations
        TweenLite.killTweensOf([titleEl, ...filterItemEls, ...experienceItemEls]);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.to(titleEl, 0.5, { x: 20, opacity: 0 }));
        tl.add(TweenLite.to(filterSubScriptEl, 0.5, { x: 20, opacity: 0}), "-=0.25");
        tl.add(
            TweenMax.staggerTo(
                filterItemEls,
                0.3,
                { x: 20, opacity: 0 },
                0.1
            ), 
            "-=0.5"
        );
        const totalFilterAnimTime = Utilities.totalStaggerTime(0.3, 0.1, filterItemEls.length);
        tl.add(
            TweenMax.staggerTo(
                experienceItemEls,
                0.3,
                { x: 20, opacity: 0 },
                0.1
            ),
            `-=${totalFilterAnimTime}`
        );
    });
};
</script>

<style lang="scss" scoped>
    .Experience {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .Experience__content {
            position: relative;

            margin-top: 4.5rem;

            max-width: 100rem;
            width: 100%;

            & > .Experience__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & > .Experience__grid {
                position: relative;

                margin-top: 2.5rem;
                margin-bottom: 3rem;

                display: grid;
                grid-row-gap: 2rem;

            }
        }

        // ---------------------
        // --- Media Queries ---
        // ---------------------
        @include respond(big-desktop) {
            margin-right: 20rem;
            margin-left: 20rem;
        }

        @include respond(normal) {
            margin-right: 15rem;
            margin-left: 15rem;
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
</style>
