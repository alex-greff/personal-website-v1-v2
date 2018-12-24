<template>
    <div class="theme-controls">
        <span class="theme-item theme-auto" 
            title="Theme: auto"
            @click="setAutoThemeEnabled(true)"
            :class="{ 'theme-active': autoThemeEnabled === true }"></span>

        <span v-for="theme in this.themes" :key="theme.name" class="theme-item"
            :title="'Theme: ' + theme.name"
            :style="{ backgroundColor: toRGBA(theme['--color-accent-primary']) }"
            :class="{ 'theme-active': currentTheme === theme.name && autoThemeEnabled === false }"
            @click="setCurrentTheme({ theme: theme['name'], forceAutoOff: true })"></span>

        <!-- <span class="theme-item"></span>
        <span class="theme-item"></span>
        <span class="theme-item theme-active"></span>
        <span class="theme-item"></span>
        <span class="theme-item"></span> -->
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                themes: "getThemes",
                currentTheme: "getCurrentTheme",
                autoThemeEnabled: "getAutoThemeEnabled"
            })
        },
        methods: {
            ...mapActions({
                setCurrentTheme: "setCurrentTheme",
                setAutoThemeEnabled: "setAutoThemeEnabled"
            }),
            test() {
                console.log(this.themes);
            }, 
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
            // padding: 0.5rem;
            width: 1rem;
            height: 1rem;
            
            outline: 0.1rem solid rgba(0, 0, 0, 0);
            margin: 0.1rem;

            background-color: red;

            &:hover {
                outline: 0.1rem solid rgba(226, 226, 226, 0.4);
            }
        }

        & .theme-active {
            outline: 0.1rem solid rgb(226, 226, 226) !important; // TODO: dont use !important
        }

        & .theme-auto {
            background: rgb(255,105,105);
            background: linear-gradient(90deg, rgba(255,105,105,1) 0%, rgba(185,236,171,1) 57%, rgba(96,228,255,1) 100%);
        }
    }
</style>
