<template>
    <div class="content">
        <h1>Home Page Component</h1>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'

    // export default {
    //   name: 'home',
    //   components: {
    //     HelloWorld
    //   }
    // }

    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions({
                setCurrentAutoTheme: "setCurrentAutoTheme"
            })
        },
        created() {
            this.setCurrentAutoTheme({ theme: "blue" });
        }
    }
</script>
