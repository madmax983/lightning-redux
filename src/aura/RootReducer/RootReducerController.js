({
    afterReduxLoaded: function(component, event, helper){
        var children = component.get("v.body");
        var register = component.get("v.register") ? component.get("v.register") : [];
        children.forEach(function(child){
            if(child.isInstanceOf("c:reducer")){
                var name = child.get("v.name");
                register.push(name);
                component.set("v.register", register);
                child.reducer();
            }
        });
        helper.registerCheck(component);
    },

    handleImportReducer: function(component, event){
        var reducer = event.getParam("reducer"),
            name = event.getParam("name"),
            src = {[name]: reducer},
            rootReducer = component.get("v.rootReducer");
        rootReducer = rootReducer ? rootReducer : {};
        Object.keys(src).forEach(function(key){
            rootReducer[key] = src[key];
        });
        component.set('v.rootReducer', rootReducer);
    }
})
