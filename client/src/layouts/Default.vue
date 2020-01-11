<template>
    <theme-provider 
        class="DefaultLayout"
        :namespace="globalNamespace" 
        use-root
    >
        <nav-bar animate-in />

        <!-- Page content -->
        <slot /> 
    </theme-provider>
</template>

<script>

import ThemeProvider from "@/components/hoc/ThemeProvider.vue";
import NavBar from "@/components/NavBar/NavBar.vue";

import { GLOBAL_NAMESPACE } from "../constants/general";

export default {
    components: {
        ThemeProvider,
        NavBar
    },
    data() {
        return {
            globalNamespace: GLOBAL_NAMESPACE
        }
    }
}
</script>

<style lang="scss" scoped>
    .DefaultLayout {
        height: 100%;
    }
</style>