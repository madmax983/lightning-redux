module.exports = {
    entry  : './examples/webpackTodo/webpackTodo/src/index.js',
    output : {
        filename : 'webpackTodo.resource',
        library : 'webpackTodo',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module : {
        loaders: [ {
            test   : /.js$/,
            exclude: /node_modules/,
            loader : 'babel-loader'
        }
        ]
    }
};
