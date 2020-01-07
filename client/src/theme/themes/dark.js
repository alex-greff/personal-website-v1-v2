const GREY_1 = "#1E1E1E";
const GREY_2 = "#272626";
const GREY_3 = "#3C3C3C";
const GREY_4 = "#3F3F3F";

const TEXT_1 = "#FFFFFF";
const TEXT_2 = "#B8B8B8";
const TEXT_3 = "#505050";

const DEFAULT_ACCENT_1 = "#E5E5E5";
const DEFAULT_ACCENT_2 = "#D6D6D6";
const DEFAULT_SELECTED_1 = "#FFFFFF";
const DEFAULT_DISABLED_1 = "#C8C8C8";

const ERROR_1 = "#FA3737";

const HOME_ACCENT_1 = "#70A7FA";
const HOME_ACCENT_2 = "#4F8DEB";
const HOME_SELECTED_1 = "#8BB6F9";
const HOME_DISABLED_1 = "#6D82A4";

const ABOUT_ACCENT_1 = "#98E7FF";
const ABOUT_ACCENT_2 = "#5FCDEF";
const ABOUT_SELECTED_1 = "#B0EDFF";
const ABOUT_DISABLED_1 = "#8CAEB9";

const PROJECTS_ACCENT_1 = "#FF7A7A";
const PROJECTS_ACCENT_2 = "#853333";
const PROJECTS_SELECTED_1 = "#5A2323";
const PROJECTS_DISABLED_1 = "#9C6F6F";

const EXPERIENCE_ACCENT_1 = "#A6FF9E";
const EXPERIENCE_ACCENT_2 = "#84BC71";
const EXPERIENCE_SELECTED_1 = "#437042";
const EXPERIENCE_DISABLED_1 = "#A2BA9A";

const CONTACT_ACCENT_1 = "#B29EFF";
const CONTACT_ACCENT_2 = "#957FE8";
const CONTACT_SELECTED_1 = "#7D6AC6";
const CONTACT_DISABLED_1 = "#968DBC";

export default {
    name: "dark",
    theme: {
        GLOBAL: {
            background_color: {
                primary: GREY_2,
                secondary: GREY_3
            },
            text_color: {
                primary: TEXT_1,
                secondary: TEXT_2,
                tertiary: TEXT_3
            },
            accent_color: {
                primary: DEFAULT_ACCENT_1,
                secondary: DEFAULT_ACCENT_2
            },
            selected_color: {
                primary: DEFAULT_SELECTED_1
            },
            disabled_color: {
                primary: DEFAULT_DISABLED_1
            },
            error_color: {
                primary: ERROR_1
            }
        },
        Home_section: {
            background_color: {
                primary: GREY_1,
                secondary: GREY_2
            },
            accent_color: {
                primary: HOME_ACCENT_1,
                secondary: HOME_ACCENT_2
            },
            selected_color: {
                primary: HOME_SELECTED_1
            },
            disabled_color: {
                primary: HOME_DISABLED_1
            },
        },
        About_section: {
            accent_color: {
                primary: ABOUT_ACCENT_1,
                secondary: ABOUT_ACCENT_2
            },
            selected_color: {
                primary: ABOUT_SELECTED_1
            },
            disabled_color: {
                primary: ABOUT_DISABLED_1
            },
        },
        Projects_section: {
            accent_color: {
                primary: PROJECTS_ACCENT_1,
                secondary: PROJECTS_ACCENT_2
            },
            selected_color: {
                primary: PROJECTS_SELECTED_1
            },
            disabled_color: {
                primary: PROJECTS_DISABLED_1
            },
        },
        Experience_section: {
            accent_color: {
                primary: EXPERIENCE_ACCENT_1,
                secondary: EXPERIENCE_ACCENT_2
            },
            selected_color: {
                primary: EXPERIENCE_SELECTED_1
            },
            disabled_color: {
                primary: EXPERIENCE_DISABLED_1
            },
        },
        Contact_section: {
            background_color: {
                secondary: GREY_4
            },
            accent_color: {
                primary: CONTACT_ACCENT_1,
                secondary: CONTACT_ACCENT_2
            },
            selected_color: {
                primary: CONTACT_SELECTED_1
            },
            disabled_color: {
                primary: CONTACT_DISABLED_1
            },
        },
    }
};