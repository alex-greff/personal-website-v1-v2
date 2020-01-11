<template>
    <theme-provider 
        :class="['SectionWrapper', marginMode]"
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
        currentNamespace() {
            if (!this.sectionName) {
                return GLOBAL_NAMESPACE;
            }

            return this.sanitizeSectionName(this.sectionName);
        }
    },
    methods: {
        sanitizeSectionName(sectionName) {
            let sanitized = sectionName.toLowerCase();

            if (!sanitized.startsWith("section_")) {
                sanitized = `section_${sanitized}`;
            }

            return sanitized;
        }
    }
}
</script>

<style lang="scss" scoped>
    .SectionWrapper {
        min-height: 100vh;

        // -------------
        // --- Modes ---
        // -------------
        &.wide {
            max-width: 100rem;

            margin-right: auto;
            margin-left: auto;
        }

        &.narrow {
            max-width: 75rem;

            margin-right: auto;
            margin-left: auto;
        }

        &.none {
            width: 100%;
        }
    }
</style>