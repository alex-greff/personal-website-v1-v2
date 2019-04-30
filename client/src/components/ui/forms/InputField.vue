<template>
    <input 
        class="InputField"
        :type="type"
        :value="value"
        @input="handleInput"
    >
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ""
            // required: true
        },
        type: {
            type: String,
            default: "text",
            validator(val) {
                const validTypes = ["button", "checkbox", "color", 
                                    "date", "datetime-local", "email", "file", "hidden", "image",
                                    "month", "number", "password", "radio", "range", "search", 
                                    "submit", "tel", "text", "url", "week"];
                return validTypes.indexOf(val) > -1;
            }
        },
        value: {
            type: String,
            default: ""
        }
    },
    methods: {
        handleInput(e) {
            this.$emit("input", e.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
