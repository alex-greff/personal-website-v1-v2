const INLINE_ELEMENTS = [
    "b", "big", "i", "small", "tt",
    "abbr", "acronym", "cite", "code", "dfn", "em", "kbd", "strong", "samp", "var",
    "a", "bdo", "br", "img", "map", "object", "q", "script", "span", "sub", "sup",
    "button", "input", "label", "select", "textarea"
];

module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        // "prettier/vue",
        // "plugin:prettier/recommended"
    ],
    rules: {
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

        "vue/script-indent": [ "error", 4, { "baseIndent": 0 } ],
        "vue/html-indent": [ "error", 4 ],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "never",
                "normal": "any",
                "component": "any"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 5,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/singleline-html-element-content-newline": ["error", {
            "ignoreWhenNoAttributes": true,
            "ignoreWhenEmpty": true,
            "ignores": ["pre", "textarea", "md-icon", ...INLINE_ELEMENTS]
          }]
    },
    globals: {
        $nuxt: true
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};