<template>
    <!-- NOTE: tabSelectorRef is mandatory -->
    <tab-selector 
        ref="tabSelectorRef"
        class="ProjectDetailsTabSelector"
        v-bind="$attrs"
        :use-link="false"
    >
        <parallelogram-container 
            ref="containerRef"
            class="ProjectDetailsTabSelector__container"
            v-bind="$attrs" 
            tag="a"
            :height="height"
            :tilt="tilt"
            :space-between="spaceBetween"
            :max-width="width"
            :href="passThroughHref"
        >
            <div class="ProjectDetailsTabSelector__content">
                <slot></slot>
            </div> 
        </parallelogram-container>
    </tab-selector>
</template>

<script>
import TabSelector from "@/components/tabs/TabSelector.vue";
import ParallelogramContainer from "@/components/containers/ParallelogramContainer.vue";

export default {
    components: {
        tabSelector: TabSelector,
        parallelogramContainer: ParallelogramContainer
    },
    props: {
        height: { // rem
            type: Number,
            default: 3.5,
        },
        width: {
            type: Number,
            default: 20,
        },
        spaceBetween: { // rem
            type: Number,
            default: 0.5,
        },
        tilt: { // deg
            type: Number,
            default: 60,
        }
    },
    data() {
        return {
            // TODO: For the trick
            isMounted: false,
        }
    },
    computed: {
        passThroughHref() {
            // TODO: For the trick
            // This tricks vue into updating the refs once they are attached
            if (!this.isMounted) {
                return;
            }
            const tabselectorRef = this.$refs.tabSelectorRef;
            return tabselectorRef.hash;
        }
    },
    mounted() {
        // TODO: For the trick
        this.isMounted = true;
    }
}
</script>

<style lang="scss" scoped>
    .ProjectDetailsTabSelector {
        display: inline-block;

        & .ProjectDetailsTabSelector__container {
            width: 100vw;

            display: inline-flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;

            // Anchor reset
            color: inherit;
            text-decoration: inherit;

            background-color: theme-link("page", "bg-color", "secondary");

            & .ProjectDetailsTabSelector__content {
                font-size: 1.8rem;
            }
        }

        // -----------------
        // --- Modifiers ---
        // -----------------

        &.selected { 
            // TODO: complete
            

            & .ProjectDetailsTabSelector__container {
                background-color: theme-link("project-details", "accent-color", "secondary", 0.5);
            }
        }

        &.disabled {
            // TODO: complete
        }
    }
</style>
