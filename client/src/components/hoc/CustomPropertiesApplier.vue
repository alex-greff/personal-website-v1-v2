<template>
    <div :style="cssStyles">
        <slot></slot>
    </div>
</template>

<script>
import Utilities from "@/utilities";

export default {
    props: {
        properties: {
            type: Object,
            default() { return {} },
            validator(i_oProperties) {
                return Object.keys(i_oProperties).every((i_sCSSVarName) => {
                    return Utilities.isValidCSSVar(i_sCSSVarName)
                });
            }
        },
        useRoot: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // Initial root check
        this.updateRootStyles(this.useRoot);
    },
    methods: {
        updateRootStyles(i_bUseRoot) {
            if (i_bUseRoot) {
                Object.entries(this.properties).forEach(([name, value]) => {
                    Utilities.saveCSSProperty(name, value);
                });
            } else {
                Object.keys(this.properties).forEach(name => {
                    Utilities.removeCSSProperty(name);
                });
            }
        }
    },
    computed: {
        cssStyles() {
            return (this.useRoot) ? {} : { ...this.properties };
        }
    },
    watch: {
        // Watch for when useRoot changes
        useRoot(isUsingRoot, wasUsingRoot) {
            this.updateRootStyles(isUsingRoot);
        }
    }
}
</script>
