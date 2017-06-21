({
    counterReducer: function(state, action) {
        switch (action.type) {
            case 'INCREMENT':
                return {
                    counter: state.counter + 1
                }
            case 'DECREMENT':
                return {
                    counter: state.counter - 1
                }
            default:
                var defaultState = {
                    counter: 0
                };
                return defaultState;
        }
    }
})