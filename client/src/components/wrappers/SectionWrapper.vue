<template>
    <theme-provider 
        :class="['SectionWrapper', marginMode]"
        :id="sanitizedSectionName"
        :namespace="currentNamespace"
        tag="div"
    >
        <!-- This is needed because putting on the root is a little finicky -->
        <div 
            class="SectionWrapper__waypoint-trigger"
            v-waypoint="{
                active: true,
                callback: onWaypoint,
                options: {
                    // Custom options config
                    root: null,
                    rootMargin: '0px 0px 0px 0px',
                    thresholds: [0, 1]
                }
            }"
        ></div>
        <slot />
    </theme-provider>
</template>

<script>
import ThemeProvider from "@/components/hoc/ThemeProvider.vue";

import { GLOBAL_NAMESPACE } from "../../constants/general";

export default {
    components: {
        ThemeProvider
    },
    props: {
        marginMode: {
            type: String,
            default: "wide",
            validator(val) {
                const options = ["wide", "narrow", "none"];
                return options.includes(val);
            }
        },
        sectionName: {
            type: String, 
            default: null
        }
    },
    computed: {
        sanitizedSectionName() {
            return this.sectionName.toLowerCase();
        },
        currentNamespace() {
            if (!this.sectionName) {
                return GLOBAL_NAMESPACE;
            }

            return this.convertToNamespace(this.sanitizedSectionName);
        }
    },
    methods: {
        convertToNamespace(sectionName) {
            let sanitized = sectionName;

            if (!sanitized.startsWith("section_")) {
                sanitized = `section_${sanitized}`;
            }

            return sanitized;
        },
        onWaypoint({ going, direction }) {
            if (going === this.$waypointMap.GOING_IN) {
                // Update URL hash to current section
                window.location.hash = `#${this.sanitizedSectionName}`;

                this.$emit('sectionEnter');
            }

            if (going === this.$waypointMap.GOING_OUT) {
                this.$emit('sectionLeave');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    $side-padding: 1.3rem;

    .SectionWrapper {
        position: relative;

        min-height: 100vh;

        overflow: hidden;

        & .SectionWrapper__waypoint-trigger {
            position: absolute;

            width: 100%;
            // height: 25%;

            pointer-events: none;

            top: 50%;
            transform: translateY(-50%);
        }

        // -------------
        // --- Modes ---
        // -------------
        &.wide {
            max-width: calc(100rem - #{$side-padding});

            margin-right: auto;
            margin-left: auto;
        }

        &.narrow {
            max-width: calc(90rem - #{$side-padding});

            margin-right: auto;
            margin-left: auto;
        }

        &.wide, &.narrow {
            padding: 6rem $side-padding 6rem $side-padding;

            @include respond(phone) {
                padding: 4rem $side-padding 4rem $side-padding;
            }
        }

        &.none {
            width: 100%;
        }
    }
</style>