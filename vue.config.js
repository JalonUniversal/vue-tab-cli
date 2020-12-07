const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	publicPath: './',
	productionSourceMap: false,
	css: {
		loaderOptions: {
			sass: {
				prependData: `
          @import "./src/style.scss";
        `
			}
		}
	},
	chainWebpack: config => {
    // 不进行 prefetch
    config.plugins.delete('prefetch');
    // 不进行 preload
    config.plugins.delete('preload');
    // 支持快捷引入
		config.resolve.alias
			.set('@', resolve('./src'))
			.set('component', resolve('./src/component'))
      .set('config', resolve('./src/config'))
      .set('layout', resolve('./src/layout'))
      .set('lib', resolve('./src/lib'))
			.set('plugins', resolve('./src/plugins'))
      .set('route', resolve('./src/route'))
      .set('service', resolve('./src/service'))
			.set('util', resolve('./src/util'))
			.set('assets', resolve('./src/assets'))
	},
	// configureWebpack: {
	// 	devServer: {
	// 		// 在这里配置代理
	// 	}
	// }
}
