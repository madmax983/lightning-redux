({
    edit: function(component) {
        component.set("v.mode", "edit");
    },

    update: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.editTodo(component));
    },

    complete: function(component, event, helper){
        var store = component.find("store");
        store.dispatch(helper.completeTodo(component));
    },

    remove: function(component, event, helper){
        var store = component.find("store");
        store.dispatch(helper.deleteTodo(component));
    }
})