({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        var mapStateToAttributes = {
            "v.todoList": helper.getVisibileTodos
        }
        store.connect(mapStateToAttributes);
        store.dispatch(helper.receiveTodos(component));
    },

    completeAll: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.completeAllTodos(component));
    },

    removeCompleted: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.removeCompletedTodos(component));
    }
})