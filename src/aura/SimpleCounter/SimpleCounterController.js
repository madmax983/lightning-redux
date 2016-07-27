({
    afterReduxLoaded : function(component, event, helper) {
        component.set("v.store", Redux.createStore(helper.counter));
        var store = component.get("v.store");
        component.set("v.counter", store.getState());

        function handleChanges() {
            component.set("v.counter", store.getState());
        }
        store.subscribe(handleChanges);
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
