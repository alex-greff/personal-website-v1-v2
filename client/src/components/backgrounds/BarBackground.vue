<template>
    <div class="BarBackground" :style="{zIndex: zIndex}">
        <div 
            v-for="(data, idx) in barData" 
            :key="idx" 
            ref="barRefs"
            class="BarBackground__bar"
            :style="{
                transform: `translateY(${data.pos}px)`,
                width: `calc(50% + ${data.width}rem)`,
                height: `${data.height}px`
            }"
        />
    </div>
</template>

<script>
/* global Sine */
import Utilities from "@/utilities";
import { TweenMax } from "gsap/all";

export default {
    props: {
        zIndex: {
            type: Number,
            default: 0
        },
        numBars: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            barData: this.generateBarData()
        }
    },
    mounted() {
        // this.barData = this.generateBarData();
        // console.log(this.$refs);
        this.runPassiveAnims();
    },
    methods: {
        generateBarData() {
            return Utilities.arrayFillRange(0, this.numBars).map(idx => {
                const height = 15 + Utilities.getRandomFloat(-5, 5);
                const width = Utilities.getRandomFloat(-20, 20);

                const pos = ((window.innerHeight/2) - (window.innerHeight * (idx/this.numBars))) + Utilities.getRandomFloat(-20, 20);

                return {
                    width,
                    height,
                    pos
                };
            });
        },
        runPassiveAnims() {
            this.$refs.barRefs.forEach(el => {
                const amt = Utilities.getRandomFloat(5, 10);
                const delay = Utilities.getRandomFloat(0, 0.5);
                const duration = Utilities.getRandomFloat(2, 5);

                new TweenMax(el, duration, {
                    x: amt, 
                    delay: delay,
                    ease: Sine.easeInOut,
                    repeat: -1,
                    yoyo: true
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .BarBackground {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        overflow: hidden;



        // background-color: rgba(114, 55, 55, 0.24);
        
        // &:hover {
        //     background-color: rgba(114, 55, 55, 0.4);
        // }

        & .BarBackground__bar {
            position: absolute;
            right: 0;

            top: 50%;

            width: 30%;
            height: 30px;

            // TODO: make own subsection
            // background-color: theme-link("page", "accent-color", "primary", 0.3); 

            $theme-clr: theme-link("page", "accent-color", "primary", 0.3);
            $them-clr-trans: theme-link("page", "accent-color", "primary", 0);

            background: linear-gradient(to right, $them-clr-trans 0%, $theme-clr 40%, $theme-clr 100%);

            // border-radius: 5px 0 0 5px;
        }
    }

</style>


