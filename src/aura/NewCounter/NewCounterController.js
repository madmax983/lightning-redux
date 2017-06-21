({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore(helper.counterReducer);

        var mapStateToAttributes = {
            "v.counter": "counter"
        }
        store.connect(mapStateToAttributes);
    },

    clickIncrement: function(component) {
        function increment() {
            return {
                type: 'INCREMENT'
            };
        }

        var store = component.find("store");
        store.dispatch(increment());
    },

    clickDecrement: function(component) {
        function decrement() {
            return {
                type: 'DECREMENT'
            };
        }

        var store = component.find("store");
        store.dispatch(decrement());
    }
})