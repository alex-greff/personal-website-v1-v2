<template>
    <div :class="['EmptyFilterDisplay', filterEmpty ? 'empty' : null]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        filterEmpty: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .EmptyFilterDisplay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;

        color: color-link("current_section", "text_color", "secondary", 0.5);
        font-size: 1.5rem;
        line-height: 1.5rem;

        opacity: 0;
        pointer-events: none;

        transition: opacity 0.3s;

        &.empty {
            opacity: 1;
            pointer-events: all;
        }
    }
</style>