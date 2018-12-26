<template>
    <div id="app">
        <nav-bar ref="navBar"></nav-bar>
        <div class="content" ref="content">
            <router-view></router-view>
        </div>
        <general-footer></general-footer>
    </div>
</template>

<script>
    import NavBar from './components/NavBar.vue';
    import Footer from './components/Footer.vue';

    export default {
        components: {
            navBar: NavBar,
            generalFooter: Footer,
        }, 
        methods: {
            alignContent() {
                // Align the content so that it is under the nav bar
                let navBarEl = this.$refs.navBar.$el;
                let contentEl = this.$refs.content;

                let contentPlacement = navBarEl.offsetHeight;
                contentEl.style.marginTop = contentPlacement + 'px';
            },
            populateThemes() {
                // Retrieves and populates the website with the themes
                this.$store.dispatch('populateThemes');
            }
        },
        created() {
            this.populateThemes();
        }, 
        mounted() {
            this.alignContent();
        }
    }
</script>


<style lang="scss">
    
</style>
