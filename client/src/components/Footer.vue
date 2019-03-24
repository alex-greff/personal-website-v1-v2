<template>
    <fragment>
        <!-- <div 
            class="FooterBar" 
            @mouseover="setIsOpen(true)" 
            ref="footerBarEl"
            v-show="!displayFooter"
        /> -->

        <footer 
            class="Footer" 
            @mouseenter="setIsOpen(true)"
            @mouseleave="setIsOpen(false)"
            ref="footerEl"
        >
            <div class="Footer__left">
                <!-- Some content can be put in here... -->
            </div>
            <div class="Footer__center">
                <div class="Footer__credits">Designed and Built by Alexander Greff</div>
                <div class="Footer__social-media">
                    <a title="Github" href="https://github.com/alex-greff" target="_blank" class="icon">
                        <i class="fab fa-github"></i>
                    </a>
                    <a title="LinkedIn" href="https://www.linkedin.com/in/alex-greff/" target="_blank" class="icon">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a title="Email" href="mailto:alex.j.greff@gmail.com" target="_top" class="icon">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a title="SoundCloud" href="https://soundcloud.com/hammerled" target="_blank" class="icon">
                        <i class="fab fa-soundcloud"></i>
                    </a>
                </div>
            </div>
            <div class="Footer__right">
                <div class="Footer__right-container">
                    <theme-controls></theme-controls>
                    <div class="Footer__dashboard"><a href="#">Dashboard</a></div>
                </div>
            </div>
        </footer>
    </fragment>
</template>

<script>
    import ThemeControls from './ThemeControls.vue';
    import Utilities from "@/utilities";
    import { TweenMax } from "gsap/all";
    const INIT_IS_OPEN = false;

    export default {
        components: {
            themeControls: ThemeControls
        },
        data() {
            return {
                isOpen: INIT_IS_OPEN,
                displayFooter: INIT_IS_OPEN,
            }
        },
        mounted() {
            this.$refs.footerEl.style.bottom = 
                (this.isOpen) ? 0 : this.computeFooterBottomOffset(this.$refs.footerEl);

            // Setup resize listener 
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
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

                TweenMax.killTweensOf(this.$refs.footerEl);
                TweenMax.killTweensOf(this.$refs.footerBarEl);

                const ANIM_DURATION = 0.2;
                const ANIM_OPTIONS = { bottom: 0, ease: Power1.easeIn };
                TweenMax.to(this.$refs.footerEl, ANIM_DURATION, ANIM_OPTIONS);
            }, 
            hideFooter() {
                TweenMax.killTweensOf(this.$refs.footerEl);
                TweenMax.killTweensOf(this.$refs.footerBarEl);

                const sBottomOffset = this.computeFooterBottomOffset(this.$refs.footerEl);

                const ANIM_DURATION = 0.2;
                const ANIM_ON_COMPLETE = () => this.displayFooter = false;
                const ANIM_OPTIONS = { bottom: sBottomOffset, ease: Power1.easeOut, onComplete: ANIM_ON_COMPLETE };
                TweenMax.to(this.$refs.footerEl, ANIM_DURATION, ANIM_OPTIONS);
            }
        },
        computed: {

        },
        watch: {
            isOpen(isOpening) {
                if (isOpening) {
                    this.showFooter();
                } else {
                    this.hideFooter();
                }
            }
        }
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

        background-color: rgba(39, 39, 39, 0.5); // TODO: theme
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

        // background: rgba(var(--color-footer-bg), 0.5);
        background-color: rgba(39, 39, 39, 0.8); // TODO: theme
        color: rgba(var(--color-footer-text), 1);

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

                & > .icon {
                    font-size: 1.7rem;

                    margin-right: 0.5rem;
                    margin-left: 0.5rem;

                    cursor: pointer;

                    color: inherit;

                    &:hover {
                        color: rgba(var(--color-accent-primary), 1);
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
                        color: rgba(var(--color-accent-primary), 1);
                    }
                }
            }
        }
    }
</style>

