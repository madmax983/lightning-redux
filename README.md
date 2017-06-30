# Lightning-Redux [![Build Status](https://travis-ci.org/madmax983/lightning-redux.svg?branch=master)](https://travis-ci.org/madmax983/lightning-redux)

## Usage
The new version of Lightning-Redux simplifies the previous iteration down to a single Redux component. It serves as a wrapper around Redux itself, along with a few helper methods specific to Lightning.

### Component Methods
####
**createStore(name, reducer, initialState, middleware):** create the Redux store.

name: The name of the slice of state for the reducer creating the store.

reducer: Initial root reducer

initialState: You can specify an initial shape to your store's shape.

middleware: You can include redux middleware like redux-thunk here. Lightning-Redux automatically wraps this with Redux compose.

**dispatch(action):** Works like you would expect. Dispatches the action to the Redux store. Fun fact: connect also sets a dispatch expando on the connected component for convenience.

**subscribe(listener):** This shouldn't be needed to be implemented, but is provided in case you want to write a custom connect method. The listener callback will be called on store updates.

**replaceReducer(nextReducer):** Wraps Redux's replaceReducer function. Replaces the reducer function in the redux store.

**registerReducer(name, reducer):** Adds the specified reducer function to the redux store with the specificed name as it's slice of state.

**connect(mapStateToAttributes, target):** mapStateToAttributes either a key pair object where the key is the attribute on the component you want set, and the value is either the value in the redux state graph, or a callback function. mapStateToAttributes can also be a function that returns this key pair value. This function receives the state and component to compute the value. You can pass the component you want connected, but if it isn't populated, it will get populated by event.getSource(). It also sets a dispatch expando for convenience in the component's controller methods. 

**getState():** Technically not a component method, this is a convenience expando that allows access to the Redux state.

## Installation
Lightning-Redux Unmanaged Packaged (Redux Component, redux, redux-thunk, and reselect static resource): https://login.salesforce.com/packaging/installPackage.apexp?p0=04t50000000M7PY

Lightning-Redux-Examples (Counter and Todo Examples unmanaged package): https://login.salesforce.com/packaging/installPackage.apexp?p0=04t50000000M7Px

Otherwise, you can use the SFDX CLI to convert the source and do a metadata deploy.

## Resources
Redux Documentation: http://redux.js.org/

Awesome Redux: https://github.com/xgrommx/awesome-redux

Lightning Components Developer Guide: https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/intro_framework.htm 

Awesome Lightning: https://github.com/mailtoharshit/awesome-lighting

Awesome Salesforce: https://github.com/mailtoharshit/awesome-salesforce

