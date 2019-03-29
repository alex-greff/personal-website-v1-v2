<template>
    <div class="nav-container">
        <div v-show="sidebarActive" ref="sidebar" class="sidebar">
            <ul class="navbar navbar-mobile">
                <router-link 
                    v-for="page in pages" 
                    :key="page.name" 
                    :to="page.path" 
                    tag="li" 
                    active-class="nav-item-active" 
                    class="nav-item"
                    @click.native="showSidebar(false)" 
                >
                    <i class="fas fa-angle-right icon-arrow"></i>
                    <span class="nav-item-name">{{ page.name }}</span>
                </router-link>

                <li class="btn resume-btn">
                    <a href="#" target="_blank">Resume</a>
                </li>
            </ul>
        </div>

        <div class="close-btn" @click="showSidebar(false)" v-show="sidebarActive">
            <i class="fas fa-times"></i>
        </div>

        <div class="menu-btn" @click="showSidebar(true)" v-show="!sidebarActive">
            <i class="fas fa-bars"></i>
        </div>

        <!-- <div class="sidebar-close-area" @click="showSidebar(false)" v-show="sidebarActive"></div> -->

        <nav ref="header" class="header">
            <div class="logo">
                <router-link 
                    to="/" 
                    tag="div" 
                    active-class="" 
                    class="nav-item logo-container" 
                    exact
                    @click.native="showSidebar(false)" 
                >
                    <div class="logo-1">
                        <svg viewBox="0 0 16.5 16.5">
                            <use xlink:href="#logo-symbol" href="#logo-symbol"/>
                        </svg>
                    </div>
                    <div class="logo-2">
                        <svg viewBox="0 0 16.5 16.5">
                            <use xlink:href="#logo-symbol" href="#logo-symbol"/>
                        </svg>
                    </div>
                </router-link>
            </div>

            <ul class="navbar navbar-desktop">
                <router-link 
                    v-for="page in pages"
                    :key="page.name" 
                    :to="page.path" 
                    tag="li" 
                    active-class="nav-item-active" 
                    class="nav-item"
                >
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
        showSidebar(sidebarOpen) {
            this.sidebarActive = sidebarOpen;
        }
    }
}
</script>


<style lang="scss" scoped>
    .nav-container {
        font-size: 1.6rem;
        font-weight: 300;

        position: fixed;
        top: 0;

        box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);

        width: 100%;

        z-index: 10;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-content: center;

        padding: 0 1rem 0 1rem; // top right bottom left

        background-color: theme-link("navBar", "bg-color", "primary");
    }

    .sidebar {
        position: fixed;
        right: 0;
        // top: 100%;

        z-index: 11;

        // height: 100vh;
        height: 100%;

        display: none; // By default do not show

        background-color: theme-link("navBar", "bg-color", "secondary");

        box-shadow: -2px 0 2px theme-link("navBar", "bg-color", "secondary", 0.466);

        padding: 1rem 7rem 1rem 7rem;

        @include respond(tab-port) {
            display: flex;
        }

        justify-content: center;
        flex-direction: column;
    }

    .sidebar-close-area {
        position: fixed;

        height: 100%;
        width: 100%;

        z-index: 10;
    }

    .btn {
        & a:hover {
            text-decoration: none;
        }
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

        color: theme-link("navBar", "text-color", "primary");

        cursor: pointer;

        @include respond(tab-port) {
            display: inline;
        }

        &:hover {
            color: theme-link("navBar", "accent-color", "primary");
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

    .logo {
        margin-left: 1rem;
    }

    .nav-item {
        margin: 0.5rem 1.5rem 0.5rem 1.8rem;

        text-decoration: none;

        color: theme-link("navBar", "text-color", "primary");

        &:hover {
            cursor: pointer;

            color: theme-link("navBar", "accent-color", "primary");
        }

        white-space: nowrap;
    }

    .nav-item-active {
        font-weight: 400;

        color: theme-link("navBar", "accent-color", "primary");

        & > i {
            color: theme-link("navBar", "accent-color", "primary");
        }
    }

    .icon-arrow {
        color: theme-link("navBar", "accent-color", "secondary");

        margin-right: 1rem;
    }

    .icon-arrow, .nav-item-name {
        display: inline-block;
    }

    .logo-container {
        padding: 1.35rem; // 2.7rem / 2 = 1.35rem (aka logo height divided by 2)
        margin: 0;

        position: relative;

        // Hover effect
        &:hover {
            & .logo-1 svg {
                transform: translate(-0.1rem, -0.1rem);
            }
        }

        & .logo-1, & .logo-2 {
            & svg {
                height: 2.7rem;
            }
        }

        & .logo-1 {
            position: absolute;

            top: 0;
            left: 0;

            & svg {
                fill: theme-link("navBar", "accent-color", "primary");

                transition: transform 0.3s;
            }
            
            z-index: 2;
        }

        & .logo-2 {
            position: absolute;

            top: 0;
            left: 0;

            & svg {
                fill: theme-link("navBar", "selected-color", "primary", 0.7);

                // Offset
                transform: translate(0.2rem, 0.2rem);
            }

            z-index: 1;
        }
    }   
</style>

