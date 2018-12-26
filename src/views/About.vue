<template>
    <div class="about-content">
        <h1>About Page Component</h1>
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
            this.setCurrentAutoTheme({ theme: "green" });
        }
    }
</script>

