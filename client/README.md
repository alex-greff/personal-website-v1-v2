# Personal Website Client

The front-end client built using [Vue.js](https://vuejs.org/).

## Table of Contents
* [Theme System](#theme&#32;system)

## Theme System

The theming system based off a section-property-sub-property model.

By default the `BASE` section is defined which acts as the default section for the site.

A theme defined as a `baseTheme` must fully implment each of the `baseProperties` and their `propertyVariations`. Additional `subSections` can be defined which allow for any amount of `baseProperties` to be overridden.

Themes **not** defined as a `baseTheme` can implement however many `baseProperties` as needed.

See [here](client/src/themes/definitiions/index.js) to see the theme definition for this site.

Themes can be linked direcly in the SASS stylings using the [theme-link](/client/src/styling/functions.scss) SASS function.

```scss
// Example
.MySelector {
    color: theme-link("MySection", "text-color", "primary");
    background-color: theme-link("BASE", "bg-color", "secondary", 0.5);
}
```