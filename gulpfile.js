var gulp = require( "gulp" );
var webpack = require('gulp-webpack');
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

gulp.task( 'shared', function() {
    gulp.src( "./examples/shared/src/**", { base: "./examples/shared" } )
        .pipe( zip( "./shared.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "todo", function() {
    gulp.src( "./examples/todo/src/**", { base: "./examples/todo" } )
        .pipe( zip( "./todo.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:todo", ['shared', 'todo'], function() {
    
} );

gulp.task( 'build:webpackTodo', function() {
    return gulp.src('./examples/webpackTodo/webpackTodo/src/index.js')
        .pipe(webpack( require('./examples/webpackTodo/webpackTodo/webpack.config.js') ))
        .pipe(gulp.dest('./examples/webpackTodo/src/staticresources'));
});

gulp.task( "webpackTodo", ['build:webpackTodo'], function() {
    gulp.src( "./examples/webpackTodo/src/**", { base: "./examples/webpackTodo" } )
        .pipe( zip( "./webpackTodo.zip" ) )
        .pipe( forceDeploy( {
            username: credentials.username,
            password: credentials.password + credentials.token
        } ) )
} );

gulp.task( "deploy:webpackTodo", ['shared', 'webpackTodo'], function() {

} );

gulp.task( "deploy:examples", ['deploy:SimpleCounter', 'deploy:ComplexCounter', 'shared', 'todo', 'webpackTodo'], function(){

});

gulp.task( "deploy:kitchensink", ['deploy:base', 'deploy:addons', 'deploy:examples'], function(){

});
