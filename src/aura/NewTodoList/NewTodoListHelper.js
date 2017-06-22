({
    receiveTodos: function(component) {
        return function(dispatch) {
            var action = component.get("c.getTodos");

            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        return dispatch({
                            type: 'RECIEVE_TODOS',
                            response: response.getReturnValue()
                        });
                    case "ERROR":
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    completeAllTodos: function(component) {
        return function(dispatch){

            var action = component.get("c.completeAllTodos"),
                todoList = component.get("v.todoList");

            action.setParams({
                todos: todoList
            });
            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        return dispatch({
                            type: 'COMPLETE_ALL'
                        });
                    case "ERROR":
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    removeCompletedTodos: function(component) {
        return function(dispatch){

            var action = component.get("c.removeCompletedTodos"),
                todoList = component.get("v.todoList");

            action.setParams({
                todos: todoList
            });

            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        return dispatch({
                            type: 'CLEAR_COMPLETED'
                        });
                    case "ERROR":
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    getVisibileTodos: function(state) {
        switch(state.visibilityFilter){
            case "SHOW_ALL":
                return state.todos;
            case "SHOW_ACTIVE":
                return state.todos.filter(function(todo){
                    return !todo.Completed__c
                });
            case "SHOW_COMPLETED":
                return state.todos.filter(function(todo){
                    return todo.Completed__c
                });
        }
    }

})