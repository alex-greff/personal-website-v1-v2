<template>
    <layout>
        <home-section />
        <about-section />
        <experience-section />
        <projects-section />
        <!-- <contact-section /> -->
    </layout>
</template>

<script>
import HomeSection from "@/sections/Home/Home.vue";
import AboutSection from "@/sections/About/About.vue";
import ExperienceSection from "@/sections/Experience/Experience.vue";
import ProjectsSection from "@/sections/Projects/Projects.vue";
import ContactSection from "@/sections/Contact/Contact.vue";

export default {
    metaInfo: {
        title: 'Alexander Greff'
    },
    components: {
        HomeSection,
        AboutSection,
        ExperienceSection,
        ProjectsSection,
        ContactSection
    }
}
</script>
