
# lightning-redux
Lightning bindings for Redux

#Installation instructions:

1. Clone repo
2. Copy jsforce.config.editme.json and create jsforce.config.json.
3. Enter target Salesforce org credentials.
4. Install [npm](https://www.npmjs.com/) if you don't already have it.
5. Run npm install on directory

#Gulp Targets

There are a few gulp targets available. Running gulp 'target' will deploy the components to the Salesforce Org in jsforce.config.json

deploy:base - the base Lightning-Redux bindings. These are all the component you need to use Redux in Lightning (plus redux.
I am keeping a copy of Redux in the addons folder for convenience, but ideally you'll want to be installing
it as a static resource with a fresh version). 

deploy:addons - utility components and events to assist you in using Redux and Lightning Components together.

deploy:SimpleCounter - deploy the SimpleCounter example

deploy:ComplexCounter - deploy the ComplexCounter example

deploy:todo - deploy the todo example.
        
deploy:webpackTodo - deploy the webpackTodo example.

deploy:examples - deploy all of the examples

deploy:kitchensink - DEPLOY ALL THE THINGS!

After deploying, you will want to create a Preview style app to plunk the components in to see them. 
Or take that Todo example, implement flexipage:availableForAllPageTypes", and plunk it down on your Lightning Experience homepage. 

#Lightning-Redux Bindings
You can just import Redux into a Lightning component and start using it right now as demonstrated in the SimpleCounter example. 
However, a few binding components are provided here to assist you in architecting a Lightning-Redux app. 
The base components are the Provider component, and a handful of events: reduxStoreChange, storeInitialized, and dispatchAction.

In addition, there a number of utility components provided in the addons folder. These are demonstrated in the todoApp example, but as the webpackTodo example shows, they are not necessary.

#Base Components
##Provider
The main interface between Redux and your Lightning Components. The Redux Store is kept inside a store aura:attribute with a type of "Object".
You can either set the store directly via some bundled javascript file in the app level container, or pass the store in via the storeInitialized Event.
Either way you will want to make sure to fire the storeInitialized event to bootstrap the provider.
The provider emits reduxStoreChange events whenever there is a change in the store. Write handlers in your components to react to these changes, and make appropriate changes.
It also handles a dispatchAction event. The payload that lightning event is an Action, and the handler for this event will dispatch the action on the store in the Provider.

##storeIntitialized Event
Has a store param for sending the store to be set in the Provider. 
Also useful to write handlers on the other components when you want to have an action fire when the Provider first starts up(i.e. retrieving a list of SObjects from the DB)

##reduxStoreChange Event
This event is fired by the Provider whenever there is a change in the store. Write handlers on components that you want to react to changes in the store.

##dispatchAction Event
Lightning components can register and fire this event to send actions to be dispatched by the store in the Provider. 
The use of this component can be eliminated by using the bindActionCreators utility method from Redux, as demonstrated in the webpackTodo example.

#Addon Components
##Reducer
An abstract component that needs to be extended by a concrete component in order to function. Implement your reducers in these concrete components. 
Setting the name attribute in your concrete implementation will determine the name of the key in Redux store graph.

##RootReducer
The RootReducer will take all the concrete Reducer components you write inside of it's {!v.body} and combine them with the combineReducers function from Redux.
It will then emit a ReducersCombined event with this combined Reducer to be handled either by the top level app component, or a store component so that the store can be created.
See the todoStore in the todoApp example for a demonstration.

#Using a bundling library like Webpack or Browserify
This is the best way to go, but can be a little daunting for beginners. 
You can find a lot of great info at [Awesome Webpack](https://github.com/d3viant0ne/awesome-webpack), [Browserify Articles](http://browserify.org/articles.html)
The webpackTodo example included in this repo should also give you a good idea of how to get started. The basic idea is to write all your javascript files the module import syntax you feel comfortable with.
Then webpack or browserify will bundle this all together, and you can use this bundle directly in your Lightning Components. 
The main thing is to expose the bundle as a library, and at the bare minimum export the store so that you can set it in the Provider component. 
The webpackTodo example also shows how you can use bindActionCreators to export your actions for use in the Lightning Component controllers.
One of the great benefits of using this model is that all your third-party dependencies are kept in one file (or multiple code-splitting files, if you're into that kind of thing), and you can use all the npm goodness like shrinkwrap, update, etc. 
