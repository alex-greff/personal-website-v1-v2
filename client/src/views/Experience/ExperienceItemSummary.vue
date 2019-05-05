<template>
    <markdown-display 
        class="ExperienceItemSummary"
        :markdown="summaryMarkdown" 
    />
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";

export default {
    components: {
        markdownDisplay: MarkdownDisplay
    },
    props: {
        summaryMarkdown: {
            type: String,
            required: true,
        }
    },
}
</script>

<style lang="scss" scoped>
    .ExperienceItemSummary {
        @include markdown-theme(2.3rem, 1.5rem);
    }
</style>