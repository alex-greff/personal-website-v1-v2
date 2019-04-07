<template>
    <div>
        <!-- <div>Page: {{ projectName }}</div> -->
        <div v-if="projectDataLoaded">
            Name: {{ projectData.name }}
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';

export default {
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        projectName() {
            return this.$route.params.id;
        },
        projectData() {
            return this.projects[this.projectName];
        },
        projectDataLoaded() {
            return !!(this.projects[this.projectName]);
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running ProjectDetails leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>

</style>