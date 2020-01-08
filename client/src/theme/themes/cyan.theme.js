import * as Colors from "./common/_colors";
import { GLOBAL } from "./common/_globalPart";

export default {
    name: "cyan",
    theme: {
        GLOBAL,
        current_section: {
            accent_color: {
                primary: Colors.CYAN_THEME_ACCENT_1,
                secondary: Colors.CYAN_THEME_ACCENT_2
            },
            selected_color: {
                primary: Colors.CYAN_THEME_SELECTED_1
            },
            disabled_color: {
                primary: Colors.CYAN_THEME_DISABLED_1
            }
        }
    }
}