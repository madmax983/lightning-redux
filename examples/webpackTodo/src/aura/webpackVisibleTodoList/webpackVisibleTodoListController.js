({
    storeInitialized: function(component){

        webpackTodo.actions.recieveTodos(component);

   },

    handleStoreChange: function(component, event){
        function getVisibileTodos(todos, filter){
            switch(filter){
                case "SHOW_ALL":
                    return todos;
                case "SHOW_ACTIVE":
                    return todos.filter(function(todo){
                        return !todo.Completed__c
                    });
                case "SHOW_COMPLETED":
                    return todos.filter(function(todo){
                        return todo.Completed__c
                    });
            }
        }
        console.log("todoList - handleStoreChange");
        var store = event.getParam("store"),
            state = store.getState(),
            visibleTodos = getVisibileTodos(state.todos, state.visibilityFilter);
        component.set("v.todoList", visibleTodos);
    }
})