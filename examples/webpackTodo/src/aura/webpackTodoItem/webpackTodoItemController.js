({
    edit: function(component){
        component.set("v.mode", "edit");
    },

    update: function(component){
        webpackTodo.actions.editTodo(component);
    },

    complete: function(component){
        webpackTodo.actions.completeTodo(component);
    },

    remove: function(component){
        webpackTodo.actions.deleteTodo(component);
    }
})
