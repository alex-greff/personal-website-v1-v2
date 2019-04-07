<template>
    <div class="TagItem" :style="tagStyles">
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
            default: 59
        },
        maxWidth: { // rem
            type: Number,
            default: 15
        },
        spaceBetween: { // rem
            type: Number,
            default: 0.5
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .TagItem {
        position: relative;
        background-color: theme-link("projects-item", "selected-color", "primary", 0.5);

        display: inline-flex; 

        & .TagItem__content {
            width: 100%;

            text-align: center;
            margin: auto;
        }
    }
</style>