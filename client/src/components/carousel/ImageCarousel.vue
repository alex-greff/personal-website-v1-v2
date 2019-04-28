<template>
    <div 
        class="ImageCarousel"
        @mouseover="onMouseOverHandler"
        @mouseleave="onMouseLeaveHandler"
    >
        <div class="ImageCarousel__content">
            <transition name="fade" mode="out-in">
                <div 
                    :key="index"
                    class="ImageCarousel__image"
                    :style="currImageLinkStyles"
                />
            </transition>
            
            <div class="ImageCarousel__controls">
                <!-- TODO: add controls here -->
                <arrow 
                    class="ImageCarousel__nav-left" 
                    direction="left"
                    @click.native="nextImage(-1, false)"
                >
                    Left arrow
                </arrow>
                <arrow 
                    class="ImageCarousel__nav-right" 
                    direction="right"
                    @click.native="nextImage(1, false)"
                >
                    Right arrow
                </arrow>
            </div>
        </div>
        <div 
            v-if="displayCountdownTimer"
            class="ImageCarousel__timer-display-container"
        >
            <div
                ref="timerDisplayEl" 
                class="ImageCarousel__timer-display" 
            />
        </div>
    </div>
</template>

<script>
import Timer from "tiny-timer";
import { TweenLite } from "gsap/all";

import Arrow from "@/components/ui/Arrow.vue";

export default {
    components: {
        arrow: Arrow,
    },
    props: {
        images: {
            type: Array,
            required: true,
            validator(value) {
                return value.length > 0;
            }
        },
        showNavigationItems: {
            type: Boolean,
            default: true    
        },
        showNavigationArrows: {
            type: Boolean,
            default: true
        },
        showCountdownTimer: {
            type: Boolean,
            default: true,
        },
        enableCountdown: {
            type: Boolean,
            default: true,
        },
        countdownTime: {
            type: Number, // millisections
            default: 6000
        },
        countdownUpdateInterval: {
            type: Number,
            default: 500
        },
        countdownHoverPause: {
            type: Boolean,
            default: true, 
        }, 
        startIndex: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            index: this.startIndex,
            timer: null,
            timerTween: null,
        }
    },
    computed: {
        currImageLinkStyles() {
            const sCurrImageLink = this.images[this.index];
            return { backgroundImage: `url('${sCurrImageLink}')` }
        },
        displayCountdownTimer() {
            return this.showCountdownTimer && this.enableCountdown;
        }
    },
    watch: {
        enableCountdown(enableCountdownPresent) {
            if (enableCountdownPresent) {
                // Start timer only if it is not already running
                if (!this.timer || !this.timer.status === "stopped") {
                    this.startTimer();
                }
            } else {
                // Stop timer if enable countdown is being disabled
                if (this.timer) {
                    this.stopTimer();
                }
            }
        },
        displayCountdownTimer(displayCountdownTimerPresent) {
            // Hot swap in/out the display timer
            if (displayCountdownTimerPresent) {
                this.forceEnableDisplayTimer();
            } else {
                this.forceDisableDisplayTimer();
            }
        }
    },
    mounted() {
        if (this.enableCountdown) {
            this.startTimer();
        }
    },
    beforeDestroy() {
        this.stopTimer();
    },
    methods: {
        startTimer() {
            // Initialize timer if not already done
            if (!this.timer) {
                this.timer = new Timer();
                this.timer.on("done", () => this.nextImage());
            }

            // Start timer
            this.timer.start(this.countdownTime, this.countdownUpdateInterval);

            const timerDisplayEl = this.$refs.timerDisplayEl;
            // Start timer display tween, if needed
            if (this.displayCountdownTimer && timerDisplayEl) {
                this.timerTween = TweenLite.fromTo(timerDisplayEl, this.countdownTime/1000, { width: "0%" }, { width: "100%"});
            }
        },
        stopTimer() {
            this.timer.stop();

            if (this.timerTween) {
                this.timerTween.kill();

                // Reset timer display element
                const timerDisplayEl = this.$refs.timerDisplayEl;
                if (timerDisplayEl) {
                    TweenLite.to(timerDisplayEl, 0, { width: "0%" });
                }
            }
        },
        pauseTimer() {
            this.timer.pause();

            if (this.timerTween) {
                this.timerTween.pause();
            }
        },
        resumeTimer() {
            this.timer.resume();

            if (this.timerTween) {
                this.timerTween.play();
            }
        },
        nextImage(increment = 1, restartTimer = true) {
            // Update index of the current image
            this.index = (this.index + increment) % this.images.length;

            this.stopTimer();

            if (restartTimer || !this.countdownHoverPause) {
                // Restart the timer
                this.startTimer();
            }
        },
        forceEnableDisplayTimer() {
            const timerDisplayEl = this.$refs.timerDisplayEl;
            if (timerDisplayEl) {
                const nCurrTime = this.timer.time;
                const nRemainingTime = this.countdownTime - nCurrTime;

                const nPercentage = nCurrTime / nRemainingTime * 100;
                const sStartWidth = `${nPercentage}%`;

                this.timerTween = TweenLite.fromTo(timerDisplayEl, nRemainingTime/1000, { width: sStartWidth }, { width: "100%"});
            }
        },
        forceDisableDisplayTimer() {
            if (this.timerTween) {
                this.timerTween.kill();
            }
        },

        // ----------------
        // --- Handlers ---
        // ----------------
        onMouseOverHandler() {
            if (this.countdownHoverPause) {
                this.pauseTimer();
            }
        },
        onMouseLeaveHandler() {
            if (this.timer.status === "paused") {
                this.resumeTimer();
            } else if (this.timer.status === "stopped") {
                this.startTimer();
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .ImageCarousel {
        z-index: -2;

        & > .ImageCarousel__content {
            position: relative;

            background-color: rgba(0, 0, 0, 0);
            transition: background-color 0.4s;

            & > .ImageCarousel__image {
                z-index: -1;

                position: relative;

                // Force 16:9 aspect ratio
                width: 100%;
                padding-bottom: 56.25%;

                background-size: cover;
                background-position: center center;
            }

            & > .ImageCarousel__controls {
                // Initialize as hidden
                opacity: 0;
                pointer-events: none;

                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                transition: opacity 0.4s;

                & > .ImageCarousel__nav-right, & > .ImageCarousel__nav-left {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }

                & > .ImageCarousel__nav-left {
                    left: 0;
                }

                & > .ImageCarousel__nav-right {
                    right: 0;
                }
            }
        }

        & > .ImageCarousel__timer-display-container {
            height: 0.3rem;
            width: 100%;

            // TODO: probably wanna add a theme section
            background-color: theme-link("page", "bg-color", "secondary");

            & > .ImageCarousel__timer-display {
                width: 0%;
                height: 100%;

                background-color: theme-link("page", "accent-color", "secondary");
            }
        }

        // Spoof background
        &::after {
            content: "";

            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;

            background-color: theme-link("page", "bg-color", "secondary");

            z-index: -2;
        }

        // -----------------
        // --- Modifiers ---
        // -----------------
        &:hover {
            & > .ImageCarousel__content {
                background-color: rgba(0, 0, 0, 0.8);

                & > .ImageCarousel__controls {
                    // Show controls
                    opacity: 1;
                    pointer-events: initial;
                } 
            }
        }
    }
</style>