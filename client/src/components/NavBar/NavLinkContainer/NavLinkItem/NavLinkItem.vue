<template>
    <router-link
        :to="to"
        tag="div"
        class="NavLinkItem"
        active-class="active"
    >
        <div class="NavLinkItem__content">
            <slot></slot>
        </div>
    </router-link>

    <!-- <div class="NavLinkItem">
        <div class="NavLinkItem__content">
            <slot></slot>
        </div>
    </div> -->
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    // TODO: I need to hook the theme colors up to the lookahead styles for each page
    .NavLinkItem {
        $gutter-length: 3rem;

        position: relative;
        width: 20rem;
        height: 100%;

        background-color: rgba(39, 39, 39, 0.8); // TODO: theme

        transition: background-color 0.3s;

        // Offset for the gaps created by clip-path
        margin-right: calc(-1 * #{$gutter-length});

        // Makes the parallelogram structure
        clip-path: polygon($gutter-length 0%, 100% 0%, calc(100% - #{$gutter-length}) 100%, 0% 100%);

        cursor: pointer;

        $border-width: 2px;
        $border-width-hover: 3px;
        $border-width-active: 6px;

        $offset-difference-hover: $border-width-hover - $border-width;
        $offset-difference-active: $border-width-active - $border-width;

        // Computes the clip-path of the spoof border
        @mixin compute-border-clip-path($gutter-length, $border-width) {
            // top left, top right, bottom right, bottom left
            clip-path: polygon(
                $gutter-length 0%,
                calc(#{$gutter-length} + #{$border-width}) 0%,
                #{$border-width} 100%,
                0% 100%
            );
        }

        // Spoofs as the tilted left-border
        &::before {
            content: "";

            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            width: 100%;

            background-color: rgba(59, 59, 59, 0.8); // TODO: theme

            @include compute-border-clip-path(#{$gutter-length}, #{$border-width});

            transition: clip-path 0.5s, background-color 0.5s;
        }

        & .NavLinkItem__content {
            margin-left: $gutter-length;
            
            max-width: calc(100% - (2 * #{$gutter-length}));

            transition: padding-left 0.5s;

            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }

        // -----------------------
        // --- State modifiers ---
        // -----------------------

        // Hover modifier
        &:hover {
            background-color: rgba(39, 39, 39, 0.98); // TODO: theme

            &::before {
                background-color: rgba(var(--color-accent-primary), 0.8); 

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-hover});
            }

            & .NavLinkItem__content {
                padding-left: #{$offset-difference-hover};
            }
        }

        // Active modifer
        &.active {
            background-color: rgba(39, 39, 39, 0.98); // TODO: theme

            &::before {
                background-color: rgba(var(--color-accent-primary), 0.8); 

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-active});
            }

            & .NavLinkItem__content {
                padding-left: #{$offset-difference-active};
            }
        }
    }
</style>

