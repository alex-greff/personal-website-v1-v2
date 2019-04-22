<template>
    <component 
        :is="tag"
        class="ParallelogramContainer"
        :style="parallelogramStyles"
    >
        <slot></slot>
    </component>
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
        tag: {
            type: String,
            default: "div"
        }
    },
    computed: {
        parallelogramStyles() {
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
    }
}
</script>