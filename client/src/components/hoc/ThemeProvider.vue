<template>
    <custom-properties-applier 
        :properties="themeProperties"
        :tag="tag"
        :use-root="useRoot"
        :use-el="useEl"
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
        namespace: { type: String, default: undefined },
        theme: { type: String, default: undefined },
        tag: {
            type: String,
            default: "div"
        },
        useRoot: {
            type: Boolean,
            default: false
        },
        useEl: {
            type: Boolean,
            required: false,
            default: false
        },
        el: {
            type: HTMLDivElement,
            required: false,
            default: undefined
        }
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
    watch: {
        namespace(nextNamespace) {
            this.validateProps(nextNamespace, this.theme);
        },
        theme(nextTheme) {
            this.validateProps(this.namespace, nextTheme);
        }
    },
    created() {
        this.validateProps(this.namespace, this.theme);
    },
    methods: {
        // Makes sure the props are valid
        validateProps(i_sNamespace, i_sTheme, i_bUseEl, i_el) {
            const bBothExist = !!i_sNamespace && !!i_sTheme;
            const bNeitherExist = !i_sNamespace && !i_sTheme;

            if (bBothExist) {
                throw `Error: only one of props 'namespace' and 'theme' can be specified at once`;
            }

            if (bNeitherExist) {
                throw `Error: one of props 'namespace' and 'theme' must be specified`;
            }

            if (i_bUseEl && !i_el) {
                throw `Error: el must be specified when useEl is 'true'`;
            }
        }
    },
}
</script>

