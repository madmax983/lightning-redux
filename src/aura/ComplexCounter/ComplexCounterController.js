({
    handleReduxLoaded: function(component, event, helper) {
        /*eslint no-use-before-define:0*/
        var Redux = Redux || {};
        var provider = component.find("provider");
        provider.set("v.store", Redux.createStore(helper.counter));
        var storeInitialized = $A.get("e.c:storeInitialized");
        storeInitialized.fire();
    }
})
