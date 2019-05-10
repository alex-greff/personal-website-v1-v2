<template>
    <markdown-display 
        class="ThemedMarkdownDisplay"
        :markdown="markdown"
    >
        <slot></slot>
    </markdown-display>
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .ThemedMarkdownDisplay {
        @include markdown-theme();
    }
</style>