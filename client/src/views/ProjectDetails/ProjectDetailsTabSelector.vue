<template>
    <!-- TODO: tab selector doesn't select the whole area -->
    <parallelogram-container class="ProjectDetailsTabSelector" v-bind="$attrs">
        <tab-selector v-bind="$attrs">
            <slot></slot>
        </tab-selector>
    </parallelogram-container>
</template>

<script>
import TabSelector from "@/components/tabs/TabSelector.vue";
import ParallelogramContainer from "@/components/containers/ParallelogramContainer.vue";

export default {
    components: {
        tabSelector: TabSelector,
        parallelogramContainer: ParallelogramContainer
    },
}
</script>

<style lang="scss" scoped>
    .ProjectDetailsTabSelector {

    }
</style>
