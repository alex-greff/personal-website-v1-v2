<template>
    <div class="content">
        <h1>404 Not Found</h1>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions({
                setCurrentAutoTheme: "setCurrentAutoTheme"
            })
        },
        created() {
            this.setCurrentAutoTheme({ theme: "default" });
        }
    }
</script>
