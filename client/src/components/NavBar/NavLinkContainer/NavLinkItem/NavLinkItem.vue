<template>
    <a
        :class="['NavLinkItem', displayMode, modifierClass]"
        :href="`#${link}`"
        ref="baseEl"
    >
        <theme-provider 
            class="NavLinkItem__container"
            :namespace="namespace"
            :use-el="true"
            :el="$refs.baseEl"
        >
            <div class="NavLinkItem__content">
                <slot></slot>
            </div>
        </theme-provider>
    </a>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/types";
import ThemeProvider from "@/components/hoc/ThemeProvider.vue";

// TODO: figure out how to detect which # section is in view and apply the active class when needed
export default {
    components: {
        themeProvider: ThemeProvider,
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        namespace: {
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
        }
    },
    computed: {
        ...mapGetters({
            isAutoThemeEnabled: getterTypes.IS_AUTO_THEME_ENABLED,
            currentStaticThemeNamespace: getterTypes.GET_CURRENT_STATIC_THEME_NAMESPACE 
        }),
        modifierClass() {
            return (this.isOpen) ? "visible" : "hidden";
        }
    }
}
</script>

<style lang="scss" scoped>
    .NavLinkItem {
        flex-grow: 1;
        flex-shrink: 1;

        color: color-link("current_section", "text_color", "primary");
        text-decoration: none;
        font-size: 1.5rem;

        cursor: pointer;
        pointer-events: all;

        &.visible {
            pointer-events: all;
        }

        &.hidden {
            pointer-events: none;
        }

        &:hover {
            text-decoration: none;
        }

        // -----------------------
        // --- Desktop Version ---
        // -----------------------
        &.desktop {
            $tilt-angle: 60deg; 
            $item-length: 20rem;
            $item-height: 5rem; 
            $gutter-length: $item-height / tan($tilt-angle);
            
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

                will-change: transform;

                & .NavLinkItem__content {
                    transition: transform 0.5s;

                    margin-left: 0.5rem;

                    will-change: transform;
                }
            }

            // Computes the clip-path of the spoof border
            @mixin compute-border-clip-path($gutter-length, $border-width: 0) {
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
            }

            // Hover modifier
            &:hover {
                background-color: rgba(39, 39, 39, 0.98); // TODO: theme

                &::before {
                    background-color: color-link("current_section", "accent_color", "primary", 0.8);

                    @include compute-border-clip-path(#{$gutter-length}, #{$border-width-hover});
                }

                & .NavLinkItem__container .NavLinkItem__content {
                    transform: translateX(#{$offset-difference-hover});
                }
            }

            // Active modifer
            &.active {
                background-color: rgba(39, 39, 39, 0.98); // TODO: theme

                &::before {
                    background-color: color-link("current_section", "accent_color", "primary", 0.8);

                    @include compute-border-clip-path(#{$gutter-length}, #{$border-width-active});
                }

                & .NavLinkItem__container .NavLinkItem__content {
                    transform: translateX(#{$offset-difference-active});
                }
            }
        }
    }

    // ----------------------
    // --- Mobile Version ---
    // ----------------------
    .NavLinkItem.mobile {
        $tilt-angle: 60deg; 
        $item-length: 25rem;
        $item-height: 5rem;
        $gutter-length: $item-height / tan($tilt-angle);

        $hover-offset: 1rem;
        $active-offset: 1rem;

        position: relative;
        max-width: $item-length;
        height: $item-height;

        width: 100vw;

        background-color: color-link("current_section", "background_color", "primary", 0.8);

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
        @mixin compute-border-clip-path($gutter-length, $border-width: 0) {
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

            background-color: color-link("current_section", "background_color", "secondary", 0.8);

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
            background-color: color-link("current_section", "background_color", "primary", 0.8);

            max-width: calc(#{$item-length} + #{$hover-offset});

            &::before {
                background-color: color-link("current_section", "accent_color", "primary", 0.8);

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-hover});
            }

            & .NavLinkItem__container .NavLinkItem__content {
                transform: translateX(#{$offset-difference-hover});
            }
        }

        // Active modifer
        &.active {
            background-color: color-link("current_section", "background_color", "primary", 0.98);

            max-width: calc(#{$item-length} + #{$active-offset});

            &::before {
                background-color: color-link("current_section", "accent_color", "primary", 0.8);

                @include compute-border-clip-path(#{$gutter-length}, #{$border-width-active});
            }

            & .NavLinkItem__container .NavLinkItem__content {
                transform: translateX(#{$offset-difference-active});
            }
        }
    }
</style>

