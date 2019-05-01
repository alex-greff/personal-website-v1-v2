<template>
    <div class="InputField">
        <label
            v-if="hasTitle"
            class="InputField__title"
            :for="id"
        >
            {{ title }}
        </label>
        <transition name="fade">
            <div v-if="hasErrors" class="InputField__error">
                {{ error }}
            </div>
        </transition>
        <input 
            :id="id"
            :class="{
                'InputField__input': true,
                'error': hasErrors
            }"
            :type="type"
            :value="value"
            :disabled="disabled"
            @input="updateValue"
            @change="updateValue"
            @blur="$emit('blur')"
        >
    </div>
</template>

<script>
import Utilities from "@/utilities";
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
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
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
        error: {
            type: String,
            required: false
        },
        // v-model stuff
        value: String,
    },
    data() {
        return {
            id: Utilities.generateUniqueID("InputField"),
        }
    },
    computed: {
        hasTitle() {
            return !!this.title;
        },
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
    .InputField {
        width: 100%;
        height: 100%;

        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto;
        grid-template-areas:
            "title error"
            "input input";

        & .InputField__input, & .InputField__error {
            line-height: 2rem;
        }

        & .InputField__title {
            grid-area: title;

            font-size: 1.5rem;

            color: theme-link("contact", "text-color", "secondary");
        }

        & .InputField__error {
            grid-area: error;

            text-align: right;
            font-size: 1.2rem;

            color: theme-link("contact", "error-color", "primary");
        }

        & .InputField__input {
            grid-area: input;

            font-size: 2rem;
            padding: 0.7rem;
            outline: none;

            color: theme-link("contact", "text-color", "primary");
            background-color: theme-link("contact", "bg-color", "secondary");

            border-radius: 0.2rem;
            border: 0.1rem solid theme-link("contact", "accent-color", "secondary");

            box-shadow: 0px 0px 3px 0px theme-link("contact", "accent-color", "primary", 0);

            transition: color 0.4s, box-shadow 0.4s, border 0.4s;

            // -----------------
            // --- Modifiers ---
            // -----------------

            &:focus {
                // border: 0.1rem solid theme-link("contact", "accent-color", "primary");
                box-shadow: 0px 0px 3px 0px theme-link("contact", "accent-color", "primary");

                &.error {
                    box-shadow: 0px 0px 3px 0px theme-link("contact", "error-color", "primary"); 
                }
            }

            &.error {
                border: 0.1rem solid theme-link("contact", "error-color", "secondary");
            }

            &:disabled {
                color: theme-link("contact", "text-color", "secondary");
                box-shadow: 0px 0px 3px 0px theme-link("contact", "accent-color", "primary", 0);
                border: 0.1rem solid theme-link("contact", "text-color", "secondary", 0.5);
            }
        }
    }

    // Transitions
    @include CSS-transition("fade");
</style>
