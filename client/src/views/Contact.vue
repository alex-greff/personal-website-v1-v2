<template>
    <div class="Contact">
        <div class="Contact__content">
            <h1 class="Contact__title">
                Contact
            </h1>
            <form
                v-if="displayFormView"
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

            <div 
                v-if="displayFormView"
                class="Contact__submit-container"
            >
                <button-loader-field
                    class="Contact__submit-button"
                    type="submit"
                    :form="formID"
                    :loading="requestSending"
                    loading-text="Loading"
                >
                    Send
                </button-loader-field>
            </div>

            <div 
                v-if="displayCompleteSendView"
                class="Contact__status complete"
            >
                <md-icon class="Contact__status-icon">done_outline</md-icon>
                <div class="Contact__status-message">
                    Message sent successfully!
                </div>
                <button-field
                    class="Contact__status-form-button"
                    type="button"
                    @click="openForm(true)"
                >
                    Send Another
                </button-field>
            </div>

            <div
                v-if="displayErrorSendView"
                class="Contact__status error"
            >
                <md-icon class="Contact__status-icon">error_outline</md-icon>
                <div class="Contact__status-message">
                    An error occurred when attempting to send!
                </div>
                <button-field
                    class="Contact__status-form-button"
                    type="button"
                    @click="openForm(false)"
                >
                    Retry
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
import ButtonLoaderField from "@/components/ui/forms/ButtonLoaderField.vue"

const PHASE_TYPES = {
    COMPOSE_MESSAGE: "COMPOSE_MESSAGE",
    MESSAGE_SENT: "MESSAGE_SENT",
    MESSAGE_FAILED: "MESSAGE_FAILED"
}

const INIT_FORM_DATA = {
    name: "Alex",
    email: "alex@greff.com",
    subject: "hi",
    message: "sup"
}

export default {
    components: {
        textField: TextField,
        textAreaField: TextAreaField,
        buttonField: ButtonField,
        buttonLoaderField: ButtonLoaderField,
    },
    data() {
        return {
            formData: {
                ...INIT_FORM_DATA
            },
            formID: "contact-form",

            // State
            formDisabled: false,
            requestSending: false,
            phase: PHASE_TYPES.COMPOSE_MESSAGE,
        }
    },
    computed: {
        displayFormView() {
            return this.phase === PHASE_TYPES.COMPOSE_MESSAGE;
        },
        displayCompleteSendView() {
            return this.phase === PHASE_TYPES.MESSAGE_SENT;
        },
        displayErrorSendView() {
            return this.phase === PHASE_TYPES.MESSAGE_FAILED;
        }
    },
    watch: {
        phase(nextPhase) {
            if (nextPhase === PHASE_TYPES.COMPOSE_MESSAGE) {
                this.enableForm();
                this.setRequestSending(false);
            }
        }
    },
    methods: {
        async submit() {
            console.log("Submitting");
            // // TODO: remove
            // this.requestSending = !this.requestSending;
            // return;

            // Validate form
            // Note: this happens almost instantly since there are no async validators
            const bValid = await this.$validator.validate();

            if (bValid) {
                // Disable the form
                this.disableForm();

                try {
                    this.setRequestSending(true);

                    // Send the contact message
                    await this.sendMessage();

                    this.setRequestSending(false);
                    this.setPhase(PHASE_TYPES.MESSAGE_SENT);

                } catch (err) { // Message failed to send
                    this.setPhase(PHASE_TYPES.MESSAGE_FAILED);
                }
            }
        },
        clearForm() {
            this.formData = { ...INIT_FORM_DATA };
        },
        openForm(i_bClearData = true) {
            if (i_bClearData) {
                this.clearForm();   
            }

            this.setPhase(PHASE_TYPES.COMPOSE_MESSAGE);
        },
        setPhase(i_sPhaseType) {
            this.phase = i_sPhaseType;
        },
        setRequestSending(i_bRequestSending) {
            this.requestSending = i_bRequestSending;
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

            // const fnServerCall = () => Vue.axios.post("/api/contact", oReqBody);
            const fnServerCall = () => new Promise((res, rej) => res()); // TODO: remove

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

            & .Contact__status {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin-top: 10rem;

                & > .Contact__status-icon {
                    @include icon-size(7rem);
                }

                & > .Contact__status-message {
                    font-size: 2rem;
                    line-height: 2rem;

                    margin-top: 0.5rem;

                    text-align: center;

                    color: theme-link("contact", "text-color", "primary");
                }

                & > .Contact__status-form-button {
                    margin-top: 2rem;
                }

                @include respond(phone) {
                    margin-top: 50%;
                }

                // -----------------
                // --- Modifiers ---
                // -----------------

                &.complete {
                    & > .Contact__status-icon {
                        color: theme-link("contact", "success-color", "primary");
                    }
                }

                &.error {
                    & > .Contact__status-icon {
                        color: theme-link("contact", "error-color", "primary");
                    }
                }
            }
        }
    }
</style>
