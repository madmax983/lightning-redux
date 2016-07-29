({
    storeInitialized: function(component) {
        var children = component.get("v.body");
        var store = component.get("v.store");
        children.forEach(function(child) {
            child.set("v.store", store);
        });
        function handleChanges() {
            children.forEach(function(child) {
                child.set("v.store", store);
            });
        }
        store.subscribe(handleChanges);
    }
})
