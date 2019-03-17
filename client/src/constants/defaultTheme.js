export const defaultTheme = {
    name: "default",
    properties: {
        // By default have the default theme hardcoded
        // So that if the backend api can not be accessed the site does not break
        "--color-page-bg": "61, 61, 61", // rgb(61, 61, 61)
        "--color-page-text": "229, 229, 229", // rgb(229, 229, 229)
        "--color-nav-bg": "42, 42, 42", // rgb(42, 42, 42)
        "--color-nav-text": "143, 143, 143", // rgb(143, 143, 143)
        "--color-sidebar-bg": "26, 26, 26", // rgb(26, 26, 26)
        "--color-footer-bg": "42, 42, 42", // rgb(42, 42, 42)
        "--color-footer-text": "151, 151, 151", // rgb(151, 151, 151)

        "--color-accent-primary": "234, 234, 234", // rgb(234, 234, 234)
        "--color-accent-secondary": "194, 194, 194", // rgb(194, 194, 194)
        "--color-accent-tertiary": "139, 139, 139" // rgb(139, 139, 139)
    }
};

export default {
    defaultTheme
};