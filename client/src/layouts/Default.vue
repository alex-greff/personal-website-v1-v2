<template>
    <theme-provider 
        ref="baseRef"
        class="DefaultLayout"
        :namespace="globalNamespace" 
        use-root
    >
        <block-loader 
            v-if="loading" 
            :is-open="true" 
            :z-index="100"
            controlled
            :namespace="blockLoaderNamespace"
        />

        <nav-bar v-if="!loading" animate-in />

        <!-- Page content -->
        <slot v-if="!loading" /> 
    </theme-provider>
</template>

<script>
import ThemeProvider from "@/components/hoc/ThemeProvider.vue";
import BlockLoader from "@/components/loaders/BlockLoader.vue";
import NavBar from "@/components/NavBar/NavBar.vue";

import { GLOBAL_NAMESPACE } from "../constants/general";

export default {
    components: {
        ThemeProvider,
        BlockLoader,
        NavBar
    },
    data() {
        return {
            globalNamespace: GLOBAL_NAMESPACE,

            loading: true,

            pageLoadAnim: async () => {
                // Run spoof anim
                await BlockLoader.spoofLoadAnim(this.$refs.baseRef.$el);

                this.loading = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.pageLoadAnim();
        });
    },
    computed: {
        blockLoaderNamespace() {
            const currSection = window.location.hash.split("#")[1];

            return (currSection) ? `section_${currSection}` : "section_home";
        }
    },
    watch: {
        loading(currLoading) {
            const currSection = window.location.hash.split("#")[1];

            if (currLoading === false && currSection) {
                // Allow section to initially render before scrolling to it
                this.$nextTick(() => {
                    const currSectionEl = document.getElementById(currSection);
                    if (currSectionEl) {
                        currSectionEl.scrollIntoView();
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .DefaultLayout {
        height: 100%;
    }
</style>