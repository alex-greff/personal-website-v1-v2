<template>
    <div class="ExpandableContainer">
        <div 
            class="ExpandableContainer__content-container"
            :style="[opacityGradientStyles, heightStyles]"
        >
            <div 
                ref="contentEl"
                class="ExpandableContainer__content"
            >
                <slot></slot>
            </div>
            <div 
                ref="minimizedPlaceholderEl"
                class="ExpandableContainer__minimized-placeholder" 
                :style="placeholderStyles"
            />
        </div>
        <div class="ExpandableContainer__toggle-container">
            <flippable-arrow
                v-if="expandable"
                class="ExpandableContainer__toggle-button"
                :direction="arrowDirection"
                size="2.5rem"
                @click="toggleExpanded"
            />
        </div>
    </div>
</template>

<script>
import Utilities from "@/utilities";
import { TweenLite } from "gsap/all";

import FlippableArrow from "@/components/ui/FlippableArrow.vue";

export default {
    components: {
        flippableArrow: FlippableArrow,
    },
    props: {
        minimizedHeight: {
            type: String,
            default: "10rem",
            validator(val) {
                return Utilities.isCSSLength(val);
            }
        },
        defaultExpanded: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            expanded: this.defaultExpanded,
            expandable: true,

            graidentEndOpacity: (this.defaultExpanded) ? 1 : 0,

            // TODO: For the trick
            isMounted: false,
        }
    },
    computed: {
        heightStyles() {
            // TODO: For the trick
            // This tricks vue into updating the refs once they are attached
            if (!this.isMounted) {
                return;
            }

            const contentEl = this.$refs.contentEl;
            const minimizedPlaceholderEl = this.$refs.minimizedPlaceholderEl;

            let nHeight = contentEl.offsetHeight;
            if (this.expandable) {
                nHeight = (this.expanded) ? contentEl.offsetHeight : minimizedPlaceholderEl.offsetHeight;
            }

            return {
                height: `${nHeight}px`
            };
        },
        opacityGradientStyles() {
            // Note: I wasn't able to just toggle a class b/c it made this weird height jumping glitch 
            // Plus I can't animate the graident with CSS anyways
            const nAlpha = this.graidentEndOpacity;
            let sMaskImage = "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,1)))";
            if (this.expandable) {
                sMaskImage = `-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,${nAlpha})))`;
            }

            return {
                "-webkit-mask-image": sMaskImage
            }
        },
        placeholderStyles() {
            return {
                height: this.minimizedHeight
            }
        },
        arrowDirection() {
            return (this.expanded) ? "down" : "up";
        }
    },
    watch: {
        expanded(newExpanded) {
            const nTarget = (newExpanded) ? 1 : 0;

            // Animate gradient 
            TweenLite.to(this.$data, 0.4, { graidentEndOpacity: nTarget });
        },
        '$refs.contentEl.offsetHeight'(newContentHeight) {
            const minimizedPlaceholderEl = this.$refs.minimizedPlaceholderEl;
            this.updateRefsHeight(newContentHeight, minimizedPlaceholderEl.offsetHeight);
        },
        '$refs.minimizedPlaceholderEl.offsetHeight'(newPlaceholderHeight) {
            const contentEl = this.$refs.contentEl;
            this.updateRefsHeight(contentEl.offsetHeight, newPlaceholderHeight);
        }
    },
    mounted() {
        // TODO: For the trick
        this.isMounted = true;

        this.initializeRefsHeight();
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
        },
        initializeRefsHeight() {
            const contentEl = this.$refs.contentEl;
            const minimizedPlaceholderEl = this.$refs.minimizedPlaceholderEl;
            this.updateRefsHeight(contentEl.offsetHeight, minimizedPlaceholderEl.offsetHeight);
        },
        updateRefsHeight(i_nContentHeight, i_nPlaceholderHeight) {
            this.expandable = (i_nContentHeight > i_nPlaceholderHeight);
        }
    }
}
</script>

<style lang="scss" scoped>
    .ExpandableContainer {
        position: relative;
        overflow: hidden;
        
        & .ExpandableContainer__content-container {
            width: 100%;
            height: 100%;
            
            overflow: hidden;

            transition: height 0.4s ease-out;

            & .ExpandableContainer__minimized-placeholder {
                position: absolute;
                visibility: hidden;
                pointer-events: none;

                top: 0;
                left: 0;
                width: 100%;
            }
        }

        & .ExpandableContainer__toggle-container {
            width: 100%;
            height: 2.5rem; // NOTE: make sure this matches what was set on flippable-arrow

            display: flex;
            justify-content: center;
        }
    }
</style>
