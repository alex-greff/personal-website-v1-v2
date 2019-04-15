<template>
    <span :class="rootClasses">
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        name: { 
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
        }
    },
}
</script>

