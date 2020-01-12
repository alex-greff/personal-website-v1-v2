<template>
    <div class="HomeDivider">
        <div class="HomeDivider__home-bg-clip-container">
            <div class="HomeDivider__home-bg-clip"></div>
        </div>
        <div class="HomeDivider__accent-clip"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    // Note: make sure these match the one in Home.vue
    $divider-height: 5rem; 
    $divider-height-mobile: 2rem;

    .HomeDivider {
        position: relative;

        height: $divider-height;
        width: 100%;

        position: absolute;
        bottom: calc(-1 * #{$divider-height});

        background-color: color-link("current_section", "background_color", "primary");

        @include respond(phone) {
            height: $divider-height-mobile;
            bottom: calc(-1 * #{$divider-height-mobile});
        }

        & .HomeDivider__home-bg-clip-container {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            filter: drop-shadow(-4px 4px 7px rgba(0, 0, 0, 0.5));

            z-index: 2;

            & .HomeDivider__home-bg-clip {
                width: 100%;
                height: 100%;

                clip-path: polygon(100% 0, 0 0, 100% 100%);

                background-color: black; // TODO: theme
            }
        }

        & .HomeDivider__accent-clip {
            position: absolute;
            top: 0;
            left: 0;

            width: 50%;
            height: 100%;

            clip-path: polygon(0 0, 0 100%, 100% 0);

            background-color: color-link("current_section", "accent_color", "primary");

            z-index: 1;
        }
    }
</style>