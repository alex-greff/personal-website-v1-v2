<template>
    <router-link
        v-if="useRouterLink"
        :to="to"
        :tag="tag"
        class="Button"
    >
        <a>
            <slot></slot>
        </a>
    </router-link>
    <component 
        :is="tag" 
        v-else
        class="Button"
    >
        <a 
            :href="href"
            v-bind="$attrs"
        >
            <slot></slot>
        </a>
    </component>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: null
        },
        href: {
            type: String,
            default: null
        },
        tag: {
            type: String,
            default: "div"
        }
    },
    computed: {
        useRouterLink() {
            return !!this.to;
        }
    }
}
</script>

<style lang="scss" scoped>
    .Button {
        @include standard-button-styles();
    }
</style>