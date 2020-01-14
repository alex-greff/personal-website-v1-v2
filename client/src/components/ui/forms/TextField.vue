<template>
    <field-base
        :id="name"
        class="TextField"
        :title="title"
        :error="error"
    >
        <input 
            :id="name"
            v-bind="$attrs"
            :class="[
                'TextField__input',
                { 'error': hasErrors} 
            ]"
            :type="type"
            :value="value"
            :disabled="disabled"
            @input="updateValue"
            @change="updateValue"
            @blur="$emit('blur')"
        >
    </field-base>
</template>

<script>
import FieldBase from "@/components/ui/forms/FieldBase.vue";

export default {
    // Referenced from: https://baianat.github.io/vee-validate/concepts/components.html#how-it-works
    $_veeValidate: {
        name() {
            return this.name;
        },
        value () {
            return this.value;
        }
    },
    components: {
        fieldBase: FieldBase,
    },
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        error: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "text",
            validator(val) {
                const validTypes = ["url", "text", "password", "email", "search"];
                return validTypes.indexOf(val) > -1;
            }
        },
        // v-model stuff
        value: String,
    },
    computed: {
        hasErrors() {
            return !!this.error;
        }
    },
    methods: {
        // v-model stuff
        updateValue(e) {
            this.$emit("input", e.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
    .TextField {
        & .TextField__input {
            display: inline-block;
            width: 100%;

            @include standard-field-styles();
        }
    }
</style>
