<template>
    <collapsible-container>
        <markdown-display 
            class="ExperienceItemSummary"
            :markdown="summaryMarkdown" 
        />
    </collapsible-container>
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";
import CollapsibleContainer from "@/components/containers/CollapsibleContainer.vue";

export default {
    components: {
        markdownDisplay: MarkdownDisplay,
        collapsibleContainer: CollapsibleContainer,
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
        @include markdown-theme(2.3rem, 1.5rem, true);
    }
</style>