({
    doInit: function(component, event, helper) {
        var store = component.find("store");
        store.registerReducer("visibilityFilter", helper.visibilityReducer);
    },

    showAll: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.setFilter("SHOW_ALL"));
    },

    showActive: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.setFilter("SHOW_ACTIVE"));
    },

    showCompleted: function(component, event, helper) {
        var store = component.find("store");
        store.dispatch(helper.setFilter("SHOW_COMPLETED"));
    }
})