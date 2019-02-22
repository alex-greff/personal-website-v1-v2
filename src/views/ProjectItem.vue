<template>
    <div>
        <!-- <div>Page: {{ projectName }}</div> -->
        <div v-if="projectDataLoaded">
            Name: {{projectData.name}}
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            projects: 'getProjects'
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
    mounted() {
        // console.log(`${this.$route.params.id}`);
        // console.log(this.projects);
        // console.log(this.project(this.$route.params.id));
    },
    updated() {
        // console.log(this.project(this.$route.params.id));
    }
}
</script>

<style lang="scss" scoped>

</style>
