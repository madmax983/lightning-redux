({
    completeAllTodos: function(component) {
        return function(dispatch, getState){

            var action = component.get("c.completeAllTodos"),
                state = getState(),
                todoList = state.todos;

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
        return function(dispatch, getState){

            var action = component.get("c.removeCompletedTodos"),
                state = getState(),
                todoList = state.todos;

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
    }
})