<template>
    <router-link
        ref="routerRef"
        :to="to"
        tag="div"
        :class="displayModeClasses"
        active-class="active"
        :exact="exact"
    >
        <theme-provider 
            class="NavLinkItem__container"
            :namespace="currPageNamespace"
            :use-el="true"
            :el="routerEl"
        >
            <div class="NavLinkItem__content">
                <slot></slot>
            </div>
        </theme-provider>
    </router-link>
</template>

<script>
import { getPageTheme } from "@/constants/pageData";
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/types";
import ThemeProvider from "@/components/hoc/ThemeProvider.vue";

export default {
    components: {
        themeProvider: ThemeProvider,
    },
    props: {
        to: {
            type: String,
            required: true
        },
        name: {
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
            // TODO: For the trick
            isMounted: false
        }
    }, 
    computed: {
        ...mapGetters({
            isAutoThemeEnabled: getterTypes.IS_AUTO_THEME_ENABLED,
            currentStaticThemeNamespace: getterTypes.GET_CURRENT_STATIC_THEME_NAMESPACE 
        }),
        displayModeClasses() {
            return `NavLinkItem ${this.displayMode}`;
        },
        currPageNamespace() {
            if(!this.isAutoThemeEnabled) {
                return this.currentStaticThemeNamespace;
            }

            return getPageTheme(this.name).namespace;
        },
        routerEl() {
            // TODO: For the trick
            // This tricks vue into updating the refs once they are attached
            if (!this.isMounted) {
                return;
            }
            return this.$refs.routerRef.$el;
        }
    },
    mounted() {
        // TODO: For the trick
        this.isMounted = true;
    }
}
</script>

<style lang="scss" scoped>
    .NavLinkItem {
        flex-grow: 1;
        flex-shrink: 1;

        cursor: pointer;
        pointer-events: all;

        // -----------------------
        // --- Desktop Version ---
        // -----------------------
        &.desktop {
            $gutter-length: 3rem;
            $item-length: 20rem;
            $item-height: 5rem; 
            
            position: relative;
            max-width: $item-length;
            height: $item-height;

            background-color: rgba(39, 39, 39, 0.8); // TODO: theme
            transition: background-color 0.3s;

            // Make the parallelogram structure
            clip-path: polygon($gutter-length 0%, 100% 0%, calc(100% - #{$gutter-length}) 100%, 0% 100%);

            // Offset for the gaps created by clip-path
            margin-right: calc(-1 * #{$gutter-length});

            & .NavLinkItem__container {
                margin-left: $gutter-length;
                margin-right: $gutter-length;

                position: relative;
                top: 50%;
                transform: translateY(-50%);

                & .NavLinkItem__content {
                    transition: transform 0.5s;
                }
            }

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

            $border-width: 2px;
            $border-width-hover: 3px;
            $border-width-active: 6px;

            $offset-difference-hover: $border-width-hover - $border-width;
            $offset-difference-active: $border-width-active - $border-width;

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

                // box-shadow: 0 0 20px 20px red;
                // filter: drop-shadow(5px 0px 5px rgb(255, 255, 255));
            }

            // Hover modifier
            &:hover {
                background-color: rgba(39, 39, 39, 0.98); // TODO: theme

                &::before {
                    background-color: theme-link("navBar__item", "accent-color", "primary", 0.8);

                    @include compute-border-clip-path(#{$gutter-length}, #{$border-width-hover});
                }

                & .NavLinkItem__container .NavLinkItem__content {
                    // padding-left: #{$offset-difference-hover};
                    transform: translateX(#{$offset-difference-hover});
                }
            }

            // Active modifer
            &.active {
                background-color: rgba(39, 39, 39, 0.98); // TODO: theme

                &::before {
                    background-color: theme-link("navBar__item", "accent-color", "primary", 0.8);

                    @include compute-border-clip-path(#{$gutter-length}, #{$border-width-active});
                }

                & .NavLinkItem__container .NavLinkItem__content {
                    // padding-left: #{$offset-difference-active};
                    transform: translateX(#{$offset-difference-active});
                }
            }
        }
    }

    // ----------------------
    // --- Mobile Version ---
    // ----------------------
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

        background-color: theme-link("navBar__item", "bg-color", "primary", 0.8);

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

            background-color: theme-link("navBar__item", "bg-color", "secondary", 0.8);

            @include compute-border-clip-path(#{$gutter-length}, #{$border-width});

            transition: clip-path 0.5s, background-color 0.5s;
        }

        & .NavLinkItem__container {
            margin-left: $gutter-length;

            position: relative;
            top: 50%;
            transform: translateY(-50%);

            & .NavLinkItem__content {
                transition: transform 0.5s;
            }
        }

        // Hover modifier
        &:hover {
            background-color: theme-link("navBar__item", "bg-color", "primary", 0.8);

            max-width: calc(#{$item-length} + #{$hover-offset});

            &::before {
                background-color: theme-link("navBar__item", "accent-color", "primary", 0.8);

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-hover});
            }

            & .NavLinkItem__container .NavLinkItem__content {
                transform: translateX(#{$offset-difference-hover});
            }
        }

        // Active modifer
        &.active {
            background-color: theme-link("navBar__item", "bg-color", "primary", 0.98);

            max-width: calc(#{$item-length} + #{$active-offset});

            &::before {
                background-color: theme-link("navBar__item", "accent-color", "primary", 0.8);

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-active});
            }

            & .NavLinkItem__container .NavLinkItem__content {
                transform: translateX(#{$offset-difference-active});
            }
        }
    }
</style>

