<template>
    <Layout>
        <home-section />
        <about-section />
        <experience-section />
        <projects-section />
    </Layout>
</template>

<script>
import HomeSection from "@/sections/Home/Home.vue";
import AboutSection from "@/sections/About/About.vue";
import ExperienceSection from "@/sections/Experience/Experience.vue";
import ProjectsSection from "@/sections/Projects/Projects.vue";

export default {
    metaInfo: {
        title: 'Alexander Greff'
    },
    components: {
        HomeSection,
        AboutSection,
        ExperienceSection,
        ProjectsSection
    }
}
</script>
