({
    showAll: function(component){
        webpackTodo.actions.setFilter("SHOW_ALL");
    },

    showActive: function(component){
        webpackTodo.actions.setFilter("SHOW_ACTIVE");
    },

    showCompleted: function(component){
        webpackTodo.actions.setFilter("SHOW_COMPLETED");
    }
})
