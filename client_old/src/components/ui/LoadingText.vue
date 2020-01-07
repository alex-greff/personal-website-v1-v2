<template>
    <div class="LoadingText">
        <slot></slot><span class="dot dot-1">.</span><span class="dot dot-2">.</span><span class="dot dot-3">.</span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .LoadingText {
        $num-dots: 3;
        $anim-duration: 1.3s;

        // Assign anims to dots
        @for $i from 1 through $num-dots {
            & .dot-#{$i} {
                animation: dot-#{$i}-anim $anim-duration infinite;
            }
        }

        // Dot anims
        @keyframes dot-1-anim {
            // Fade in
            0% {
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            // Fade out
            60% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes dot-2-anim {
            // Reset
            0% {
                opacity: 0;
            }
            // Fade in
            20% {
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            // Fade out
            60% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes dot-3-anim {
            // Reset
            0% {
                opacity: 0;
            }
            // Fade in
            40% {
                opacity: 0;
            }
            // Fade out
            60% {
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    }
</style>
