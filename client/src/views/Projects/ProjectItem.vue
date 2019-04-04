<template>
    <!-- <div class="project-list-item">
        <div class="thumbnail">
            <div class="image-tint">
                <div class="thumbnail-image" :style="thumbnailImageStyles"></div>
            </div>
        </div>
        <div class="project-info">
            <div class="project-info-container">
                <div class="project-name">
                    {{ projectData.name }}
                </div>
                <div class="project-summary">
                    {{ projectData.summary }}
                </div>
                <div class="project-tags">
                    <div class="tag-header">
                        Tags:
                    </div>
                    <div class="tag">
                        {{ tagStringList }}
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="ProjectItem">
        <div class="ProjectItem__title"> 
            {{ projectData.name }}
        </div> 

        <router-link
            :to="detailsRouterPath"
            tag="div"
            class="ProjectItem__details-btn"
            @click.native="toggleIsExpanded"
        >
            <md-icon v-if="!isExpanded" class="ProjectItem__details-icon">keyboard_arrow_down</md-icon>
            <md-icon v-else class="ProjectItem__details-icon">keyboard_arrow_up</md-icon>
        </router-link>

        <slot v-if="isExpanded && isOnCurrDetailsPage"></slot>
    </div>
</template>

<script>
export default {
    props: {
        projectData: { type: Object, required: true }
    },
    data() {
        return {
            isExpanded: false,
            isOnCurrDetailsPage: false,
        };
    },
    computed: {
        thumbnailImageStyles() {
            return { backgroundImage: `url('${this.projectData.thumbnailImage}')` };
        },
        tagStringList() {
            let stringList = "";
            this.projectData.tags.forEach((tag) => stringList += tag + ', ' );
            return stringList.trim().replace(/,$/, "");
        },
        detailsRouterPath() {
            return `/projects/${this.projectData.name}`;
        }
    },
    watch: {
        $route(newRoute) {
            this.updateIsOnCurrDetailsPage(newRoute);
        }
    },
    mounted() {
        this.updateIsOnCurrDetailsPage(this.$route);

        if (this.isOnCurrDetailsPage) {
            this.isExpanded = true;
        }
    },
    methods: {
        toggleIsExpanded() {
            this.isExpanded = !this.isExpanded;
        },
        updateIsOnCurrDetailsPage(route) {
            this.isOnCurrDetailsPage = route.path === this.detailsRouterPath;
        }
    }
}
</script>

<style lang="scss" scoped>
    .ProjectItem {
        background-color: red;

        & .ProjectItem__details-btn {
            cursor: pointer;

            $details-btn-size: 4rem;

            & .ProjectItem__details-icon {
                
                @include icon-size($details-btn-size);
            }
        }
    }
</style>
