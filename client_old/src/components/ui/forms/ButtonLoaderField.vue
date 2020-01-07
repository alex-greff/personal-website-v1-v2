<template>
    <button-field
        class="ButtonLoaderField"
        v-bind="$attrs"
        :disabled="loading"
    >
        <div 
            ref="containerEl"
            class="ButtonLoaderField__loading-container"
        >
            <transition
                @enter="loadingEnterAnim"
                @leave="loadingLeaveAnim"
            >
                <double-double-spinner 
                    v-if="loading"
                    ref="spinnerRef"
                    class="ButtonLoaderField__loading-spinner"
                />
            </transition>
            <slot></slot>
        </div>
    </button-field>
</template>

<script>
import ButtonField from "@/components/ui/forms/ButtonField.vue";
import DoubleDoubleSpinner from "@/components/ui/spinners/DoubleDoubleSpinner.vue";

import { TweenLite } from "gsap/all";

const SPINNER_SPACING = 10;

export default {
    components: {
        buttonField: ButtonField,
        doubleDoubleSpinner: DoubleDoubleSpinner,
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: ""
        }
    },
    methods: {
        loadingEnterAnim(el, done) {
            const spinnerEl = this.$refs.spinnerRef.$el;
            const containerEl = this.$refs.containerEl;

            const spinnerWidth = spinnerEl.offsetWidth;

            const ANIM_DURATION = 0.5;

            TweenLite.fromTo(spinnerEl, ANIM_DURATION, {  opacity: 0 }, { opacity: 1, onComplete: () => done});
            TweenLite.fromTo(containerEl, ANIM_DURATION, { paddingLeft: 0 }, { paddingLeft: spinnerWidth + SPINNER_SPACING });
        },
        loadingLeaveAnim(el, done) {
            const spinnerEl = this.$refs.spinnerRef.$el;
            const containerEl = this.$refs.containerEl;

            const ANIM_DURATION = 0.5;

            TweenLite.to(spinnerEl, ANIM_DURATION, {  opacity: 0, onComplete: () => done });
            TweenLite.to(containerEl, ANIM_DURATION, { paddingLeft: 0 });
        }
    }
}
</script>

<style lang="scss" scoped>
    .ButtonLoaderField {
        position: relative;

        display: flex;
        align-items: center;

        & .ButtonLoaderField__loading-container {
            position: relative;

            display: inline-flex;
            align-items: center;

            padding-left: 0;

            & .ButtonLoaderField__loading-spinner {
                position: absolute;
                left: 0;
            }
        }
    }
</style>