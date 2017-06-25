({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore("todos", helper.todoReducer, {}, ReduxThunk.default);
        var mapStateToAttributes = {
            "v.todoList": helper.getVisibileTodos
        }
        store.connect(mapStateToAttributes);
        store.dispatch(helper.receiveTodos(component));
    }
})