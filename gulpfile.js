var gulp = require( "gulp" );
var zip = require( "gulp-zip" );
var forceDeploy = require( "gulp-jsforce-deploy" );
var credentials = require("./jsforce.config.json");

gulp.task( "deploy:base", function() {
    gulp.src( "./src/**", { base: "." } )
        .pipe( zip( "./base.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:addons", function() {
    gulp.src( "./addons/src/**", { base: "./addons" } )
        .pipe( zip( "./addons.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:SimpleCounter", function() {
    gulp.src( "./examples/SimpleCounter/src/**", { base: "./examples/SimpleCounter" } )
        .pipe( zip( "./SimpleCounter.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:ComplexCounter", function() {
    gulp.src( "./examples/ComplexCounter/src/**", { base: "./examples/ComplexCounter" } )
        .pipe( zip( "./ComplexCounter.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:todo", function() {
    gulp.src( "./examples/todo/src/**", { base: "./examples/todo" } )
        .pipe( zip( "./todo.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:examples", ['deploy:SimpleCounter', 'deploy:ComplexCounter', 'deploy:todo'], function(){

});

gulp.task( "deploy:kitchensink", ['deploy:base', 'deploy:addons', 'deploy:examples'] ,function(){

});
