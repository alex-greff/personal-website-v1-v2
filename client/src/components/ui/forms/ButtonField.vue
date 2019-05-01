<template>
    <button
        v-bind="$attrs"
        class="ButtonField"
        :type="type"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    components: {
        
    },
    props: {
        type: {
            type: String,
            default: "text",
            validator(val) {
                const validTypes = ["button", "submit", "reset"];
                return validTypes.indexOf(val) > -1;
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .ButtonField {
        @include standard-button-styles("contact", false);
    }
</style>
