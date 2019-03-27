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
        tag: {
            type: String,
            default: "div"
        },
        useRoot: {
            type: Boolean,
            default: false
        },
        useEl: {
            type: HTMLDivElement,
            required: false,
            default: undefined
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
            this.validateProps(nextUseRoot, this.useEl);

            this.updateRootStyles(nextUseRoot, this.properties);
        },
        // Watch for when useEl changes
        useEl(nextUseEl) {
            this.validateProps(this.useRoot, nextUseEl);

            this.updateUseElementStyles(nextUseEl, this.properties);
        },
        // Watch for when properties changes (because of the async theme loading)
        properties(newProperties) {
            this.updateRootStyles(this.useRoot, newProperties);
            this.updateUseElementStyles(this.useEl, newProperties);
        }
    },
    created() {
        this.validateProps();
    },
    mounted() {
        this.updateRootStyles(this.useRoot, this.properties);
        this.updateUseElementStyles(this.useEl, this.properties);
    },
    methods: {
        validateProps(i_bUseRoot, i_useEl) {
            const bBothExist = !!i_bUseRoot && !!i_useEl;

            if (bBothExist) {
                throw `Error: only one of props 'useRoot' and 'useEl' can be specified at once`;
            }
        },
        updateRootStyles(i_bUseRoot, i_oProperties) {
            if (i_bUseRoot) {
                Object.entries(i_oProperties).forEach(([name, value]) => {
                    Utilities.saveCSSProperty(name, value);
                });
            } else {
                Object.keys(i_oProperties).forEach(name => {
                    Utilities.removeCSSProperty(name);
                });
            }
        },
        updateUseElementStyles(i_el, i_oProperties) {
            if (this.useRoot) {
                return;
            }

            if (i_el) {
                Object.entries(i_oProperties).forEach(([name, value]) => {
                    Utilities.saveCSSProperty(name, value, i_el);
                });
            } else {
                Object.keys(i_oProperties).forEach(name => {
                    Utilities.removeCSSProperty(name, i_el);
                });
            }
        }
    },
    render(h){
        return h(this.tag, { style: this.cssStyles }, this.$slots.default);
    },
}
</script>
