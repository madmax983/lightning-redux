({
    add: function(component){
        var newTodo = component.find("newTodo");
        webpackTodo.actions.addTodo(newTodo);
    }
})
