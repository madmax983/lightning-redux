
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

deploy:base - the base Lightning-Redux bindings. These are all you need to use Redux in Lightning (plus redux.
I am keeping a copy of Redux in the addons folder for convenience, but ideally you'll want to be installing
it as a static resource with a fresh version). 

deploy:addons - utility components and events to assist you in using Redux and Lightning Components together.

deploy:SimpleCounter - deploy the SimpleCounter example

deploy:ComplexCounter - deploy the ComplexCounter example

deploy:todo - deploy the todo example.

deploy:examples - deploy all of the examples

deploy:kitchensink - DEPLOY ALL THE THINGS!


TODO:

More Readme-y goodness on what exactly is going on here.
More examples. At least one example configuring the store via webpack, and exposing it in a static resource (in flight).

Enjoy this preview!
