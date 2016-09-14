({
    storeInitialized: function(component, event) {
        var store = event.getParam("store") ? event.getParam("store") : component.get("v.store");
        component.set("v.store", store);
        var reduxStoreChange = $A.get("e.c:reduxStoreChange");
        reduxStoreChange.setParams({"store" : store});
        reduxStoreChange.fire();
        function handleChanges() {
            console.log('Provider - handleChanges');
            console.log(store.getState());
            var reduxStoreChange = $A.get("e.c:reduxStoreChange");
            reduxStoreChange.setParams({"store" : store});
            reduxStoreChange.fire();
        }
        store.subscribe(handleChanges);
    },

    handleDispatch: function(component, event) {
        console.log('Provider - handleDispatch');
        var action = event.getParam("action"),
            store = component.get("v.store");
        switch(typeof action){
            case "function":
                return store.dispatch(action());
            case "object":
                store.dispatch(action);
        }
    }
})
