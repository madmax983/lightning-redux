({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore("todos", helper.todoReducer, {}, ReduxThunk.default);
    }
})