### vue-tab-cli

vue-tab-cli 提供了开箱即用的页签系统, 满足对多页签有需求的后台类系统的开发需求. 对 数据请求, UI组件库, 工具函数, 全局数据状态管理, Echarts 图表展示, 富文本编辑, 都有作支持

### 页签系统特性

* 页签切换不卡顿, 页签数量多至 30+ 也不会卡顿
* 页签来回切换不会丢失表单内已填写内容
* 刷新后页签仍然保留 (页面内的数据会刷新清空)
* 页签与路由绑定, 满足 url 传参需求
* 页面文件支持懒加载
* 系统拥有便捷的 页签 打开(激活) / 关闭 api
* 支持一键关闭所有页签 / 前进 / 后退
* 完整生命周期支持

### 功能

- 多页签

- 全屏切换
- 数据请求进度条

- 登录用户状态展示
- 两种形态菜单 (级联式菜单/折叠式菜单)
- 动态面包屑

- 富文本
- echarts 图表库

- 组件
	- 搜索表单 SearchPanel
	- 表格 TableList
	- 底部操作栏 actionBar
	- 动态面包屑 breadCrumb

- 简易数据状态管理 / vuex

## 开始使用

```bash
	# 新建文件夹
	mkdir vue-tab-cli && cd vue-tab-cli

	# 克隆项目到目标文件夹
	git clone git@github.com:JalonUniversal/vue-tab-cli.git .

	# 建议使用 taobao 镜像源
	npm config set registry=https://registry.npm.taobao.org

	# 安装依赖
	npm install 或者 yarn

	# 启动本地的开发服务
	npm run serve 或 yarn serve

	# 编译打包
	npm run build 或 yarn build
```

# License

MIT

Copyright (c) 2017-2020 JalonUniversal
