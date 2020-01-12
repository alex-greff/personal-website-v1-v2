<template>
    <theme-provider 
        :class="['SectionWrapper', marginMode]"
        :id="sanitizedSectionName"
        :namespace="currentNamespace"
        tag="div"
    >
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
        }
    }
}
</script>

<style lang="scss" scoped>
    $side-padding: 1.3rem;

    .SectionWrapper {
        min-height: 100vh;

        // -------------
        // --- Modes ---
        // -------------
        &.wide {
            max-width: calc(100rem - #{$side-padding});

            margin-right: auto;
            margin-left: auto;
        }

        &.narrow {
            max-width: calc(75rem - #{$side-padding});

            margin-right: auto;
            margin-left: auto;
        }

        &.wide, &.narrow {
            padding: 6rem $side-padding 6rem $side-padding;

            @include respond(phone) {
                padding: 2rem $side-padding 2rem $side-padding;
            }
        }

        &.none {
            width: 100%;
        }
    }
</style>