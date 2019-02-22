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
                    {{ project.name }}
                </router-link>
            </ul>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                projects:'getProjects'
            }),
            hasSubPage() {
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
    @import '@/styling/mixins/alignment.scss';

    .projects-content {
        position: relative;

        height: 100%;
    }
    
    .projects-nav-page {
        @include HZ_Align(absolute);

        & .projects-list {
            list-style-type: none;
        }

        & .project-link {
            text-decoration: none;
            cursor: pointer;

            &:hover {
                color: rgba(var(--color-accent-primary), 1);
            }
        }
    }

</style>
