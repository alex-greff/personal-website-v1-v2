<template>
    <div class="ProjectFilter">
        <tag-item
            :class="tagItemClasses"
            :selectable="true"
            :selected="showAll"
            :height="height"
            @click.native="selectShowAll"
        >
            {{ mainFilterName }}
        </tag-item>

        <tag-item 
            v-for="(filterState, filterName, index) in filters"
            :key="index"
            :class="tagItemClasses"
            :selectable="true"
            :selected="filterState.selected"
            :height="height"
            @click.native="selectFilter(filterName)"
        >
            {{ filterName }}
        </tag-item>

        <div class="ProjectFilter__sub-script">
            Filter Projects
        </div>
    </div>
</template>

<script>
import TagItem from "@/components/tags/TagItem.vue";
import Vue from 'vue';

export default {
    components: {
        tagItem: TagItem,
    },
    props: {
        mainFilterName: {
            type: String,
            default: "Show All"
        },
        allFilters: {
            type: Array,
            required: true
        },
        filterUpdated: {
            type: Function, // (i_bShowAll, i_aFilterList)
            default: () => {}
        },
        tagClass: {
            type: String,
            default: ""
        },
        height: { // rem
            type: Number,
            default: 2.8,
        }
    },
    data() {
        return {
            showAll: true,
            currFilters: new Set(),
            filterChangeTracker: 0,
            filters: {}
        }
    },
    computed: {
        tagItemClasses() {
            return `ProjectFilter__item ${this.tagClass}`.trim();
        }
    },
    watch: {
        filterChangeTracker() {
            this.updateFilterState(this.allFilters, this.currFilters, this.showAll);
        },
        allFilters(nextAllFilters) {
            this.updateFilterState(nextAllFilters, this.currFilters, this.showAll);
        },
        showAll(nextShowAll) {
            this.updateFilterState(this.allFilters, this.currFilters, nextShowAll);
        }
    },
    mounted() {
        this.updateFilterState(this.allFilters, this.currFilters, this.showAll);
    },
    methods: {
        updateFilterState(allFilters, currFilters, showAll) {
            const newFilter = allFilters.reduce((acc, filter) => {
                return {
                    ...acc,
                    [filter]: {
                        selected: (showAll) ? false : currFilters.has(filter)
                    }
                }
            }, {});

            Vue.set(this, "filters", newFilter);

            this.filterUpdated(this.showAll, this.currFilters);
        },
        selectFilter(i_sFilterName) {
            if (this.showAll) {
                this.currFilters = new Set();
            }

            if (!this.isFilterSelected(i_sFilterName)) {
                this.currFilters.add(i_sFilterName);
                this.filterChangeTracker += 1;
            } else {
                this.currFilters.delete(i_sFilterName);
                this.filterChangeTracker += 1;
            }

            this.showAll = false;
        },
        selectShowAll() {
            this.showAll = !this.showAll;
        },
        isFilterSelected(i_sFilterName) {
            return this.currFilters.has(i_sFilterName);
        }
    }
}
</script>

<style lang="scss" scoped>
    .ProjectFilter {
        & .ProjectFilter__item {
            margin-top: 0.3rem;
            font-size: inherit;
        }

        & .ProjectFilter__sub-script {
            $tilt-angle: 60deg;
            $font-size: 1.3rem;

            margin-top: 0.3rem;
            margin-left: 0.7rem;
            color: theme-link("page", "text-color", "secondary", 0.3);
            font-size: $font-size;
            line-height: $font-size;
            letter-spacing: 0.2rem;
        
            transform: skewX(calc(#{$tilt-angle} - 90deg));
        }
    }
</style>


