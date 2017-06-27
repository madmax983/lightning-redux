({
    doInit: function(component) {
        function getState() {
            if(window.reduxStore) {
                return window.reduxStore.getState();
            } else {
                return null;
            }
        }

        component.getState = getState;
    },

    createStore: function(component, event) {
        var params = event.getParam("arguments");

        if(params && Redux) {

            var reducerName = params.name;
            var rootReducer = params.rootReducer;
            var initialState = params.initialState;
            var middleware = params.middleware;
            var combinedReducer;

            var reducerObject = {};
            reducerObject[reducerName] = rootReducer;

            if(window.reducerQueue) {
                combinedReducer = Redux.combineReducers(Object.assign({}, reducerObject, window.reducerQueue));
                window.reducerRegistry = Object.assign({}, window.reducerRegistry, reducerObject, window.reducerQueue);
            } else {
                combinedReducer = Redux.combineReducers(reducerObject);
                window.reducerRegistry = Object.assign({}, window.reducerRegistry, reducerObject);
            }


            if(!window.reduxStore) {
                if (rootReducer && initialState && middleware) {
                    window.reduxStore = Redux.createStore(combinedReducer, initialState, Redux.compose(Redux.applyMiddleware(middleware)));
                } else if (rootReducer && initialState && !middleware) {
                    window.reduxStore = Redux.createStore(combinedReducer, initialState);
                } else if (rootReducer && !initialState && !middleware) {
                    window.reduxStore = Redux.createStore(combinedReducer);
                }
            } else {
                component.registerReducer(reducerName, rootReducer)
            }

            if(window.subscriberQueue) {
                window.subscriberQueue.map(function(subscriber) {
                    component.connect(subscriber.mapStateToAttributes, subscriber.target);
                });
            }

            if(window.dispatchQueue) {
                window.dispatchQueue.map(function(action) {
                   component.dispatch(action);
                });
            }
        }
    },

    dispatch: function(component, event) {
        var params = event.getParam("arguments");

        var action = params ? params.action : null;
        if(action) {
            if(window.reduxStore) {
                window.reduxStore.dispatch(action);
            } else {
                if(window.dispatchQueue) {
                    window.dispatchQueue.push(action);
                } else {
                    window.dispatchQueue = [action];
                }
            }
        }
    },

    subscribe: function(component, event) {
        var params = event.getParam("arguments");
        var listener = params ? params.listener : null;

        if(listener && window.reduxStore) {
            window.reduxStore.subscribe(listener);
        }
    },

    replaceReducer: function(component, event) {
        var params = event.getParam("arguments");
        var nextReducer = params ? params.nextReducer : null;

        if(nextReducer && window.reduxStore) {
            window.reduxStore.replaceReducer(nextReducer);
        }
    },

    registerReducer: function(component, event) {
        var params = event.getParam("arguments");
        var name = params ? params.name : null;
        var reducer = params ? params.reducer : null;

        if(reducer && Redux) {
            var reducerObject = {};
            reducerObject[name] = reducer;

            if(window.reduxStore) {
                var newRootReducer = Redux.combineReducers(Object.assign({}, window.reducerRegistry, reducerObject));
                window.reducerRegistry = Object.assign({}, window.reducerRegistry, reducerObject);
                window.reduxStore.replaceReducer(newRootReducer);
            } else {
                if(window.reducerQueue){
                    window.reducerQueue = Object.assign({}, window.reducerQueue, reducerObject);
                } else {
                    window.reducerQueue = reducerObject;
                }
            }
        }
    },

    connect: function(component, event) {
        var params = event.getParam("arguments");
        var mapStateToAttributes = params ? params.mapStateToAttributes : null;
        var target = params && params.target ? params.target : event.getSource();

        if(window.reduxStore) {
            function handleChanges(){

                var state = window.reduxStore.getState();

                for(var key in mapStateToAttributes) {
                    if(mapStateToAttributes.hasOwnProperty(key)) {
                        if(typeof mapStateToAttributes[key] === "function") {
                            target.set(key, mapStateToAttributes[key](target, state))
                        } else {
                            target.set(key, state[mapStateToAttributes[key]]);
                        }
                    }
                }
            }

            handleChanges();

            window.reduxStore.subscribe(handleChanges);
            target.dispatch = window.reduxStore.dispatch;
        } else {
            if(window.subscriberQueue) {
                window.subscriberQueue.push({
                    target: target,
                    mapStateToAttributes: mapStateToAttributes
                });
            } else {
                window.subscriberQueue = [{
                    target: target,
                    mapStateToAttributes: mapStateToAttributes
                }];
            }
        }
    }

})