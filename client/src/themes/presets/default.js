const template = {
    "name": "default",
    "baseTheme": true,
    "BASE": {
        "text-color": {
            "primary": "rgb(229, 229, 229)", // --color-page-text
            "secondary": "rgb(192, 192, 192)" 
        },
        "bg-color": {
            "primary": "rgb(30, 30, 30)", // --color-page-bg //rgb(61, 61, 61)
            "secondary": "rgb(40, 40, 40)" // TODO:
        },
        "accent-color": {
            "primary": "rgb(234, 234, 234)", // --color-accent-primary
            "secondary": "rgb(194, 194, 194)" // --color-accent-secondary
        },
        "selected-color": {
            "primary": "rgb(139, 139, 139)", // --color-accent-tertiary
            "secondary": "rgb(0, 0, 0)" // TODO:
        },
        "icon-color": {
            "primary": "rgb(0, 0, 0)", // TODO:
            "secondary": "rgb(0, 0, 0)" // TODO:
        },
        "scrollbar-color": {
            "primary": "rgb(0, 0, 0)", // TODO:
            "secondary": "rgb(0, 0, 0)" // TODO:
        },
        "button-color": {
            "primary": "rgb(0, 0, 0)", // TODO:
            "secondary": "rgb(0, 0, 0)" // TODO:
        },
        "error-color": {
            "primary": "rgb(250, 74, 74)",
            "secondary": "rgb(255, 0, 0)",
        },
        "success-color": {
            "primary": "#6FD66F",
            "secondary": "rgb(0, 255, 0)"
        },
        "warning-color": {
            "primary": "#E5CC66",
            "secondary": "#FFCD00"
        }
    },
    "subSections": {
        "page": {
        },
        "navBar": {
            "text-color": {
                "primary": "rgb(143, 143, 143)" // --color-nav-text
            },
            "bg-color": {
                "primary": "rgb(42, 42, 42)", // --color-nav-bg
                "secondary": "rgb(26, 26, 26)" // --color-sidebar-bg
            }
        },
        "navBar__item": {
            "bg-color": {
                "primary": "rgb(39, 39, 39)",
                "secondary": "rgb(59, 59, 59)"
            }
        }, 
        "footer": {
            "bg-color": {
                "primary": "rgb(39, 39, 39)"
            }
        },
        "loader": {
        }
    }
};

export default template;