import * as Colors from "./common/_colors";
import global from "./common/_globalPart";

export default {
    name: "lime",
    theme: {
        ...global,
        current_section: {
            accent_color: {
                primary: Colors.LIME_THEME_ACCENT_1,
                secondary: Colors.LIME_THEME_ACCENT_2
            },
            selected_color: {
                primary: Colors.LIME_THEME_SELECTED_1
            },
            disabled_color: {
                primary: Colors.LIME_THEME_DISABLED_1
            }
        }
    }
}