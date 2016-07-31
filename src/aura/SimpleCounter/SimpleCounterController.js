({
    afterReduxLoaded : function(component, event, helper) {
        /*eslint no-use-before-define:0*/
        var Redux = Redux || {};
        component.set("v.store", Redux.createStore(helper.counter));
        var store = component.get("v.store");
        component.set("v.counter", store.getState());

        function handleChanges() {
            component.set("v.counter", store.getState());
        }
        store.subscribe(handleChanges);
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
