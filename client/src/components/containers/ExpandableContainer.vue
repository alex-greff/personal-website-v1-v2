<template>
    <div 
        class="ExpandableContainer"
    >
        <div 
            class="ExpandableContainer__content-container"
            :style="heightStyles"
        >
            <div 
                :class="['ExpandableContainer__fixed-content', fixedContentClass]"
                :style="[fixedContentStyle]"
                :id="[fixedContentId]"
                ref="fixedContentEl"
            >
                <slot name="fixedContent"></slot>
            </div>

            <div 
                :class="['ExpandableContainer__expandable-content', expdandableContentClass]"
                :style="[expdandableContentStyle]"
                :id="[expdandableContentId]"
                ref="expandableContentEl"
            >
                <slot name="expandableContent"></slot>
            </div>
        </div>

        <div 
            class="ExpandableContainer__toggle-container"
            ref="toggleContainerEl"
        >
            <flippable-arrow
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

const RESIZE_DEBOUNCE_RATE = 20;

export default {
    components: {
        FlippableArrow
    },
    props: {
        defaultExpanded: {
            type: Boolean,
            default: false,
        },
        // Style props
        fixedContentClass: {
            type: String,
            default: null
        },
        fixedContentStyle: {
            type: Object,
            default: null
        },
        fixedContentId: {
            type: String,
            default: null
        },
        expdandableContentClass: {
            type: String,
            default: null
        },
        expdandableContentStyle: {
            type: Object,
            default: null
        },
        expdandableContentId: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            expanded: this.defaultExpanded,

            // NOTE: for the trick
            isMounted: false,

            onResizeDebounced: Utilities.debounce(this.onResize, RESIZE_DEBOUNCE_RATE),

            fixedContentHeight: 0,
            expandableContentHeight: 0,
            toggleContainerHeight: 0
        }
    },
    computed: {
        heightStyles() {
            // NOTE: for the trick
            // This tricks vue into updating the refs once they are attached
            if (!this.isMounted) {
                return {};
            }

            const expandedHeight = `${this.fixedContentHeight + this.expandableContentHeight}px`;
            const nonExpandedHeight = `${this.fixedContentHeight}px`;


            return {
                height: (this.expanded) ? expandedHeight : nonExpandedHeight,
                marginBottom: `${this.toggleContainerHeight}px`
            }
        },
        arrowDirection() {
            return (this.expanded) ? "down" : "up";
        }
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
        },
        computeContainerHeights() {
            if (!this.isMounted) {
                return;
            }

            this.fixedContentHeight = this.$refs.fixedContentEl.offsetHeight;
            this.expandableContentHeight = this.$refs.expandableContentEl.offsetHeight;
            this.toggleContainerHeight = this.$refs.toggleContainerEl.offsetHeight;
        },
        // ----------------------
        // --- Event handlers ---
        // ----------------------
        onResize() {
            this.computeContainerHeights();
        },
        __onResize() {
            this.onResizeDebounced();
        }
    },
    watch: {
        expanded(newExpanded) {
            
        }
    },
    mounted() {
        // NOTE: for the trick
        this.isMounted = true;

        this.$nextTick(() => {
            this.computeContainerHeights();
        });

        if (!this.$isServer)
            window.addEventListener('resize', this.__onResize);
    },
    beforeDestroy() {
        if (!this.$isServer)
            window.removeEventListener('resize', this.__onResize);
    }
}
</script>

<style lang="scss" scoped>
    .ExpandableContainer {
        position: relative;

        & .ExpandableContainer__content-container {
            overflow: hidden;
            transition: height 0.3s;
        }

        & .ExpandableContainer__toggle-container {
            position: absolute;
            bottom: 0;

            width: 100%;
            height: 2.5rem; // NOTE: make sure this matches what was set on flippable-arrow

            display: flex;
            justify-content: center;
        }
    }
</style>