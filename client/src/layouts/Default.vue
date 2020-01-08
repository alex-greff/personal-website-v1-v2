<template>
    <!-- <div class="layout"> -->
    <theme-provider 
        class="layout"
        id="app" 
        ref="baseRef" 
        :namespace="globalNamespace" 
        use-root
    >
        <!-- <header class="header">
        <strong>
            <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </strong>
        <nav class="nav">
            <g-link class="nav__link" to="/">Home</g-link>
            <g-link class="nav__link" to="/about/">About</g-link>
        </nav>
        </header> -->
        <nav-bar animate-in />
        <slot />
    </theme-provider>
    <!-- </div> -->
</template>

<static-query>
query {
    metadata {
        siteName
    }
}
</static-query>

<script>
import { actionTypes } from "../store/types";
import { mapActions } from "vuex";

import { CSSPlugin, AttrPlugin } from "gsap/all";

import themes from "../theme/themes";
import { getAllPageThemes } from "../constants/pageData";

import ThemeProvider from "@/components/hoc/ThemeProvider.vue";
import NavBar from "@/components/NavBar/NavBar.vue";

// TODO: put in constants file
const GLOBAL_NAMESPACE = "global";
const GLOBAL_THEME = "default";

export default {
    components: {
        ThemeProvider,
        NavBar
    },
    data() {
        return {
            globalNamespace: GLOBAL_NAMESPACE
        }
    },
    created() {
        // Instantiate Vuex data
        this.instantiateThemes();
        this.instantiateNamespaces();
    },
    mounted() {
        // NOTE: this prevents the CSSPlugin and the AttrPlugin from getting tree shook
        const plugins = [ CSSPlugin, AttrPlugin ];
    },
    methods: {
        ...mapActions({
            addTheme: actionTypes.ADD_THEME,
            addNamespace: actionTypes.ADD_NAMESPACE,
        }),
        instantiateThemes() {
            // Add all the themes
            Object.values(themes).forEach((themeData) => {
                this.addTheme({
                    name: themeData.name,
                    theme: themeData.theme,
                    override: true
                });
            });
        },
        instantiateNamespaces() {
            // Add global namespace
            this.addNamespace({
                name: GLOBAL_NAMESPACE,
                targetTheme: GLOBAL_THEME,
                override: true
            });

            // Add the section namespaces
            const allPageThemes = getAllPageThemes();
            Object.entries(allPageThemes).forEach(([namespaceName, targetTheme]) => {
                this.addNamespace({
                    name: namespaceName,
                    targetTheme: targetTheme,
                    override: true
                });
            });
        },
    }
}
</script>

<style lang="scss">
body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;

    // background-color: color-link("GLOBAL", "background-color", "primary");
}

.layout {
    max-width: 760px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
}

.nav__link {
    margin-left: 20px;
}
</style>