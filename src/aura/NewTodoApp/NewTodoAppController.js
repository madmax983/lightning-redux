({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore(helper.todoReducer, {}, ReduxThunk.default);
    }
})