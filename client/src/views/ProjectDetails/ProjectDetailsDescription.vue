<template>
    <markdown-display 
        class="ProjectDetailsDescription"
        :markdown="descriptionMarkdown" 
    />
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";

export default {
    components: {
        markdownDisplay: MarkdownDisplay
    },
    props: {
        descriptionMarkdown: {
            type: String,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
    .ProjectDetailsDescription {
        width: 100%;

        font-size: 1.5rem;
        font-weight: 300;

        // -------------------------
        // --- Markdown stylings ---
        // -------------------------
        & /deep/ h1, & /deep/ h2, & /deep/ h3, & /deep/ h4, & /deep/ h5 {
            font-weight: 500;
            &:not(:last-child) {
                margin-bottom: 0.3rem;
            }

            color: theme-link("project-details", "accent-color", "primary");

            // Section spacing
            &:not(:first-child) {
                margin-top: 1.3rem;
            }
        }
        
        & /deep/ h1 {
            font-size: 3rem;
            line-height: 3rem;
        }

        & /deep/ h2 {
            font-size: 2.3rem;
            line-height: 2.3rem;
        }

        & /deep/ h3 {
            font-size: 2.1rem;
            line-height: 2.1rem;
        }

        & /deep/ h4 {
            font-size: 1.8rem;
            line-height: 1.8rem;
        }

        & /deep/ h5 {
            font-size: 1.5rem;
            line-height: 1.5rem;
        }

        & /deep/ p {
            &:not(:last-child) {
                margin-bottom: 0.3rem;
            }
        }

        & /deep/ strong {
            font-weight: 500;
        }

        & /deep/ em {
            font-style: italic;
        }

        & /deep/ ul {
            margin: 0;
            padding: 0;
            list-style-type: none;

            & /deep/ li {
                $indentation: 0.7rem;
                $dot-size: 5px;
                $dot-spacing: 1rem;

                position: relative;

                padding-left: calc(#{$dot-size} + #{$dot-spacing});
                margin-left: $indentation;

                &::before {
                    content: "";

                    position: absolute;
                    top: 50%;
                    left: 0;

                    transform: translateY(-50%);

                    width: $dot-size;
                    height: $dot-size;

                    border-radius: 50%;

                    background-color: theme-link("project-details", "selected-color", "primary");
                }
            }
        }

        & /deep/ a {
            color: inherit;
            text-decoration: none !important;

            color: theme-link("project-details", "accent-color", "primary");

            transition: color 0.3s;

            &:hover {
                color: theme-link("project-details", "selected-color", "primary");
            }
        }
    }
</style>