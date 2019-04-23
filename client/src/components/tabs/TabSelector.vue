<template>
    <a 
        v-if="useLink"
        :class="rootClasses"
        :href="hash"
    >
        <slot></slot>
    </a>
    <component
        :is="tag"
        v-else
        :class="rootClasses"
    >
        <slot></slot>
    </component>
</template>

<script>
export default {
    props: {
        tabName: {
            type: String, 
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        selectedClass: {
            type: String,
            default: "selected",
        },
        disabledClass: {
            type: String,
            default: "disabled",
        },
        customHash: {
            type: String, 
            default: null,
            validator(hash) {
                return hash.startsWith("#");
            }
        },
        useLink: {
            type: Boolean,
            default: true
        },
        tag: {
            type: String,
            default: "div"
        }
    },
    data() {
        return {
            selected: false,
        }
    },
    computed: {
        modifierClasses() {
            let sClasses = "";
            sClasses += (this.selected) ? ` ${this.selectedClass}` : "";
            sClasses += (this.disabled) ? ` ${this.disabledClass}` : "";
            return sClasses;
        },
        rootClasses() {
            let sClasses = "TabSelector";
            sClasses += this.modifierClasses;
            return sClasses;
        },
        hash() {
            return (this.customHash) ? this.customHash : `#${this.tabName.toLowerCase().replace(/ /g, "-")}`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .TabSelector {
        // Anchor reset
        color: inherit;
        text-decoration: inherit;
        cursor: inherit;
    }
</style>