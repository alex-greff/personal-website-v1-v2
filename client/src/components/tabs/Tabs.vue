<template>
    <div class="Tabs">
        <div class="Tabs__tab-selectors">
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
            <!-- <transition v-bind="prevTabTransitions['v-bind']" v-on="prevTabTransitions['v-on']"> -->
            <transition v-bind="firstTransitionAttrs['v-bind']" v-on="firstTransitionAttrs['v-on']">
                <!-- @enter is ran here -->
                <!-- <transition v-bind="currTabTransitions['v-bind']" v-on="currTabTransitions['v-on']"> -->
                <transition v-bind="secondTrabsitionAttrs['v-bind']" v-on="secondTrabsitionAttrs['v-on']">
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
            counter: 0,
            firstTransitionAttrs: { "v-on": {}, "v-bind": {} },
            secondTrabsitionAttrs: { "v-on": {}, "v-bind": {} },
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
            const temp = this.getTabTransitions(this.prevTab);
            // console.log("Updated prev tab transitions", temp);
            return temp;
        },
        currTabTransitions() {
            const temp = this.getTabTransitions(this.currTab);
            // console.log("Updated curr tab transitions", temp);
            return temp;
        },
    },
    mounted() {
        window.addEventListener("hashchange", this.hashListener);

        this.$nextTick(() => {
            const windowHash = window.location.hash.substring(1);
            const validHash = !!this.getTabConfig(windowHash);

            // Only use the hash if it points to a tab, if not use the initial selected tab
            const selectedTab = (validHash) ? windowHash : this.initialSelectedTab;
            this.selectTab(selectedTab);

            this.setTabTransitions(this.prevSelectedTab, this.currSelectedTab);
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

            this.counter += 1;
        },
        findTabSelector(selectorName) {
            return this.tabSelectors.find((selector) => selector.name === selectorName);
        },
        getTabConfig(tabName) {
            return this.tabs.find(tab => tab.name === tabName);
        },
        getTabTransitions(tab) {
            const oRet = { "v-bind": {}, "v-on": {}, "v-model": {} };

            if (tab && tab.transition) {
                const transition = tab.transition;
                // Generate directive mappings
                Object.entries(transition).forEach(([attribute, value]) => {
                    const bVOn = attribute.startsWith("@") || attribute.startsWith("v-on:");
                    const bVModel = attribute.startsWith("v-model:");

                    if (bVOn) { // v-on
                        const attributeSerialized = attribute.replace("@", "").replace("v-on:", "");
                        oRet["v-on"][attributeSerialized] = value;
                    } else if(bVModel) { // v-model
                        const attributeSerialized = attribute.replace("v-model:", "");
                        oRet["v-model"][attributeSerialized] = value;
                    } else { // v-bind or default
                        const attributeSerialized = attribute.replace("v-bind:", "").replace(":", "");
                        oRet["v-bind"][attributeSerialized] = value;
                    }
                })
            }

            return oRet;
        },
        setTabTransitions(prevTabName, currTabName) {
            console.log("Setting tab transitions", prevTabName, currTabName);
            this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(prevTabName));
            this.firstTransitionAttrs["v-on"] = { 
                ...this.firstTransitionAttrs["v-on"], 
                "leave": (el) => {
                    // console.log("running");

                    // const temp = this.firstTransitionAttrs;
                    // this.firstTransitionAttrs = this.secondTrabsitionAttrs;
                    // this.secondTrabsitionAttrs = temp;

                    // TODO: run existing func
                    // this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));
                    // this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));
                    console.log("> @leave", this.currSelectedTab, "@enter", this.prevSelectedTab);
                    this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));
                    this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));

                    // this.firstTrabsitionAttrs["v-on"]["enter"](el, done);
                },
                "leave": (el) => {
                    console.log("> @leave", this.prevSelectedTab, "@enter", this.currSelectedTab);
                    this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));
                    this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));

                    // this.firstTrabsitionAttrs["v-on"]["leave"](el, done);
                }
            };
            this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(currTabName));
            this.secondTrabsitionAttrs["v-on"] = {
                ...this.secondTrabsitionAttrs["v-on"],
                "leave": (el, done) => {
                    // console.log("running 2");

                    // const temp = this.firstTransitionAttrs;
                    // this.firstTransitionAttrs = this.secondTrabsitionAttrs;
                    // this.secondTrabsitionAttrs = temp;

                    // TODO: run existing func

                    // this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));
                    // this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));
                    console.log("> @leave", this.currSelectedTab, "@enter", this.prevSelectedTab);
                    this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));
                    this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));

                    // this.secondTrabsitionAttrs["v-on"]["enter"](el, done);
                },
                "leave": (el) => {
                    console.log("> @leave", this.prevSelectedTab, "@enter", this.currSelectedTab);
                    this.firstTransitionAttrs = this.getTabTransitions(this.getTabConfig(this.prevSelectedTab));
                    this.secondTrabsitionAttrs = this.getTabTransitions(this.getTabConfig(this.currSelectedTab));

                    // this.secondTrabsitionAttrs["v-on"]["leave"](el, done);
                }
            };
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
