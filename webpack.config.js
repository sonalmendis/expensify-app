const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
	const isProduction = env === 'production';

	console.log('env', env);
	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public', 'dist'),
			filename: 'bundle.js'
		},
		mode: 'development',
		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/
				},
				{
					test: /\.s?css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								publicPath: (resourcePath, context) => {
									return path.relative(path.dirname(resourcePath), context) + '/';
								}
							}
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// all options are optional
				filename: 'styles.css'
			})
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true,
			publicPath: '/dist/'
		}
	};
};
