<template>
    <field-base
        :id="name"
        class="TextAreaField"
        :title="title"
        :error="error"
    >
        <textarea
            :id="name"
            v-bind="$attrs"
            :class="[
                'TextAreaField__text-area',
                { 'error': hasErrors} 
            ]"
            :value="value"
            :disabled="disabled"
            @input="updateValue"
            @change="updateValue"
            @blur="$emit('blur')"
        >
        </textarea>
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
    .TextAreaField {
        & .TextAreaField__text-area {
            width: 100%;
            min-height: 20rem;
            max-height: 50rem;
            resize: vertical;

            @include standard-field-styles("contact");
        }
    }
</style>

