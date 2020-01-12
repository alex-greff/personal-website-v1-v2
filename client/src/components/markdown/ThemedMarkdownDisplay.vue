<template>
    <markdown-display 
        class="ThemedMarkdownDisplay"
        :markdown="markdown"
        :compiled-markdown="compiledMarkdown"
    />
</template>

<script>
import MarkdownDisplay from "@/components/markdown/MarkdownDisplay.vue";
export default {
    components: {
        markdownDisplay: MarkdownDisplay
    },
    props: {
        markdown: {
            type: String,
            default: ""
        },
        compiledMarkdown: {
            type: String,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
    .ThemedMarkdownDisplay {
        @include markdown-theme();
    }
</style>