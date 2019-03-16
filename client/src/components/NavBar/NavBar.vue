<template>
    <div class="NavBar">
        <!-- <md-icon class="NavBar__menu-icon">menu</md-icon> -->
        <div class="NavBar__menu-container" @click="toggleNavMenu">
            <md-icon class="NavBar__menu-icon" v-if="isOpen">close</md-icon>
            <md-icon class="NavBar__menu-icon" v-else>menu</md-icon>
        </div>
        <!-- <div class="NavBar__pages-container"> -->
            <nav-link-container 
                class="NavBar__pages-container"
                :isOpen="isOpen"
                :pages="pages"
            />
        <!-- </div> -->
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
            isOpen: true,
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .NavBar {
        position: fixed;
        top: 0;
        right: 0;

        width: 100%;

        z-index: 10;

        display: flex;
        flex-direction: row-reverse;
        align-items: flex-start;
        
        // Switch column layouts when the phone breakpoint is reached
        @include respond(phone) {
            flex-direction: column;
            align-items: flex-end;
        }

        & .NavBar__pages-container {
            flex-grow: 1;
            flex-shrink: 1;
        }

        & .NavBar__menu-container {
            $menu-btn-size: 4rem;

            flex-grow: 0;
            flex-shrink: 0;

            width: $menu-btn-size;
            height: $menu-btn-size;

            & .NavBar__menu-icon {
                @include icon-size($menu-btn-size);
            }
        }
    }

</style>


