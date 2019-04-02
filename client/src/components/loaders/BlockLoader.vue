<template>
    <div ref="baseEl" :v-if="isOpen" :class="backgroundClasses" :style="{ zIndex }">
        <div class="BlockLoader__content">
            <div class="BlockLoader__cell-container">
                <div 
                    v-for="n in numCells"
                    :key="n"
                    :class="`BlockLoader__cell cell-${n}`"
                    :style="{ zIndex: n }"
                >
                    <div class="BlockLoader__cell-inner"></div>
                </div>
            </div>
            <div class="BlockLoader__loading-text">
                Loading
            </div>
        </div>
    </div>
</template>

<script>
import Utilities from "@/utilities";
import { TweenLite, TweenMax, TimelineMax, TimelineLite } from "gsap/all";

// STYLE LINKED CONSTANTS
const FLASH_DURATION = 2000; // NOTE: this MUST correspond with the duration defined in the stylesheets
const NUM_CELLS = 10;

let infiniteTL = null;

export default {
    props: {
        zIndex: {
            type: Number,
            default: 0
        },
        isOpen: {
            type: Boolean,
            default: true  
        },
        controlled: {
            type: Boolean,
            default: false
        },
        displayBackground: {
            type: Boolean,
            default: false
        },
        startOnMount: { // TODO: implement (or not)
            type: Boolean,
            default: false
        },
        // Only used if indefinite is false
        progress: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            numCells: NUM_CELLS,
            infiniteTL: null
        }
    },
    computed: {
        backgroundClasses() {
            let sClasses = "BlockLoader";
            sClasses += (this.displayBackground) ? " display-bg" : "";
            sClasses += (this.isOpen) ? " display" : " hidden";

            return sClasses;
        }
    },
    watch: {
        controlled(willBeControlled) {
            this.initializeAnims(willBeControlled);
        },
        progress(nextProgress) {
            if (this.controlled) {
                this.updateProgresBar(this.$refs.baseEl, nextProgress);
            }
        },
    },
    mounted() {
        this.initializeAnims(this.controlled);    
    },
    methods: {
        initializeAnims(controlled) {
            if (controlled) {
                this.updateProgresBar(this.$refs.baseEl, this.progress, true); // Initialize progress bar
            } else {
                this.runInfiniteAnim(this.$refs.baseEl); // Run infinite anim
            }
        },
        updateProgresBar(el, percent, clearAnims) {
            _updateProgresBar(el, percent, clearAnims);
        },
        getActiveCells(i_aCellEls, i_nCurrPercent) {
            _getActiveCells(i_aCellEls, i_nCurrPercent);
        },
        runInfiniteAnim(el) {
            _runInfiniteAnim(el);
        },
        killInfiniteTL() {
            _killInfiniteTL();
        },
    },
    spoofLoadAnim(el) {
        return new Promise( async (resolve) => {
            await _enterAnim(el); // Run enter anim
            
            // Reset progress bar
            _updateProgresBar(el, 0, true);

            // Setup spoof animation
            const progressObj = { progress: 0 };
            const ON_UPDATE = () => _updateProgresBar(el, progressObj.progress);

            const STEPS = [
                { duration: 0.1, percent: 0.2 },
                { duration: 0.5, percent: 0.5 },
                { duration: 0.1, percent: 0.75 },
                { duration: 0.3, percent: 1.0 },
            ];

            // Run animation
            const tl = new TimelineMax({
                delay: 0.2,
                onComplete: async () => {
                    // Run close anim
                    await _completeAnim(el);
                    resolve();
                }
            });

            for (const STEP of STEPS) {
                tl.add(TweenLite.to(progressObj, STEP.duration, { progress: STEP.percent, onUpdate: ON_UPDATE }));
            }
        });
    },
    enterAnim(el) {
        _enterAnim(el);
    },
    completeAnim(el) {
        _completeAnim(el);
    }
}

const _updateProgresBar = (el, percent, clearAnims = false) => {
    // NOTE: gotta be careful about multiple BlockLoader instances (highly not recommended to do)
    const cellEls = el.querySelectorAll(".BlockLoader__cell");
    const aCellEls = Array.from(cellEls); // Convert into an array

    if (clearAnims) {
        // Clear anims
        TweenMax.killTweensOf(cellEls);
        _killInfiniteTL();
    }

    // Get cells to activate
    const activeCells = _getActiveCells(aCellEls, percent);
    const inactiveCells = Utilities.difference(aCellEls, activeCells);

    // Apply .active class to active cells
    activeCells.forEach(cell => {
        Utilities.addClass("active", cell);
    });
    
    // Remove .active class from inactive cells
    inactiveCells.forEach(cell => {
        Utilities.removeClass("active", cell);
    });
};

const _getActiveCells = (i_aCellEls, i_nCurrPercent) => {
    const nNumCells = i_aCellEls.length;

    // Get active cells
    return i_aCellEls.reduce((i_aAccumulator, i_currCell, i_nIdx) => {
        const nCellPercent = (i_nIdx + 1)/nNumCells;

        if (i_nCurrPercent >= nCellPercent) {
            return [ ...i_aAccumulator, i_currCell];
        }

        return i_aAccumulator;
    }, []);
};

