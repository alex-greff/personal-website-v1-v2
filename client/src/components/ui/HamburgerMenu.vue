<template>
    <div 
        :class="['HamburgerMenu', (open) ? 'open' : '', (disabled) ? 'disabled' : '']"
        :style="baseStyles"
        @click="onClick"
    >
        <span 
            class="HamburgerMenu__bar HamburgerMenu__top-bar"
            :style="barStyles"
        />
        <span 
            class="HamburgerMenu__bar HamburgerMenu__mid-bar-1"
            :style="barStyles"
        />
        <span 
            class="HamburgerMenu__bar HamburgerMenu__mid-bar-2"
            :style="barStyles"
        />
        <span 
            class="HamburgerMenu__bar HamburgerMenu__bottom-bar"
            :style="barStyles"
        />
    </div>
</template>

<script>
import Utilities from "@/utilities";

const HEIGHT_TO_WIDTH_RATIO = 0.6;

export default {
    props: {
        open: {
            type: Boolean, 
            default: false,
        },
        size: {
            type: String,
            default: "3.6rem",
            validator(val) {
                return Utilities.isCSSLength(val);
            }
        },
        barThickness: {
            type: String,
            default: "15%",
            validator(val) {
                return Utilities.isCSSLength(val);
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        baseStyles() {
            return {
                height: `calc(${this.size}*${HEIGHT_TO_WIDTH_RATIO})`,
                width: this.size
            }
        },
        barStyles() {
            return {
                height: `${this.barThickness}`
            }
        }
    },
    methods: {
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
    .HamburgerMenu {
        $anim-duration: 0.5s;

        position: relative;

        cursor: pointer;

        & .HamburgerMenu__bar {
            position: absolute;
            display: block;
            width: 100%;
            background-color: theme-link("navBar__menu", "text-color", "primary");

            border-radius: 2px;

            transition: .3s ease-in-out;
        }

        & .HamburgerMenu__top-bar {
            top: 0;
            left: 0;
            transform: translateY(0);
            opacity: 1;
        }

        & .HamburgerMenu__mid-bar-1 {
            top: 50%;
            transform: translateY(-50%) rotate(0);
        }

        & .HamburgerMenu__mid-bar-2 {
            top: 50%;
            transform: translateY(-50%) rotate(0);
        }

        & .HamburgerMenu__bottom-bar {
            bottom: 0;
            left: 0;
            transform: translateY(0);
            opacity: 1;
        }

        // -----------------
        // --- Modifiers ---
        // -----------------
        &.open {
            & .HamburgerMenu__top-bar {
                width: 0;
                left: 50%;
                top: 50%;
                transform: translateY(-50%);
                opacity: 0;
            }

            & .HamburgerMenu__mid-bar-1 {
                transform: translateY(-50%) rotate(45deg);
            }

            & .HamburgerMenu__mid-bar-2 {
                transform: translateY(-50%) rotate(-45deg);
            }

            & .HamburgerMenu__bottom-bar {
                width: 0;
                left: 50%;
                bottom: 50%;
                transform: translateY(50%);
                opacity: 0;
            }
        }

        &.disabled {
            cursor: initial;
            pointer-events: none;

            & .HamburgerMenu__bar {
                background-color: theme-link("navBar__menu", "text-color", "secondary");
            }
        }
    }
</style>