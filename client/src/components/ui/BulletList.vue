<template>
    <div 
        :class="['BulletList', breakCols ? 'breakable' : null]"
    >
        <div 
            class="BulletList__column"
            v-for="colNum in numCols"
            :key="`BulletList-col-${colNum}`"
        >
            <div
                :class="['BulletList__item', (enableScrollReveal) ? 'sr-load-hidden' : null]"
                v-for="(item, idx) in columnItems(colNum)"
                :key="`BulletList-col-${colNum}-${idx}`"
                
                v-if="!$isServer"
                v-scroll-reveal="{
                    desktop: enableScrollReveal,
                    mobile: enableScrollReveal,
                    delay: revealInitDelay + (columnIndex(idx, columnItems(colNum).length) * revealDelayBetween),
                    duration: revealDuration
                }"
            >
                <fa-icon 
                    class="BulletList__item-icon" 
                    name="angle-right" 
                /> 
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        numCols: {
            type: Number,
            default: 2
        },
        items: {
            type: Array,
            required: true
        },
        // Breakdown the columns into one when the phone size is reached
        breakCols: {
            type: Boolean,
            default: true
        },
        enableScrollReveal: {
            type: Boolean,
            default: false
        },
        // Used only if enableScrollReveal=true
        revealInitDelay: {
            type: Number,
            default: 0
        },
        revealDelayBetween: {
            type: Number,
            default: 150
        },
        revealDuration: {
            type: Number,
            default: 800
        }
    },
    computed: {
        columnItems() {
            return (colNum) => {
                const isLastCol = (colNum === this.numCols);

                const numItems = (isLastCol) 
                    ? Math.floor(this.items.length / this.numCols) : Math.ceil(this.items.length / this.numCols);

                const startIdx = (colNum - 1) * Math.ceil(this.items.length / this.numCols);

                return this.items.slice(startIdx, startIdx + numItems);
            }
        }
    },
    methods: {
        columnIndex(listIdx, itemsPerColumn) {
            return listIdx % itemsPerColumn;
        }
    }
}
</script>

<style lang="scss" scoped>
    .BulletList {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;

        font-size: 1.7rem;

        & .BulletList__column {
            width: 100%;
        }

        & .BulletList__item {
            display: flex;
            flex-direction: row;
            align-items: center;

            & .BulletList__item-icon {
                margin-right: 0.7rem;

                color: color-link("current_section", "accent_color", "primary");
            }
        }

        // --- Modifiers ---
        &.breakable {
            @include respond(phone) {
                flex-direction: column;
            }
        }
    }
</style>