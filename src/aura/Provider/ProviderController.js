({
    storeInitialized: function(component) {
        var children = component.get("v.body");
        var store = component.get("v.store");
        console.log(store);
        for(var i = 0; i < children.length; i++) {
            children[i].set("v.store", store);
            console.log(children[i]);
        }
        function handleChanges() {
            for(var j = 0; j < children.length; j++) {
                children[j].set("v.store", store);
                console.log(children[j]);
            }
        }
        store.subscribe(handleChanges);
    }
})
