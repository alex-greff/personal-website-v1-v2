<template>
    <div class="NavBar">
        <!-- <md-icon class="NavBar__menu-icon">menu</md-icon> -->
        <div class="NavBar__menu-container" @click="toggleNavMenu">
            <md-icon class="NavBar__menu-icon" v-if="isOpen">close</md-icon>
            <md-icon class="NavBar__menu-icon" v-else>menu</md-icon>
        </div>
        <div class="NavBar__pages-container">
            <nav-link-container 
                :isOpen="isOpen"
                :pages="pages"
            />
        </div>
    </div>
</template>

<script>
import NavLinkContainer from "@/components/NavBar/NavLinkContainer/NavLinkContainer.vue";

export default {
    components: {
        navLinkContainer: NavLinkContainer
    }, 
    data() {
        return {
            isOpen: false,
            pages: [
                // TODO: I need to deal with the home icon
                { name: "Projects", path: "/projects" },
                { name: "Experience", path: "/experience" },
                { name: "Music", path: "/music" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
            ],
        }
    },
    methods: {
        toggleNavMenu() {
            this.isOpen = !this.isOpen;
            console.log("Toggling menu");
        }
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


