<template>
    <section-wrapper 
        class="Home sr-load-hidden"
        section-name="home"
        margin-mode="none"

        v-if="!$isServer"
        v-scroll-reveal="{
            delay: 0,
            distance: 0,
            duration: 1000
        }"
    >
        <div class="Home__content">
            <div class="Home__welcome-container">
                <div class="Home__greeting-text">
                    <span 
                        class="Home__hi sr-load-hidden"

                        v-if="!$isServer"
                        v-scroll-reveal="{
                            delay: 0,
                            duration: 1000
                        }"
                    >
                        Hi,&nbsp;
                    </span>

                    <span 
                        class="Home__my-name-is sr-load-hidden"

                        v-if="!$isServer"
                        v-scroll-reveal="{
                            delay: 800,
                        }"
                    >
                        my name is
                    </span>
                </div>
                <h1 
                    class="Home__name-text sr-load-hidden"

                    v-if="!$isServer"
                    v-scroll-reveal="{
                        delay: 1300
                    }"
                >
                    {{ $sectionData.name }}
                </h1>

                <div 
                    class="Home__info-text sr-load-hidden"

                    v-if="!$isServer"
                    v-scroll-reveal="{
                        delay: 1800
                    }"
                >
                    <themed-markdown-display :markdown="$sectionData.subText" />
                </div>

                <!-- <component-button 
                    class="Home__contact-button sr-load-hidden"
                    href="#contact"

                    v-if="!$isServer"
                    v-scroll-reveal="{
                        delay: 2300
                    }"
                    v-scroll-to="`#contact`"
                >
                    Contact Me
                </component-button> -->

                <component-button 
                    class="Home__resume-button sr-load-hidden"
                    :href="resumeLink"
                    target="__blank"

                    v-if="!$isServer && resumeLink"
                    v-scroll-reveal="{
                        delay: 2300
                    }"
                >
                    Resume
                </component-button>
            </div>
            <div 
                class="Home__logo-container sr-load-hidden"

                v-if="!$isServer"
                v-scroll-reveal="{
                    duration: 1500,
                    origin: 'right',
                    distance: '30px',
                    delay: 1300
                }"
            >
                <div class="Home__logo-1">
                    <svg viewBox="0 0 16.5 16.5" clipPath="#logo-clip">
                        <use xlink:href="#logo-symbol" href="#logo-symbol" />
                    </svg>
                </div>
                <div class="Home__logo-2">
                    <svg viewBox="0 0 16.5 16.5">
                        <use xlink:href="#logo-symbol" href="#logo-symbol" />
                    </svg>
                </div>
            </div>
        </div>
        <bar-background 
            class="Home__bar-background sr-load-hidden"
            :z-index="0" 

            v-if="!$isServer"
            v-scroll-reveal="{
                duration: 2500,
                origin: 'right',
                distance: 0,
                delay: 1300
            }"
        />
        <home-divider class="Home__divider" />
    </section-wrapper>
</template>

<script>
import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import BarBackground from "@/components/backgrounds/BarBackground.vue";
import ComponentButton from "@/components/ui/ComponentButton.vue";
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";
import HomeDivider from "@/sections/Home/HomeDivider.vue";

/* global Power1 */
import { TweenLite, TweenMax, TimelineLite } from "gsap/all";

export default {
    components: {
        SectionWrapper,
        BarBackground,
        ComponentButton,
        ThemedMarkdownDisplay,
        HomeDivider
    },
    computed: {
        $sectionData() {
            return this.$static.allGeneralData.edges[0].node;
        },
        resumeLink() {
            const linkData = this.$sectionData.links.find(currLink => currLink.type === "resume");

            return (linkData) ? linkData.link : null;
        }
    },
}
</script>

<static-query>
query {
    allGeneralData {
        edges {
            node {
                name
                subText
                links {
                    type
                    link
                }
            }
        }
    }
}
</static-query>

<style lang="scss" scoped>
    // Note: make sure these match the one in Home.vue
    $divider-height: 5rem;
    $divider-height-mobile: 2rem;

    .Home {
        width: 100%;
        height: 100%;

        min-height: calc(100vh + #{$divider-height});

        overflow: hidden;

        background-color: black; // TODO: theme
        // background-color: color-link("current_page", "background_color", "tertiary");

        @include respond(phone) {
            min-height: calc(100vh + #{$divider-height-mobile});
        }
    }

    .Home__content {
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
        transform: translateY(calc(-50% - #{$divider-height} / 2));

        @include respond(phone) {
            transform: translateY(calc(-50% - #{$divider-height-mobile} / 2));
        }

        z-index: 1;
    }

    .Home__welcome-container {
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

        & .Home__greeting-text {
            font-size: 2.5rem;
            font-weight: 400;
        }
        
        & .Home__name-text__char, .Home__hi, .Home__my-name-is {
            display: inline-block;
        }

        & .Home__name-text {
            font-size: 6rem;
            font-weight: bold;

            color: color-link("current_section", "accent_color", "primary");
        }

        & .Home__info-text {
            font-size: 1.5rem;

            font-family: 'Montserrat', sans-serif;

            // Override default 300 weight
            & /deep/ p {
                font-weight: 400;
            }

            max-width: 50rem;
        }

        & .Home__contact-button, & .Home__resume-button {
            margin-top: 2.5rem;
        }

        & .Home__contact-button {
            margin-right: 0.5rem;
        }
    }

    .Home__logo-container {
        grid-column: 2 / 2;
        grid-row: 1 / 1;

        @include respond(tab-port) {
            grid-column: 1 / 1;
        }

        position: relative;

        & .Home__logo-1, & .Home__logo-2 {
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

        & .Home__logo-1 {
            position: absolute;

            & svg {
                fill: color-link("current_section", "accent_color", "primary");

                @include respond(tab-port) {
                    fill: rgb(77, 77, 77); // TODO: put this in the theme?
                }
            }
            
            z-index: 2;
        }

        & .Home__logo-2 {
            position: absolute;

            & svg {
                fill: color-link("current_section", "accent_color", "secondary", 0.7);

                @include respond(tab-port) {
                    fill: rgb(48, 48, 48); // TODO: put this in the theme?
                }

                // Offset
                transform: translate(0.7rem, 0.7rem);
            }

            z-index: 1;
        }
    } 

    .Home__bar-background {
        height: 100vh;
    }
</style>