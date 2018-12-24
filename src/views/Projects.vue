<template>
    <div class="content">
        <h1>Projects Page Component</h1>
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
            this.setCurrentAutoTheme({ theme: "red" });
        }
    }
</script>