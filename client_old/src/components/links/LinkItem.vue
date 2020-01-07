<template>
    <a 
        class="LinkItem"
        :style="sizeStyles"
        :href="href" 
        :title="title"
        :target="targetValue"
    >
        <fa-icon :name="getIconMapping(linkType)" />
    </a>
</template>

<script>
import ICON_MAPPINGS from "@/constants/iconMappings";

export default {
    props: {
        href: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: null
        },
        openNewTab: {
            type: Boolean, 
            default: true
        },
        linkType: {
            type: String,
            default: ""
        },
        size: {
            type: Number,
            default: 2 // rem
        }
    },
    computed: {
        targetValue() {
            return (this.openNewTab) ? "__blank" : "";
        },
        sizeStyles() {
            return {
                width: `${this.size}rem`,
                height: `${this.size}rem`
            }
        }
    },
    methods: {
        getIconMapping(i_sIconType) {
            const iconMapping = ICON_MAPPINGS[i_sIconType];
            return (iconMapping) ? iconMapping : ICON_MAPPINGS["default"];
        },
    }
}
</script>

<style lang="scss" scoped>
    .LinkItem {
        pointer-events: all;

        $icon-size: 2rem;

        position: relative;
        width: $icon-size;
        height: $icon-size;

        margin-right: 0.3rem;
        margin-left: 0.3rem;

        text-decoration: none;
        color: theme-link("projects-item", "text-color", "primary");

        transition: color 0.5s;

        & > svg {
            width: 100%;
            height: 100%;
            
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        &:hover {
            color: theme-link("projects-item", "accent-color", "primary");
        }
    }
</style>