const _runInfiniteAnim = (el) => {
    const ANIM_DURATION = 0.2;
    const REPEAT_DELAY = 1;
    const CLEAR_TIME = FLASH_DURATION / NUM_CELLS / 1000;

    // NOTE: gotta be careful about multiple BlockLoader instances (highly not recommended to do)
    const cellEls = el.querySelectorAll(".BlockLoader__cell");

    // Clear anims
    TweenLite.killTweensOf(cellEls);
    _killInfiniteTL();

    // Run anims
    const tl = new TimelineMax({ delay: 0.5, repeat: -1, repeatDelay: (CLEAR_TIME + REPEAT_DELAY) });
    cellEls.forEach((cellEl) => {
        const ANIM_OPTIONS = {
            onStart: () => { 
                Utilities.addClass("flash", cellEl);
                setTimeout(() => {
                    Utilities.removeClass("flash", cellEl);
                }, FLASH_DURATION);
            }
        };

        tl.add(TweenLite.to(cellEl, ANIM_DURATION, ANIM_OPTIONS));
    });

    // Save a reference to it
    infiniteTL = tl; 
};

const _killInfiniteTL = () => {
    if (infiniteTL) {
        infiniteTL.kill();
        infiniteTL = null;
    }
}

const _enterAnim = (el) => {
    return new Promise((resolve) => {
        // Get DOM references
        const baseEl = el.querySelector(".BlockLoader"); // TODO: remove
        const contentEl = el.querySelector(".BlockLoader__content");
        const loadingTextEl = el.querySelector(".BlockLoader__loading-text");
        
        // Clear anims
        TweenLite.killTweensOf([baseEl, contentEl, loadingTextEl]);

        // Run anims
        const tl = new TimelineLite({ onComplete: () => resolve() });
        // tl.add(TweenLite.fromTo(baseEl, 0.2, { opacity: 0 }, { opacity: 1 })); // TODO: separate out bg into separate element and animate it here
        tl.add(TweenLite.fromTo(contentEl, 0.5, { opacity: 0 }, { opacity: 1 }));
        tl.add(TweenLite.fromTo(loadingTextEl, 0.5, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }), "-=0.5");
    });
};

const _completeAnim = (el) => {
    return new Promise((resolve, reject) => {
        // Get DOM references
        const baseEl = el.querySelector(".BlockLoader"); // TODO: remove
        const contentEl = el.querySelector(".BlockLoader__content");
        const loadingTextEl = el.querySelector(".BlockLoader__loading-text");
        
        // Clear anims
        TweenLite.killTweensOf([baseEl, contentEl, loadingTextEl]);

        const tl = new TimelineLite({ onComplete: () => resolve() });
        // tl.add(TweenLite.to(baseEl, 0.2, { opacity: 0 })); // TODO: separate out bg into separate element and animate it here
        tl.add(TweenLite.to(contentEl, 0.5, { opacity: 0 }));
        tl.add(TweenLite.to(loadingTextEl, 0.5, { y: 20, opacity: 0 }), "-=0.5");
    });
};

</script>

<style lang="scss" scoped>
    // SCRIPT LINKED VARS
    $NUM-CELLS: 10;
    $FLASH-DURATION: 2s;

    .BlockLoader {
        position: fixed;
        width: 100%;
        height: 100%;

        // Bg display modifiers
        &.display-bg {
            background-color: theme-link("loader", "bg-color", "primary");
        }
        &:not(.display-bg) {
            pointer-events: none;
        }

        // Display modifiers
        &.display {
            display: initial;
        }
        &.hidden {
            display: none;
        }
    }

    .BlockLoader__content {
        pointer-events: initial;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        & .BlockLoader__cell-container {
            & .BlockLoader__cell {
                // Cell config
                $total-cell-length: 30rem;

                $cell-height: 0.7rem;
                $cell-width: $total-cell-length / $NUM-CELLS;
                $cell-tilt: 59deg;
                $space-between: 0rem;

                $gutter-length: $cell-height / tan($cell-tilt);

                display: inline-block;
                position: relative;
                margin-right: $space-between - $gutter-length;

                width: $cell-width;
                height: $cell-height;

                transition: filter 0.2s;

                & .BlockLoader__cell-inner {
                    width: 100%;
                    height: 100%;

                    clip-path: compute-parallelogram-clip-path($cell-height, $cell-tilt);

                    transition: background-color 0.2s;
                }

                // -----------------------
                // --- Modifier mixins ---
                // -----------------------

                @mixin cell-start() {
                    filter: drop-shadow(0 0 5px theme-link("loader", "accent-color", "primary", 0.5));
                }

                @mixin cell-end() {
                    filter: drop-shadow(0 0 0px theme-link("loader", "accent-color", "primary", 0.5));
                }

                @mixin cell-inner-start() {
                    background-color: theme-link("loader", "accent-color", "primary", 1);
                }

                @mixin cell-inner-end() {
                    background-color: theme-link("loader", "accent-color", "primary", 0.1);
                }

                // -----------------
                // --- Modifiers ---
                // -----------------
                &.active {
                    @include cell-start();

                    & .BlockLoader__cell-inner {
                        @include cell-inner-start();
                    }
                }

                &:not(.active) {
                    @include cell-end();

                    & .BlockLoader__cell-inner {
                        @include cell-inner-end();
                    }
                }

                &.flash {
                    $anim-ease: ease-in-out;

                    animation-name: flash-anim;
                    animation-duration: $FLASH-DURATION;
                    animation-timing-function: $anim-ease;

                    & .BlockLoader__cell-inner {
                        animation-name: flash-anim-inner;
                        animation-duration: $FLASH-DURATION;
                        animation-timing-function: $anim-ease;
                    }
                }

                @keyframes flash-anim {
                    0% {
                        @include cell-start();
                    }
                    100% {
                        @include cell-end();
                    }
                }

                @keyframes flash-anim-inner {
                    0% {
                        @include cell-inner-start();
                    }
                    100% {
                        @include cell-inner-end();
                    }
                }
            }

            & .BlockLoader__cell:last-child {
                margin-right: 0;
            }
        }

        & .BlockLoader__loading-text {
            text-align: center;

            color: theme-link("loader", "accent-color", "primary");
        }
    }
</style>

