<template>
    <!-- <fragment> -->
    <div class="Home">
        <div class="home-content">
            <div class="welcome-container">
                <div class="greeting-text">
                    <span class="hi">Hi,&nbsp;</span><span class="my-name-is">my name is</span>
                </div>
                <h1 class="name-text">
                    Alexander Greff
                </h1>
                <div class="info-text">
                    I am a computer science student specializing in software engineering at the 
                    <span class="uni-name">University of Toronto</span>.
                </div>

                <component-button 
                    to="/contact"
                    class="contact-button"
                >
                    Contact Me
                </component-button>
            </div>
            <div class="logo-container">
                <div class="logo-1">
                    <svg viewBox="0 0 16.5 16.5" clipPath="#logo-clip">
                        <use xlink:href="#logo-symbol" href="#logo-symbol" />
                    </svg>
                </div>
                <div class="logo-2">
                    <svg viewBox="0 0 16.5 16.5">
                        <use xlink:href="#logo-symbol" href="#logo-symbol" />
                    </svg>
                </div>
            </div>
        </div>
        <bar-background :z-index="0" />
    </div>
    <!-- </fragment> -->
</template>

<script>
import BarBackground from "@/components/backgrounds/BarBackground.vue";
import ComponentButton from "@/components/ui/ComponentButton.vue";
/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

export default {
    components: {
        barBackground: BarBackground,
        componentButton: ComponentButton,
    },
    data() {
        return {
            firstname: "Alexander",
            lastname: "Greff"
        }
    },
    mounted() {
        // console.log(this.$refs.nameRefs);
    },
    // ------------------
    // --- Animations ---
    // ------------------
    introAnim(el) {
        return new Promise((resolve, reject) => {
            // Get DOM references
            const hiEl = el.querySelector(".hi");
            const myNameIsEl = el.querySelector(".my-name-is");
            const nameEl = el.querySelector(".name-text");
            const infoTextEl = el.querySelector(".info-text");
            const contactBtnEl = el.querySelector(".contact-button");
            const logoEl = el.querySelector(".logo-container");

            // Kill any running animations
            TweenMax.killTweensOf([hiEl, myNameIsEl, nameEl, infoTextEl, contactBtnEl, logoEl]);

            // Run animations
            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.fromTo(hiEl, 1, { opacity: 0 }, { opacity: 1 }));
            tl.add(TweenLite.fromTo(myNameIsEl, 1, { opacity: 0 }, { opacity: 1 }));
            tl.add(
                TweenMax.staggerFromTo(
                    [nameEl, infoTextEl, contactBtnEl], 
                    2,
                    { x: -20, opacity: 0},
                    { x: 0, opacity: 1},
                    0.5
                ), "-=0.2"
            );
            tl.add(TweenLite.fromTo(logoEl, 3, { opacity: 0 }, { opacity: 1, ease: Power1.easeIn }), "-=2");
            tl.add(TweenLite.fromTo(logoEl, 2, { x: 20 }, { x: 0 }), "-=3");

            // Run BarBackground enter anim
            BarBackground.enterAnim(el, 5, 3);
        });
    },
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            // Get DOM references
            const hiEl = el.querySelector(".hi");
            const myNameIsEl = el.querySelector(".my-name-is");
            const nameEl = el.querySelector(".name-text");
            const infoTextEl = el.querySelector(".info-text");
            const contactBtnEl = el.querySelector(".contact-button");
            const logoEl = el.querySelector(".logo-container");

            // Kill any running animations
            TweenMax.killTweensOf([hiEl, myNameIsEl, nameEl, infoTextEl, contactBtnEl, logoEl]);

            // Run animations
            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.fromTo(hiEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1 }));
            tl.add(TweenLite.fromTo(myNameIsEl, 0.5, { x: -20, opacity: 0 }, { x: 0, opacity: 1 }), "-=0.5");
            tl.add(
                TweenMax.staggerFromTo(
                    [nameEl, infoTextEl, contactBtnEl],
                    0.5,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1 },
                    0.15
                ), "-=0.2"
            );
            tl.add(TweenLite.fromTo(logoEl, 1, { x: 20, opacity: 0 }, { x: 0, opacity: 1 }), "-=1");

            BarBackground.enterAnim(el, 1, 0);
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Home leave anim for", el); // TODO: remove

            // Get DOM references
            const hiEl = el.querySelector(".hi");
            const myNameIsEl = el.querySelector(".my-name-is");
            const nameEl = el.querySelector(".name-text");
            const infoTextEl = el.querySelector(".info-text");
            const contactBtnEl = el.querySelector(".contact-button");
            const logoEl = el.querySelector(".logo-container");

            // Kill any running animations
            TweenMax.killTweensOf([hiEl, myNameIsEl, nameEl, infoTextEl, contactBtnEl, logoEl]);

            // Run animations
            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.to(hiEl, 0.5, { x: 20, opacity: 0 }));
            tl.add(TweenLite.to(myNameIsEl, 0.5, { x: 20, opacity: 0 }), "-=0.5");
            tl.add(
                TweenMax.staggerTo(
                    [nameEl, infoTextEl, contactBtnEl],
                    0.5,
                    { x: 20, opacity: 0 },
                    0.15
                ), "-=0.2"
            );
            tl.add(TweenLite.to(logoEl, 1, { x: 20, opacity: 0 }), "-=1.2");

            BarBackground.leaveAnim(el, 1, 0);
        });
    }
}
</script>

