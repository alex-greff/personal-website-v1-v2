<template>
    <Layout>
        <home-section />
        <about-section />
    </Layout>
</template>

<script>
import HomeSection from "@/sections/Home/Home.vue";
import AboutSection from "@/sections/About/About.vue";

export default {
    metaInfo: {
        title: 'Alexander Greff'
    },
    components: {
        HomeSection,
        AboutSection
    }
}
</script>

<style lang="scss" scoped>

</style>
