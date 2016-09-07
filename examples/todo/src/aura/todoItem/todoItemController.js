({
    edit: function(component){
        component.set("v.mode", "edit");
    },

    update: function(component){
        console.log('update');
        var action = component.get("c.updateTodo");

        function editTodo(todo){
            return {
                type: 'EDIT_TODO',
                todo: todo
            }
        }

        var todo = component.get("v.todo");

        action.setParams({
            todo: todo
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - EDIT TODO");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : editTodo(todo)});
                    dispatchAction.fire();
                    component.set("v.mode", "view");
                    return;
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    },

    complete: function(component){
        console.log('complete');
        var action = component.get("c.completeTodo");

        function completeTodo(Id){
            return {
                type: 'COMPLETE_TODO',
                Id: Id
            }
        }

        var todo = component.get("v.todo");

        action.setParams({
           todo: todo
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - COMPLETE TODO");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : completeTodo(todo.Id)});
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

    remove: function(component){
        console.log('remove');
        var action = component.get("c.deleteTodo");

        function deleteTodo(Id){
            return {
                type: 'DELETE_TODO',
                Id: Id
            }
        }

        var todo = component.get("v.todo");

        action.setParams({
            todo: todo
        });

        action.setCallback(this, function(response){
            switch(response.getState(response)){
                case "SUCCESS":
                    console.log("SUCCESS - DELETE TODO");
                    var dispatchAction = $A.get("e.c:dispatchAction");
                    dispatchAction.setParams({"action" : deleteTodo(todo.Id)});
                    dispatchAction.fire();
                    return;
                case "ERROR":
                    console.log("ERROR");
                    console.log(response.getError());
                    break;
            }
        });

        $A.enqueueAction(action);
    }
})