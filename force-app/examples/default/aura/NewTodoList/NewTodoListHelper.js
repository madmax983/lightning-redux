({
    todoReducer: function(state, action) {
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
    },

    rootSaga: function(){

        function* receiveTodos(action) {
            try {
                const todos = yield ReduxSaga.effects.call(fetchTodos, action.component);
                yield ReduxSaga.effects.put({type: "RECIEVE_TODOS", response: todos});
            } catch (e) {
                console.log(e);
            }
        }

        function fetchTodos(component) {
            return new Promise($A.getCallback(function(resolve, reject) {
                var action = component.get("c.getTodos");

                action.setCallback(this, function(response){
                    switch(response.getState(response)){
                        case "SUCCESS":
                            resolve(response.getReturnValue());
                        case "ERROR":
                            break;
                    }
                });

                $A.enqueueAction(action);
            }));
        }

        return function*(){
            yield ReduxSaga.takeEvery("FETCH_TODOS", receiveTodos);
        };
    },

    todoSelector: function(state, component) {
        return state.todos;
    },

    visibilitySelector: function(state, component) {
        return state.visibilityFilter;
    },

    getVisibileTodos: function(todos, visibilityFilter) {
        switch(visibilityFilter){
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
})