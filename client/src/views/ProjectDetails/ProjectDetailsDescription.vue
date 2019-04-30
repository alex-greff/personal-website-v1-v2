<template>
    <themed-markdown-display 
        class="ProjectDetailsDescription"
        :markdown="descriptionMarkdown" 
    />
</template>

<script>
import ThemedMarkdownDisplay from "@/components/markdown/ThemedMarkdownDisplay.vue";

export default {
    components: {
        themedMarkdownDisplay: ThemedMarkdownDisplay
    },
    props: {
        descriptionMarkdown: {
            type: String,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
    .ProjectDetailsDescription {
        width: 100%;
    }
</style>