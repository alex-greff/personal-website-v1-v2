<template>
    <section-wrapper
        class="Contact"
        section-name="contact"
        margin-mode="narrow"
    >
        <div class="Contact__content">
            <h1 
                class="Contact__title sr-load-hidden"

                v-if="!$isServer"
                v-scroll-reveal="{
                    delay: 0,
                    duration: 800
                }"
            >
                Contact Me
            </h1>

            <transition
                mode="out-in"
                @enter="phaseEnterAnim"
                @leave="phaseLeaveAnim"
            >
                <div 
                    v-if="displayFormView"
                    key="compose-message"
                    class="Contact__form-container"
                >
                    <form
                        :id="formID"
                        class="Contact__form"
                        @submit.prevent="submit"
                    >
                        <text-field 
                            v-model="formData.name"
                            v-validate="'required'"
                            class="Contact__name-input sr-load-hidden"
                            title="Name"
                            name="name"
                            :disabled="formDisabled"
                            :error="errors.first('name')"
                            placeholder="John Doe"

                            v-if="!$isServer"
                            v-scroll-reveal="{
                                delay: 300,
                                duration: 800
                            }"
                        />

                        <text-field 
                            v-model="formData.email"
                            v-validate="'required|email'"
                            class="Contact__email-input sr-load-hidden"
                            title="Email"
                            name="email"
                            :disabled="formDisabled"
                            :error="errors.first('email')"
                            placeholder="john.doe@email.com"

                            v-if="!$isServer"
                            v-scroll-reveal="{
                                delay: 400,
                                duration: 800
                            }"
                        />

                        <text-field 
                            v-model="formData.subject"
                            v-validate="'required'"
                            class="Contact__subject-input sr-load-hidden"
                            title="Subject"
                            name="subject"
                            :disabled="formDisabled"
                            :error="errors.first('subject')"
                            placeholder="Enter subject here..."

                            v-if="!$isServer"
                            v-scroll-reveal="{
                                delay: 500,
                                duration: 800
                            }"
                        />

                        <text-area-field 
                            v-model="formData.message"
                            v-validate="'required'"
                            class="Contact__message-input sr-load-hidden"
                            title="Message"
                            name="message"
                            :disabled="formDisabled"
                            :error="errors.first('message')"
                            placeholder="Enter message here..."

                            v-if="!$isServer"
                            v-scroll-reveal="{
                                delay: 600,
                                duration: 800
                            }"
                        />
                    </form>

                    <div class="Contact__submit-container">
                        <button-loader-field
                            class="Contact__submit-button sr-load-hidden"
                            type="submit"
                            :form="formID"
                            :loading="requestSending"
                            loading-text="Loading"

                            v-if="!$isServer"
                            v-scroll-reveal="{
                                delay: 700,
                                duration: 800
                            }"
                        >
                            Send
                        </button-loader-field>
                    </div>
                </div>

                <div 
                    v-if="displayCompleteSendView"
                    key="message-sent"
                    class="Contact__status complete"
                >
                    <base-icon 
                        class="Contact__status-icon"
                        name="check"
                        size="10rem"
                    />

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
                    key="message-failed"
                    class="Contact__status error"
                >
                    <base-icon 
                        class="Contact__status-icon"
                        name="exclamation"
                        size="10rem"
                    />

                    <div class="Contact__status-message">
                        An error occurred while attempting to send!
                    </div>
                    <button-field
                        class="Contact__status-form-button"
                        type="button"
                        @click="openForm(false)"
                    >
                        Retry
                    </button-field>
                </div>
            </transition>
        </div>
    </section-wrapper>
</template>

<script>
import Vue from "vue";
import Utilites from "@/utilities";

import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import TextField from "@/components/ui/forms/TextField.vue";
import TextAreaField from "@/components/ui/forms/TextAreaField.vue";
import ButtonField from "@/components/ui/forms/ButtonField.vue";
import ButtonLoaderField from "@/components/ui/forms/ButtonLoaderField.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

/* global Power1 */
import { TimelineLite, TweenMax, TweenLite } from "gsap/all";

