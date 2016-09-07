({
    registerCheck: function(component){
        var register = component.get("v.register"),
            rootReducer = component.get("v.rootReducer"),
            check = true;
        if(rootReducer && register){
            var rootReducerKeys = Object.keys(rootReducer);
            register.forEach(function(value, index){
                check = check && rootReducerKeys.includes(value);
            });
        }
        if(check){
            rootReducer = Redux.combineReducers(rootReducer);
            var reducersCombined = component.getEvent("ReducersCombined");
            reducersCombined.setParams({"rootReducer" : rootReducer});
            reducersCombined.fire();
        }
    }
})