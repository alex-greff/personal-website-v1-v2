import { BREAKPOINT_PHONE, BREAKPOINT_TAB_PORT, BREAKPOINT_TAB_LAND, BREAKPOINT_BIG_DESKTOP } from "@/constants";

/**
 * Returns if the given screen width is inside the given breakpoint.
 * 
 * @param {String} i_sBreakpointName The breakpoint name.
 * @param {Number} i_nScreenWidth The screen width.
 */
export const isInBreakpoint = (i_sBreakpointName, i_nScreenWidth) => {
    switch (i_sBreakpointName) {
        case "phone":
            return i_nScreenWidth >= 0 && i_nScreenWidth <= BREAKPOINT_PHONE;
        case "tab-port":
            return i_nScreenWidth > BREAKPOINT_PHONE && i_nScreenWidth <= BREAKPOINT_TAB_PORT;
        case "tab-land":
            return i_nScreenWidth > BREAKPOINT_TAB_PORT && i_nScreenWidth <= BREAKPOINT_TAB_LAND;
        case "normal":
            return i_nScreenWidth > BREAKPOINT_TAB_LAND && i_nScreenWidth < BREAKPOINT_BIG_DESKTOP;
        case "desktop":
            return i_nScreenWidth >= BREAKPOINT_BIG_DESKTOP;
        default:
            throw `Error: breakpoint '${i_sBreakpointName}' does not exist`;
    }
};


// Public API export
export default {
    isInBreakpoint
};