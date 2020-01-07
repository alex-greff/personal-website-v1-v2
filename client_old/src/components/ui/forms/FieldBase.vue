<template>
    <div class="FieldBase">
        <label
            v-if="hasTitle"
            :class="['FieldBase__title', titleClass]"
            :for="id"
        >
            {{ title }}
        </label>
        <transition name="fade">
            <div v-if="hasErrors" :class="['FieldBase__error', errorClass]">
                {{ error }}
            </div>
        </transition>
        <div :class="['FieldBase__form-component', formComponentClass]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            required: false
        },
        error: {
            type: String,
            required: false
        },
        titleClass: {
            type: String,
            default: null
        },
        errorClass: {
            type: String,
            default: null
        },
        formComponentClass: {
            type: String,
            default: null
        },
    },
    computed: {
        hasTitle() {
            return !!this.title;
        },
        hasErrors() {
            return !!this.error;
        }
    },
}
</script>

<style lang="scss" scoped>
    .FieldBase {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        grid-template-areas:
            "title error"
            "component component";

        & .FieldBase__input, & .FieldBase__error {
            line-height: 2rem;
        }

        & .FieldBase__title {
            grid-area: title;

            font-size: 1.5rem;

            color: theme-link("contact", "text-color", "secondary");
        }

        & .FieldBase__error {
            grid-area: error;

            text-align: right;
            font-size: 1.2rem;

            color: theme-link("contact", "error-color", "primary");
        }

        & .FieldBase__form-component {
            grid-area: component;
        }
    }

    // Transitions
    @include CSS-transition("fade");
</style>

