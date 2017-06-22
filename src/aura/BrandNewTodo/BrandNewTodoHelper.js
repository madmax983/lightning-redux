({
    addTodo: function(component) {
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
                            component.set("v.newTodo", {'sobjectType': 'Todo__c', 'Text__c':'', 'Completed__c': 'false'});
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
})