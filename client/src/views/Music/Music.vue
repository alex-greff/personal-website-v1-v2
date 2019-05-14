<template>
    <div 
        ref="baseEl"
        class="Music"
    >
        <div 
            v-if="tracksLoaded"
            class="Music__content"
        >
            <h1 class="Music__title">
                Music
            </h1>

            <div class="Music__filter-field-container">
                <text-field 
                    v-model="searchFilter"
                    class="Music__filter-field"
                    name="filterTracks"
                    placeholder="Filter Tracks"
                />
            </div>
            
            <transition-group 
                v-if="tracksLoaded"
                ref="gridRef"
                class="Music__tracks-grid"
                tag="div"

                @enter="trackItemEnterAnim"
                @leave="trackItemLeaveAnim"
            >
                <empty-filter-display 
                    key="empty-filter-display"
                    :filter-empty="emptyFilter"
                >
                    No tracks found
                </empty-filter-display>

                <!-- Generate music tracks -->
                <div 
                    v-for="(track) in allTracksFiltered"
                    :key="track.trackID"
                    class="Music__track-container"
                >
                    <sound-cloud-embedded-player
                        class="Music__track"
                        :track-id="track.trackID"
                    />
                </div>
            </transition-group>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';
import Utilities from "@/utilities";
import { wrapGrid } from "animate-css-grid";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

import SoundCloudEmbeddedPlayer from "@/components/embeds/SoundCloudEmbeddedPlayer.vue";
import TextField from "@/components/ui/forms/TextField.vue";
import EmptyFilterDisplay from "@/components/ui/EmptyFilterDisplay.vue";

let pageAnimatedIn = false;
let forceRunTrackElsAnims = false;

const DEBOUNCE_RATE = 500;

export default {
    components: {
        soundCloudEmbeddedPlayer: SoundCloudEmbeddedPlayer,
        textField: TextField,
        emptyFilterDisplay: EmptyFilterDisplay,
    },
    data() {
        return {
            animateCssGridApplied: false,
            searchFilter: "",
            allTracksFiltered: this.allTracks,
            updateFilteredItemsDebounced: Utilities.debounce(this.updateFilteredItems, DEBOUNCE_RATE),
        }
    },
    computed: {
        ...mapGetters({
            allTracks: getterTypes.GET_ALL_TRACKS,
        }),
        tracksLoaded() {
            return this.allTracks.length > 0;
        },
        emptyFilter() {
            return (!this.allTracksFiltered) ? false : Object.keys(this.allTracksFiltered).length <= 0;
        }
    },
    watch: {
        tracksLoaded(isLoaded, wasLoaded) {
            // TODO: if this was fast and the spoof loader is still running, this runs anyways... I should probably fix this eventually
            if (isLoaded && !wasLoaded) {
                this.$nextTick(() => {
                    this.animateInTrackEls(this.$refs.baseEl);
                    this.initializeGridAnimations();
                });
            }
        },
        searchFilter(newSearchFilter) {
            this.updateFilteredItemsDebounced(newSearchFilter);
        }
    },
    mounted() {
        if (this.tracksLoaded) {
            this.$nextTick(() => {
                this.updateFilteredItemsDebounced(this.searchFilter);

                this.animateInTrackEls(this.$refs.baseEl);
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
        updateFilteredItems(i_sSearchFilter) {
            if (!i_sSearchFilter) {
                this.allTracksFiltered = this.allTracks;
                return;
            }

            const aFilteredTracks = this.allTracks.filter(oTrack => {
                return oTrack.title.toLowerCase().includes(i_sSearchFilter.toLowerCase());
            });
            this.allTracksFiltered = aFilteredTracks;
        },
        // -----------------------------
        // --- Track Item Animations ---
        // -----------------------------
        trackItemEnterAnim(el, done) {
            // Do not run the enter animation if the page has not been animated in yet
            if (!pageAnimatedIn) {
                done();
                return;
            }

            console.log("Running track item enter anim for", el);
            const ON_COMPLETE = () => done();
            const DURATION = 0.4;
            TweenLite.fromTo(el, DURATION, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut, onComplete: ON_COMPLETE });
        }, 
        trackItemLeaveAnim(el, done) {
            const ON_COMPLETE = () => done();
            const DURATION = 0.2;
            TweenLite.to(el, DURATION, { opacity: 0, ease: Power1.easeIn, onComplete: ON_COMPLETE });
        },
        animateInTrackEls(el) {
            _animateInTrackEls(el);
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

const _animateInTrackEls = (el, ignoreFlags = false, i_tl = null, i_nStartOffset = 0) => {
    return new Promise((resolve, reject) => {
        // Dont run the track els animation if the page hasn't been animated in yet, unless the force flag is active
        if (!ignoreFlags && !forceRunTrackElsAnims && !pageAnimatedIn) {
            resolve();
            return;
        }

        console.log("Running track els animation", el);
        const trackItemEls = el.querySelectorAll(".Music__track");

        // Kill any running animations
        TweenLite.killTweensOf([...trackItemEls]);

        // Run animations
        const tl = (i_tl) ? i_tl : new TimelineLite({ onComplete: () => { pageAnimatedIn = true; resolve(); }});
        tl.add(
            TweenMax.staggerFromTo(
                trackItemEls,
                0.3,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1 },
                0.1
            ),
            `-=${i_nStartOffset}`
        );

        // If we're latching onto another timeline then we don't need this promise
        if (i_tl) {
            resolve();
        }
    });
};

const _enterAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Music enter anim for", el); 
        
        const titleEl = el.querySelector(".Music__title");
        const searchFieldEl = el.querySelector(".Music__filter-field");
        const trackItemEls = el.querySelectorAll(".Music__track");

        // Kill any running animations (that we know are for sure there)
        TweenLite.killTweensOf([titleEl, searchFieldEl]);

        // Run animations
        const tl = new TimelineLite({ onComplete: () => { pageAnimatedIn = true; resolve(); }});
        tl.add(TweenLite.fromTo(titleEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1}));
        tl.add(TweenLite.fromTo(searchFieldEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1}), "-=0.25");

        // Activate the force flag if there are no filter experience els present
        // This combats the issue where experienceItemEls does not get rendered right away
        if (trackItemEls.length <= 0) {
            forceRunTrackElsAnims = true;
            return;
        }

        // Run the track els animations, ignoring any flags
        _animateInTrackEls(el, true, tl);
    });
};

