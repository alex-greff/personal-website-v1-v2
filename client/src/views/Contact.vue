<template>
    <div class="Contact">
        <div class="Contact__content">
            <h1 class="Contact__title">
                Contact
            </h1>
            <form 
                class="Contact__form"
                @submit.prevent="submit"
            >
                <input-field v-model="someVal" />

                <button type="submit">Send</button>
            </form>
        </div>
    </div>
</template>

<script>
import InputField from "@/components/ui/forms/InputField.vue";

export default {
    components: {
        inputField: InputField,
    },
    data() {
        return {
            someVal: "hi"
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

            & .Contact__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            // ---------------------
            // --- Media Queries ---
            // ---------------------
            @include respond(big-desktop) {
                margin-right: 20rem;
                margin-left: 20rem;
            }

            @include respond(normal) {
                margin-right: 15rem;
                margin-left: 15rem;
            }

            @include respond(tab-land) {
                margin-right: 10rem;
                margin-left: 10rem;
            }

            @include respond(tab-port) {
                margin-right: 5rem;
                margin-left: 5rem;
            }

            @include respond(phone) {
                margin-right: 3rem;
                margin-left: 3rem;
            }
        }
    }
</style>
