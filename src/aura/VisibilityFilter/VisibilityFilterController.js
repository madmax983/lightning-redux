({
    storeInitialized: function(component, event, helper){
        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : helper.setFilter('SHOW_ALL')});
        dispatchAction.fire();
    },

    showAll: function(component, event, helper){

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : helper.setFilter('SHOW_ALL')});
        dispatchAction.fire();

    },

    showActive: function(component, event, helper){

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : helper.setFilter('SHOW_ACTIVE')});
        dispatchAction.fire();

    },

    showCompleted: function(component, event, helper){

        var dispatchAction = $A.get("e.c:dispatchAction");
        dispatchAction.setParams({"action" : helper.setFilter('SHOW_COMPLETED')});
        dispatchAction.fire();

    }
})
