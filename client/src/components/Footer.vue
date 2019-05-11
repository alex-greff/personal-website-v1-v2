<template>
    <fragment>
        <footer
            ref="footerEl"
            class="Footer" 
            @mouseenter="setIsOpen(true)"
            @mouseleave="setIsOpen(false)"
        >
            <div class="Footer__left">
                <!-- Some content can be put in here... -->
            </div>
            <div class="Footer__center">
                <div class="Footer__credits">
                    Designed and Built by Alexander Greff
                </div>
                <div class="Footer__social-media">
                    <link-item 
                        v-for="(link, linkType, index) in aboutData.links"
                        :key="index"
                        class="About__link-item"
                        :link-type="linkType"
                        :title="linkType"
                        :href="`${link}`"
                        :size="1.7"
                    />
                </div>
            </div>
            <div class="Footer__right">
                <div class="Footer__right-container">
                    <theme-controls></theme-controls>
                    <div class="Footer__dashboard">
                        <a href="#">Dashboard</a>
                    </div>
                </div>
            </div>
        </footer>
    </fragment>
</template>

<script>
/* global Power1 */
import Utilities from "@/utilities";
import { TweenLite } from "gsap/all";
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';

import ThemeControls from "@/components/ThemeControls.vue";
import LinkItem from "@/components/links/LinkItem.vue";

const INIT_IS_OPEN = false;

export default {
    components: {
        themeControls: ThemeControls,
        linkItem: LinkItem,
    },
    props: {
        animateIn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: INIT_IS_OPEN,
            displayFooter: INIT_IS_OPEN,
        }
    },
    computed: {
        ...mapGetters({
            aboutData: getterTypes.GET_ABOUT
        }),
        aboutDataLoaded() {
            return Object.keys(this.aboutData).length > 0;
        },
    },
    watch: {
        isOpen(isOpening) {
            if (isOpening) {
                this.showFooter();
            } else {
                this.hideFooter();
            }
        }
    },
    mounted() {
        this.$refs.footerEl.style.bottom = 
            (this.isOpen) ? 0 : this.computeFooterBottomOffset(this.$refs.footerEl);

        // Setup resize listener 
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);

            if (this.animateIn) {
                this.appearAnim();
            }
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            // Recompute and set the value for footer bottom
            this.setFooterBottom();
        },
        setIsOpen(i_sIsOpen) {
            this.isOpen = i_sIsOpen;
        },
        computeFooterBottomOffset(i_elFooter) {
            const FOOTER_BAR_HEIGHT = Utilities.convertRemToPixels(0.8);
            const height = i_elFooter.offsetHeight;

            return (-1 * (height - FOOTER_BAR_HEIGHT)) + "px";
        },
        setFooterBottom() {
            const sNewButtom = this.computeFooterBottomOffset(this.$refs.footerEl);
            this.$refs.footerEl.style.bottom = sNewButtom;
        },
        showFooter() {
            this.displayFooter = true;

            const footerEl = this.$refs.footerEl;

            TweenLite.killTweensOf(footerEl);

            const ANIM_DURATION = 0.2;
            const ANIM_OPTIONS = { bottom: 0, ease: Power1.easeIn };
            TweenLite.to(footerEl, ANIM_DURATION, ANIM_OPTIONS);
        }, 
        hideFooter() {
            const footerEl = this.$refs.footerEl;

            TweenLite.killTweensOf(footerEl);

            const sBottomOffset = this.computeFooterBottomOffset(footerEl);

            const ANIM_DURATION = 0.2;
            const ANIM_ON_COMPLETE = () => this.displayFooter = false;
            const ANIM_OPTIONS = { bottom: sBottomOffset, ease: Power1.easeOut, onComplete: ANIM_ON_COMPLETE };
            TweenLite.to(footerEl, ANIM_DURATION, ANIM_OPTIONS);
        },
        appearAnim() {
            const footerEl = this.$refs.footerEl;
            const sBottomStart = ( -1 * footerEl.offsetHeight) + "px";
            const sBottomEnd = this.computeFooterBottomOffset(footerEl);

            TweenLite.fromTo(
                footerEl, 
                0.5,
                { bottom: sBottomStart },
                { bottom: sBottomEnd, ease: Power1.easeIn }
            );
        }
    },
}
</script>


<style lang="scss">
    // Old sticky footer code
    // TODO: this might not be needed anymore
    #app__base {
        min-height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 1fr auto;
    }
    main {
        flex: 1;
    }

    .FooterBar {
        position: fixed;
        bottom: 0;
        left: 0;

        width: 100%;
        height: .8rem;
        cursor: pointer;

        background-color: theme-link("footer", "bg-color", "primary", 0.5);
    }

    .Footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;

        grid-column: 1 / 1;
        grid-row: 2 / 2;

        font-size: 1.2rem;

        text-align: center;

        grid-row-start: 2;
        grid-row-end: 3;

        padding: 1.3rem;
        z-index: 5;

        color: theme-link("footer", "text-color", "primary");
        background-color: theme-link("footer", "bg-color", "primary", 0.8);

        display: flex;
        justify-content: space-between;

        & .Footer__left {
            margin-right: 0.5rem;
        }

        & .Footer__center {
            margin-left: 0.5rem;
            margin-right: 0.5rem;

            & .Footer__social-media {
                margin-top: 0.5rem;

                display: flex;
                justify-content: center;
                flex-wrap: wrap;

                & > .icon {
                    font-size: 1.7rem;

                    margin-right: 0.5rem;
                    margin-left: 0.5rem;

                    cursor: pointer;

                    color: inherit;

                    &:hover {
                        color: theme-link("footer", "accent-color", "primary");
                    }
                }
            }
        }

        & .Footer__right {
            margin-left: 0.5rem;

            text-align: right;

            display: flex;
            align-items: center;

            & .Footer__dashboard {
                & a {
                    text-decoration: none;
                    color: inherit;

                    &:hover {
                        text-decoration: underline;
                        color: theme-link("footer", "accent-color", "primary");
                    }
                }
            }
        }
    }
</style>

