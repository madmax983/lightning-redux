({
    add: function(component, event){
        event.preventDefault();
        console.log('add');

        function addTodo(todo){
            return {
                type: "ADD_TODO",
                todo: todo
            }
        }

        var todo = component.get("v.newTodo");
        var inputComponent = component.find("new-todo");
        var value = inputComponent.get("v.value");
        var error = false;

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
                switch(response.getState(response)){
                    case "SUCCESS":
                        console.log("SUCCESS - ADD TODO");
                        var dispatchAction = $A.get("e.c:dispatchAction");
                        dispatchAction.setParams({"action" : addTodo(response.getReturnValue())});
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
    }
})