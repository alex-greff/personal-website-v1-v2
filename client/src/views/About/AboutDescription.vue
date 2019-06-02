<template>
    <markdown-display
        ref="markdownRef"
        class="AboutDescription"
        :markdown="descriptionMarkdown"
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
        @include markdown-theme(3rem, 1.5rem, false);

        overflow: auto;

        & /deep/ .AboutDescription__profile-image-container {
            max-width: 30rem;
            width: 100%;

            float: right;

            & /deep/ .AboutDescription__profile-image {
                // float: right;
                // width: 5rem;
                // height: 5rem;
                // width: 50%;
                // @include aspect-ratio(16/9);
                width: 100%;
                @include aspect-ratio(4/5);
                // padding-bottom: calc(100% / (4/5));
                // background-color: red;

                background-size: cover;
                background-position: center center;
            }

            @include respond(phone) {
                float: none;
                margin-right: auto;
                margin-left: auto;
            }
        }
    }
</style>
