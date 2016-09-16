export function addTodo(component) {

    return function(dispatch){
        var todo = component.get("v.newTodo"),
            inputComponent = component.find("new-todo"),
            value = inputComponent.get("v.value"),
            error = false;

        if(!value){
            inputComponent.set("v.errors", [{message:"Please enter text"}]);
            error = true;
        } else {
            inputComponent.set("v.errors", null);
            error = false;
        }

        if(!error){
            var action = component.get('c.updateTodo');
            action.setParams({
                todo: todo
            });

            action.setCallback(this, function(response){
                switch(response.getState()){
                    case "SUCCESS":
                        console.log("SUCCESS - ADD TODO");
                        return dispatch({
                            type: 'ADD_TODO',
                            todo: response.getReturnValue()
                        });
                    case "ERROR":
                        console.log("ERROR");
                        console.log(response.getError());
                        break;
                }
            });

            $A.enqueueAction(action);
        }
    }
}

export function editTodo(component){

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
}

export function completeTodo(component){

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
}

export function deleteTodo(component){

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
}

export function recieveTodos(component) {

    return function(dispatch) {
        var action = component.get("c.getTodos");

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - GET TODOS");
                    console.log(response.getReturnValue());
                     return dispatch({
                        type: 'RECIEVE_TODOS',
                        response: response.getReturnValue()
                    });
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    }
}

export function completeAllTodos(component) {

    return function(dispatch){

        var action = component.get("c.completeAllTodos"),
            todoList = component.get("v.todoList");

        action.setParams({
            todos: todoList
        });
        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - COMPLETE ALL");
                    return dispatch({
                        type: 'COMPLETE_ALL'
                    });
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    }
}

export function removeCompletedTodos(component) {

    return function(dispatch){

        var action = component.get("c.removeCompletedTodos"),
            todoList = component.get("v.todoList");

        action.setParams({
            todos: todoList
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - REMOVE COMPLETED");
                    return dispatch({
                        type: 'CLEAR_COMPLETED'
                    });
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    }
}

export function setFilter(filter){
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}
