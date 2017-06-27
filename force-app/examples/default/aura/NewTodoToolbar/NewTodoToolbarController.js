({
    doInit: function(component) {
        var store = component.find("store");
        store.connect();
    },

    completeAll: function(component, event, helper) {
        component.dispatch(helper.completeAllTodos(component));
    },

    removeCompleted: function(component, event, helper) {
        component.dispatch(helper.removeCompletedTodos(component));
    }
})