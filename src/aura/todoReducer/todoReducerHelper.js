({
    reducer: function(state, action) {
        switch (action.type) {
            case "RECIEVE_TODOS":
                return action.response;

            case "ADD_TODO":
                var newState = JSON.parse(JSON.stringify(state));
                newState.push(action.todo);
                return newState;

            case "DELETE_TODO":
                return state.filter(function(todo){
                    return todo.Id !== action.Id
                });

            case "EDIT_TODO":
                return state.map(function(todo){
                    if(todo.Id == action.todo.Id){
                        todo = action.todo;
                    }
                    return todo;
                });

            case "COMPLETE_TODO":
                return state.map(function(todo){
                    if(todo.Id == action.Id){
                        todo.Completed__c = !todo.Completed__c
                    }
                    return todo;
                });

            case "COMPLETE_ALL":
                return state.map(function(todo){
                    if(!todo.Completed__c){
                        todo.Completed__c = true;
                    }
                    return todo;
                });

            case "CLEAR_COMPLETED":
                return state.filter(function(todo){
                    return !todo.Completed__c;
                });

            default:
                return state ? state : [];
        }
    }
})
