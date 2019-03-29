<template>
    <div class="ContentContainer">
        <div class="ContentContainer__cell-fill">
            <div class="ContentContainer__decor-line"></div>
        </div>
        
        <slot></slot>
        
        <div class="ContentContainer__cell-fill">
            <div class="ContentContainer__decor-line"></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .ContentContainer {
        position: relative;
        top: 50%;
        transform: translateY(-50%);

        display: grid;
        grid-template-columns: 5rem auto 5rem; // TODO: calculate the gutter sizes properly

        width: 100%;

        background-color: rgba(0, 0, 0, 0.473);

        // padding: .5rem 0 .5rem 0;

        & .ContentContainer__cell-fill {
            width: 100%;
            height: 100%;
            // overflow: hidden;
        }

        & .ContentContainer__decor-line {
            width: 5px;
            height: 100%;

            background-color: theme-link("content", "accent-color", "primary", 0.7);

            position: relative;
            left: 50%;
            transform: translateX(-50%);
            // transform: translateX(-50%) skewX(-20deg);
        }
    }
</style>


