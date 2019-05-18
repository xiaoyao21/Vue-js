
## Vue属性传值Props

将父组件中的内容传递到子组件中

```html
<!--父组件-->
<div id="app">
		<users v-bind:users="users"></users>  <!--父组件与子组件之间的联系处-->
	</div>


<script>

	import Users from './components/Users' 
	
	export default {
		name: 'app',
		data() {
			return {
				users: [{
						name: "herry",
						position: "开发工程师",
						show: false
					},
					{
						name: "herry",
						position: "开发工程师",
						show: false
					}
				]
			}

		},
		components: {
			 "user":Users,
		}
	}

//命名不能与系统标签冲突 eg:header
// 	上面也可以这样写:
// 	components: {
// 		Users
// 	}
</script>
```

```js
//接受值的子组件一方

	export default {
		name: 'app-header',
		props:["users"],  //接受值处
		data() {
			return {
				
			}
		},
		methods: {
			change(index) {
				this.users[index].show = !this.users[index].show;
				
			}
		}
	}
```
```js
//标准的写法（已对象的形式列出prop ）

props:{
			users:{
				type:Array,
				required:true
			}
		}
```

## Propt的大小写

在HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。

即DOM模板中，要注意使用将camelCase (驼峰命名法) 改为kebab-case (短横线分隔命名)。

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```
*注：使用字符串模板，那么这个限制就不存在了

## 单项数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。

这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。

```html
//这是一个例子

<div class="demo">

			<con v-bind:users="user"></con>

		</div>
		<script>
			Vue.component('con', {
				props: ["users"],
				data() {
					return {
						val:this.users
					}
				},
				template:'<ul><li v-for="use in val" @click="use.now=!use.now">{{use.now}}</li></ul>'
			})


			var vm=new Vue({
				el: ".demo",
				data: {
					user: [{
							now: false
						},
						{
							now: false
						},
						{
							now: false
						}
					]
				}
			})
		</script>
```

## 传值与传引用

## 事件传值（子 to 父）
将内容从子组件传递给父组件

```html
//在子组件中先注册这个事件

<template>
	<header v-on:click="change()">
		<h1>
			{{title}}
		</h1>
	</header>
</template>

<script>
	export default {
		name: "header",
		data() {
			return {
				title: "Vue.js Demo"
			}
		},
		methods:{
			change:function(){  //触发这个方法后会找事件名称（titlechange）的事件
				this.$emit("titlechange","子组件向父组件传值了")   //注册一个事件，自定义了一个事件 事件名称为 titlechange  后面为向下传递的参数  
			}
		}
	}
	
//当子组件调用change这个方法的时候，会找在那里使用了（titlechange）方法
</script>

```

```html

//在父组件中，找到父组件与子组件的连接处

<template>
	<div id="app">
	{{title}}
		<app-header v-on:titlechange="updatatitile($event)" v-bind:title="title"></app-header>  
	<!-- 参数中绑定的一定是 ($event) 等号后面的 title为后来传来的 titile即 "子组件向父组件传值了"-->
	</div>
</template>

<script>
export default {
		name: 'app',
		data() {
		},
		methods:{
			updatatitile(title){
				this.title=title;  
				}
			},
		components: {
			"app-header":Header,
		}
	}
	

</script>
```

```html
//问题

<template>
	<div id="app">
		<app-header v-on:titlechange="updatatitile($event)" v-bind:title="title">{{title}}</app-header>   
      <!--在组件中嵌套的标签不起作用？？？？？？-->
	</div>
</template>
```