<template>
    <filter-controller
        v-bind="$attrs"
        class="ProjectFilter"
    >
        Filter Projects
    </filter-controller>
</template>

<script>
import Filter from "@/components/filter/Filter.vue";

export default {
    components: {
        filterController: Filter,
    },
}
</script>

<style lang="scss" scoped>
    .ProjectFilter {
        margin-top: 2rem;
    }
</style>