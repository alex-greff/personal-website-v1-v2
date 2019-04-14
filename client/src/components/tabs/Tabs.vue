<template>
    <div class="Tabs">
        <div class="Tabs__tab-list">
            <!-- <component 
                :is="tabSelectorComponent"
                v-for="(tab, index) in tabs"
                :key="index"
                :name="tab.name"    
                :selected="tab.isActive"
                :disabled="tab.isDisabled"
                @click.native="selectTab(tab)"
            /> -->
            <div 
                v-for="(tabName, index) in tabNames"
                :key="index"
                @click="selectTab(tabName)"
            >
                <slot 
                    :name="`${tabName}${selectorSuffix}`"
                ></slot>
            </div>
        </div>
        <div class="Tabs__tab-view">
            <div
                v-for="(tabName, index) in tabNames"
                :key="index"
            >
                <slot :name="`${tabName}`"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        
    },
    props: {
        tabNames: {
            type: Array,
            required: true,
        },
        selectedTabName: {
            type: String,
            required: true,
        },
        selectorSuffix: {
            type: String,
            default: "_selector"
        }
    },
    data() {
        return {
            // tabs: [],
            hashListener: () => this.selectTab(window.location.hash),
            TAB_TAG_NAME: "tab",
            TAB_SELECTOR_TAG_NAME: `tab-selector`
        }
    },
    computed: {
        tabs() {
            return this.$children.filter((child) => (
                child.$options._componentTag === this.TAB_TAG_NAME
            ));
        },
        tabSelectors() {
            return this.$children.filter((child) => (
                child.$options._componentTag === this.TAB_SELECTOR_TAG_NAME
            ))
        }
    },
    created() {
        // console.log(this.$children);
        // this.tabs = this.$children;
        // this.generateTabsList();
    },
    mounted() {
        window.addEventListener("hashchange", this.hashListener);

        // this.$nextTick(() => {
        //     console.log(this.$children);
        //     this.tabs = this.$children;
        // })

        this.$nextTick(() => {
            this.selectTab(this.selectedTabName);
        });
    },
    destroyed() {
        window.removeEventListener("hashchange", this.hashListener);
    },
    methods: {
        selectTab(selectedName) {
            this.tabs.forEach(tab => {
                tab.selected = (tab.name == selectedName);
            });

            this.tabSelectors.forEach(selector => {
                selector.selected = (selector.name == selectedName);
            });
        },
        findTab(tabName) {
            return this.tabs.find((tab) => tab.name === tabName);
        },
        findTabSelector(selectorName) {
            return this.tabSelectors.find((selector) => selector.name === selectorName);
        },
        // tabDisabled(tabName) {
        //     const tab = this.findTab(tabName);
        //     if (!tab) {
        //         return null;
        //     }

        //     return tab.disabled;
        // },
        generateTabsList() {
            // console.log("generating tabs", childrenList);

            // this.tabs = childrenList.reduce((acc, currChild) => {
            //     console.log(currChild.$options._componentTag);
            //     const bIsTab = currChild.$options._componentTag === TAB_TAG_NAME;
            //     const tab = (bIsTab) ? [currChild] : [];

            //     return {
            //         ...acc,
            //         ...tab
            //     };
            // }, []);
        }
    }
}
</script>