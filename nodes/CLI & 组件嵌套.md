

## Vue CLI脚手架

使用脚手架的理由：

* 脚手架是通过webpack搭建的开发环境
* 使用ES6语法
* 打包和压缩JS为一个文件
* 项目文件在环境中编译,而不是浏览器
* 实现页面自动刷新

### 安装
前提，安装一个node.js环境

``$ npm install --global vue-cli``


来到当前项目的目录下

``$ vue init webpack my-project``

``$ npm install --global vue-cli``

直接照着命令执行

``cd my-project``

``npm run dev``

最后打开

### 默认内容：

打开后目录：
1. ``build`` 构建客户端和服务端，可以改变端口号

2. ``config`` 对应的一些配置

3. ``node_modules``

4. ``src``
```
assets 图片

components 组件

main.js

```

5. ``static`` 放我们的静态文件
（index.html 我们的入口文件）

[说明与比较：new Vue() 和 export default {}](https://www.cnblogs.com/ppJuan/p/7151000.html)

## 组件的嵌套使用
在components中新定义的组件：

```vue
//Users.vue

<template>
	<div class="users">
	<ul>
		<li v-for="user in users">
			{{user}}
		</li>
	</ul>
	</div>
</template>

<script>
	export default {
		name: 'users',
		data () {
			return {
				users:["xiaoming","xiaohong","xiaozhang"]
			}
		}
	}
</script>

<style>
</style>

```
### 全局：
```js
//main.js
import Users from './components/Users'  //全局情况下

//全局注册组件  组件的名字，组件的内容
Vue.component("users",Users);
```

### 局部的组件


```js
//App.vue 

import Users from './components/Users' //非全局的情况下，拿到这个组件，要注册这个组件
	export default {
		name: 'app',
		data() {
			return {
				title: "first project"
			}

		},
		components: {
			"users": Users
		}
	}
	
//命名不能与系统标签冲突
// 	上面也可以这样写:
// 	components: {
// 		Users
// 	}
```

上述两种方法都可在 App.vue 中使用新定义的组件
```
//App.vue

<template>
	<div id="app">
		<h1>{{title}}</h1>
		<!-- <users></users> -->
	</div>
</template>
```

## 组件的css作用域

css域的问题：

每个组件样式都有自己独立的域，不相互影响，就要加上``<style scoped>``

否则style样式会相互叠加~~