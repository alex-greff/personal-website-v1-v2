<template>
    <section-wrapper
        class="About"
        section-name="about"
        margin-mode="narrow"
    >
        <div class="About__content">
            <h1 class="About__title">
                About Me
            </h1>
            <div class="About__links">
                <!-- Generate links -->
                <link-item 
                    v-for="(currLink, index) in $sectionData.links"
                    :key="index"
                    class="About__link-item"
                    :link-type="currLink.type"
                    :title="currLink.type"
                    :href="`${currLink.link}`"
                    :size="2.2"
                />
            </div>

            <div class="About__content">
                <themed-markdown-display 
                    class="About__description"
                    :compiled-markdown="$sectionData.content"
                />

                <profile-image 
                    class="About__profile-image"
                    :src="$sectionData.profileImage"
                    size="20rem"
                />

                <div class="About__curr-tech">
                    <themed-markdown-display 
                        class="About__curr-tech-intro"
                        :compiled-markdown="$sectionData.techIntroText"
                    />

                    <bullet-list
                        class="About__curr-tech-list"
                        :items="$sectionData.currentTech"
                        :num-cols="2"
                        :break-cols="false"
                    />
                </div>
            </div>
        </div>
    </section-wrapper>
</template>

<script>
import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import LinkItem from "@/components/links/LinkItem.vue";
import ProfileImage from "@/components/ui/ProfileImage.vue";
import AboutDescription from "@/sections/About/AboutDescription.vue";
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";
import BulletList from "@/components/ui/BulletList.vue";

export default {
    components: {
        SectionWrapper,
        LinkItem,
        ProfileImage,
        AboutDescription,
        ThemedMarkdownDisplay,
        BulletList
    },
    computed: {
        $sectionData() {
            return this.$static.allGeneralData.edges[0].node;
        }
    }
}
</script>

<static-query>
query {
    allGeneralData {
        edges {
            node {
                content
                links {
                    type
                    link
                }
                techIntroText
                currentTech
                profileImage
            }
        }
    }
}
</static-query>

<style lang="scss" scoped>
    .About {
        display: flex;
        align-items: center;

        & > .About__content {
            & > .About__title {
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: color-link("current_section", "accent_color", "primary");

                @include respond(phone) {
                    text-align: center;
                }
            }

            & > .About__links {
                display: flex;
                flex-wrap: wrap;

                margin-top: 0.8rem;

                @include respond(phone) {
                    justify-content: center;
                }
            }

            & .About__content {
                $pic-size: 20rem;

                display: grid;
                grid-template-columns: auto 25rem;
                grid-template-rows: auto auto;
                grid-template-areas: 
                    "description picture"
                    "tech picture";

                grid-row-gap: 1rem;

                @include respond(phone) {
                    grid-template-columns: auto;
                    grid-template-rows: auto auto auto;
                    grid-template-areas: 
                        "picture"
                        "description"
                        "tech";
                }

                padding-top: 1.5rem;

                & .About__description {
                    grid-area: description;

                }

                & .About__profile-image {
                    grid-area: picture;
                    justify-self: center;
                }

                & .About__curr-tech {
                    grid-area: tech;
                }
            }
        }
    }
</style>