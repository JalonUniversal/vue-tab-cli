
### vue-tab-cli 目录结构
### 技术栈： Vue/Vue-Router/Scss/Element-UI/Axios

### 项目结构
src
  |-assets  存放图片, 字体等静态资源
  |-component  存放非入口页面组件
      |-common  存放封装的公用组件
  |-config  全局使用的项目配置项
	|-directives 存放封装的指令
  |-layout  存放布局组件
      |- breadCrumb.vue  面包屑
      |- sideBar.vue  侧边栏
      |- ...
  |-plugins  封装的插件
  |-route  路由定义
  |-theme  Element-UI 主题自定义文件
  |-util  工具类
  |-app.vue 根组件
  |-config.json Element-UI 主题自定义配置
  |-global.css 全局样式 需要改写 element 组件样式/默认CSS 样式在这里添加定义
  |-main.js  程序入口
  |-readme.md  本文档
  |-reset.css  css reset 样式重置
  |-style.scss  项目风格样式定义

  ### 代码书写风格
  Vue 单文件组件 推荐顺序 为
  <template />
  <script />
  <style />

  #### 模板 template

  * template 中的内容以 1Tab(2空格) 进行缩进
  * template 中的标签/组件 在无内容时 使用 自闭合标签写法 例如: <breadcrumb />
  * template 中的标签/组件 在属性超过 2个时 建议使用多行写法 例如 
    <el-input
      v-model="value"
      type="password"
      placeholder="please into password"
    />
  * template 中的标签/组件 建议使用 短横线命名法 <component-name></component-name>

  #### 脚本 script

  * script中 声明组件 请务必声明组件名字 name: 'component-name'
  * script中 保持语句简明扼要, 未使用的变量 方法请去除
  
	#### 样式 style

  * style 中使用 scoped 隔离作用域 避免样式污染
  * style 中使用 lange="scss" 使用 scss 样式语言
	* style 中可以自由地使用 定义在 style.scss 中的 scss 变量

### 事件通讯

* api： 
	- $listen----监听事件
	- $dispatch-----触发事件

* 用法：
  -	this.$listen(eventName,callback) 
  - this.$dispatch(eventName,data)	
  - eventName：监听的事件名称(建议命名已全大写加下划线组合命名，例如：CLOSE_TAB)--- 类型：String 
  - callback ：回调函数----------------类型: Function 
  - data ：传递给回调函数的参数--------类型: Any 

* 注意：（在组件销毁后，会自动卸载监听的事件，无需自己手动卸载事件）
```
	A组件：
	<div @click="doClick"></div>
	const data = {
		name: '张飞',
		age: 32
	}
	methods: {  
		doClick() {  
			this.$dispatch('CLOSE_TAB', data)
		}  
	},
```
```
	B组件：
	methods: {  
		getTarget(val) {  
			console.log(val) // data: { name: '张飞', age: 32 }
		}  
	},
	created() { // created钩子触发该监听事件（根据业务自行监听，不一定在created钩子）
		this.$listen('CLOSE_TAB',this.getTarget);  
	}  
```

### 接口请求

```js
		// 使用 async/await 来定义异步请求
		async loadData() {
			// 请求前开始 loading 效果
			this.loading = true;
			// res (response) 即是接口返回的数据
			// 接口返回的 code、message 字段不在这里返回
			// 只有接口的 code 不是200时 才会使用 message 进行提示
			// GET 方法的请求可以简写为 this.$fetch(url) 的形式
			const res = await this.$fetch({
				method: 'GET',
				url: '/store/api/getStoreShopByShopI',
				// [可选] 可以定义 failed 回调在请求报错时 做一些处理, 
				// 入参是 错误对象 error, 一般无须定义 failed
				failed(error) {
					console.log('failed error', error);
				},
				// 也可以定义 callback 在接口请求完毕后做一些事情, 
				// 注意: 无论请求成功还是失败 callback都会执行, 一般无须定义 callback
				callback() {
					console.log('exec callback');
					// this.loading = false;
				},
			});
			// response (res) 可能为空(null) 所以简单做个判断
			if (res) {
				// 这里就是获取 响应数据 的逻辑了
				console.log('res: ', res);
			}
			// 请求后结束 loading 效果
			this.loading = false;
		},
``` 

### 新建页面步骤

* 添加组件
	- 进入`src/component`查找你的页面所在的文件夹，如果是新增的一级目录，需新增文件夹。
	- 进入你的页面所在文件夹，新增`页面名字.vue`文件。注意：需要添加组件名，不能为空，不然也会报错。

* 添加路由
	- 进入`src/route/index.js`里面查看你所添加的页面在哪个路由模块
	- 进入你的页面所在的路由模块。如：`src/route/financialManagement.js` 财务管理路由模块。
	- 添加你的页面路由。注意：这里路由选项的`path`属性需要和目录里面的`href`属性一一对应。
	```js
	{
		path: 'unit_group_purchase',	// 路径path
		component: AsyncUnitGroupPurchaseList,// 组件
		meta: {
			title: '单位团购对账'		// 页面组件的title
		}
	},
	```

* 添加目录
	- 进入`src/config/index.js`里面添加进入`MENU`数组里面。
	- `MENU`数组里面元素为一个个对象，表示一个个一级目录。
	- 一级目录的`children`属性为一个数组，表示此目录下的二级目录，并且以此类推。
	- 目前 vue-tab-cli 暂不支持嵌套路由
	```js
	// 此为一个一级目录元素
	{
		icon: "&#xe678;",
		name: "顾客管理",
		children: [
			{
				name: "普通顾客",			// 显示的目录文本
				href: "/normal_customer",	//对应的路由path
				component: 'normalCustomer'	//组件名
			},
			//...
		]
	},
	```
	




