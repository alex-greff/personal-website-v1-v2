<template>
    <div class="projects-content">
        <div class="projects-nav-page" v-if="!hasSubPage">
            <h1>Projects</h1>
            <ul class="projects-list">
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
        </div>
        
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import ProjectListItem from './ProjectListItem.vue';

    export default {
        components: {
            projectListItem: ProjectListItem
        },
        computed: {
            ...mapGetters({
                projects:'getProjects'
            }),
            hasSubPage() { // TODO: unused
                return !!(this.$route.params.id);
            }
        },
        methods: {
            ...mapActions({
                setCurrentAutoTheme: "setCurrentAutoTheme"
            })
        },
        created() {
            this.setCurrentAutoTheme({ theme: "red" });
        },
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

                &:not(:last-child) {
                    margin-bottom: 2rem;
                }
            }
        }
    }

</style>