const PHASE_TYPES = {
    COMPOSE_MESSAGE: "COMPOSE_MESSAGE",
    MESSAGE_SENT: "MESSAGE_SENT",
    MESSAGE_FAILED: "MESSAGE_FAILED"
};

const INIT_FORM_DATA = {
    name: "",
    email: "",
    subject: "",
    message: ""
};

export default {
    components: {
        SectionWrapper,
        TextField,
        TextAreaField,
        ButtonField,
        ButtonLoaderField,
        BaseIcon
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
            prevPhase: "idk"
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
        phase(nextPhase, prevPhase) {
            this.prevPhase = prevPhase;

            if (nextPhase === PHASE_TYPES.COMPOSE_MESSAGE) {
                this.enableForm();
                this.setRequestSending(false);
            }
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

            // TODO: setup an independent API for sending me contact messages
            // const fnServerCall = () => Vue.axios.post("/api/contact", oReqBody);

            // Server call spoofs, for testing purposes
            // const fnServerCall = () => new Promise((res, rej) => res()); // TODO: remove
            const fnServerCall = () => new Promise((res, rej) => rej()); // TODO: remove

            // Send contact request to the server
            return Utilites.runSpoofedAsyncFunc(fnServerCall, 1500); // Wait for 1.5 seconds no matter what
        },
        // -----------------------------------
        // --- Phase transition animations ---
        // -----------------------------------
        phaseEnterAnim(el, done){
            const tl = new TimelineLite({ onComplete: () => done() });
            const enterAnimFunc = PHASE_ANIM_MAPPINGS.enter[this.phase];

            enterAnimFunc(el, tl);
        },
        phaseLeaveAnim(el, done) {
            const tl = new TimelineLite({ onComplete: () => done() });
            const leaveAnimFunc = PHASE_ANIM_MAPPINGS.leave[this.prevPhase];

            leaveAnimFunc(el, tl);
        },
    }
}

// ------------------------
// --- Phase Animations ---
// ------------------------

// => Specific phase anims

const _composeMessageEnterAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = false) => {
    const nameInputEl = el.querySelector(".Contact__name-input");
    const emailInputEl = el.querySelector(".Contact__email-input");
    const subjectInputEl = el.querySelector(".Contact__subject-input");
    const messageInputEl = el.querySelector(".Contact__message-input");
    const submitButtonEl = el.querySelector(".Contact__submit-button");

    const elementList = [nameInputEl, emailInputEl, subjectInputEl, messageInputEl, submitButtonEl];
    if (i_bReveresed) {
        elementList.reverse();
    }

    __phaseEnterAnim(elementList, i_tl, i_nStartOffset, i_bReveresed);
};

const _composeMessageLeaveAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = true) => {
    const nameInputEl = el.querySelector(".Contact__name-input");
    const emailInputEl = el.querySelector(".Contact__email-input");
    const subjectInputEl = el.querySelector(".Contact__subject-input");
    const messageInputEl = el.querySelector(".Contact__message-input");
    const submitButtonEl = el.querySelector(".Contact__submit-button");

    const elementList = [nameInputEl, emailInputEl, subjectInputEl, messageInputEl, submitButtonEl];
    if (i_bReveresed) {
        elementList.reverse();
    }

    __phaseLeaveAnim(elementList, i_tl, i_nStartOffset, i_bReveresed);
};

const _messageSentEnterAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = false) => {
    __statusEnterAnim("complete", el, i_tl, i_nStartOffset, i_bReveresed);
};

const _messageSentLeaveAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = true) => {
    __statusLeaveAnim("complete", el, i_tl, i_nStartOffset, i_bReveresed);
};

const _messaageFailedEnterAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = false) => {
    __statusEnterAnim("error", el, i_tl, i_nStartOffset, i_bReveresed);
};

const _messageFailedLeaveAnim = (el, i_tl = null, i_nStartOffset = 0, i_bReveresed = true) => {
    __statusLeaveAnim("error", el, i_tl, i_nStartOffset, i_bReveresed);
};

// => Status anims

