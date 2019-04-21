<template>
    <a 
        :class="rootClasses"
        :href="hash"
    >
        <slot></slot>
    </a>
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
        }
    },
    data() {
        return {
            selected: false,
        }
    },
    computed: {
        rootClasses() {
            let sClasses = "TabSelector";
            sClasses += (this.selected) ? ` ${this.selectedClass}` : "";
            sClasses += (this.disabled) ? ` ${this.disabledClass}` : "";
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