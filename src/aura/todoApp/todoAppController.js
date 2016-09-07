
({
    handleStoreChange: function(component, event){
        var store = event.getParam("store");
        console.log(store.getState());
    },

    addTodo: function(component, event){
        function addTodo(text) {
            return {
                type: 'ADD_TODO',
                text: text
            }
        }

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action": addTodo("Take out the garbage")});
        dispatchAction.fire();
    }
})
