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
    }
}
</script>

<style lang="scss" scoped>

</style>
