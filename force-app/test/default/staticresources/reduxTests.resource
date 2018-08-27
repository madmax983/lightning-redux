describe("Redux Tests", function() {
    afterEach(function() {
        // Each spec (test) renders its components into the same div,
        // so we need to clear that div out at the end of each spec.
        $T.clearRenderedTestComponents();
        window.reduxStore = undefined;
        window.dispatchQueue = undefined;
        window.subscriberQueue = undefined;
        window.reducerQueue = undefined;
    });

    describe('Test Redux Methods', function(){
        it('has a working createStore Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function reducer() {
                       return "Hello World";
                    }
                    component.createStore("helloWorld", reducer);
                    expect(component.getState().helloWorld).toBe("Hello World");
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working dispatch Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function reducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    component.createStore("counter", reducer);
                    expect(component.getState().counter).toBe(0);
                    component.dispatch({type: "INCREMENT"});
                    expect(component.getState().counter).toBe(1);
                    component.dispatch({type: "DECREMENT"});
                    expect(component.getState().counter).toBe(0);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working subscribe Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function reducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    function handleChanges() {
                        component.handleChangesFired = true;
                    }

                    component.createStore("counter", reducer);
                    component.subscribe(handleChanges);
                    component.dispatch({type: "INCREMENT"});

                    expect(component.handleChangesFired).toBe(true);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working replaceReducer Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    component.createStore("helloWorld", helloWorldReducer);
                    expect(component.getState().helloWorld).toBe("Hello World");
                    component.replaceReducer(counterReducer);
                    expect(component.getState()).toBe(0);

                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working registerReducer Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    component.createStore("helloWorld", helloWorldReducer);
                    expect(component.getState().helloWorld).toBe("Hello World");
                    component.registerReducer("counter", counterReducer);
                    expect(component.getState().counter).toBe(0);
                    component.dispatch({type: "INCREMENT"});
                    expect(component.getState().counter).toBe(1);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working connect Method', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:TestReduxContainer", {}, renderInto)
                .then(function(component) {

                    var redux = component.find("store");

                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    redux.createStore("helloWorld", helloWorldReducer);
                    var mapStateToAttributes = {
                        "v.message": "helloWorld"
                    };

                    redux.connect(mapStateToAttributes, component);
                    expect(component.get("v.message")).toBe("Hello World");
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('has a working connect Method that takes a callback', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:TestReduxContainer", {}, renderInto)
                .then(function(component) {

                    var redux = component.find("store");

                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    redux.createStore("helloWorld", helloWorldReducer);

                    function reverseState(state, component) {
                        return state.helloWorld.split("").reverse().join("");
                    }
                    var mapStateToAttributes = {
                        "v.message": reverseState
                    };

                    redux.connect(mapStateToAttributes, component);
                    expect(component.get("v.message")).toBe("dlroW olleH");
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });
    });

    describe('Test Queueing', function() {

        it('fires the dispatch queue', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    component.dispatch({type: 'INCREMENT'});

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }
                    component.createStore("counter", counterReducer);
                    expect(component.getState().counter).toBe(1);
                    done();
            }).catch(function(e) {
                done.fail(e);
            });
        });

        it('fires the reducer queue', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }
                    component.registerReducer("counter", counterReducer);

                    component.createStore("helloWorld", helloWorldReducer);
                    expect(component.getState().counter).toBe(0);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('fires the subscriber queue', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:TestReduxContainer", {}, renderInto)
                .then(function(component) {

                    var redux = component.find("store");

                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    var mapStateToAttributes = {
                        "v.message": "helloWorld"
                    };

                    redux.connect(mapStateToAttributes, component);

                    redux.createStore("helloWorld", helloWorldReducer);
                    expect(component.get("v.message")).toBe("Hello World");
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });

        it('registers additional reducers if createStore is called multiple times', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function helloWorldReducer() {
                        return "Hello World";
                    }

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    component.createStore("helloWorld", helloWorldReducer);
                    expect(component.getState().helloWorld).toBe("Hello World");
                    component.createStore("counter", counterReducer);
                    expect(component.getState().counter).toBe(0);
                    component.dispatch({type: "INCREMENT"});
                    expect(component.getState().counter).toBe(1);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });
    });

    describe('Test Multiple Stores', function() {

        it('has the ability to create multiple stores', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {"aura:id": "redux"}, renderInto)
                .then(function(component) {
                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }
                    component.createStore("counter", counterReducer);
                    component.dispatch({type: 'INCREMENT'});
                    expect(component.getState().counter).toBe(1);
            }).catch(function(e) {
                console.log(e);
            });

            $T.createComponent("c:Redux", {"aura:id": "hoemi", name: "hoemi"}, renderInto)
                .then(function(component) {
                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }
                    component.createStore("counter", counterReducer);
                    component.dispatch({type: 'DECREMENT'});
                    var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                    for(var el of renderedDivElements) {
                        if(el.getLocalId() == "redux") {
                           expect(el.getState().counter).toBe(1);
                        }
                    }
                    expect(component.getState().counter).toBe(-1);
                    done();
            }).catch(function(e) {
                done.fail(e);
            });
        });

        it('dispatch and dispatch queues work with Multiple stores', function(done) {
                var renderInto = document.getElementById("renderTestComponents");
                $T.createComponent("c:Redux", {"aura:id": "reduxDispatch"}, renderInto)
                    .then(function(component) {

                        component.dispatch({type: 'INCREMENT'});

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }
                        component.createStore("counter", counterReducer);

                        expect(component.getState().counter).toBe(1);
                }).catch(function(e) {
                    console.log(e);
                });

                $T.createComponent("c:Redux", {"aura:id": "hoemiDispatch", name: "hoemi"}, renderInto)
                    .then(function(component) {

                        component.dispatch({type: 'DECREMENT'});

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }
                        component.createStore("counter", counterReducer);
                        var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                        for(var el of renderedDivElements) {
                            if(el.getLocalId() == "reduxDispatch") {
                               expect(el.getState().counter).toBe(1);
                            }
                        }
                        expect(component.getState().counter).toBe(-1);
                        done();
                }).catch(function(e) {
                    done.fail(e);
                });
            });

            it('subscribe and subscribe queue works with Multiple stores', function(done) {
                var renderInto = document.getElementById("renderTestComponents");
                $T.createComponent("c:Redux", {"aura:id": "reduxSubscribe"}, renderInto)
                    .then(function(component) {

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }

                        function handleChanges() {
                            component.handleChangesFired = !component.handleChangesFired;
                        }

                        component.createStore("counter", counterReducer);
                        component.subscribe(handleChanges);
                        component.dispatch({type: 'INCREMENT'});
                        expect(component.handleChangesFired).toBe(true);
                }).catch(function(e) {
                    console.log(e);
                });

                $T.createComponent("c:Redux", {"aura:id": "hoemiSubscribe", name: "hoemi"}, renderInto)
                    .then(function(component) {

                        function handleChanges() {
                            component.handleChangesFired = !component.handleChangesFired;
                        }

                        component.subscribe(handleChanges());

                        component.dispatch({type: 'DECREMENT'});

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }



                        component.createStore("counter", counterReducer);
                        var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                        for(var el of renderedDivElements) {
                            if(el.getLocalId() == "reduxSubscribe") {
                                el.dispatch({type: 'DECREMENT'});
                                expect(el.handleChangesFired).toBe(false);
                            }
                        }
                        expect(component.handleChangesFired).toBe(true);
                        done();
                }).catch(function(e) {
                    done.fail(e);
                });
            });

            it('replaceReducer works with Multiple stores', function(done) {
                var renderInto = document.getElementById("renderTestComponents");
                $T.createComponent("c:Redux", {"aura:id": "reduxReplace"}, renderInto)
                    .then(function(component) {

                        function helloWorldReducer() {
                            return "Hello World";
                        }

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }

                        component.createStore("helloWorld", helloWorldReducer);
                        expect(component.getState().helloWorld).toBe("Hello World");
                        component.replaceReducer(counterReducer);
                        expect(component.getState()).toBe(0);
                }).catch(function(e) {
                    console.log(e);
                });

                $T.createComponent("c:Redux", {"aura:id": "hoemiReplace", name: "hoemi"}, renderInto)
                    .then(function(component) {

                        function helloWorldReducer() {
                            return "Hello World";
                        }

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }



                        component.createStore("counter", counterReducer);
                        expect(component.getState().counter).toBe(0);
                        var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                        for(var el of renderedDivElements) {
                            if(el.getLocalId() == "reduxReplace") {
                                el.replaceReducer(helloWorldReducer);
                                expect(el.getState()).toBe("Hello World");
                            }
                        }
                        component.replaceReducer(helloWorldReducer)
                        expect(component.getState()).toBe("Hello World");
                        done();
                }).catch(function(e) {
                    done.fail(e);
                });
            });

            it('registerReducer works with Multiple stores', function(done) {
                var renderInto = document.getElementById("renderTestComponents");
                $T.createComponent("c:Redux", {"aura:id": "reduxRegister"}, renderInto)
                    .then(function(component) {

                        function helloWorldReducer() {
                            return "Hello World";
                        }

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }

                        component.createStore("helloWorld", helloWorldReducer);
                        expect(component.getState().helloWorld).toBe("Hello World");
                        component.registerReducer("counter", counterReducer);
                        expect(component.getState().counter).toBe(0);
                        component.dispatch({type: "INCREMENT"});
                        expect(component.getState().counter).toBe(1);
                }).catch(function(e) {
                    console.log(e);
                });

                $T.createComponent("c:Redux", {"aura:id": "hoemiRegister", name: "hoemi"}, renderInto)
                    .then(function(component) {

                        function helloWorldReducer() {
                            return "Hello World";
                        }

                        function counterReducer(state, action) {
                            switch (action.type) {
                                case 'INCREMENT':
                                    return state + 1;
                                case 'DECREMENT':
                                    return state - 1;
                                default:
                                    var defaultState = 0;
                                    return defaultState;
                            }
                        }



                        component.createStore("helloWorld", helloWorldReducer);
                        expect(component.getState().helloWorld).toBe("Hello World");
                        component.registerReducer("counter", counterReducer);
                        expect(component.getState().counter).toBe(0);
                        var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                        for(var el of renderedDivElements) {
                            if(el.getLocalId() == "reduxRegister") {
                                el.registerReducer("helloWorld", helloWorldReducer);
                                expect(el.getState().helloWorld).toBe("Hello World");
                            }
                        }
                        done();
                }).catch(function(e) {
                    done.fail(e);
                });
            });

             it('connect works with Multiple stores', function(done) {
                var renderInto = document.getElementById("renderTestComponents");
                $T.createComponent("c:TestReduxContainer", {"aura:id": "reduxConnect"}, renderInto)
                    .then(function(component) {

                        var redux = component.find("store");

                        function helloWorldReducer() {
                            return "Hello World";
                        }

                        redux.createStore("helloWorld", helloWorldReducer);
                        var mapStateToAttributes = {
                            "v.message": "helloWorld"
                        };

                        redux.connect(mapStateToAttributes, component);
                        expect(component.get("v.message")).toBe("Hello World");
                }).catch(function(e) {
                    console.log(e);
                });

                $T.createComponent("c:TestReduxContainer", {"aura:id": "hoemiConnect", name: "hoemi"}, renderInto)
                    .then(function(component) {
                         var redux = component.find("store");

                        function helloWorldReducer() {
                            return "ho'ēmi don't play that!";
                        }

                        redux.createStore("helloWorld", helloWorldReducer);
                        var mapStateToAttributes = {
                            "v.message": "helloWorld"
                        };

                        redux.connect(mapStateToAttributes, component);
                        expect(component.get("v.message")).toBe("ho'ēmi don't play that!");
                        var renderedDivElements = $A.getComponent(renderInto).get("v.body");
                        for(var el of renderedDivElements) {
                            if(el.getLocalId() == "reduxConnect") {
                                expect(el.find("store").getState().helloWorld).toBe("Hello World");
                            }
                        }
                        done();
                }).catch(function(e) {
                    done.fail(e);
                });
            });
        });

    describe('Test Library Compatibility', function() {
        it('is compatible with Redux Thunk', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:Redux", {}, renderInto)
                .then(function(component) {
                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    function incrementThunk() {
                        return function(dispatch) {
                            return dispatch({
                                type: "INCREMENT"
                            });
                        }
                    }

                    function decrementThunk() {
                        return function(dispatch) {
                            return dispatch({
                                type: "DECREMENT"
                            });
                        }
                    }

                    component.createStore("counter", counterReducer, {}, ReduxThunk.default);
                    component.dispatch(incrementThunk());
                    expect(component.getState().counter).toBe(1);
                    component.dispatch(decrementThunk());
                    expect(component.getState().counter).toBe(0);
                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });
        it('is compatible with Reselect', function(done) {
            var renderInto = document.getElementById("renderTestComponents");
            $T.createComponent("c:TestReduxContainer", {}, renderInto)
                .then(function(component) {

                    var redux = component.find("store");

                    function helloWorldReducer(state, action) {
                        switch(action.type) {
                            case "JOHN":
                                return "Hello John";
                            default:
                                return "Hello World";
                        }
                    }

                    function counterReducer(state, action) {
                        switch (action.type) {
                            case 'INCREMENT':
                                return state + 1;
                            case 'DECREMENT':
                                return state - 1;
                            default:
                                var defaultState = 0;
                                return defaultState;
                        }
                    }

                    redux.createStore("helloWorld", helloWorldReducer);
                    redux.registerReducer("counter", counterReducer);

                    var computeStateCalledCounter = 0;



                    var helloWorldSelector = function(state, component) {
                        return state.helloWorld;
                    }

                    function reverseState(helloWorld) {
                        computeStateCalledCounter++;
                        return helloWorld.split("").reverse().join("");
                    }

                    var getReverseState = Reselect.createSelector(
                        helloWorldSelector, reverseState
                    )

                    var mapStateToAttributes = {
                        "v.message": getReverseState
                    };

                    redux.connect(mapStateToAttributes, component);

                    expect(computeStateCalledCounter).toBe(1);

                    component.dispatch({
                        type: "INCREMENT"
                    });

                    expect(computeStateCalledCounter).toBe(1);

                    component.dispatch({
                        type: "JOHN"
                    });

                    expect(computeStateCalledCounter).toBe(2);

                    done();
                }).catch(function(e) {
                done.fail(e);
            });
        });
    });
});