<template>
    <div class="NavBar">
        <!-- <md-icon class="NavBar__menu-icon">menu</md-icon> -->
        <div class="NavBar__menu-container">
            <md-icon class="NavBar__menu-icon">close</md-icon>
        </div>
        <div class="NavBar__pages-container">
            <nav-link-container></nav-link-container>
        </div>
    </div>
</template>

<script>
import NavLinkContainer from "@/components/NavBar/NavLinkContainer/NavLinkContainer.vue";

export default {
    components: {
        navLinkContainer: NavLinkContainer
    }
}
</script>

<style lang="scss" scoped>
    .NavBar {
        position: fixed;
        top: 0;
        right: 0;

        z-index: 10;

        display: flex;
        flex-direction: row-reverse;
        // align-items: center;

        & .NavBar__menu-container {
            & .NavBar__menu-icon {
                @include icon-size(4rem);
            }
        }

        & .NavBar__pages-container {
            
        }
    }

</style>


