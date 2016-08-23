({
    storeInitialized: function(component, event) {
        var store = event.getParam("store") ? event.getParam("store") : component.get("v.store");
        component.set("v.store", store);
        var reduxStoreChange = $A.get("e.c:reduxStoreChange");
        reduxStoreChange.setParams({"store" : store});
        reduxStoreChange.fire();
        function handleChanges() {
            var reduxStoreChange = $A.get("e.c:reduxStoreChange");
            reduxStoreChange.setParams({"store" : store});
            reduxStoreChange.fire();
        }
        store.subscribe(handleChanges);
    },

    handleDispatch: function(component, event) {
        var action = event.getParam("action"),
            store = component.get("v.store");
        if(typeof action === "function") {
            store.dispatch(action());
        }
    }
})
