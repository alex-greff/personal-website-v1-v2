<template>
    <div class="content-list-container">

        <content-item v-for="(ID, index) in contentIDs" :key="index">
            <slot :name="ID"></slot>
        </content-item>
    </div>
</template>

<script>
import ContentItem from '../../components/contentList/ContentItem.vue';

export default {
    components: {
        contentItem: ContentItem,
    },
    data() {
        return {

        }
    },
    props: {
        contentIDs: {
            type: Array, // Array of Strings
            // required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .content-list-container {
        width: 100%;
    }
</style>

