<template>
    <div class="Contact">
        <div class="Contact__content">
            <h1 class="Contact__title">
                Contact
            </h1>
            <form
                :id="formID"
                class="Contact__form"
                @submit.prevent="submit"
            >
                <text-field 
                    v-model="formData.name"
                    v-validate="'required'"
                    class="Contact__name-input"
                    title="Name"
                    name="name"
                    :error="errors.first('name')"
                    placeholder="John Doe"
                    autofocus
                />

                <text-field 
                    v-model="formData.email"
                    v-validate="'required|email'"
                    class="Contact__email-input"
                    title="Email"
                    name="email"
                    :error="errors.first('email')"
                    placeholder="john.doe@email.com"
                />

                <text-area-field 
                    v-model="formData.message"
                    v-validate="'required'"
                    class="Contact__message-input"
                    title="Message"
                    name="message"
                    :error="errors.first('message')"
                    placeholder="Enter message here..."
                />
            </form>

            <div class="Contact__submit-container">
                <!-- TODO: update this with a loadable button -->
                <button-field 
                    class="Contact__submit-button"
                    type="submit"
                    :form="formID"
                >
                    Send
                </button-field>
            </div>
        </div>
    </div>
</template>

<script>
import TextField from "@/components/ui/forms/TextField.vue";
import TextAreaField from "@/components/ui/forms/TextAreaField.vue";
import ButtonField from "@/components/ui/forms/ButtonField.vue";

export default {
    components: {
        textField: TextField,
        textAreaField: TextAreaField,
        buttonField: ButtonField,
    },
    data() {
        return {
            formData: {
                name: "",
                email: "",
                message: ""
            },
            formID: "contact-form"
        }
    },
    methods: {
        submit() {
            console.log("Submitting form");
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Contact enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Contact leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>
    .Contact {
        & .Contact__content {
            position: relative;
        
            margin-top: 4.5rem;

            display: flex;
            flex-direction: column;
            align-items: center;

            & .Contact__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & .Contact__form {
                $gap: 1rem;

                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto auto;
                grid-template-areas: 
                    "name email"
                    "message message"
                    "submit submit";
                grid-row-gap: $gap;
                grid-column-gap: $gap;

                margin-top: 3rem;

                & .Contact__name-input {
                    grid-area: name;
                }

                & .Contact__email-input {
                    grid-area: email;
                }

                & .Contact__message-input {
                    grid-area: message;
                }
            }

            & .Contact__submit-container {
                display: flex;
                flex-direction: row-reverse;
            }

            // ---------------------
            // --- Media Queries ---
            // ---------------------
            // @include respond(big-desktop) {
            //     margin-right: 20rem;
            //     margin-left: 20rem;
            // }

            // @include respond(normal) {
            //     margin-right: 15rem;
            //     margin-left: 15rem;
            // }

            // @include respond(tab-land) {
            //     margin-right: 10rem;
            //     margin-left: 10rem;
            // }

            // @include respond(tab-port) {
            //     margin-right: 5rem;
            //     margin-left: 5rem;
            // }

            // @include respond(phone) {
            //     margin-right: 3rem;
            //     margin-left: 3rem;
            // }
        }
    }
</style>
