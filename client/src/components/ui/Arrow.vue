<template>
    <span 
        :class="['Arrow', disabledClasses]"
        @click="onClick"
    >
        <clickable-icon 
            :key="currIconID" 
            class="Arrow__icon"
            :style="iconStyles"
            :name="currIconID"
        >
        </clickable-icon>
    </span>
</template>

<script>
import Utilities from "@/utilities";

import ClickableIcon from "@/components/ui/ClickableIcon.vue";

const DIRECTION_TO_ICON_NAME = {
    "left": "angle-left",
    "right": "angle-right",
    "up": "angle-up",
    "down": "angle-down"
};

export default {
    components: {
        ClickableIcon
    },
    props: {
        direction: {
            type: String,
            default: "right",
            validator(val) {
                return ["right", "left", "up", "down"].indexOf(val) !== -1;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "2.5rem",
            validator(val) {
                return Utilities.isCSSLength(val);
            }
        }
    },
    computed: {
        currIconID() {
            return this.getIconID(this.direction);
        },
        iconStyles() {
            return Utilities.getIconSizeCSSStyles(this.size);
        },
        disabledClasses() {
            return (this.disabled) ? "disabled" : "";
        }
    },
    methods: {
        getIconID(direction) {
            return DIRECTION_TO_ICON_NAME[direction];
        },
        onClick(e) {
            if (this.disabled) {
                e.preventDefault();
                return;
            }
            this.$emit("click", e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .Arrow {
        & .Arrow__icon {
            display: block;

            color: color-link("current_section", "text_color", "primary");

            transition: color 0.4s;
        }


        // -----------------
        // --- Modifiers ---
        // -----------------

        &.disabled {
            & .Arrow__icon {
                color: color-link("current_section", "text_color", "secondary");
            }
        }

        &:not(.disabled):hover {
            cursor: pointer;

            & .Arrow__icon {
                color: color-link("current_section", "accent_color", "primary");
            }
        }
    }
</style>
