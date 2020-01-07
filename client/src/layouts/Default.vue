<template>
    <div class="layout">
        <header class="header">
        <strong>
            <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </strong>
        <nav class="nav">
            <g-link class="nav__link" to="/">Home</g-link>
            <g-link class="nav__link" to="/about/">About</g-link>
        </nav>
        </header>
        <slot />
    </div>
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

// TODO: put in constants file
const DEFAULT_NAMESPACE = "default";
const DEFAULT_THEME = "dark";

export default {
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
            // Add default namespace
            this.addNamespace({
                name: DEFAULT_NAMESPACE,
                targetTheme: DEFAULT_THEME,
                override: true
            });
        },
    }
}
</script>

<style>
body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
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
