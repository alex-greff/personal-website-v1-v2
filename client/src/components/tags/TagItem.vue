<template>
    <div 
        :class="tagClasses" 
        :style="tagStyles"
    >
        <span class="TagItem__content">
            <slot></slot>
        </span>
    </div>
</template>

<script>
import Utilities from "@/utilities";

export default {
    props: {
        height: { // rem
            type: Number,
            default: 2.5
        },
        tilt: { // deg
            type: Number,
            default: 60
        },
        maxWidth: { // rem
            type: Number,
            default: 15
        },
        spaceBetween: { // rem
            type: Number,
            default: 0.5
        },
        selectable: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        tagStyles() {
            const gutterLength = this.height / Math.tan(this.tilt * Math.PI/180)

            return {
                clipPath: Utilities.computeParallelogramClipPath(this.height, this.tilt),
                marginRight: `${this.spaceBetween - gutterLength}rem`,
                paddingRight: `${gutterLength}rem`,
                paddingLeft: `${gutterLength}rem`,
                height: `${this.height}rem`,
                maxWidth: `${this.maxWidth}rem`
            };
        },
        tagClasses() {
            let sClasses = "TagItem";
            if (this.selectable) {
                sClasses += " selectable";

                if (this.selected) {
                    sClasses += " selected";
                }
            }
            return sClasses;
        }
    },
}
</script>

<style lang="scss" scoped>
    .TagItem {
        display: inline-flex; 

        position: relative;
        background-color: theme-link("projects-item", "selected-color", "primary", 0.5);

        font-size: 1.3rem;

        transition: background-color 0.4s;

        & .TagItem__content {
            width: 100%;

            text-align: center;
            margin: auto;

            padding: 0 0.5rem 0 0.5rem;
        }

        // Modifiers
        &.selectable {
            cursor: pointer;

            &.selected {
                background-color: theme-link("projects-item", "accent-color", "secondary", 0.5);
            }
        }
    }
</style>