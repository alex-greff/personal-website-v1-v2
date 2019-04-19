<template>
    <markdown-display 
        class="ProjectDetailsDescription"
        :markdown="descriptionMarkdown" 
    />
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";

export default {
    components: {
        markdownDisplay: MarkdownDisplay
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