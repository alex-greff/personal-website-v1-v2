<template>
    <div class="projects-content">
        <div class="projects-nav-page" v-if="!isSubPage">
            <h1>Projects</h1>

            <!-- TODO: old stuff -->
            <ul class="projects-list" v-if="projectDataLoaded">
                <router-link
                    v-for="project in projects"
                    :key="project.name"
                    :to="`/projects/${project.name}`"
                    tag="li"
                    class="project-link"
                >
                    <project-list-item :projectData="project" />
                </router-link>
            </ul>
            <div v-else>
                Loading...
            </div>

            <content-list
                :contentIDs="projectIDs"
            >
                <template v-for="(val, key, index) in projects" v-slot:[key]>
                    <h1 :key="index">{{key}}</h1>
                </template>

            </content-list>

        </div>
        
        <!-- Subpage router view -->
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProjectListItem from './ProjectListItem.vue';
    import { getterTypes } from '@/store/types';

    import ContentList from '../../components/contentList/ContentList.vue';

    export default {
        components: {
            projectListItem: ProjectListItem,
            contentList: ContentList,
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
        mounted() {
            // console.log(this.projectIDs);
            // console.log(this.projects);
        }
    }
</script>

<style lang="scss" scoped>    
    $grid-padding: 2.5rem;

    .projects-content {

    }

    .projects-nav-page {
        position: relative;
        
        margin: 5rem 0 0 0;

        & > h1 {
            text-align: center;

            font-size: 3rem;
            color: rgba(var(--color-accent-primary), 1);
        }

        & > .projects-list {
            list-style-type: none;

            margin-top: 2rem;

            & > .project-link {
                text-decoration: none;
                cursor: pointer;

                & > * {
                    margin-bottom: 2rem;
                }

                &:last-child {
                    margin-bottom: 5rem;
                }
            }
        }
    }

</style>