const __statusEnterAnim = (i_sModifier, el, i_tl = null, i_nStartOffset = 0, i_bReveresed = false) => {
    const PARENT_SELECTOR = ".Contact__status";
    const iconEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-icon`);
    const messageEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-message`);
    const formButtonEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-form-button`);
    
    const elementList = [ iconEl, messageEl, formButtonEl ];
    if (i_bReveresed) {
        elementList.reverse();
    }

    __phaseEnterAnim(elementList, i_tl, i_nStartOffset);
};

const __statusLeaveAnim = (i_sModifier, el, i_tl = null, i_nStartOffset = 0, i_bReveresed = true) => {
    const PARENT_SELECTOR = ".Contact__status";
    const iconEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-icon`);
    const messageEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-message`);
    const formButtonEl = el.querySelector(`${PARENT_SELECTOR}.${i_sModifier} .Contact__status-form-button`);
    
    const elementList = [ iconEl, messageEl, formButtonEl ];
    if (i_bReveresed) {
        elementList.reverse();
    }

    __phaseLeaveAnim(elementList, i_tl, i_nStartOffset);
};

// => Base phase anims

const __phaseEnterAnim = (i_aElements, i_tl = null, i_nStartOffset = 0) => {
    let tl = i_tl;
    if (!tl) {
        tl = new TimelineLite();
    }

    TweenLite.killTweensOf([ ...i_aElements ]);

    const START_OPTIONS = { x: -20, opacity: 0 };
    const END_OPTIONS = { x: 0, opacity: 1, ease: Power1.easeOut };

    tl.add(
        TweenMax.staggerFromTo(
            i_aElements,
            0.4,
            { ...START_OPTIONS },
            { ...END_OPTIONS },
            0.2
        ), 
        `-=${i_nStartOffset}`
    );
}

const __phaseLeaveAnim = (i_aElements, i_tl = null, i_nStartOffset = 0) => {
    let tl = i_tl;
    if (!tl) {
        tl = new TimelineLite();
    }

    TweenLite.killTweensOf([ ...i_aElements ]);

    const END_OPTIONS = { x: 20, opacity: 0, ease: Power1.easeIn };

    tl.add(
        TweenMax.staggerTo(
            i_aElements,
            0.4,
            { ...END_OPTIONS },
            0.2
        ), 
        `-=${i_nStartOffset}`
    );
}

// Setup phase animation mappings
const PHASE_ANIM_MAPPINGS = {
    enter: {
        [PHASE_TYPES.COMPOSE_MESSAGE]: _composeMessageEnterAnim,
        [PHASE_TYPES.MESSAGE_SENT]: _messageSentEnterAnim,
        [PHASE_TYPES.MESSAGE_FAILED]: _messaageFailedEnterAnim
    },
    leave: {
        [PHASE_TYPES.COMPOSE_MESSAGE]: _composeMessageLeaveAnim,
        [PHASE_TYPES.MESSAGE_SENT]: _messageSentLeaveAnim,
        [PHASE_TYPES.MESSAGE_FAILED]: _messageFailedLeaveAnim
    }
};
</script>

<style lang="scss" scoped>
    .Contact {
        & .Contact__content {
            padding-top: 5rem;

            @include respond(phone) {
                padding-top: 2rem;
            }

            @include respond(big-desktop) {
                padding-top: 10rem;
            }

            & .Contact__title {
                text-align: center;
                font-weight: 600; // Note: h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: color-link("current_section", "accent_color", "primary");
            }

            & .Contact__form-container {
                margin-top: 4.5rem;

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

            & .Contact__status {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                margin-top: 10rem;

                & > .Contact__status-icon {
                    display: inline-block;
                }

                & > .Contact__status-message {
                    font-size: 2rem;
                    line-height: 2rem;

                    margin-top: 1.5rem;

                    text-align: center;

                    color: color-link("current_section", "text_color", "primary");
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
                        color: color-link("current_section", "success_color", "primary");
                    }
                }

                &.error {
                    & > .Contact__status-icon {
                        color: color-link("current_section", "error_color", "primary");
                    }
                }
            }
        }
    }
</style>