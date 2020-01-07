export const schema = {
    GLOBAL: {
        background_color: {
            $mixins: ['primary_modifier', 'secondary_modifier']
        },
        text_color: {
            $mixins: ['primary_modifier', 'secondary_modifier', 'tertiary_modifier']
        },
        accent_color: {
            $mixins: ['primary_modifier', 'secondary_modifier']
        },
        selected_color: {
            $mixins: ['primary_modifier']
        },
        disabled_color: {
            $mixins: ['primary_modifier']
        },
        error_color: {
            $mixins: ['primary_modifier']
        }
    },
    Home_section: {
        $inherits: "GLOBAL"
    },
    About_section: {
        $inherits: "GLOBAL"
    },
    Projects_section: {
        $inherits: "GLOBAL"
    },
    Experience_section: {
        $inherits: "GLOBAL"
    },
    Contact_section: {
        $inherits: "GLOBAL"
    },
    // TODO: fix this
    // NavBar: {
    //     background_color: {
    //         $inherits: "GLOBAL.background_color"
    //     },
    //     text_color: {
    //         $inherits: "GLOBAL.text_color"
    //     },
    //     text_color_inverted: {
    //         $inherits: "GLOBAL.text_color_inverted"
    //     },
    //     Home_section: {
    //         accent_color: {
    //             $inherits: "Home_section.accent_color"
    //         }
    //     },
    //     About_section: {
    //         accent_color: {
    //             $inherits: "About_section.accent_color"
    //         }
    //     },
    //     Projects_section: {
    //         accent_color: {
    //             $inherits: "Projects_section.accent_color"
    //         }
    //     },
    //     Experience_section: {
    //         accent_color: {
    //             $inherits: "Experience_section.accent_color"
    //         }
    //     },
    //     Contact_section: {
    //         accent_color: {
    //             $inherits: "Contact_section.accent_color"
    //         }
    //     },
    // },
};

export const mixins = {
    // ---------------
    // -- Modifiers --
    // ---------------
    primary_modifier: {
        primary: {
            $type: "color",
            $required: true
        }
    },
    secondary_modifier: {
        secondary: {
            $type: "color",
            $required: true
        }
    },
    tertiary_modifier: {
        tertiary: {
            $type: "color",
            $required: true
        },
    },
    quaternary_modifier: {
        quaternary: {
            $type: "color",
            $required: true
        }
    },
};

export default {
    schema,
    mixins
};