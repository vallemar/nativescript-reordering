const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	webpack.chainWebpack((config) => {
    });

	return webpack.resolveConfig();
};
