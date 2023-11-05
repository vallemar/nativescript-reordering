const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	webpack.chainWebpack((config) => {
       config.resolve.alias.set('@nativescript/core', '@akylas/nativescript');
    });

	return webpack.resolveConfig();
};
