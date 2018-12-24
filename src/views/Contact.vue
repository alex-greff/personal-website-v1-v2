<template>
    <div class="content">
        <h1>Contact Page Component</h1>
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
            this.setCurrentAutoTheme({ theme: "purple" }); 
        }
    }
</script>