({
    createStore: function(component, event) {
        var params = event.getParam("arguments");

        if(params && Redux) {

            var rootReducer = params.rootReducer;
            var initialState = params.initialState;
            var middleware = params.middleware;

            if(rootReducer && initialState && middleware) {
                if(!window.reduxStore){
                    window.reduxStore= Redux.createStore(rootReducer, initialState, Redux.compose(Redux.applyMiddleware(middleware)));
                    window.reducerRegistry = rootReducer;
                }
            } else if(rootReducer && initialState && !middleware) {
                if(!window.reduxStore){
                    window.reduxStore = Redux.createStore(rootReducer, initialState);
                    window.reducerRegistry = rootReducer;
                }
            } else if(rootReducer && !initialState && !middleware) {
                if(!window.reduxStore){
                    window.reduxStore = Redux.createStore(rootReducer);
                    window.reducerRegistry = rootReducer;
                }
            }

            function updateStoreTarget(){
                component.set("v.store", window.reduxStore);
            }

            window.reduxStore.subscribe(updateStoreTarget);
        }
    },

    dispatch: function(component, event) {
        var params = event.getParam("arguments");

        if(params && window.reduxStore) {
            var action = params.action;

            if(action) {
                window.reduxStore.dispatch(action);
            }
        }
    },

    subscribe: function(component, event) {
        var params = event.getParam("arguments");

        if(params && window.reduxStore) {
            var listener = params.listener;

            if(listener) {
                window.reduxStore.subscribe(listener);
            }
        }
    },

    replaceReducer: function(component, event) {
        var params = event.getParam("arguments");

        if(params && window.reduxStore) {
            var nextReducer = params.nextReducer;

            if(nextReducer) {
                window.reduxStore.replaceReducer(nextReducer);
            }
        }
    },

    registerReducer: function(component, event) {
        var params = event.getParam("arguments");

        if(params && window.reduxStore && Redux) {
            var name = params.name;
            var reducer = params.reducer;

            if(reducer) {
                var reducerObject = {
                    name: reducer
                }
                var newRootReducer = Object.assign({}, window.reducerRegistry, reducerObject);
                window.reduxStore.replaceReducer(newRootReducer);
            }

        }
    },

    connect: function(component, event) {
        var params = event.getParam("arguments");
        var target = event.getSource();

        if(params && window.reduxStore) {
            function handleChanges(){
                var mapStateToAttributes = params.mapStateToAttributes;
                var state = window.reduxStore.getState();

                for(var key in mapStateToAttributes) {
                    target.set(key, state[mapStateToAttributes[key]]);
                }
            }

            handleChanges();

            window.reduxStore.subscribe(handleChanges);
        }
    }

})