<template>
    <span 
        :class="['Arrow', disabledClasses]"
        @click="onClick"
    >
        <md-icon 
            :key="currIconID" 
            class="Arrow__icon"
            :style="iconStyles"
        >
            {{ currIconID }}
        </md-icon>
    </span>
</template>

<script>
import Utilities from "@/utilities"

const DIRECTION_TO_ICON_NAME = {
    "left": "keyboard_arrow_left",
    "right": "keyboard_arrow_right",
    "up": "keyboard_arrow_up",
    "down": "keyboard_arrow_down"
};

export default {
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

            color: theme-link("page", "text-color", "primary");

            transition: color 0.4s;
        }


        // -----------------
        // --- Modifiers ---
        // -----------------

        &.disabled {
            & .Arrow__icon {
                color: theme-link("page", "text-color", "secondary");
            }
        }

        &:not(.disabled):hover {
            cursor: pointer;

            & .Arrow__icon {
                color: theme-link("page", "accent-color", "primary");
            }
        }
    }
</style>
