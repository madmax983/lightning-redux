({
    reducer: function(component, event, helper) {
        //Fire the import reducer event to send code to the RootReducer component for combining
        var importReducer = $A.get("e.c:importReducer");
        importReducer.setParams({"name": "visibilityFilter", "reducer": helper.reducer});
        importReducer.fire();
    }
})
