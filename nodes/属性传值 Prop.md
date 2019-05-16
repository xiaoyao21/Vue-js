
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
//标准的写法

props:{
			users:{
				type:Array,
				required:true
			}
		}
```