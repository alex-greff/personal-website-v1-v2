<template>
    <div :class="displayModeClass">
        <nav-link-item 
            v-for="page in navLinkPagesData" 
            :key="page.name"
            ref="navLinkRefs"

            :style="navLinkStyles"
            :to="page.path"
            :displayMode="displayMode"
        >
            {{ page.name }}
        </nav-link-item>
    </div>
</template>

<script>
import { TweenMax } from "gsap/all";
import Utilities from "@/utilities";

import NavLinkItem from "@/components/NavBar/NavLinkContainer/NavLinkItem/NavLinkItem.vue";

const ANIM_DURATION = 0.3;
const ANIM_STAGGER = 0.05;

export default {
    components: {
        navLinkItem: NavLinkItem
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        pages: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            displayMode: "desktop",
            displayNavItems: this.isOpen, // Initialize to the init isOpen prop
        }
    },
    mounted() {
        // Initial screen sizecheck
        this.onResize(window.innerWidth, window.innerHeight);

        // Watch screen width
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.onResize(window.innerWidth);
            });
        });

        // Initialize the nav item opacities
        this.navLinkEls.forEach(el => {
            el.style.opacity = (this.isOpen) ? 1 : 0;
        });
    },
    methods: {
        onResize(i_nNewWidth, i_nNewHeight) {
            this.determineDisplayModeClass(i_nNewWidth);
        },
        determineDisplayModeClass(i_nWidth) {
            if (Utilities.isInBreakpoint("phone", i_nWidth)) {
                this.displayMode = "mobile";
            } else {
                this.displayMode = "desktop";
            }
        },
        // ---------------------------
        // --- Nav Display Methods ---
        // ---------------------------
        _setDisplayNavItems(i_bIsOpen) {
            this.displayNavItems = i_bIsOpen;
        },
        openNavItems() {
            // Display the nav items
            this._setDisplayNavItems(true);

            // Stop the close animation if it's running
            TweenMax.killTweensOf(this.navLinkElsReversed);

            // Run the open animation
            const ANIM_OPTIONS = { opacity: 1, x: 0 };
            const NAV_LINK_ELS = (this.displayMode === "mobile") ? this.navLinkElsReversed : this.navLinkEls;
            TweenMax.staggerTo(NAV_LINK_ELS, ANIM_DURATION, ANIM_OPTIONS, ANIM_STAGGER);
        },
        closeNavItems() {
            // Stop the open animation if it's running
            TweenMax.killTweensOf(this.navLinkEls);

            // Run the close animation
            const ANIM_OPTIONS = { opacity: 0, x: 20, onComplete: () => {
                this._setDisplayNavItems(false);
            }};
            const NAV_LINK_ELS = (this.displayMode === "mobile") ? this.navLinkEls : this.navLinkElsReversed;
            TweenMax.staggerTo(NAV_LINK_ELS, ANIM_DURATION, ANIM_OPTIONS, ANIM_STAGGER);
        }
    }, 
    computed: {
        displayModeClass() {
            return `NavLinkContainer__${this.displayMode}`;
        },
        // ------------------------------
        // --- NavLink computed props ---
        // ------------------------------
        navLinkPagesData() {
            return this.pages.slice().reverse();
        },
        navLinkStyles() {
            return {
                // Set the display property based on the state of the nav items
                display: (this.displayNavItems) ? "initial" : "none",
            }
        },
        navLinkEls() {
            return this.$refs.navLinkRefs.map(ref => ref.$el);
        },
        navLinkElsReversed() {
            return this.navLinkEls.slice().reverse();
        }
    },
    watch: {
        // Watch when isOpen toggles
        isOpen(isOpening, isCurrenlyOpen) {
            if (isOpening) {
                this.openNavItems();
            }
            else {
                this.closeNavItems();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .NavLinkContainer__desktop {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        margin-right: 3rem; // TODO: link with $gutter-length in navLinkItem.vue
    }

    .NavLinkContainer__mobile {
        display: flex;
        flex-direction: column-reverse;


    }

</style>