const _leaveAnim = (el) => {
    return new Promise((resolve, reject) => {
        console.log("Running Music leave anim for", el); 

        const titleEl = el.querySelector(".Music__title");
        const searchFieldEl = el.querySelector(".Music__filter-field");
        const trackItemEls = el.querySelectorAll(".Music__track");

        // Kill any running animations
        TweenLite.killTweensOf([titleEl, searchFieldEl, ...trackItemEls]);

        // Reset
        pageAnimatedIn = false;
        forceRunTrackElsAnims = false;

        // Run animations
        const tl = new TimelineLite({ onComplete: () => resolve() });
        tl.add(TweenLite.to(titleEl, 0.5, { x: 20, opacity: 0 }));
        tl.add(TweenLite.to(searchFieldEl, 0.5, { x: 20, opacity: 0 }), "-=0.25");
        tl.add(
            TweenMax.staggerTo(
                trackItemEls,
                0.3,
                { x: 20, opacity: 0 },
                0.1
            ), 
            "-=0.25"
        );
    });
};
</script>

<style lang="scss" scoped>
    .Music {
        display: flex;
        flex-direction: column;
        align-items: center; 

        & > .Music__content {
            $padding-amount: 2rem;

            position: relative;

            margin-top: 4.5rem;

            max-width: 150rem;
            width: 100vw;

            padding-left: $padding-amount;
            padding-right: $padding-amount;

            & > .Music__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & > .Music__filter-field-container {
                margin-top: 1.5rem;

                display: flex;
                justify-content: flex-end;

                & > .Music__filter-field {
                    max-width: 45rem;

                    @include respond(tab-port) {
                        max-width: none;
                    }
                }
            }

            & > .Music__tracks-grid {
                position: relative;

                margin-top: 1.5rem;
                margin-bottom: 3rem;

                display: grid;
                grid-row-gap: 2.5rem;

                & > .Music__track-container {
                    & > .Music__track {
                        background-color: theme-link("page", "bg-color", "secondary");
                    }
                }
            }
        }
    }
</style>
