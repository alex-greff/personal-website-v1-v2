import * as Colors from "./common/_colors";
import { GLOBAL } from "./common/_globalPart";

export default {
    name: "red",
    theme: {
        GLOBAL,
        current_section: {
            accent_color: {
                primary: Colors.RED_THEME_ACCENT_1,
                secondary: Colors.RED_THEME_ACCENT_2
            },
            selected_color: {
                primary: Colors.RED_THEME_SELECTED_1
            },
            disabled_color: {
                primary: Colors.RED_THEME_DISABLED_1
            }
        }
    }
}