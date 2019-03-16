<template>
    <div class="NavLinkContainer">
        <!-- TODO: add in the page routes -->
        <!-- <nav-link-item>Something 1</nav-link-item>
        <nav-link-item>Something 2</nav-link-item>
        <nav-link-item>Something 3</nav-link-item> -->

        <nav-link-item 
            v-for="page in navLinkPagesData" 
            :key="page.name"

            :style="navLinkStyles"

            :to="page.path"
            ref="navLinkRefs"
        >
            {{ page.name }}
        </nav-link-item>
    </div>
</template>

<script>
import NavLinkItem from "@/components/NavBar/NavLinkContainer/NavLinkItem/NavLinkItem.vue";

import { TweenMax } from "gsap/all";

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
            displayNavItems: this.isOpen // Initialize to the init isOpen prop
        }
    },
    methods: {
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
            TweenMax.staggerTo(this.navLinkEls, ANIM_DURATION, ANIM_OPTIONS, ANIM_STAGGER);
        },
        closeNavItems() {
            // Stop the open animation if it's running
            TweenMax.killTweensOf(this.navLinkEls);

            // Run the close animation
            const ANIM_OPTIONS = { opacity: 0, x: 20, onComplete: () => {
                this._setDisplayNavItems(false);
            }};
            TweenMax.staggerTo(this.navLinkElsReversed, ANIM_DURATION, ANIM_OPTIONS, ANIM_STAGGER);
        }
    }, 
    mounted() {
        // Initialize the nav item opacities
        this.navLinkEls.forEach(el => {
            el.style.opacity = (this.isOpen) ? 1 : 0;
        });
    },
    computed: {
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
    .NavLinkContainer {
        display: flex;
        flex-direction: row-reverse;

        align-items: center;

        height: 100%;

        margin-right: 3rem; // TODO: link with $gutter-length in navLinkItem.vue
    }

</style>

