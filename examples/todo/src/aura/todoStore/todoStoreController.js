({
    handleReducersCombined: function(component, event) {
        // Once reducers are combined, create the redux store and fire the storeInitialized event
        // This initializes the store in the Provider component
        console.log('handleReducersCombined');
        var rootReducer = event.getParam("rootReducer");
        var store = Redux.createStore(rootReducer);
        var storeInitialized = $A.get("e.c:storeInitialized");
        storeInitialized.setParams({"store" : store});
        storeInitialized.fire();
    }
})