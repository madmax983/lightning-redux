({
    handleStoreChange: function(component) {
        var store = component.get("v.store");
        component.set("v.counter", store.getState());
    },

    clickIncrement: function(component) {
        function increment() {
            return {
                type: 'INCREMENT'
            };
        }

        var store = component.get("v.store");
        store.dispatch(increment());
    },

    clickDecrement: function(component) {
        function decrement() {
            return {
                type: 'DECREMENT'
            };
        }

        var store = component.get("v.store");
        store.dispatch(decrement());
    }
})
