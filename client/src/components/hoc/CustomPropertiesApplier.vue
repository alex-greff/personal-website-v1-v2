<template>
    <component :is="tag" :style="cssStyles">
        <slot></slot>
    </component>
</template>


<script>
import * as Utilities from "@/utilities";

export default {
    props: {
        properties: {
            type: Object,
            default() { return {} },
            validator(i_oProperties) {
                return Object.keys(i_oProperties).every((i_sCSSVarName) => {
                    return i_sCSSVarName.startsWith("--");
                });
            }
        },
        tag: {
            type: String,
            default: "div"
        },
        useRoot: {
            type: Boolean,
            default: false
        },
        useEl: {
            type: Boolean,
            required: false,
            default: undefined
        },
        el: {
            type: HTMLDivElement,
            required: false, 
            default: undefined
        }
    },
    data() {
        return {
            currentlyUsingRoot: false
        }
    },
    computed: {
        cssStyles() {
            return (this.useRoot || this.useEl) ? {} : { ...this.properties };
        }
    },
    watch: {
        // Watch for when useRoot changes
        useRoot(nextUseRoot) {
            this.validateProps(nextUseRoot, this.useEl, this.el);
            this.updateRootStyles(nextUseRoot, this.properties);
        },
        // Watch for when useEl changes
        useEl(nextUseEl) {
            this.validateProps(this.useRoot, nextUseEl, this.el);
            this.updateUseElementStyles(nextUseEl, this.el, this.properties);
        },
        el(nextEl) {
            this.validateProps(this.useRoot, this.useEl, nextEl);
            this.updateUseElementStyles(this.useEl, nextEl, this.properties);
        },
        // Watch for when properties changes (because of the async theme loading)
        properties(newProperties) {
            this.updateRootStyles(this.useRoot, newProperties);
            this.updateUseElementStyles(this.useEl, this.el, newProperties);
        }
    },
    created() {
        this.validateProps();
    },
    mounted() {
        if (this.useRoot) {
            this.currentlyUsingRoot = true;
        }

        this.updateRootStyles(this.useRoot, this.properties);
        this.updateUseElementStyles(this.useEl, this.el, this.properties);
    },
    methods: {
        validateProps(i_bUseRoot, i_bUseEl, i_el) {
            const bBothExist = !!i_bUseRoot && !!i_bUseEl;

            if (bBothExist) {
                throw `Error: only one of props 'useRoot' and 'useEl' can be specified at once`;
            }

            if (i_bUseEl && !i_el) {
                throw `Error: el must be specified when useEl is 'true'`;
            }
        },
        updateRootStyles(i_bUseRoot, i_oProperties) {
            if (i_bUseRoot) {
                Object.entries(i_oProperties).forEach(([name, value]) => {
                    Utilities.saveCSSProperty(name, value);
                });
                this.currentlyUsingRoot = true;
            }

            if (!i_bUseRoot && this.currentlyUsingRoot) {
                Object.keys(i_oProperties).forEach(name => {
                    Utilities.removeCSSProperty(name);
                });
                this.currentlyUsingRoot = false;
            }
        },
        updateUseElementStyles(i_bUseEl, i_el, i_oProperties) {
            if (this.useRoot || !i_el) {
                return;
            }

            if (i_bUseEl) {
                Object.entries(i_oProperties).forEach(([name, value]) => {
                    Utilities.saveCSSProperty(name, value, i_el);
                });
            } else {
                Object.keys(i_oProperties).forEach(name => {
                    Utilities.removeCSSProperty(name, i_el);
                });
            }
        }
    }
}
</script>
