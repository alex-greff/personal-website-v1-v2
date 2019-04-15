<template>
    <div v-if="selected">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: { 
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        customHash: {
            type: String, 
            default: null,
            validator(hash) {
                return hash.startsWith("#");
            }
        }
    },
    data() {
        return {
            selected: true,
        }
    },
    computed: {
        hash() {
            return (this.customHash) ? this.customHash : `#${this.name.toLowerCase().replace(/ /g, "-")}`;
        }
    },
}
</script>