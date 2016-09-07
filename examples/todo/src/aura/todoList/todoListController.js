({
    storeInitialized: function(component, event){

        function recieveTodos(response) {
            return {
                type: 'RECIEVE_TODOS',
                response: response
            }
        }

        var action = component.get("c.getTodos");

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - GET TODOS");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : recieveTodos(response.getReturnValue())});
                    dispatchAction.fire();
                    return;
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    },

    completeAll: function(component, event){
        event.preventDefault();
        function completeAllTodos() {
            return {
                type: 'COMPLETE_ALL'
            }
        }

        var action = component.get("c.completeAllTodos");
        var todoList = component.get("v.todoList");

        action.setParams({
           todos: todoList
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - COMPLETE ALL");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : completeAllTodos()});
                    dispatchAction.fire();
                    return;
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);

    },

    removeCompleted: function(component){

        function removeCompletedTodos() {
            return {
                type: 'CLEAR_COMPLETED'
            }
        }

        var action = component.get("c.removeCompletedTodos"),
            todoList = component.get("v.todoList");

        action.setParams({
            todos: todoList
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - REMOVE COMPLETED");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : removeCompletedTodos()});
                    dispatchAction.fire();
                    return;
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);

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
        debugger;
        component.set("v.todoList", visibleTodos);
    },

    handleTodoListChange: function(component){
        var todoList = component.get("v.todoList");
        console.log(todoList);
    }
})