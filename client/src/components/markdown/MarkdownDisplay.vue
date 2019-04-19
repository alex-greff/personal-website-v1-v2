<template>
    <!-- eslint-disable vue/no-v-html -->
    <div
        class="MarkdownDisplay" 
        v-html="compiledMarkdown"
    />
</template>

<script>
import marked from "marked";

export default {
    props: {
        markdown: {
            type: String,
            default: ""
        }
    },
    computed: {
        compiledMarkdown() {
            const test = this.markdown;
            // const test = this.markdown.replace(/\r\n|\r/g, '\n')
            //     .replace(/\t/g, '    ')
            //     .replace(/^[\w\<][^\n]*\n+/mg,function(m){
            //         return /\n{2}/.test(m) ? m : m.replace(/\s+$/,"")+"  \n";
            //     });
            // console.log(this.markdown.replace("\\n", "\n"));
            console.log(test);
            // console.log(this.markdown.charAt(14));
            console.log(`# Hi there\n\nThis is my markdown **description**\n\nIt is *super* __cool__\n\n## Some more stuff\n\nHere's some more stuff about something:\n\n* Cool!\n* Awesome\n* Excellent\n\nEnjoy my cool markdown!`);
            // return marked(this.markdown, { sanitize: true });
            return marked(test, { sanitize: true });
        }
    }
}
</script>

