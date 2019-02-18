<template>
    <div id="app">
        <nav-bar ref="navBar"></nav-bar>
        <div class="content" ref="content">
            <router-view></router-view>
        </div>
        <general-footer></general-footer>
        <svg class="svg-def">
            <symbol id="logo-symbol">
                <path d="m 11.179235,7.310372 -2.7239749,0.1951489 -0.034753,-0.044358 5.2322789,-5.1436935 0.03475,0.044358 z m 0.788388,2.596036 1.423603,-0.063707 C 13.798222,8.9739775 14.24077,8.1058539 14.769801,7.3705088 14.71024,7.3149401 14.21707,7.2307488 13.136088,7.2555925 L 15.426707,2.5441747 C 15.611633,2.1532809 15.998465,1.4155541 16.006837,0.95603813 16.014,0.56216696 15.775125,0.01095582 15.401851,0.00470403 14.601972,-0.00869291 12.432685,1.9468182 10.658434,3.6900625 L 6.6026645,7.6933761 C 6.5315635,7.6921853 5.8019885,7.7237429 5.5171884,7.7408608 5.4283137,7.739372 5.2691345,7.6929303 5.271925,7.5397572 5.279101,7.1458861 6.5730942,7.3645547 6.58027,6.9706835 6.5858511,6.6643398 5.6228072,6.8233173 4.9243964,7.0961688 3.9755397,7.4523795 2.6444718,9.2687114 2.6368974,9.6844637 c -0.010366,0.5689243 0.5778075,0.4912233 1.7162103,0.4665133 -1.5363773,1.615795 -4.38425759,5.042558 -4.35590824,5.541235 0.06483432,0.352854 0.17777776,0.298653 0.44440399,0.30312 C 1.0815064,16.006033 1.773703,15.09833 2.209873,14.580314 L 5.9350902,10.177473 9.8128499,10.0892 c -1.6287895,3.51864 -1.3617648,3.501224 -1.3649539,3.676277 -0.012756,0.700217 0.2427073,1.317368 0.8826103,1.328088 1.2620307,0.02118 2.8052047,-1.725977 3.6775447,-2.762009 l -0.309587,-0.574284 c -1.06627,0.94523 -1.266181,1.182655 -1.586134,1.177296 -0.17775,-0.003 -0.31756,-0.136651 -0.313572,-0.355468 z"></path>
            </symbol>
        </svg>
    </div>
</template>

<script>
    // @ is an alias for /src
    import NavBar from '@/components/NavBar.vue';
    import Footer from '@/components/Footer.vue';

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
            },
            populateProjects() {
                this.$store.dispatch('populateProjects');
            }
        },
        created() {
            // Instantiate vuex data
            this.populateThemes();
            this.populateProjects();
        }, 
        mounted() {
            this.alignContent();
        }
    }
</script>


<style lang="scss">
    .svg-def {
        position: fixed;
        top: -100%;

        pointer-events: none;
    }
</style>
