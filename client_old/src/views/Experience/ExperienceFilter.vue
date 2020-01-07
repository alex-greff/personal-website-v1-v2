<template>
    <filter-controller
        v-bind="$attrs"
        class="ExperienceFilter"
    >
        Filter Experience Items
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
    .ExperienceFilter {
        margin-top: 2rem;
    }
</style>