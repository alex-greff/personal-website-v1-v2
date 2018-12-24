<template>
    <div class="container">
        <div class="close-btn" @click="showSidebar(false)" v-show="sidebarActive">
            <i class="fas fa-times"></i>
        </div>

        <div class="menu-btn" @click="showSidebar(true)" v-show="!sidebarActive">
            <i class="fas fa-bars"></i>
        </div>

        <div class="sidebar" ref="sidebar" v-show="sidebarActive">
            <ul class="navbar navbar-mobile">
                <router-link v-for="page in pages" :key="page.name" :to="page.path" tag="li" active-class="nav-item-active" class="nav-item" exact>
                    <i class="fas fa-angle-right icon-arrow"></i>
                    <span class="nav-item-name">{{ page.name }}</span>
                </router-link>

                <li class="btn resume-btn">
                    <a href="#" target="_blank">Resume</a>
                </li>
            </ul>
        </div>

        <nav class="header" ref="header">
            <div class="logo">
                <router-link to="/" tag="div" active-class="" class="nav-item" exact>
                A
                </router-link>
            </div>

            <ul class="navbar navbar-desktop">
                <router-link v-for="page in pages" :key="page.name" :to="page.path" tag="li" active-class="nav-item-active" class="nav-item" exact>
                    <i class="fas fa-angle-right icon-arrow"></i>
                    <span class="nav-item-name">{{ page.name }}</span>
                </router-link>

                <li class="btn resume-btn">
                    <a href="#" target="_blank">Resume</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sidebarActive: false,
                pages: [
                    { name: "About", path: "/about" },
                    { name: "Projects", path: "/projects" },
                    { name: "Experience", path: "/experience" },
                    { name: "Music", path: "/music" },
                    { name: "Contact", path: "/contact" },
                ],
                themeToggle: false
            }
        },
        watch: {
            
        },
        methods: {
            
        }
    }
</script>


<style lang="scss" scoped>
    .container {
        font-size: 1.6rem;
        font-weight: 300;

        position: fixed;
        top: 0;

        width: 100%;

        z-index: 10;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-content: center;

        padding: 0 1rem 0 1rem; // top right bottom left

        background-color: rgba(var(--color-nav-bg), 1);
    }

    .sidebar {
        position: absolute;
        right: 0;

        z-index: 11;

        height: 100vh;

        display: none; // By default do not show

        background-color: rgba(var(--color-sidebar-bg), 1);

        box-shadow: -2px 0 2px rgba(var(--color-sidebar-bg), 0.466);

        padding: 1rem 7rem 1rem 7rem;

        @include respond(tab-port) {
            display: flex;
        }

        justify-content: center;
        flex-direction: column;
    }

    .close-btn {
        z-index: 15;
    }

    .menu-btn, .close-btn {
        display: none;

        position: fixed;
        top: 0;
        right: 0;

        margin-top: 0.7rem;
        margin-right: 2rem;

        font-size: 3rem;

        color: rgba(var(--color-accent-tertiary), 1);

        cursor: pointer;

        @include respond(tab-port) {
            display: inline;
        }

        &:hover {
            color: rgba(var(--color-accent-primary), 1);
        }
    }

    .logo {
        display: block;

        box-sizing: inherit;
    }
    
    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        list-style-type: none;
    }

    .navbar-desktop {
        @include respond(tab-port) {
            display: none;
        }

        & .resume-btn {
            margin-left: 3rem;
            margin-right: 1rem;
        }
    }

    .navbar-mobile {
        flex-direction: column;

        & > .nav-item {
            margin: 1rem 1.5rem 1rem 1.8rem;
        }

        & > .resume-btn {
            margin-top: 5rem;
        }
    }

    .logo, .navbar {
        padding: 1rem 0 1rem 0;
    }

    .nav-item {
        margin: 0.5rem 1.5rem 0.5rem 1.8rem;

        text-decoration: none;

        color: rgba(var(--color-accent-tertiary), 1);

        &:hover {
            cursor: pointer;

            color: rgba(var(--color-accent-primary), 1);
        }

        white-space: nowrap;
    }

    .nav-item-active {
        font-weight: 400;

        color: rgba(var(--color-accent-primary), 1);

        & > i {
            color: rgba(var(--color-accent-primary), 1);
        }
    }

    .icon-arrow {
        color: rgba(var(--color-accent-secondary), 1);

        margin-right: 1rem;
    }

    .icon-arrow, .nav-item-name {
        display: inline-block;
    }
</style>

