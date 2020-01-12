<template>
    <!-- eslint-disable vue/no-v-html -->
    <div
        class="MarkdownDisplay" 
        v-html="computedCompiledMarkdown"
    />
</template>

<script>
import marked from "marked";

export default {
    props: {
        markdown: {
            type: String,
            default: ""
        },
        compiledMarkdown: {
            type: String,
            default: null
        }
    },
    computed: {
        computedCompiledMarkdown() {
            if (this.compiledMarkdown) {
                return this.compiledMarkdown;
            }

            let processedStr = this.markdown.slice();
            // Replace any escaped newlines with actual newlines
            processedStr = processedStr.replace(/\\r\\n/g, "\n");
            processedStr = processedStr.replace(/\\n/g, "\n");
            // Replace any windows newlines
            processedStr = processedStr.replace(/\r\n/g, "\n");
            processedStr = processedStr.replace(/\r/g, "\n");
            // Process the markdown and return it
            return marked(processedStr, { sanitize: true });
        }
    }
}
</script>

