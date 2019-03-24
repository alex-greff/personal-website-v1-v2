<template>
    <custom-properties-applier 
        :properties="themeProperties"
        :tag="tag"
        :useRoot="useRoot"
        :useEl="useEl"
    >
        <slot></slot>
    </custom-properties-applier>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterTypes } from '@/store/types';

import CustomPropertiesApplier from '@/components/hoc/CustomPropertiesApplier.vue';

export default {
    components: {
        customPropertiesApplier: CustomPropertiesApplier
    },
    props: {
        namespace: String,
        theme: String,
        tag: {
            type: String,
            default: "div"
        },
        useRoot: {
            type: Boolean,
            default: false
        },
        useEl: {
            type: HTMLDivElement,
            required: false
        }
    },
    created() {
        this.validateProps(this.namespace, this.theme);
    },
    computed: {
        ...mapGetters({
            getTargetTheme: getterTypes.GET_NAMESPACE,
            getThemeData: getterTypes.GET_THEME
        }),
        themeProperties() {
            // Everytime this is recomputed check the props
            this.validateProps(this.namespace, this.theme);

            // Get the related theme data
            const sThemeID = (this.namespace) ? this.getTargetTheme(this.namespace) : this.theme;
            const oTheme = this.getThemeData(sThemeID);

            return (oTheme) ? oTheme["properties"] : {};
        }
    },
    methods: {
        // Makes sure the 'namespace' and 'theme' props are valid in respect to each other
        validateProps(i_sNamespace, i_sTheme) {
            const bBothExist = !!i_sNamespace && !!i_sTheme;
            const bNeitherExist = !i_sNamespace && !i_sTheme;

            if (bBothExist) {
                throw `Error: only one of props 'namespace' and 'theme' can be specified at once`;
            }

            if (bNeitherExist) {
                throw `Error: one of props 'namespace' and 'theme' must be specified`;
            }
        }
    },
    watch: {
        namespace(nextNamespace) {
            this.validateProps(nextNamespace, this.theme);
        },
        theme(nextTheme) {
            this.validateProps(this.namespace, nextTheme);
        }
    }
}
</script>

