<template>
    <div 
        class="FlippableArrow"
        :style="directionStyles"
    >
        <arrow 
            v-bind="$attrs"
            direction="up"
            @click="$emit('click', $event)"
        />
    </div>
</template>

<script>
import Utilities from "@/utilities";

import Arrow from "@/components/ui/Arrow.vue";

const DIRECTION_MAPPINGS = {
    "up": "0deg",
    "right": "90deg",
    "down": "180deg",
    "left": "270deg"
};

export default {
    components: {
        arrow: Arrow
    },
    props: {
        direction: {
            type: String,
            default: "up",
            validator(val) {
                const bIsDirection = Utilities.isDirection(val);
                const bIsRotation = Utilities.isCSSRotation(val);
                return bIsDirection || bIsRotation;
            }
        },
    }, 
    computed: {
        directionStyles() {
            const sDirection = this.direction;
            const bIsDirection = Utilities.isDirection(sDirection);
            let sRotation = (bIsDirection) ? DIRECTION_MAPPINGS[sDirection] : sDirection;

            return {
                transform: `rotate(${sRotation})`
            };
        }
    },
}
</script>

<style>
    .FlippableArrow {
        transition: transform 0.2s ease;
    }
</style>
