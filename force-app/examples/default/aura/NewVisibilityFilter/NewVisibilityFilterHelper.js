({
    visibilityReducer: function(state, action) {
        switch (action.type) {
            case "SET_VISIBILITY_FILTER":
                return action.filter;
            default:
                return state ? state : "SHOW_ALL";
        }
    },

    setFilter : function(filter) {
        return {
            type: 'SET_VISIBILITY_FILTER',
            filter: filter
        }
    }
})