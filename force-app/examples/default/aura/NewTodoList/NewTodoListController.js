({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.createStore("todos", helper.todoReducer, {}, ReduxThunk.default);

        var getVisibleTodos = Reselect.createSelector([
            helper.todoSelector,
            helper.visibilitySelector],
            helper.getVisibileTodos
        );

        var mapStateToAttributes = {
            "v.todoList": getVisibleTodos
        }
        store.connect(mapStateToAttributes);
        store.dispatch(helper.receiveTodos(component));
    }
})