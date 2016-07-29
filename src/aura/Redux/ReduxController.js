({
    afterReduxLoaded: function() {
        var reduxLoaded = $A.get("e.c:ReduxLoaded");
        reduxLoaded.fire();
    }
})
