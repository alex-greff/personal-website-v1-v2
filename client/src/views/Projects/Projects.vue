<template>
    <div class="Projects">
        <div class="Projects__content">
            <h1>Projects</h1>

            <!-- TODO: old stuff -->
            <ul v-if="projectDataLoaded" class="Projects__list">
                <project-item 
                    v-for="project in projects"
                    :key="project.name"
                    class="Projects__item"

                    :project-data="project"
                >
                    <router-view></router-view>
                </project-item>

                <!-- <router-link
                    v-for="project in projects"
                    :key="project.name"
                    :to="`/projects/${project.name}`"
                    tag="li"
                    class="Projects__link"
                >
                    <project-item :project-data="project" />
                </router-link> -->
            </ul>
            <div v-else>
                Loading...
            </div>
        </div>
        
        <!-- Subpage router view -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProjectItem from './ProjectItem.vue';
import { getterTypes } from '@/store/types';

export default {
    components: {
        projectItem: ProjectItem,
    },
    computed: {
        ...mapGetters({
            projects: getterTypes.GET_ALL_PROJECTS
        }),
        isSubPage() {
            return !!(this.$route.params.id);
        },
        projectDataLoaded() {
            return !!(this.projects);
        },
        projectIDs() {
            return Object.entries(this.projects).map(([projectName]) => projectName);
        }
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Projects enter anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 0); // TODO: remove
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running Projects leave anim"); 
            // TODO: animate here
            setTimeout(() => resolve(), 100); // TODO: remove
        });
    }
}
</script>

<style lang="scss" scoped>    
    $grid-padding: 2.5rem;

    .Projects {
        & .Projects__content {
            position: relative;
        
            margin: 5rem 0 0 0;

            & > h1 {
                text-align: center;

                font-size: 3rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & > .Projects__list {
                list-style-type: none;

                margin-top: 2rem;

                & > .Projects__item {
                    margin-bottom: 2rem;

                    &:last-child {
                        margin-bottom: 5rem;
                    }
                }
            }
        }
    }
</style>
