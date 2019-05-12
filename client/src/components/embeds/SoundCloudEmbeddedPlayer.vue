<template>
    <div 
        class="SoundCloudEmbeddedPlayer"
        :style="baseStyles"
    >
        <iframe 
            ref="iframeEl"
            class="SoundCloudEmbeddedPlayer__iframe"
            width="100%" 
            height="300" 
            scrolling="no" 
            frameborder="no" 
            allow="autoplay" 
            :src="embedSource"
        ></iframe>
        <transition
            mode="out-in"
            @leave="onLoadCompleteAnimation"
        >
            <div 
                v-if="!iframeLoaded"
                ref="loaderEl"
                class="SoundCloudEmbeddedPlayer__loading-spinner-container"
            >
                <double-double-spinner 
                    class="SoundCloudEmbeddedPlayer__loading-spinner"
                    size="medium"
                />
            </div>
        </transition>
    </div>
</template>

<script>
import { TimelineLite, TweenLite } from "gsap/all";

import DoubleDoubleSpinner from "@/components/ui/spinners/DoubleDoubleSpinner.vue";

export default {
    components: {
        doubleDoubleSpinner: DoubleDoubleSpinner
    },
    props: {
        trackId: {
            type: String || Number,
            required: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        hideRelated: {
            type: Boolean,
            default: true
        },
        showComments: {
            type: Boolean,
            default: true
        },
        showUser: {
            type: Boolean,
            default: true
        },
        showReposts: {
            type: Boolean,
            default: false
        },
        showTeaser: {
            type: Boolean,
            default: false
        },
        visual: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            iframeLoaded: false
        }
    },
    computed: {
        embedSource() {
            return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${this.trackId}&color=%23ff5500&auto_play=${this.autoPlay}&hide_related=${this.hideRelated}&show_comments=${this.showComments}&show_user=${this.showUser}&show_reposts=${this.showReposts}&show_teaser=${this.showTeaser}&visual=${this.visual}`;
        },
        baseStyles() {
            return {
                height: this.height
            };
        }
    },
    mounted() {
        this.setupIFrameOnLoad();
    },
    methods: {
        setupIFrameOnLoad() {
            const iframeEl = this.$refs.iframeEl;

            iframeEl.onload = () => {
                this.iframeLoaded = true;
            }
        },
        onLoadCompleteAnimation(el, done) {
            const iframeEl = this.$refs.iframeEl;
            const loaderEl = this.$refs.loaderEl;

            const tl = new TimelineLite({ onComplete: () => done() });
            tl.add(TweenLite.to(loaderEl, 0.5, { opacity: 0 }));
            tl.add(TweenLite.fromTo(iframeEl, 1, { opacity: 0 }, { opacity: 1 }));
        }
    }
}
</script>

<style lang="scss" scoped>
    .SoundCloudEmbeddedPlayer {
        position: relative;
        width: 100%;

        & > .SoundCloudEmbeddedPlayer__iframe {
            opacity: 0; // Initialize as hidden
        }

        & > .SoundCloudEmbeddedPlayer__loading-spinner-container {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            & > .SoundCloudEmbeddedPlayer__loading-spinner {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
