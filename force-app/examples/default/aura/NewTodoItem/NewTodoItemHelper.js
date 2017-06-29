({
    editTodo: function(component) {
        return function(dispatch){
            var action = component.get("c.updateTodo");

            var todo = component.get("v.todo");

            action.setParams({
                todo: todo
            });

            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        console.log("SUCCESS - EDIT TODO");
                        component.set("v.mode", "view");
                        return dispatch({
                            type: 'EDIT_TODO',
                            todo
                        });
                    case "ERROR":
                        console.log("ERROR");
                        console.log(response.getError());
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    completeTodo: function(component) {
        return function(dispatch){
            var action = component.get("c.completeTodo");

            var todo = component.get("v.todo");

            action.setParams({
                todo: todo
            });

            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        console.log("SUCCESS - COMPLETE TODO");
                        return dispatch({
                            type: 'COMPLETE_TODO',
                            Id: todo.Id
                        });
                    case "ERROR":
                        console.log("ERROR");
                        console.log(response.getError());
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    deleteTodo: function(component) {
        return function(dispatch){
            var action = component.get("c.deleteTodo");

            var todo = component.get("v.todo");

            action.setParams({
                todo: todo
            });

            action.setCallback(this, function(response){
                switch(response.getState(response)){
                    case "SUCCESS":
                        console.log("SUCCESS - DELETE TODO");
                        return dispatch({
                            type: 'DELETE_TODO',
                            Id: todo.Id
                        });
                    case "ERROR":
                        console.log("ERROR");
                        console.log(response.getError());
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    },

    statusSelector: function(state, component) {
        var status = component.get("v.completed");
        var currentTodo = component.get("v.todo");
        var selectedTodo = {};
        state.todos.map(function(todo) {
            if(currentTodo && currentTodo.Id && currentTodo.Id === todo.Id) {
                status = todo.Completed__c;
            }
        });
        return status;
    },

    componentSelector: function(state, component) {
        return component;
    },

    getTodoStatus: function(status) {
        return status;
    }
})