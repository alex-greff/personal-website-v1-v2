<template>
    <div class="Tabs">
        <div :class="tabSelectorListClasses">
            <span 
                v-for="(tab, index) in tabs"
                :key="index"
                :class="tabSelectorClasses"
            >
                <slot 
                    :name="tab.selector"
                ></slot>
            </span>
        </div>
        <div :class="tabViewClasses">
            <!-- @leave is ran here -->
            <transition v-bind="tabTransitionAttrs['v-bind']" v-on="tabTransitionAttrs['v-on']">
                <!-- @enter is ran here -->
                <transition v-bind="tabTransitionAttrs['v-bind']" v-on="tabTransitionAttrs['v-on']">
                    <slot :name="`${currSelectedTab}`"></slot>
                </transition>
            </transition>
        </div>
    </div>
</template>

<script>
import Utilities from "@/utilities";

const INIT_TRANSITION_OBJECT = { "v-on": {}, "v-bind": {}, "v-model": {} };

export default {
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
        },
        tabSelectorListClass: {
            type: String,
            default: ""
        },
        tabSelectorClass: {
            type: String,
            default: ""
        },
        tabViewClass: {
            type: String,
            default: ""
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
            currSelectedTab: null,
            tabTransitionAttrs: { ...INIT_TRANSITION_OBJECT },
        }
    },
    computed: {
        tabSelectors() {
            return this.$children.filter((child) => {
                // return child.$options._componentTag === this.tabSelectorTagName;
                // TODO: this is really whack... need to fix
                return child.$options._componentTag.includes("selector") && child.$refs.tabSelectorRef; 
            }).map(child => {
                return child.$refs.tabSelectorRef;
            })
            // return this.$children;
        },
        tabSelectorListClasses() {
            return `Tabs__tab-selectors ${this.tabSelectorListClass}`.trim();
        },
        tabSelectorClasses() {
            return `Tabs__tab-selector ${this.tabSelectorClass}`.trim();
        },
        tabViewClasses() {
            return `Tabs__tab-view ${this.tabViewClass}`.trim();
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

            this.setupTabTransitions(this.currSelectedTab);
        });
    },
    destroyed() {
        window.removeEventListener("hashchange", this.hashListener);
    },
    methods: {
        selectTab(selectedTab) {
            this.currSelectedTab = selectedTab;

            // Set selected property
            this.tabSelectors.forEach(selector => {
                selector.selected = (selector.tabName === selectedTab);
            });
        },
        findTabSelector(selectorName) {
            return this.tabSelectors.find(selector => selector.name === selectorName);
        },
        getTabConfig(tabName) {
            return this.tabs.find(tab => tab.name === tabName);
        },
        getTabTransitions(tab) {
            const oRet = { ...INIT_TRANSITION_OBJECT };

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
        setupTabTransitions(currTabName) {
            // Get the original inputted tab transitions
            const transitionAttrs = this.getTabTransitions(this.getTabConfig(currTabName));

            this.tabTransitionAttrs = { ...transitionAttrs };
            this.tabTransitionAttrs["v-on"] = { 
                ...transitionAttrs["v-on"],
                // Override leave
                "leave": (el, done) => {
                    // Setup the done hijack
                    const doneHijack = () => {
                        this.setupTabTransitions(this.currSelectedTab);
                        done();
                    }

                    // Run the inputted leave transition function 
                    Utilities.runFunctionsWithParams([el, doneHijack], transitionAttrs["v-on"]["leave"]);
                }
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.Tabs {
    & .Tabs__tab-selectors {
        & .Tabs__tab-selector {
            display: inline-block;
        }
    }
}
</style>
