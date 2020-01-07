<template>
    <div class="FractionalProgressDisplay">
        <transition name="slide-fade" mode="out-in">
            <span 
                :key="currItemDisplay"
                class="FractionalProgressDisplay__curr-item"
            >
                {{ currItemDisplay }}
            </span>
        </transition>
        <span class="FractionalProgressDisplay__divider">/</span>
        <span class="FractionalProgressDisplay__total-items">
            {{ totalItems }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        currItem: { // zero-based
            type: Number,
            default: 0
        },
        totalItems: {
            type: Number,
            required: true,
            validator(val) { 
                return val >= 0;
            }
        }
    },
    computed: {
        currItemDisplay() {
            return (this.currItem % this.totalItems) + 1;
        }
    }
}
</script>

<style lang="scss" scoped>
    // -----------------------------
    // --- Transition Animations ---
    // -----------------------------
    .slide-fade {
        &-enter-active, &-leave-active {
            transition: all .3s ease;
        }

        &-enter {
            transform: translateY(-10px);
            opacity: 0;
        }

        &-leave-to {
            transform: translateY(10px);
            opacity: 0;
        }
    }

    .FractionalProgressDisplay {
        color: theme-link("page", "text-color", "primary");

        & > .FractionalProgressDisplay__curr-item, & > .FractionalProgressDisplay__divider, & > .FractionalProgressDisplay__total-items {
            display: inline-block;
            font-size: 1.6rem;
        }

        & > .FractionalProgressDisplay__divider {
            margin: 0 0.3rem 0 0.3rem;
        }
    }
</style>