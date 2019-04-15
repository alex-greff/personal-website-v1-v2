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
            <span 
                v-for="(tabName, index) in tabNames"
                :key="index"
                @click="selectTab(tabName)"
            >
                <slot 
                    :name="`${tabName}${selectorSuffix}`"
                ></slot>
            </span>
        </div>
        <div class="Tabs__tab-view">
            <div
                v-for="(tabName, index) in tabNames"
                :key="index"
            >
                <!-- <transition name="fade" mode="out-in"> -->
                <slot :name="`${tabName}`"></slot>
                <!-- </transition> -->
            </div>
            <!-- This runs on leave only and runs from the css in ProjectDetails... -->
            <!-- Also the transition enter anim doesn't run if this is not attached... -->
            <!-- <transition name="fade" mode="out-in">
                <slot :name="`${selectedTabName}`"></slot>
            </transition> -->
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
        initialSelectedTabName: {
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
            hashListener: () => this.selectTab(window.location.hash),
            selectedTabName: null,
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
        },
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
            this.selectTab(this.initialSelectedTabName);
        });
    },
    destroyed() {
        window.removeEventListener("hashchange", this.hashListener);
    },
    methods: {
        selectTab(selectedName) {
            // this.selectedTabName = selectedName;

            this.tabs.forEach(tab => {
                tab.selected = (tab.name == selectedName);
            });

            this.tabSelectors.forEach(selector => {
                selector.selected = (selector.name == selectedName);
            });

            // console.log(this.$refs);
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

<style lang="scss" scoped>
    // .fade-enter-active, .fade-leave-active {
    //     transition: opacity 5s;
    // }
    // .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    //     opacity: 0;
    // }
</style>
