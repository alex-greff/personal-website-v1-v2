<template>
    <div :class="['DoubleDoubleSpinner', size]" />
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: "small",
            validator(val) {
                return ["small", "medium", "large"].indexOf(val) > -1;
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    @mixin generateSpinner($size: 2rem, $thickness: 0.2rem) {
        width: $size;
        height: $size;

        &::before {
            content: '';
            position: absolute;
            box-sizing: border-box;
            top: 0;
            left: 0;
            width: $size;
            height: $size;
            border-top: $thickness solid color-link("current_section", "accent_color", "primary", 0.5);
            border-right: $thickness solid transparent;
            border-bottom: $thickness solid color-link("current_section", "accent_color", "primary", 1);
            border-left: $thickness solid transparent;
            border-radius: 50%;
            animation: spin 0.9s ease 0.1s infinite;
        }

        &::after {
            content: '';
            position: absolute;
            box-sizing: border-box;
            top: $thickness;
            left: $thickness;
            width: calc(#{$size} - #{$thickness * 2});
            height: calc(#{$size} - #{$thickness * 2});
            border-top: $thickness solid color-link("current_section", "accent_color", "primary", 0.75);
            border-right: $thickness solid transparent;
            border-bottom: $thickness solid color-link("current_section", "accent_color", "primary", 0.25);
            border-left: $thickness solid transparent;
            border-radius: 50%;
            animation: spin-backwards 0.9s ease 0.1s infinite;
        }
    }

    .DoubleDoubleSpinner {
        display: inline-block;
        position: relative;

        // Generate spinner with the default size config
        @include generateSpinner();

        // ----------------------
        // --- Size modifiers ---
        // ----------------------
        &.small {
            @include generateSpinner(2rem, 0.2rem);
        }

        &.medium {
            @include generateSpinner(3rem, 0.3rem);
        }

        &.large {
            @include generateSpinner(6rem, 0.6rem);
        }
    }

    // ---------------------------
    // --- Animation keyframes ---
    // ---------------------------
    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
      }
      
    @keyframes spin-backwards {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(-360deg);
        }
    }
</style>