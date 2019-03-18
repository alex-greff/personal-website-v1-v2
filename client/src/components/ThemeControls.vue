<template>
    <div class="theme-controls">
        <span class="theme-item theme-auto" 
            title="Theme: auto"

            @click="setAutoThemeEnabled(true)"
            :class="{ 'theme-active': autoThemeEnabled === true }"  
        ></span>

        <span v-for="theme in themes" :key="theme.name" class="theme-item"
            :title="'Theme: ' + theme.name"
            :style="{ backgroundColor: toRGBA(theme.properties['--color-accent-primary']) }"

            :class="{ 'theme-active': currThemeName === theme.name && autoThemeEnabled === false }"
            @click="setStaticTheme(theme.name)">
        </span>
    </div>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex';
    import { getterTypes, actionTypes } from '@/store/types';

    export default {
        computed: {
            ...mapGetters({
                themes: getterTypes.GET_ALL_THEMES,
                getTheme: getterTypes.GET_THEME,
                getNamespace: getterTypes.GET_NAMESPACE,
                autoThemeEnabled: getterTypes.IS_AUTO_THEME_ENABLED,
                currentThemeNamespace: getterTypes.GET_CURRENT_THEME_NAMESPACE
            }),
            currThemeName() {
                const oTheme = this.getTheme(this.getNamespace(this.currentThemeNamespace))
                return (oTheme) ? oTheme.name : "";
            }
        },
        methods: {
            ...mapActions({
                setAutoThemeEnabled: actionTypes.SET_AUTO_THEME_ENABLED,
                setCurrentStaticThemeNamespace: actionTypes.SET_CURRENT_STATIC_THEME_NAMESPACE,
                editNamespace: actionTypes.EDIT_NAMESPACE
            }),
            toRGBA(themeColor) {
                return "rgba(" + themeColor + ", 1)";
            },
            setStaticTheme(i_sThemeName) {
                // Disable the auto theme
                this.setAutoThemeEnabled(false);
                // Modify the default namespace to use the given theme
                this.editNamespace({ name: "default", targetTheme: i_sThemeName });
                // Set the current static namespace to be the default theme
                this.setCurrentStaticThemeNamespace({ namespace: "default" });
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
