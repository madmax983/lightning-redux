({
    handleReduxLoaded: function(component, event, helper) {
        var provider = component.find("provider");
        provider.set("v.store", Redux.createStore(helper.counter));
        var store = provider.get("v.store");
        var storeInitialized = $A.get("e.c:storeInitialized");
        storeInitialized.fire();
    }
})
