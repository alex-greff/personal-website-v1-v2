<template>
    <div class="project-list-item">
        <div class="thumbnail">
            <div class="image-tint">
                <div class="thumbnail-image" :style="thumbnailImageStyles"></div>
            </div>
        </div>
        <div class="project-info">
            <div class="project-name">
                {{ projectData.name }}
            </div>
            <div class="project-summary">
                {{ projectData.summary }}
            </div>
            <div class="project-tags">
                <div class="tag-header">Tags:</div>
                <div class="tag">
                    {{ tagStringList }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        computed: {
            thumbnailImageStyles() {
                return { backgroundImage: `url('${this.projectData.thumbnailImage}')` };
            },
            tagStringList() {
                let stringList = "";
                this.projectData.tags.forEach((tag) => stringList += tag + ', ' );
                return stringList.trim().replace(/\,$/, "");
            }
        },
        props: {
            projectData: Object
        }
    }
</script>

<style lang="scss" scoped>
    $project-item-height: 10rem;
    $thumbnail-width: 20rem;
    $project-info-width: 50rem;

    .project-list-item {
        display: grid;

        grid-template-columns: auto $thumbnail-width 50rem auto;
        grid-template-rows: $project-item-height;

        grid-column-gap: 2rem;

        @include respond(tab-port) {
            grid-template-columns: auto $thumbnail-width 35rem auto;
        }

        @include respond(phone) {
            grid-template-columns: auto 1fr auto;
        }

        @include H_Align(relative);

        transition: background-color 0.5s;

        // Hover stylings   
        &:hover {
            background-color: rgba(0, 0, 0, 0.075);

            & .image-tint {
                background-color: rgba(var(--color-accent-tertiary), 0);
            }

            & .thumbnail {
                clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);

                & .thumbnail-image {
                    @include respond(phone) {
                        filter: grayscale(75%) brightness(50%);
                    }

                    transform: scale(1);
                    filter: grayscale(0%) brightness(100%);
                    opacity: 1;
                }
            }

            & .project-info > .project-name {
                color: rgba(var(--color-accent-primary), 1);
            }
        }

        & .image-tint {
            @include respond(phone) {
                background-color: rgba(var(--color-accent-tertiary), 0.8);
            };

            background-color: rgba(var(--color-accent-tertiary), 1);

            transition: background-color 0.5s;

            z-index: 2;
        }

        & .thumbnail {
            // Note: Needed to stop flickering of project info items
            will-change: clip-path;

            overflow: hidden;

            transition: clip-path 0.5s;

            clip-path: polygon(20% 0, 100% 0, 80% 100%, 0% 100%);

            width: $thumbnail-width;
            height: $project-item-height;

            grid-column: 2 / 3;
            grid-row: 1 / 2;

            @include respond(phone) {
                grid-column: 2 / 3;
                grid-row: 1 / 2;

                justify-self: right;
            }

            & .thumbnail-image {
                // Note: Needed to stop flickering of project info items
                will-change: filter, transform, opacity;

                width: $thumbnail-width;
                height: $project-item-height;

                background-size: cover;
                background-position: center center;

                transition: filter 0.5s, transform 0.5s, opacity 0.5s;

                transform: scale(1.1);
                opacity: 0.5;
                filter: grayscale(100%) brightness(50%);

                z-index: 1;
            }
        }

        & .project-info {
            grid-column: 3 / 4;
            grid-row: 1 / 2;

            @include respond(phone) {
                grid-column: 2 / 3;
                grid-row: 1 / 2;
            }

            max-width: 50rem;

            z-index: 3;

            display: flex;
            flex-direction: column;
            justify-content: center;

            & > *:not(:last-child) {
                margin-bottom: .4rem;
            }

            & > .project-name {
                font-size: 1.7rem;
                font-weight: 500;

                color: rgba(var(--color-accent-tertiary), 1);

                transition: color 0.5s;
            }

            & > .project-summary {
                font-weight: 300;
            }

            & > .project-tags {
                font-weight: 300;

                & > .tag-header {
                    font-weight: 400;
                    color: rgba(var(--color-accent-tertiary), 1);
                }

                & > * {
                    display: inline;
                }
            }
        }
    }
</style>
