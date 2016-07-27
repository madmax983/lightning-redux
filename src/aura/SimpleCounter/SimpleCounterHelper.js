({
    counter: function(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            default:
                state = 0;
                return state
        }
    }
})
