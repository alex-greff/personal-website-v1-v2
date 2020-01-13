<template>
    <Layout>
        <home-section />
        <about-section />
        <projects-section />
    </Layout>
</template>

<script>
import HomeSection from "@/sections/Home/Home.vue";
import AboutSection from "@/sections/About/About.vue";
import ProjectsSection from "@/sections/Projects/Projects.vue";

export default {
    metaInfo: {
        title: 'Alexander Greff'
    },
    components: {
        HomeSection,
        AboutSection,
        ProjectsSection
    }
}
</script>

<style lang="scss" scoped>

</style>
