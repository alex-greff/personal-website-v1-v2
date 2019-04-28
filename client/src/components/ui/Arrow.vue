<template>
    <div :class="rootClasses">
        <md-icon v-if="isArrowLeft" class="Arrow__icon">keyboard_arrow_left</md-icon>
        <md-icon v-if="isArrowRight" class="Arrow__icon">keyboard_arrow_right</md-icon>
        <md-icon v-if="isArrowUp" class="Arrow__icon">keyboard_arrow_up</md-icon>
        <md-icon v-if="isArrowDown" class="Arrow__icon">keyboard_arrow_down</md-icon>
    </div>
</template>

<script>
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
        isArrowRight() {
            return this.direction === "right";
        },
        isArrowLeft() {
            return this.direction === "left";
        },
        isArrowUp() {
            return this.direction === "up";
        },
        isArrowDown() {
            return this.direction === "down";
        },
        sizeModifierClass() {
            return this.size;
        },
        rootClasses() {
            return `Arrow ${this.sizeModifierClass}`.trim();
        }
    }
}
</script>

<style lang="scss" scoped>
    .Arrow {
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
