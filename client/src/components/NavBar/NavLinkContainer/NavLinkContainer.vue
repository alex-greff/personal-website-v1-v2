<template>
    <div class="NavLinkContainer">
        <!-- TODO: add in the page routes -->
        <nav-link-item>Something 1</nav-link-item>
        <nav-link-item>Something 2</nav-link-item>
        <nav-link-item>Something 3</nav-link-item>
    </div>
</template>

<script>
import NavLinkItem from "@/components/NavBar/NavLinkContainer/NavLinkItem/NavLinkItem.vue";

export default {
    components: {
        navLinkItem: NavLinkItem
    }, 
    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
    .NavLinkContainer {
        display: flex;
        flex-direction: row-reverse;

        align-items: center;

        height: 100%;

        margin-right: 3rem; // TODO: link with $gutter-length in navLinkItem.vue
    }

</style>

