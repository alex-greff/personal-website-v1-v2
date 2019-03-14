<template>
    <div class="NavLinkItem">
        <div class="NavLinkItem__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .NavLinkItem {
        $gutter-length: 3rem;

        position: relative;
        width: 20rem;
        height: 100%;

        background-color: grey; // TODO: theme

        // Offset for the gaps created by clip-path
        margin-right: calc(-1 * #{$gutter-length});

        // Makes the parallelogram structure
        clip-path: polygon($gutter-length 0%, 100% 0%, calc(100% - #{$gutter-length}) 100%, 0% 100%);

        // Spoofs as the tilted left-border
        &::before {
            $border-width: 5px;

            content: "";

            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            width: 100%;

            // TODO: need to hook up this up to the lookahead styles for each page
            background-color: rgba(var(--color-accent-primary), 1); 

            // top left, top right, bottom right, bottom left
            clip-path: polygon(
                $gutter-length 0%,
                calc(#{$gutter-length} + #{$border-width}) 0%,
                $border-width 100%,
                0% 100%
            );
        }

        & .NavLinkItem__content {
            margin-left: $gutter-length;
            
            max-width: calc(100% - (2 * #{$gutter-length}));

            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>

