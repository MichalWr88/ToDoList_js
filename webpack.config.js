/*jshint esversion: 6 */
const path = require("path"),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
  entry: {
  	app: './js/app.js',
    // app: './js/zadanie03.js'
 
  },

  output: {
    path: path.resolve("js"),
    filename: 'out.js'
  },
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }

      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]

  },
  plugins: [

    new BrowserSyncPlugin({
      files: ["./css/style.css", "./*.html"],
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./']
      },
      
    })
  ],
 devtool: "source-map"
};

// 
// module.exports = {
// 	entry: "./js/app.js",
// 	output: {
// 		filename: "./js/out.js"
// 	},
// 	watch: true,
// 	module: {
// 		loaders: [ {
// 			test: /.js$/,
// 			exclude: /node_modules/,
// 			loader: 'babel-loader',
// 			query: {
// 				presets: [ 'es2015' ]
// 			}
// 		}, {
// 			// test: /.css$/,
// 			// loader: [ 'style-loader', 'css-loader' ]
// 		} ]
// 	}
// };