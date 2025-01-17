import * as Colors from "./common/_colors";
import global from "./common/_globalPart";

export default {
    name: "blue",
    theme: {
        ...global,
        current_section: {
            accent_color: {
                primary: Colors.BLUE_THEME_ACCENT_1,
                secondary: Colors.BLUE_THEME_ACCENT_2
            },
            selected_color: {
                primary: Colors.BLUE_THEME_SELECTED_1
            },
            disabled_color: {
                primary: Colors.BLUE_THEME_DISABLED_1
            }
        }
    }
};