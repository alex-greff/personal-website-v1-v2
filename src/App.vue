<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view></router-view>
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
        created() {
            console.log("App: created");
            this.$store.dispatch('populateThemes');
        }
    }
</script>


<style lang="scss">
    
</style>
