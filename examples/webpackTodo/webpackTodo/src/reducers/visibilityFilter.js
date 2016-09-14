export default function visibilityFilter(state, action) {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state ? state : "SHOW_ALL";
    }
}
