<template>
    <div class="theme-controls">
        <span class="theme-item theme-auto" 
            title="Theme: auto"
            
        ></span>

        <span v-for="theme in themes" :key="theme.name" class="theme-item"
            :title="'Theme: ' + theme.name"
            :style="{ backgroundColor: toRGBA(theme.properties['--color-accent-primary']) }"
        ></span>
    </div>
    <!-- @click="setAutoThemeEnabled(true)" -->
    <!-- :class="{ 'theme-active': autoThemeEnabled === true }" -->

    <!-- :class="{ 'theme-active': currentTheme === theme.name && autoThemeEnabled === false }" -->
    <!-- @click="setCurrentTheme({ theme: theme['name'], forceAutoOff: true })"> -->
</template>


<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as getterTypes from '@/store/types/getterTypes';
    import * as actionTypes from '@/store/types/actionTypes';

    export default {
        computed: {
            ...mapGetters({
                themes: getterTypes.GET_ALL_THEMES,
                // currentTheme: "getCurrentTheme",
                // autoThemeEnabled: "getAutoThemeEnabled"
            })
        },
        methods: {
            ...mapActions({
                // setCurrentTheme: "setCurrentTheme",
                // setAutoThemeEnabled: "setAutoThemeEnabled"
            }),
            toRGBA(themeColor) {
                return "rgba(" + themeColor + ", 1)";
            }
        }
    }
</script>

<style lang="scss" scoped>
    .theme-controls {
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;

        & .theme-item {
            width: 1rem;
            height: 1rem;
            
            outline: 0.1rem solid rgba(0, 0, 0, 0);
            margin: 0.1rem;

            background-color: rgb(234, 234, 234);

            &:hover {
                outline: 0.1rem solid rgba(226, 226, 226, 0.4);
            }
        }

        & .theme-active {
            outline: 0.1rem solid rgb(226, 226, 226) !important; // TODO: dont use !important
        }

        & .theme-auto {
            background: rgb(255,105,105);
            background: linear-gradient(135deg, rgba(255,105,105,1) 0%, rgba(185,236,171,1) 57%, rgba(96,228,255,1) 100%);
        }
    }
</style>
