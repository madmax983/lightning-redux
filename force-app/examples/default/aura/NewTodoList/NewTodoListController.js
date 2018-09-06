({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        let sagaMiddleWare = ReduxSaga.default();
        store.createStore("todos", helper.todoReducer, {}, sagaMiddleWare);

        var getVisibleTodos = Reselect.createSelector([
            helper.todoSelector,
            helper.visibilitySelector],
            helper.getVisibileTodos
        );

        var mapStateToAttributes = {
            "v.todoList": getVisibleTodos
        }
        store.connect(mapStateToAttributes);
        sagaMiddleWare.run(helper.rootSaga());
        store.dispatch({type: "FETCH_TODOS", component: component});
    }
})