<template>
    <button
        v-bind="$attrs"
        :class="['ButtonField', { disabled: disabled }]"
        :type="type"
        @click="onClick"
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
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        onClick(e) {
            if (this.disabled) {
                return;
            }
            console.log("emitting click"); // TODO: fix this not not call when disabled == true
            this.$emit("click", e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .ButtonField {
        @include standard-button-styles("contact", false);
    }
</style>
