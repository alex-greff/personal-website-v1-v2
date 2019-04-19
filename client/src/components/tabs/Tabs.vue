<template>
    <div class="Tabs">
        <div class="Tabs__selectors">
            <a 
                v-for="(tab, index) in tabs"
                :key="index"
                class="Tabs__anchor-reset"
                :href="`#${tab.name}`"
            >
                <slot 
                    :name="tab.selector"
                ></slot>
            </a>
        </div>
        <div class="Tabs__tab-view">
            <!-- @leave is ran here -->
            <transition v-bind="prevTabTransitions['v-bind']" v-on="prevTabTransitions['v-on']">
                <!-- @enter is ran here -->
                <transition v-bind="currTabTransitions['v-bind']" v-on="currTabTransitions['v-on']">
                    <slot :name="`${currSelectedTab}`"></slot>
                </transition>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        
    },
    props: {
        tabs: {
            type: Array,
            required: true,
            validator(tabs) {
                tabs.forEach(tab => {
                    // Check tab is object
                    if (typeof tab !== "object") {
                        return false;
                    }
                    // Check required values are present
                    if (!tab.name || !tab.selector) {
                        return false;
                    }
                })
                return true;
            }
        },
        initialSelectedTab: {
            type: String,
            required: true,
        },
        tabSelectorTagName: {
            type: String,
            default: "tab-selector"
        }
    },
    data() {
        return {
            hashListener: () => {
                const windowHash = window.location.hash.substring(1);
                const validHash = !!this.getTabConfig(windowHash);

                // Only change the tab if the hash points to a tab
                if (validHash) {
                    this.selectTab(windowHash);
                }
            },
            prevSelectedTab: null,
            currSelectedTab: null,
        }
    },
    computed: {
        tabSelectors() {
            return this.$children.filter((child) => {
                return child.$options._componentTag === this.tabSelectorTagName
            })
        },
        prevTab() {
            return this.tabs.find(tab => tab.name === this.prevSelectedTab);
        },
        currTab() {
            return this.tabs.find(tab => tab.name === this.currSelectedTab);
        },
        prevTabTransitions() {
            return this.getTabTransitions(this.prevTab);
        },
        currTabTransitions() {
            return this.getTabTransitions(this.currTab);
        }
    },
    mounted() {
        window.addEventListener("hashchange", this.hashListener);

        this.$nextTick(() => {
            const windowHash = window.location.hash.substring(1);
            const validHash = !!this.getTabConfig(windowHash);

            // Only use the hash if it points to a tab, if not use the initial selected tab
            const selectedTab = (validHash) ? windowHash : this.initialSelectedTab;
            this.selectTab(selectedTab);
        });
    },
    destroyed() {
        window.removeEventListener("hashchange", this.hashListener);
    },
    methods: {
        selectTab(selectedTab) {
            this.prevSelectedTab = (!this.prevSelectedTab) ? selectedTab : this.currSelectedTab;

            this.currSelectedTab = selectedTab;

            this.tabSelectors.forEach(selector => {
                selector.selected = (selector.name == selectedTab);
            });
        },
        findTabSelector(selectorName) {
            return this.tabSelectors.find((selector) => selector.name === selectorName);
        },
        getTabConfig(tabName) {
            return this.tabs.find(tab => tab.name === tabName);
        },
        getTabTransitions(tab) {
            const oRet = { "v-bind": {}, "v-on": {} };

            if (tab && tab.transition) {
                const transition = tab.transition;
                oRet["v-bind"] = transition["v-bind"] ? transition["v-bind"] : {};
                oRet["v-on"] = transition["v-on"] ? transition["v-on"] : {};
            }

            return oRet;
        }
    }
}
</script>

<style lang="scss" scoped>
    .Tabs {
        & .Tabs__anchor-reset {
            color: inherit;
            text-decoration: inherit;
            cursor: inherit;
        }
    }
</style>