<style lang="scss" scoped>
    .Home {
        width: 100%;
        height: 100%;

        overflow: hidden;
    }

    .home-content {
        line-height: normal;

        padding: 0 15rem 0 15rem;

        @include respond(tab-port) {
            padding: 0 5rem 0 5rem;
        }
        @include respond(tab-land) {
            padding: 0 7rem 0 7rem;
        }
        @include respond(phone) {
            padding: 0 2rem 0 2rem;
        }

        display: grid;

        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 0 2.5rem;

        @include respond(tab-port) {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-gap: 2.5rem 0;
        }

        // Vertical align
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        z-index: 1;
    }

    .welcome-container {
        grid-column: 1 / 1;
        grid-row: 1 / 1;

        z-index: 5;

        // Vertical align
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        // Horizontal right align
        margin-left: auto; 
        margin-right: 0;

        @include respond(tab-port) {
            // Horizontal center
            margin-left: auto; 
            margin-right: auto;
        }

        & .greeting-text {
            font-size: 2.5rem;
            font-weight: 400;
        }
        
        & .name-text__char, .hi, .my-name-is {
            display: inline-block;
        }

        & .name-text {
            font-size: 6rem;
            font-weight: bold;

            color: theme-link("page", "accent-color", "primary");


            & .name-text__firstname {
                margin-right: 1.5rem;
            }

            & .name-text__firstname, & .name-text__lastname {
                display: inline-block;
            }

            // text-shadow:
            //     -1px -1px 0 rgba(var(--color-accent-secondary), 1),
            //     1px -1px 0 rgba(var(--color-accent-secondary), 1),
            //     -1px 1px 0 rgba(var(--color-accent-secondary), 1),
            //     1px 1px 0 rgba(var(--color-accent-secondary), 1);
        }

        & .info-text {
            font-size: 1.5rem;

            font-family: 'Montserrat', sans-serif;
            font-weight: 400;

            max-width: 50rem;

            & .uni-name {
                font-size: inherit;

                color: theme-link("page", "accent-color", "primary");
            }
        }

        & .contact-button {
            margin-top: 2.5rem;
        }
    }

    .logo-container {
        grid-column: 2 / 2;
        grid-row: 1 / 1;

        @include respond(tab-port) {
            grid-column: 1 / 1;
        }

        position: relative;

        & .logo-1, & .logo-2 {
            & svg {
                height: 40rem;

                @include respond(tab-port) {
                    height: 30rem;
                }

                @include respond(big-desktop) {
                    height: 50rem;

                }
            }

            @include respond(tab-port) {
                // Center
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            // Vertical center
            top: 50%;
            transform: translateY(-50%);
            // Left align
            left: 0;
        }

        & .logo-1 {
            position: absolute;

            & svg {
                fill: theme-link("page", "accent-color", "primary");

                @include respond(tab-port) {
                    fill: rgb(77, 77, 77); // TODO: put this in the theme?
                }
            }
            
            z-index: 2;
        }

        & .logo-2 {
            position: absolute;

            & svg {
                fill: theme-link("page", "selected-color", "primary", 0.7);

                @include respond(tab-port) {
                    fill: rgb(48, 48, 48); // TODO: put this in the theme?
                }

                // Offset
                transform: translate(0.7rem, 0.7rem);
            }

            z-index: 1;
        }
    }   
</style>

