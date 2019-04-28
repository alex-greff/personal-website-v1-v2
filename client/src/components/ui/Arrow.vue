<template>
    <div :class="rootClasses">
        <md-icon v-if="isLeft" class="Arrow__icon">keyboard_arrow_left</md-icon>
        <md-icon v-if="isRight" class="Arrow__icon">keyboard_arrow_right</md-icon>
    </div>
</template>

<script>
export default {
    props: {
        direction: {
            type: String,
            default: "right",
            validator(val) {
                return ["right", "left"].indexOf(val) !== -1;
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
        isRight() {
            return this.direction === "right";
        },
        isLeft() {
            return this.direction === "left";
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
