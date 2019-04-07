<template>
    <div class="Projects">
        <div v-if="!isSubPage" class="Projects__content">
            <h1>Projects</h1>

            <!-- TODO: old stuff -->
            <div v-if="projectDataLoaded" class="Projects__grid">
                <project-item 
                    v-for="project in projects"
                    :key="project.name"
                    class="Projects__item"

                    :project-data="project"
                />
            </div>
            <div v-else>
                Loading...
            </div>
        </div>
        
        <!-- Subpage router view -->
        <!-- TODO: figure out how to view the page in a separate component??? -->
        <router-view v-else></router-view>
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

            & .Projects__grid {
                margin-top: 3rem;
                margin-bottom: 3rem;

                display: grid;
                grid-column-gap: 2rem;
                grid-row-gap: 2rem;

                $item-width: 30rem;

                @include respond(big-desktop) {
                    margin-right: 20rem;
                    margin-left: 20rem;

                    grid-template-columns: 1fr 1fr 1fr 1fr;
                }

                @include respond(normal) {
                    margin-right: 15rem;
                    margin-left: 15rem;

                    grid-template-columns: 1fr 1fr 1fr;
                }

                @include respond(tab-land) {
                    margin-right: 10rem;
                    margin-left: 10rem;

                    grid-template-columns: 1fr 1fr;
                }

                @include respond(tab-port) {
                    margin-right: 5rem;
                    margin-left: 5rem;

                    grid-template-columns: 1fr 1fr;
                }

                @include respond(phone) {
                    margin-right: 3rem;
                    margin-left: 3rem;

                    grid-template-columns: 1fr;
                }
            }

            // & > .Projects__list {
            //     list-style-type: none;

            //     margin-top: 2rem;

            //     & > .Projects__item {
            //         margin-bottom: 2rem;

            //         &:last-child {
            //             margin-bottom: 5rem;
            //         }
            //     }
            // }
        }
    }
</style>
