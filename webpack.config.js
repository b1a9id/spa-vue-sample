const path = require('path');

module.exports = {
	context: __dirname + '/src',
	entry: {
		javascript: './main/resources/static/js/index.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'src/main/resources/static/dist')
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: ['es2016']
				}
			},
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
			{
				test: /\.css/,
				use: 'css-loader',
			}
		]

	}
};
