({
    edit: function(component){
        var todoItem = component.find("webpackTodoItem");
        todoItem.set("v.mode", "edit");
    },

    update: function(component){
        var todoItem = component.find("webpackTodoItem");
        webpackTodo.actions.editTodo(todoItem);
    },

    complete: function(component){
        var todoItem = component.find("webpackTodoItem");
        webpackTodo.actions.completeTodo(todoItem);
    },

    remove: function(component){
        var todoItem = component.find("webpackTodoItem");
        webpackTodo.actions.deleteTodo(todoItem);
    }
})
