// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //this will extract the downloaded css plugin.
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname,'demo'), //it looks for current directory and then demo folder where the dev server is going to be served from.
        compress:true,
        publicPath: "demo",
        writeToDisk:true,
    }, //its json type of object , dev server will use these values.
    entry: './src/js/app.js',
    output:{
        filename: 'app.js',
        path: path.resolve(__dirname, 'demo/js'),
        publicPath: 'demo'
    },
    module:{
        rules:[
            {
                test: /\.(scss)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options:{
                            plugins: function(){
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },//process css with post css
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../fonts/',
                            publicPath: '../fonts/'
                        }
                    }
                ]
            }//extract font files and save in disk.
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
           filename: '../css/app.css',
            
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery',
        })
    ]

} //configuration settings for all the various modules