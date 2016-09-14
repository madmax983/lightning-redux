({
    afterScriptsLoaded: function(component){
        var provider = component.find("provider");
        provider.set("v.store", webpackTodo.store);
        var storeInitialized = $A.get("e.c:storeInitialized");
        storeInitialized.fire();
    }
})