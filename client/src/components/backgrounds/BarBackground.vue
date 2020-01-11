<template>
    <div class="BarBackground" :style="{zIndex: zIndex}">
        <div 
            v-for="n in NUM_BARS"
            :key="n"
            ref="barRefs"
            :class="`bar bar-num-${n}`"
        >
            <div class="bar-fill"></div>
        </div>
    </div>
</template>

<script>
/* global Power1 */
import { TweenLite } from "gsap/all";

export default {
    props: {
        zIndex: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            NUM_BARS: 100
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el, i_nDuration = 1.5, i_nDelay = 0) {
        return new Promise((resolve, reject) => {
            // DOM references
            const barBackgroundEl = el.querySelector(".BarBackground");

            // Animate
            TweenLite.fromTo(
                barBackgroundEl, 
                i_nDuration,
                { opacity: 0 }, 
                { opacity: 1, delay: i_nDelay, ease: Power1.easeIn, onComplete: () => resolve() }
            );
        });
    },
    leaveAnim(el, i_nDuration = 1.5, i_nDelay = 0) {
        return new Promise((resolve, reject) => {
            // DOM references
            const barBackgroundEl = el.querySelector(".BarBackground");

            // Animate
            TweenLite.to(
                barBackgroundEl, 
                i_nDuration, 
                { opacity: 0, delay: i_nDelay, ease: Power1.easeOut, onComplete: () => resolve() }
            );
        });
    }
}
</script>

<style lang="scss" scoped>
    .BarBackground {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        overflow: hidden;

        .bar { 
            position: absolute;
            right: 0;
            top: 50%;

            // filter: drop-shadow(0 0 5px theme-link("page", "accent-color", "primary", 0.8));
        }   

        $num-bars: 100;

        // Generate the styling for each bar
        @for $i from 1 through $num-bars {
            .bar-num-#{$i} {
                // The pos of the bar on the triangle
                // Range: 0 = ends, 1 = middle
                $triangle-val: (1 - abs(($i/$num-bars - 0.5))/0.5); 
                $pow-triangle-val: pow-float($triangle-val, 1.5);

                // CONFIG
                $screen-height-amount: 0.85; // O = 0% of the screen, 1 = 100% of the screen
                $min-width: 1;
                $max-width: 90;
                $height-multiplier: 0.8; // Percentage: 0 = no height, 0.5 = half height, 1 = full height, >1 = grow

                // RANDOMNESS CONFIG
                $transform-rand: random-num(-10, 10); //Random offset in px
                $width-rand: random-num(0, 75) * clamp($triangle-val, 0, 1); // Random size offset in px
                $height-rand: random-num(-5, 5); // Random size offset in px

                transform: translateY(calc(#{(($i - 1)/$num-bars*100 - 50) * $screen-height-amount}vh + #{$transform-rand}px));

                width: calc(#{$min-width + $pow-triangle-val * ($max-width - $min-width)}vw + #{$width-rand}px);
                height: calc(#{100/$num-bars * $height-multiplier * $screen-height-amount}vh + #{$height-rand}px);
                

                // $theme-clr: theme-link("page", "accent-color", "primary", 0.3);
                // $them-clr-trans: theme-link("page", "accent-color", "primary", 0);
                $theme-clr: color-link("current_section", "accent_color", "primary", 0.3);
                $them-clr-trans: color-link("current_section", "accent_color", "primary", 0);

                // $grad-rand: random-num(50, 50);
                // background: linear-gradient(to right, $them-clr-trans 0%, $theme-clr percentage($grad-rand/100), $theme-clr 100%);
                // background: linear-gradient(to right, $them-clr-trans 0%, $theme-clr 50%, $theme-clr 100%);

                & .bar-fill {
                    width: 100%;
                    height: 100%;

                    opacity: #{$triangle-val};

                    background: linear-gradient(to right, $them-clr-trans 0%, $theme-clr 50%, $theme-clr 100%);
                }

                $anim-duration: 5; // seconds
                $anim-delay-rand: random-num(0, $anim-duration * 2);

                // Run animation
                animation-name: anim-bar-#{$i};
                animation-direction: alternate;
                // animation-delay: #{$triangle-val * ($anim-duration * 2)}s;
                animation-delay: #{$anim-delay-rand}s;
                animation-duration: #{$anim-duration}s;
                animation-iteration-count: infinite;
                animation-timing-function: ease-in-out;
                animation-fill-mode: both;

                @keyframes anim-bar-#{$i} {
                    0% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.4;
                    }
                }
            }
        }
    }

</style>


