<template>
    <div :class="navBarClasses">
        <div :class="overlayClasses" @click="toggleNavMenu"></div>

        <!-- <md-icon class="NavBar__menu-icon">menu</md-icon> -->
        <div class="NavBar__menu-container" @click="toggleNavMenu">
            <md-icon v-if="isOpen" class="NavBar__menu-icon">close</md-icon>
            <md-icon v-else class="NavBar__menu-icon">menu</md-icon>
        </div>
        <nav-link-container 
            class="NavBar__pages-container"
            :is-open="isOpen"
            :pages="pages"
            :display-mode="displayMode"
            :set-nav-open="setNavOpen"
        />
    </div>
</template>

<script>
import Utilities from "@/utilities";
import { getAllRouterLinks } from "@/constants/pageData";

import NavLinkContainer from "@/components/NavBar/NavLinkContainer/NavLinkContainer.vue";

const INIT_OPEN_STATE = false;

export default {
    components: {
        navLinkContainer: NavLinkContainer
    }, 
    data() {
        return {
            isOpen: INIT_OPEN_STATE,
            displayMode: "desktop",
            displayOverlay: INIT_OPEN_STATE,
            pages: [
                ...getAllRouterLinks()
            ],
        }
    },
    computed: {
        navBarClasses() {
            return `NavBar ${this.displayMode}`;
        },
        overlayClasses() {
            return `NavBar__overlay ${(this.displayOverlay) ? "" : "hidden"}`.trim();
        }
    },
    watch: {
        isOpen(isOpening, isCurrentlyOpen) {
            if (isOpening) {
                this.showOverlay();
            }
            else {
                this.hideOverlay();
            }
        }
    },
    mounted() {
        // Initial screen sizecheck
        this.onResize(window.innerWidth, window.innerHeight);

        // Watch screen width
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.onResize(window.innerWidth, window.innerHeight);
            });
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize(i_nNewWidth, i_nNewHeight) {
            this.determineDisplayMode(i_nNewWidth);
        },
        determineDisplayMode(i_nWidth) {
            if (Utilities.isInBreakpoint("phone", i_nWidth)) {
                this.displayMode = "mobile";
            } else {
                this.displayMode = "desktop";
            }
        },
        toggleNavMenu() {
            this.isOpen = !this.isOpen;
        },
        setNavOpen(i_bIsOpen) {
            this.isOpen = i_bIsOpen;
        },
        showOverlay() {
            this.displayOverlay = true;
        },
        hideOverlay() {
            this.displayOverlay = false;
        }
    },
}
</script>

<style lang="scss" scoped>
    .NavBar {
        position: fixed;
        top: 0;
        right: 0;

        width: 100%;

        z-index: 10;

        pointer-events: none;
    
        & .NavBar__menu-container {
            $menu-btn-size: 4rem;

            width: $menu-btn-size;
            height: $menu-btn-size;

            z-index: 2;

            pointer-events: all;

            & .NavBar__menu-icon {
                @include icon-size($menu-btn-size);
            }
        }

        &.desktop {
            display: flex;
            flex-direction: row-reverse;
            align-items: flex-start;
            flex-wrap: nowrap;
            // display: inline;

            & .NavBar__pages-container {
                flex-grow: 1;
                flex-shrink: 1;
            }

            & .NavBar__menu-container {
                flex-grow: 0;
                flex-shrink: 0;
            }

            & > .NavBar__overlay {
                display: none;
            }
        }

        &.mobile {
            display: block;
            height: 100%;

            & .NavBar__pages-container {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }

            & .NavBar__menu-container {
                position: absolute;
                top: 0;
                right: 0;
            }

            & > .NavBar__overlay {
                display: initial;
            }
        }
        
        & > .NavBar__overlay {
            position: fixed;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            pointer-events: all;

            background-color: rgba(0, 0, 0, 0.815); // TODO: theme

            transition: background-color 0.2s;

            &.hidden {
                pointer-events: none;

                background-color: rgba(0, 0, 0, 0); // TODO: theme
            }
        }
    }

</style>


