({
    add: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.addTodo(component));
    }
})