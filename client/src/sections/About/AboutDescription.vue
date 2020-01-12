<template>
    <markdown-display
        ref="markdownRef"
        class="AboutDescription"
        :compiled-markdown="descriptionMarkdown"
    />
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";

export default {
    components: {
        markdownDisplay: MarkdownDisplay,
    },
    props: {
        profileImageClass: {
            type: String,
            default: ""
        },
        descriptionMarkdown: {
            type: String,
            required: true
        },
        profileImage: {
            type: String, 
            required: true,
        }
    },
    watch: {
        profileImage(nextProfileImage) {
            this.renderProfileImage(nextProfileImage);
        }
    },
    mounted() {
        this.renderProfileImage(this.profileImage);
    },
    methods: {
        renderProfileImage(i_sProfileImage) {
            const markdownEl = this.$refs.markdownRef.$el;

            // Remove the profile image if it already exists
            const oldProfileImageEl = markdownEl.querySelector(".AboutDescription__profile-image-container");
            if (oldProfileImageEl) {
                oldProfileImageEl.parentNode.removeChild(oldProfileImageEl);
            }

            // Create the new profile image element
            const newProfileImageContainerEl = document.createElement("div");
            newProfileImageContainerEl.setAttribute("class", `AboutDescription__profile-image-container ${this.profileImageClass}`.trim());
            const newProfileImageEl = document.createElement("div");
            newProfileImageEl.setAttribute("class", "AboutDescription__profile-image");
            newProfileImageEl.setAttribute("style", `background-image: url(${i_sProfileImage})`);

            newProfileImageContainerEl.appendChild(newProfileImageEl);

            // Append it to the markdown element
            markdownEl.prepend(newProfileImageContainerEl);
        }
    },
}
</script>

<style lang="scss" scoped>
    .AboutDescription {
        @include markdown-theme(3rem, 1.7rem, false);

        overflow: auto;

        & /deep/ .AboutDescription__profile-image-container {
            float: right;

            max-width: 30rem;
            width: 100%;

            margin-bottom: 0.7rem;

            & /deep/ .AboutDescription__profile-image {
                width: 100%;
                @include aspect-ratio(4/5);

                background-size: cover;
                background-position: center center;
                background-color: theme-link("page", "bg-color", "secondary", 1);
            }

            @include respond(phone) {
                float: none;
                margin-right: auto;
                margin-left: auto;
                margin-bottom: 1.2rem;
            }
        }
    }
</style>
