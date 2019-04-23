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
    data() {
        return {
            // TODO: For the trick
            isMounted: false
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
            // TODO: complete stylings
            background-color: red; 
            display: inline-flex;

            cursor: pointer;

            // Anchor reset
            color: inherit;
            text-decoration: inherit;

            & .ProjectDetailsTabSelector__content {
                align-self: center;
            }
        }

        // -----------------
        // --- Modifiers ---
        // -----------------

        &.selected { 
            // TODO: complete
        }

        &.disabled {
            // TODO: complete
        }
    }
</style>
