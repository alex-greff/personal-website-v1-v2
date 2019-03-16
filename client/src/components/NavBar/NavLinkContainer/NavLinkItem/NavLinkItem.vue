<template>
    <router-link
        :to="to"
        tag="div"
        :class="displayModeClasses"
        active-class="active"
        :exact="exact"
    >
        <div class="NavLinkItem__content">
            <slot></slot>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        },
        displayMode: {
            type: String,
            required: true
        },
        exact: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    }, 
    computed: {
        displayModeClasses() {
            return `NavLinkItem ${this.displayMode}`;
        }
    }
}
</script>

<style lang="scss" scoped>
    // Common styles
    // TODO: I need to hook the theme colors up to the lookahead styles for each page
    .NavLinkItem {
        flex-grow: 1;
        flex-shrink: 1;

        cursor: pointer;
    }

    // Desktop version
    .NavLinkItem.desktop {
        $gutter-length: 3rem;
        $item-length: 20rem;
        $item-height: 5rem;

        position: relative;
        max-width: $item-length;
        height: $item-height;

        background-color: rgba(39, 39, 39, 0.8); // TODO: theme

        transition: background-color 0.3s;

        // Offset for the gaps created by clip-path
        margin-right: calc(-1 * #{$gutter-length});

        // Makes the parallelogram structure
        clip-path: polygon($gutter-length 0%, 100% 0%, calc(100% - #{$gutter-length}) 100%, 0% 100%);

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
            margin-right: $gutter-length;

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

    // Mobile version
    .NavLinkItem.mobile {
        $gutter-length: 3rem;
        $item-length: 25rem;
        $item-height: 5rem;

        $hover-offset: 1rem;
        $active-offset: 1rem;

        position: relative;
        max-width: $item-length;
        height: $item-height;

        width: 100vw;

        background-color: rgba(39, 39, 39, 0.8); // TODO: theme

        transition: background-color 0.3s, max-width 0.3s;

        // Makes the parallelogram structure
        clip-path: polygon($gutter-length 0%, 100% 0%, 100% 100%, 0% 100%);

        margin-bottom: .3rem;

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
            margin-right: 1rem;

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

            max-width: calc(#{$item-length} + #{$hover-offset});

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

            max-width: calc(#{$item-length} + #{$active-offset});

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

