<template>
    <section-wrapper
        class="About"
        section-name="about"
        margin-mode="wide"
    >
        <div class="About__content">
            <h1 
                class="About__title sr-load-hidden"
                v-scroll-reveal="{
                    delay: 0,
                    duration: 800
                }"
            >
                About Me
            </h1>
            <div class="About__links">
                <!-- Generate links -->
                <link-item 
                    v-for="(currLink, idx) in $sectionData.links"
                    :key="idx"
                    class="About__link-item sr-load-hidden"
                    :link-type="currLink.type"
                    :title="currLink.type"
                    :href="`${currLink.link}`"
                    size="2.2rem"
                    v-scroll-reveal="{
                        delay: 200 + (idx * 150),
                        duration: 800,
                    }"
                />
            </div>

            <div class="About__content">
                <div class="About__text-content">
                    <themed-markdown-display 
                        class="About__description sr-load-hidden"
                        :compiled-markdown="$sectionData.content"
                        v-scroll-reveal="{
                            delay: 200,
                            duration: 1000
                        }"
                    />

                    <div class="About__curr-tech">
                        <themed-markdown-display 
                            class="About__curr-tech-intro sr-load-hidden"
                            :compiled-markdown="$sectionData.techIntroText"
                            v-scroll-reveal="{
                                delay: 400,
                                duration: 1000
                            }"
                        />

                        <bullet-list
                            class="About__curr-tech-list"
                            :items="$sectionData.currentTech"
                            :num-cols="2"
                            :break-cols="false"

                            :enable-scroll-reveal="true"
                            :reveal-init-delay="600"
                        />
                    </div>
                </div>

                <profile-image 
                    class="About__profile-image sr-load-hidden"
                    :src="$sectionData.profileImage"
                    size="28rem"
                    v-scroll-reveal="{
                        delay: 400,
                        origin: 'right',
                        duration: 1000
                    }"
                />
            </div>
        </div>
    </section-wrapper>
</template>

<script>
import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import LinkItem from "@/components/links/LinkItem.vue";
import ProfileImage from "@/components/ui/ProfileImage.vue";
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";
import BulletList from "@/components/ui/BulletList.vue";

export default {
    components: {
        SectionWrapper,
        LinkItem,
        ProfileImage,
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
            width: 100%;

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

                width: 100%;

                display: flex;
                flex-direction: row;
                justify-content: space-between;

                @include respond(phone) {
                    flex-direction: column-reverse;
                }

                padding-top: 1.5rem;

                & .About__text-content {
                    max-width: 60rem;

                    margin-right: 2rem;

                    & .About__description {

                    }

                    & .About__curr-tech {
                        padding-top: 2rem;
                    }

                    @include respond(phone) {
                        margin-right: 0;
                        padding-top: 2rem;
                    }
                }

                & .About__profile-image {
                    @include respond(phone) {
                        align-self: center;
                    }
                }
            }
        }
    }
</style>