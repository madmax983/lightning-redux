({
    handleStoreChange: function(component, event){
        console.log("todoList - handleStoreChange");
        var store = event.getParam("store"),
            state = store.getState();
        component.set("v.todoList", state.todos);
    },

    completeAll: function(component){
        webpackTodo.actions.completeAllTodos(component);
    },

    removeCompleted: function(component){
        webpackTodo.actions.removeCompletedTodos(component);
    }
})