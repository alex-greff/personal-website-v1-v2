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
                    :disabled="formDisabled"
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
                    :disabled="formDisabled"
                    :error="errors.first('email')"
                    placeholder="john.doe@email.com"
                />

                <text-field 
                    v-model="formData.subject"
                    v-validate="'required'"
                    class="Contact__subject-input"
                    title="Subject"
                    name="subject"
                    :disabled="formDisabled"
                    :error="errors.first('subject')"
                    placeholder="Enter subject here..."
                />

                <text-area-field 
                    v-model="formData.message"
                    v-validate="'required'"
                    class="Contact__message-input"
                    title="Message"
                    name="message"
                    :disabled="formDisabled"
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
import Vue from "vue";
import Utilites from "@/utilities";

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
                subject: "",
                message: ""
            },
            formID: "contact-form",
            formDisabled: false,
        }
    },
    methods: {
        async submit() {
            // Validate form
            // Note: this happens almost instantly since there are no async validators
            const bValid = await this.$validator.validate();

            if (bValid) {
                // Disable the form
                this.disableForm();

                try {
                    // Send the contact message
                    await this.sendMessage();

                    // TODO: display message sent state
                    console.log("Message sent!");

                } catch (err) {
                    // TODO: message failed to send state
                    console.error("Message failed to send:", err);
                }
            }
        },
        disableForm() {
            this.formDisabled = true;
        },
        enableForm() {
            this.formDisabled = false;
        },
        sendMessage() {
            // Construct the request body
            const oReqBody = {
                name: this.formData.name,
                email: this.formData.email,
                subject: this.formData.subject,
                message: this.formData.message
            };

            const fnServerCall = () => Vue.axios.post("/api/contact", oReqBody);

            // Send contact request to the server
            return Utilites.runSpoofedAsyncFunc(fnServerCall, 1000);
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
        display: flex;
        flex-direction: column;
        align-items: center;

        & .Contact__content {
            $padding-amount: 2rem;

            position: relative;
        
            margin-top: 4.5rem;

            max-width: 80rem;
            width: 100vw;

            padding-left: $padding-amount;
            padding-right: $padding-amount;

            & .Contact__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & .Contact__form {
                $gap: 1.1rem;

                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: auto auto auto auto;
                grid-template-areas: 
                    "name email"
                    "subject subject"
                    "message message"
                    "submit submit";
                grid-row-gap: $gap;
                grid-column-gap: $gap;

                margin-top: 4.5rem;

                & .Contact__name-input {
                    grid-area: name;
                }

                & .Contact__email-input {
                    grid-area: email;
                }

                & .Contact__subject-input {
                    grid-area: subject;
                }

                & .Contact__message-input {
                    grid-area: message;
                }

                @include respond(phone) {
                    grid-template-columns: 1fr;
                    grid-template-rows: auto auto auto auto auto;
                    grid-template-areas: 
                        "name"
                        "email"
                        "subject"
                        "message"
                        "submit";

                    margin-top: 3rem;
                }
            }

            & .Contact__submit-container {
                display: flex;
                flex-direction: row-reverse;
            }
        }
    }
</style>
