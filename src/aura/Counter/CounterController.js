({
    handleStoreChange: function(component, event, helper) {
        var store = component.get("v.store");
        component.set("v.counter", store.getState());
    },

    clickIncrement: function(component, event, helper) {
        function increment() {
            return {
                type: 'INCREMENT'
            }
        }

        var store = component.get("v.store");
        store.dispatch(increment());
    },

    clickDecrement: function(component, event, helper) {
        function decrement() {
            return {
                type: 'DECREMENT'
            }
        }

        var store = component.get("v.store");
        store.dispatch(decrement());
    }
})
