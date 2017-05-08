'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('起動スクリプト: ', require('path').basename(process.argv[1], '.js'));

module.exports = [{
	target: 'node',

	externals: [require('webpack-node-externals')(), {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-bootstrap': 'ReactBootstrap',
		'light-request': 'request',
		'promise-light': 'PromiseLight',
		'promise-thunk': 'PromiseThunk',
		'aa': 'aa',
	}],

	entry: {
		server: './src/server',
	},

	output: {
		path: __dirname + '/server',
		filename: '[name].bundle.js',
		pathinfo: true,
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
		], // rules
	}, // module

	// devtool: 'source-map',

	plugins: [
		new webpack.BannerPlugin({ banner: '/* Banner */', raw: true, entryOnly: true }),

		// new CopyWebpackPlugin([
		// 	{ from: '**/*.html', context: 'src' },
		// ]), // CopyWebpackPlugin
	], // plugins

},
{
	target: 'web',

	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-bootstrap': 'ReactBootstrap',
		'light-request': 'request',
		'promise-light': 'PromiseLight',
		'promise-thunk': 'PromiseThunk',
		'aa': 'aa',
	},

	entry: {
		'front-chat': './src/front-chat',
		'front-tasks': './src/front-tasks',
	},

	output: {
		path: __dirname + '/public',
		filename: './js/[name].bundle.js',
		pathinfo: true,
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
		], // rules
	}, // module

	devtool: 'source-map',

	plugins: [
		new webpack.BannerPlugin({ banner: '/* Banner */', raw: true, entryOnly: true }),

		new CopyWebpackPlugin([
			{ from: '**/*.html', context: 'src' },
		]), // CopyWebpackPlugin

		//new webpack.optimize.UglifyJsPlugin({
		//	compress: { warnings: false },
		//}), // UglifyJsPlugin

		//new webpack.DefinePlugin({
		//	'process.env': {
		//		'NODE_ENV': JSON.stringify('production'),
		//	},
		//}),
	], // plugins

}]; // module.exports
