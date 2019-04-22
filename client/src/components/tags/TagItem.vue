<template>
    <parallelogram-container :class="tagClasses" v-bind="$attrs">
        <span class="TagItem__content">
            <slot></slot>
        </span>
    </parallelogram-container>
</template>

<script>
import ParallelogramContainer from "@/components/containers/ParallelogramContainer.vue";

export default {
    components: {
        parallelogramContainer: ParallelogramContainer
    },
    props: {
        selectable: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        tagClasses() {
            let sClasses = "TagItem";
            if (this.selectable) {
                sClasses += " selectable";

                if (this.selected) {
                    sClasses += " selected";
                }
            }
            return sClasses;
        }
    },
}
</script>

<style lang="scss" scoped>
    .TagItem {
        display: inline-flex; 

        position: relative;
        background-color: theme-link("projects-item", "selected-color", "primary", 0.5);

        font-size: 1.3rem;

        transition: background-color 0.4s;

        & .TagItem__content {
            width: 100%;

            text-align: center;
            margin: auto;

            padding: 0 0.5rem 0 0.5rem;
        }

        // Modifiers
        &.selectable {
            cursor: pointer;

            &.selected {
                background-color: theme-link("projects-item", "accent-color", "secondary", 0.5);
            }
        }
    }
</style>