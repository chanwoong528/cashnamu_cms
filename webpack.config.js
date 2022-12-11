const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWeebPackPlugin = require('html-webpack-plugin'); //html 문서에 자동으로 번들파일을 추가해줍니다.
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //웹팩을 실행할 때마다 dist 폴더를 정리하는 플러그인
const CopyPlugin = require('copy-webpack-plugin');


module.exports = (env, argv) => {
    console.log("env: ", env)
    console.log("argv: ", argv)
    const prod = argv.mode === "production";

    return {
        mode: prod ? "production" : "development",
        devServer: {
            port: 3030,
            hot: true,
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })],
        },

        entry: {
            main: ["./src/index.js"]
        },  // 처음 시작할 파일을 지정해줍니다. 지정하지 않으면 './src/index.js'가 기본 값이기 때문에 적어줘야 해요 
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },

        output: {

            filename: './assets/js/[name].min.js',
            // path: path.join(__dirname, 'dist'),
            path: path.join(__dirname, 'dist'),
            assetModuleFilename: './assets/img/[name][ext]'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(json)$/,
                    type: 'json',
                    generator: {
                        filename: 'assets/data/[name][ext]',
                    },
                },
            ]
        },


        plugins: [
            new webpack.ProvidePlugin({
                React: "react",
            }),
            new HTMLWeebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }), // './src/index.html' 경로의 html 파일에 번들 파일을 넣어줍니다.
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             from: path.join(__dirname, 'src/data'),
            //             to: path.join(__dirname, 'dist/assets/data')
            //         },
            //         // {
            //         //     from: path.join(__dirname, 'src/img'),
            //         //     to: path.join(__dirname, 'dist/img')
            //         // },
            //         // {
            //         //     from: path.join(__dirname, 'src/lib'),
            //         //     to: path.join(__dirname, 'dist/lib')
            //         // },
            //         // {
            //         //     from: path.join(__dirname, 'src/fonts'),
            //         //     to: path.join(__dirname, 'dist/fonts')
            //         // }
            //     ]
            // }),
            new CleanWebpackPlugin(),

        ]
    }
};