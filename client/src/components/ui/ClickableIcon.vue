<template>
    <div 
        :class="['ClickableIcon', { disabled }]"
        :style="sizeStyles"
        @click="onClick"
    >
        <fa-icon 
            class="ClickableIcon__icon"
            :name="name"
        />
    </div>
</template>

<script>
import Utilities from "../../utilities";

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            validator(val) {
                return Utilities.isCSSLength(val);
            },
            default: "2rem"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        sizeStyles() {
            return {
                width: this.size,
                height: this.size
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
    },
}
</script>

<style lang="scss" scoped>
    .ClickableIcon {
        position: relative;

        pointer-events: all;
        cursor: pointer;

        color: color-link("current_section", "text_color", "primary");

        transition: color 0.4s;

        & > svg {
            width: 100%;
            height: 100%;
            
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        // -----------------
        // --- Modifiers ---
        // -----------------
        &:hover {
            color: color-link("current_section", "accent_color", "primary");
        }

        &.disabled {
            pointer-events: none;
            color: color-link("current_section", "text_color", "secondary");
        }
    }
</style>