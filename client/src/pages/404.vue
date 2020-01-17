<template>
    <layout>
        <section-wrapper 
            class="NotFound" 
            section-name="global"
            margin-mode="wide"
            :update-url-hash="false"
        >
            <div class="NotFound__content">
                <base-icon 
                class="NotFound__error-icon sr-load-hidden"
                name="exclamation"
                size="15rem"

                v-if="!$isServer"
                v-scroll-reveal="{
                    delay: 0,
                    duration: 800
                }"
            />

                <div 
                    class="NotFound__title sr-load-hidden"

                    v-if="!$isServer"
                    v-scroll-reveal="{
                        delay: 100,
                        duration: 800
                    }"
                >
                    Oops!    
                </div>

                <div 
                    class="NotFound__sub-text sr-load-hidden"

                    v-if="!$isServer"
                    v-scroll-reveal="{
                        delay: 200,
                        duration: 800
                    }"
                >
                    Looks like this page does not exist!
                </div>
            </div>
        </section-wrapper>
    </layout>
</template>

<script>
import SectionWrapper from "@/components/wrappers/SectionWrapper.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

export default {
    metaInfo: {
        title: 'Page Not Found'
    },
    components: {
        SectionWrapper,
        BaseIcon
    }
}
</script>

<style lang="scss" scoped>
    .NotFound {
        display: flex;
        align-items: center;

        & .NotFound__content {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;

            & .NotFound__error-icon {
                color: color-link("current_section", "error_color", "primary");
            }

            & .NotFound__title {
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;

                margin-top: 2rem;

                color: color-link("current_section", "text_color", "primary");
            }

            & .NotFound__sub-text {
                font-weight: 600; // h1 sets this by default

                margin-top: 1rem;

                font-size: 3rem;
                line-height: 3rem;
                color: color-link("current_section", "text_color", "secondary");
            }
        }
    }
</style>