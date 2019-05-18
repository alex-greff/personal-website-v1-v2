<template>
    <div class="NotFound">
        <h1 class="NotFound__title">
            404
        </h1>
        <h1 class="NotFound__message">
            Page Not Found
        </h1>
    </div>
</template>

<script>
import { TimelineLite, TweenLite } from "gsap/all";

export default {
    enterAnim(el) {
        return new Promise((resolve, reject) => {
            const titleEl = el.querySelector(".NotFound__title");
            const messageEl = el.querySelector(".NotFound__message");

            const START_ANIM = { opacity: 0, x: -20 };
            const END_ANIM = { opacity: 1, x: 0 };

            TweenLite.killTweensOf([ titleEl, messageEl ]);

            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.fromTo(titleEl, 1, { ...START_ANIM }, { ...END_ANIM }));
            tl.add(TweenLite.fromTo(messageEl, 1, { ...START_ANIM }, { ...END_ANIM }), "-=0.75");
        });
    }, 
    leaveAnim(el) {
        return new Promise((resolve, reject) => {
            const titleEl = el.querySelector(".NotFound__title");
            const messageEl = el.querySelector(".NotFound__message");

            const END_ANIM = { opacity: 0, x: 20 };

            TweenLite.killTweensOf([ titleEl, messageEl ]);

            const tl = new TimelineLite({ onComplete: () => resolve() });
            tl.add(TweenLite.to(messageEl, 1, { ...END_ANIM }));
            tl.add(TweenLite.to(titleEl, 1, { ...END_ANIM }), "-=0.75");
        });
    }
}
</script>

<style lang="scss" scoped>
    .NotFound {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: 100%;

        & .NotFound__title {
            text-align: center;
            font-weight: 600; // Note: h1 sets this by default

            font-size: 6rem;
            line-height: 6rem;
            color: theme-link("page", "text-color", "primary");

            margin-bottom: 2rem;
        }

        & .NotFound__message {
            text-align: center;
            font-weight: 500;

            font-size: 3rem;
            line-height: 3rem;
            color: theme-link("page", "text-color", "secondary");
        }
    }
</style>