({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore("counter", helper.counterReducer);

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

        component.dispatch(increment());
    },

    clickDecrement: function(component) {
        function decrement() {
            return {
                type: 'DECREMENT'
            };
        }

        component.dispatch(decrement());
    }
})