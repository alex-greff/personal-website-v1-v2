<template>
    <div :class="rootClasses">
        <md-icon :key="currIconID" class="Arrow__icon">{{ currIconID }}</md-icon>
    </div>
</template>

<script>
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
            default: "md",
            validator(val) {
                return ["sm", "md", "lg"].indexOf(val) !== -1;
            }
        }
    },
    computed: {
        currIconID() {
            return this.getIconID(this.direction);
        },
        sizeModifierClass() {
            return this.size;
        },
        rootClasses() {
            return `Arrow ${this.sizeModifierClass}`.trim();
        }
    },
    methods: {
        getIconID(direction) {
            return DIRECTION_TO_ICON_NAME[direction];
        }
    }
}
</script>

<style lang="scss" scoped>
    .Arrow {
        color: theme-link("page", "text-color", "primary");

        & .Arrow__icon {
            color: theme-link("page", "text-color", "primary");

            transition: color 0.4s;
        }

        // -----------------
        // --- Modifiers ---
        // -----------------

        // Size
        &.sm {
            & .Arrow__icon {
                @include icon-size(3rem);
            }
        }

        &.md {
            & .Arrow__icon {
                @include icon-size(5rem);
            }
        }

        &.lg {
            & .Arrow__icon {
                @include icon-size(7rem);
            }
        }

        &:hover {
            cursor: pointer;

            & .Arrow__icon {
                color: theme-link("page", "accent-color", "primary");
            }
        }
    }
</style>
