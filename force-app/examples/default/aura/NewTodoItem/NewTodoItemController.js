({
    doInit: function(component, event, helper) {
        component.set('v.completed', component.get("v.todo.Completed__c"));
        var store = component.find("store");

        var getTodoStatus = Reselect.createSelector([
                helper.statusSelector,
                helper.componentSelector
            ],
            helper.getTodoStatus
        )

        var mapStateToAttributes = {
            "v.completed": getTodoStatus
        }
        store.connect(mapStateToAttributes);
    },
    edit: function(component) {
        component.set("v.mode", "edit");
    },

    update: function(component, event, helper) {
        component.dispatch(helper.editTodo(component));
    },

    complete: function(component, event, helper){
        component.dispatch(helper.completeTodo(component));
    },

    remove: function(component, event, helper){
        component.dispatch(helper.deleteTodo(component));
    }
})