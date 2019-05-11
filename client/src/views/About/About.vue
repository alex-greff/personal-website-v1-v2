<template>
    <div class="About">
        <div 
            v-if="aboutDataLoaded"
            class="About__content"
        >
            <h1 class="About__title">
                About Me
            </h1>
            <div class="About__links">
                <!-- Generate links -->
                <link-item 
                    v-for="(link, linkType, index) in aboutData.links"
                    :key="index"
                    class="About__link-item"
                    :link-type="linkType"
                    :title="linkType"
                    :href="`${link}`"
                    :size="2"
                />
            </div>
            <about-description 
                class="About__description"
                :description-markdown="aboutData.description"
                :profile-image="aboutData.profileImage"
                profile-image-class="About__profile-image"
            />
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';
/* global Power1 */
import { TweenLite, TimelineLite, TweenMax } from "gsap/all";
import Utilities from "@/utilities";

import AboutDescription from "@/views/About/AboutDescription.vue";
import LinkItem from "@/components/links/LinkItem.vue";

export default {
    components: {
        aboutDescription: AboutDescription,
        linkItem: LinkItem,
    },
    computed: {
        ...mapGetters({
            aboutData: getterTypes.GET_ABOUT
        }),
        aboutDataLoaded() {
            return Object.keys(this.aboutData).length > 0;
        },
    },
    // ------------------
    // --- Animations ---
    // ------------------
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running About enter anim for", el); 

            const titleEl = el.querySelector(".About__title");
            const linkEls = el.querySelectorAll(".About__link-item");
            const descriptionEl = el.querySelector(".About__description");

            TweenLite.killTweensOf([ titleEl, ...linkEls, descriptionEl ]);

            const START_OPTIONS = { x: -20, opacity: 0 };
            const END_OPTIONS = { x: 0, opacity: 1, ease: Power1.easeOut };

            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.fromTo(titleEl, 0.8, { ...START_OPTIONS }, { ...END_OPTIONS }));
            tl.add(
                TweenMax.staggerFromTo(
                    linkEls, 
                    0.5,
                    { ...START_OPTIONS },
                    { ...END_OPTIONS },
                    0.1
                ),
                "-=0.25"
            );
            const totalLinkTime = Utilities.totalStaggerTime(0.5, 0.1, linkEls.length);
            tl.add(
                TweenLite.fromTo(descriptionEl, 1.2, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut }), 
                `-=${Math.max(0, totalLinkTime - 0.4)}`  
            );
        });
    },
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            console.log("Running About leave anim for", el); 

            const titleEl = el.querySelector(".About__title");
            const linkEls = Array.from(el.querySelectorAll(".About__link-item")).reverse();
            const descriptionEl = el.querySelector(".About__description");

            TweenLite.killTweensOf([ titleEl, ...linkEls, descriptionEl ]);

            const END_OPTIONS = { x: 20, opacity: 0, ease: Power1.easeOut };

            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.to(titleEl, 0.5, { ...END_OPTIONS }));
            tl.add(
                TweenMax.staggerTo(
                    linkEls, 
                    0.5,
                    { ...END_OPTIONS },
                    0.1
                ),
                "-=0.3"
            );
            const totalLinkTime = Utilities.totalStaggerTime(0.5, 0.1, linkEls.length);
            tl.add(
                TweenLite.to(descriptionEl, 0.5, { opacity: 0, ease: Power1.easeOut }), 
                `-=${Math.max(0, totalLinkTime - 0.5)}`  
            );
        });
    }
}
</script>

<style lang="scss" scoped>
    .About {
        display: flex;
        flex-direction: column;
        align-items: center; 

        & > .About__content {
            $padding-amount: 2rem;

            position: relative;

            margin-top: 4.5rem;

            max-width: 90rem;
            width: 100vw;

            padding-left: $padding-amount;
            padding-right: $padding-amount;

            & > .About__title {
                text-align: center;
                font-weight: 600; // h1 sets this by default

                font-size: 4rem;
                line-height: 4rem;
                color: theme-link("page", "accent-color", "primary");
            }

            & > .About__links {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;

                margin-top: 0.8rem;
            }

            & > .About__description {
                margin-top: 1.5rem;
            }
        }
    }
</style>