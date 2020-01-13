<template>
    <div 
        class="ProfileImage"
        :style="[computedStylesRoot]"
    >
        <div 
            class="ProfileImage__trigger-overlay"
            :style="[computedStylesDecorator]"
        ></div>

        <div 
            class="ProfileImage__decorator" 
            :style="[computedStylesDecorator]"
        ></div>

        <g-image 
            class="ProfileImage__image"
            :src="src"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
import Utilities from "@/utilities"

export default {
    props: {
        src: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default: "20rem",
            validator(val) {
                return Utilities.isCSSLength(val);
            }
        }
    },
    computed: {
        computedStylesRoot() {
            return {
                maxWidth: this.size
            }
        },
        computedStylesDecorator() {
            return {
                maxWidth: this.size,
                maxHeight: this.size
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    $accent-offset: 5px;

    .ProfileImage {
        position: relative;

        width: 100%;

        & .ProfileImage__trigger-overlay {
            position: absolute;

            width: 100%;
            height: 100%;

            top: 0;
            left: 0;

            z-index: 3;

            &:hover {
                & + .ProfileImage__decorator {
                    transform: translate(-2px, -2px);
                }
            }
        }

        & .ProfileImage__decorator {
            position: absolute;

            width: calc(100% - #{$accent-offset});
            height: calc(100% - #{$accent-offset});

            top: $accent-offset;
            left: $accent-offset;

            transition: transform 0.4s;

            background-color: color-link("current_section", "accent_color", "secondary", 0.7);

            z-index: 1;
        }

        & .ProfileImage__image {
            position: relative;
            z-index: 2;

            padding-right: $accent-offset;
            padding-bottom: $accent-offset;
        }
    }
</style>