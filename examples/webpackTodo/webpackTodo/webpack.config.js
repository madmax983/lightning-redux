module.exports = {
    entry  : './src/index.js',
    output : {
        path     : '../src/staticresources/',
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
