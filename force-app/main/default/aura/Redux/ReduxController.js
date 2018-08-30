({
    createStore: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");

        if(params && Redux) {

            var reducerName = params.name;
            var rootReducer = params.rootReducer;
            var initialState = params.initialState;
            var middleware = params.middleware;
            var combinedReducer;

            var reducerObject = {};
            reducerObject[reducerName] = rootReducer;

            if(window.reducerQueue && window.reducerQueue[reduxName]) {
                combinedReducer = Redux.combineReducers(Object.assign({}, reducerObject, window.reducerQueue[reduxName]));
                window.reducerRegistry = {};
                window.reducerRegistry[reduxName] = Object.assign({}, window.reducerRegistry[reduxName], reducerObject, window.reducerQueue[reduxName]);
            } else if(window.reducerRegistry && window.reducerRegistry[reduxName]) {
                combinedReducer = Redux.combineReducers(reducerObject);
                window.reducerRegistry[reduxName] = Object.assign({}, window.reducerRegistry[reduxName], reducerObject);
            } else {
                combinedReducer = Redux.combineReducers(reducerObject);
                window.reducerRegistry = Object.assign({}, window.reducerRegistry, {
                  [reduxName]: Object.assign({}, window.reducerRegistry ? window.reducerRegistry[reduxName] : {}, reducerObject)
                });
            }


            window.reduxStore = window.reduxStore || {};

            if(!window.reduxStore[reduxName]) {
                if (rootReducer && initialState && middleware) {
                    window.reduxStore[reduxName] = Redux.createStore(combinedReducer, initialState, Redux.compose(Redux.applyMiddleware(middleware)));
                } else if (rootReducer && initialState && !middleware) {
                    window.reduxStore[reduxName] = Redux.createStore(combinedReducer, initialState);
                } else if (rootReducer && !initialState && !middleware) {
                    window.reduxStore[reduxName] = Redux.createStore(combinedReducer);
                }
            } else {
                component.registerReducer(reducerName, rootReducer)
            }

            if(window.subscriberQueue && window.subscriberQueue[reduxName]) {
                window.subscriberQueue[reduxName].map(function(subscriber) {
                    component.connect(subscriber.mapStateToAttributes, subscriber.target);
                });
            }

            if(window.dispatchQueue && window.dispatchQueue[reduxName]) {
                window.dispatchQueue[reduxName].map(function(action) {
                   component.dispatch(action);
                });
            }
        }
    },

    getState: function(component) {
        var reduxName = component.get("v.name");
        if(window.reduxStore && window.reduxStore[reduxName]) {
            return window.reduxStore[reduxName].getState();
        } else {
            return null;
        }
    },

    dispatch: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");

        var action = params ? params.action : null;
        if(action) {
            if(window.reduxStore && window.reduxStore[reduxName]) {
                window.reduxStore[reduxName].dispatch(action);
            } else {
                if(window.dispatchQueue && window.dispatchQueue[reduxName]) {
                    window.dispatchQueue[reduxName].push(action);
                } else {
                    window.dispatchQueue = {};
                    window.dispatchQueue[reduxName] = [action];
                }
            }
        }
    },

    subscribe: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");
        var listener = params ? params.listener : null;

        if(listener && window.reduxStore && window.reduxStore[reduxName]) {
            return window.reduxStore[reduxName].subscribe(listener);
        }
    },

    replaceReducer: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");
        var nextReducer = params ? params.nextReducer : null;

        if(nextReducer && window.reduxStore && window.reduxStore[reduxName]) {
            window.reduxStore[reduxName].replaceReducer(nextReducer);
        }
    },

    registerReducer: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");
        var name = params ? params.name : null;
        var reducer = params ? params.reducer : null;

        if(reducer && Redux) {
            var reducerObject = {};
            reducerObject[name] = reducer;

            if(window.reduxStore && window.reduxStore[reduxName]) {
                var newRootReducer = Redux.combineReducers(Object.assign({}, window.reducerRegistry[reduxName], reducerObject));
                window.reducerRegistry[reduxName] = Object.assign({}, window.reducerRegistry[reduxName], reducerObject);
                window.reduxStore[reduxName].replaceReducer(newRootReducer);
            } else {
                if(window.reducerQueue && window.reducerQueue[reduxName]){
                    window.reducerQueue[reduxName] = Object.assign({}, window.reducerQueue[reduxName], reducerObject);
                } else {
                    window.reducerQueue = {};
                    window.reducerQueue[reduxName] = reducerObject;
                }
            }
        }
    },

    connect: function(component, event) {
        var reduxName = component.get("v.name");
        var params = event.getParam("arguments");
        var mapStateToAttributes = params ? params.mapStateToAttributes : null;
        var target = params && params.target ? params.target : event.getSource();

        if(typeof mapStateToAttributes === "function") {
            mapStateToAttributes = mapStateToAttributes();
        }

        if(window.reduxStore && window.reduxStore[reduxName]) {
            function handleChanges(){
                if(target.isValid()) {
                    var state = window.reduxStore[reduxName].getState();

                    for(var key in mapStateToAttributes) {
                        if(mapStateToAttributes.hasOwnProperty(key)) {
                            if(typeof mapStateToAttributes[key] === "function") {
                                target.set(key, mapStateToAttributes[key](state, target))
                            } else {
                                target.set(key, state[mapStateToAttributes[key]]);
                            }
                        }
                    }
                }
            }

            handleChanges();

            component.unsubscribe = window.reduxStore[reduxName].subscribe(handleChanges);
            target.dispatch = window.reduxStore[reduxName].dispatch;
        } else {
            if(window.subscriberQueue && window.subscriberQueue[reduxName]) {
                window.subscriberQueue[reduxName].push({
                    target: target,
                    mapStateToAttributes: mapStateToAttributes
                });
            } else {
                window.subscriberQueue = {};
                window.subscriberQueue[reduxName] = [{
                    target: target,
                    mapStateToAttributes: mapStateToAttributes
                }];
            }
        }
    },
    handleUnsubscribe: function(component) {
      if (component.unsubscribe) {
        component.unsubscribe();
      }
    }

})