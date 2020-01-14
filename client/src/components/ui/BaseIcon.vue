<template>
    <div 
        class="BaseIcon"
        :style="sizeStyles"
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
    },
    computed: {
        sizeStyles() {
            return {
                width: this.size,
                height: this.size
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .BaseIcon {
        position: relative;

        pointer-events: all;

        color: color-link("current_section", "text_color", "primary");

        transition: color 0.4s;

        & > svg {
            width: 100%;
            height: 100%;
            
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>