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
});