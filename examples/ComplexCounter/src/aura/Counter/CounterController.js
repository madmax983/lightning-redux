({
    handleStoreChange: function(component, event) {
        var store = event.getParam("store");
        component.set("v.counter", store.getState());
    },

    clickIncrement: function(component) {
        function increment() {
            return {
                type: 'INCREMENT'
            };
        }

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : increment});
        dispatchAction.fire();
    },

    clickDecrement: function(component) {
        function decrement() {
            return {
                type: 'DECREMENT'
            };
        }

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : decrement});
        dispatchAction.fire();
    }
})