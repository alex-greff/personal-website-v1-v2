<template>
    <div class="Experience">
        <div class="Experience__content">
            <h1 class="Experience__title">
                Experience
            </h1>

            <div class="Experience__grid">
                <experience-item></experience-item>
            </div>
        </div>
    </div>
</template>

<script>
import ExperienceItem from "@/views/Experience/ExperienceItem.vue";
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';

export default {
    components: {
        experienceItem: ExperienceItem,
    },
    computed: {
        ...mapGetters({

        })
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Experience enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Experience leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>
    .Experience {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .Experience__content {
            position: relative;

            margin-top: 4.5rem;

            max-width: 100rem;
            width: 100%;

            background-color: red;

            & > .Experience__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & > .Experience__grid {
                margin-top: 2.5rem;
                margin-bottom: 3rem;


            }
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
</style>
