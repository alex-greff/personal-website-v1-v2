<template>
    <div ref="rootEl" :v-if="isOpen" :class="backgroundClasses" :style="{ zIndex }">
        <div class="BlockLoader__content">
            <div class="BlockLoader__cell-container">
                <div 
                    v-for="n in numCells"
                    :key="n"
                    :class="`BlockLoader__cell cell-${n}`"
                />
            </div>
            <div class="BlockLoader__loading-text">
                Loading
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        zIndex: {
            type: Number,
            default: 0
        },
        isOpen: {
            type: Boolean,
            default: true  
        },
        controlled: {
            type: Boolean,
            default: false
        },
        displayBackground: {
            type: Boolean,
            default: true
        },
        startOnMount: {
            type: Boolean,
            default: false
        },
        // Only used if indefinite is false
        progress: {
            type: Number,
            default: 0
        },
        numCells: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            internalProgress: 0
        }
    },
    computed: {
        backgroundClasses() {
            let sClasses = "BlockLoader";
            sClasses += (this.displayBackground) ? " display-bg" : "";
            sClasses += (this.isOpen) ? " display" : " hidden";

            return sClasses;
        }
    },
    watch: {
        controlled(nextControlled, prevControlled) {
            // TODO: handle switching between controlled and uncontrolled anim states
        },
        progress(nextProgress) {
            if (this.controlled) {
                this.internalProgress = nextProgress;
            }
        },
        internalProgress(nextProgress, prevProgress) {
            // TODO: run update progress anim
        }
    },
    async mounted() {

    },
    enterAnim(el) {
        return new Promise((resolve, reject) => {

        });
    },
    completeAnim(el) {
        return new Promise((resolve, reject) => {

        });
    }
}
</script>

<style lang="scss" scoped>
    .BlockLoader {
        position: fixed;
        width: 100%;
        height: 100%;

        // Bg display modifiers
        &.display-bg {
            background-color: theme-link("loader", "bg-color", "primary");
        }
        &:not(.display-bg) {
            pointer-events: none;
        }

        // Display modifiers
        &.display {
            display: initial;
        }
        &.hidden {
            display: none;
        }
    }

    .BlockLoader__content {
        pointer-events: initial;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        & .BlockLoader__cell-container {
            & .BlockLoader__cell {
                $cell-height: 1rem;
                $cell-width: 5rem;

                display: inline-block;
                margin-right: 0.5rem;

                width: $cell-width;
                height: $cell-height;

                clip-path: compute-parallelogram-clip-path($cell-height, 45deg);

                background-color: theme-link("loader", "accent-color", "primary");
            }

            & .BlockLoader__cell:last-child {
                margin-right: 0;
            }
        }

        & .BlockLoader__loading-text {
            text-align: center;

            color: theme-link("loader", "accent-color", "primary");
        }
    }
</style>

