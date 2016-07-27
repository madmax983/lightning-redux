({
    afterReduxLoaded: function(component, event, helper) {
        var reduxLoaded = $A.get("e.c:ReduxLoaded");
        reduxLoaded.fire();
    }
})
