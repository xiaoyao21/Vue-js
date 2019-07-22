## 路由
安装路由模块：``npm install vue-router --save-dev``


此处的例子是基于CLI脚手架的：
```js
//main.js
import VueRouter from 'vue-router' //引入路由

Vue.use(VueRouter)

//配置路由
//component 对应跳转组件的名字
const router = new VueRouter({
	routes: [{
			path: "/",
			component: Home   
		},
		{
			path: "/helloworld",
			component: HelloWorld
		}
	],
	mode:"history"
})
//如果没有mode:"history" 在路由中会默认加上#，即访问地址为：http://localhost:8080/#/ 

//router 将定义好的路由用在我们的实例中
new Vue({
	router,
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})

```

```html
//App.vue

<template>
	<div id="app">
		<router-view></router-view>  <!-- 引入路由模块 -->
	</div>
</template>
```


此时在浏览器的地址框输入对用的的地址

``http://localhost:8080/helloworld``

``http://localhost:8080/``

将会实现不同的地址跳转

#### 引用 ``<router-view></router-view>``
```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

在注入路由后，我们可以在任何组件内通过 ``this.$router`` 访问路由器，也可以通过 this.$route 访问当前路由：

**a标签导航栏效果**

如果我们想实现导航栏的效果，可以将App.vue中的内容改成下面的样子
```html

<template>
	<div id="app">
		<router-view></router-view>
		<ul>
			<li><a href="/">Home</a></li> <!-- a 标签的弊端不管点击多少次都会重新加载页面 -->
			<li><a href="/helloworld">HelloWorld</a></li>
		</ul>
	</div>
</template>
```

当然上面的代码存在一定的弊端，我们可以将a标签改为路由的形式

**路由导航栏**
```html
<template>
	<div id="app">
		<router-view></router-view>
		<ul>
			<li><router-link to="/">Home</router-link></li> <!-- a 标签的弊端不管点击多少次都会重新加载页面 -->
			<li><router-link to="/helloworld">HelloWorld</router-link></li>
		</ul>
	</div>
</template>
```


## http

安装 ``vue-resource``

``npm install vue-resource  --save-dev``