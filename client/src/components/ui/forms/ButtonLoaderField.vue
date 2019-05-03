<template>
    <button-field
        class="ButtonLoaderField"
        v-bind="$attrs"
    >
        <div 
            v-if="loading"
            class="ButtonLoaderField__loading"
        >
            <double-double-spinner 
                class="ButtonLoaderField__loading-spinner"
            />
            <span
                class="ButtonLoaderField__loading-text"
            >
                {{ loadingText }}
            </span>
        </div>
        <slot v-else></slot>
    </button-field>
</template>

<script>
import ButtonField from "@/components/ui/forms/ButtonField.vue";
import DoubleDoubleSpinner from "@/components/ui/spinners/DoubleDoubleSpinner.vue";

export default {
    components: {
        buttonField: ButtonField,
        doubleDoubleSpinner: DoubleDoubleSpinner,
    },
    props: {
        loading: {
            type: Boolean,
            default: true // TODO: should be false
        },
        loadingText: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
    .ButtonLoaderField {
        & .ButtonLoaderField__loading {
            display: flex;
            align-items: center;

            & .ButtonLoaderField__loading-text {
                margin-left: 0.8rem;  
            }
        }
    }
</style>