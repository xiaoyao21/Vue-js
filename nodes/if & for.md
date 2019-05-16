# 条件渲染

## v-if
```html
        <div class="demo">
			<div v-if="some">显示</div>
			<div v-else>不成立</div>
		</div>
		<script>
			new Vue({
				el: '.demo',
				data: {
					some: false
				}
			})
		</script>
```
* v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。

## v-show
这是一个根据条件展示元素的指令
* v-show 只是简单地切换元素的 CSS 属性 display。
* 注意，v-show 不支持 <template> 元素，也不支持 v-else。

### v-if vs v-show

* ``v-if`` 会根据条件块中的田间使得子组件适当的销毁和重建
* ``v-show``不管初始条件为多少，元素总会被渲染，只是简单地切换元素的 CSS 属性 display。
* 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

## 条件渲染中的key

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

```html
<div id="demo">
			<template v-if="loginType === 'username'">
				<label>Username</label>
				<input placeholder="Enter your username"   id="name">
			</template>
			<template v-else>
				<label>Email</label>
				<input placeholder="Enter your email address"  id="name">
			</template>
			<br>
			<button v-on:click="change()" style="width: 20px;height: 20px;"></button>
		</div>

		<script>
			new Vue({
				el: '#demo',
				data: {
					loginType: "username",
					
				},
				methods: {
					change: function() {
						if (this.loginType === 'username') {
							this.loginType = ""
						} else {
							this.loginType = 'username'
						}
						console.log([document.getElementById("name")])  //打印选取元素的详细信息获取元素,直接放入数组中
						
					}
				}
			})
		</script>
```

来看上面这个一个例子：

那么在上面的代码中切换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input>不会被替换掉——仅仅是替换了它的 placeholder。

简单的来说，在切换的过程中，如果相同的元素有相同的内容，将会复用。

那么上面的例子，我们已经给它定义value值了，为什么切换的时候不会应用它自己的value值呢，应为在这里，这个value值指的是初始的value值。

此时只需 ``添加一个具有唯一值的 key 属性`` 即可， 表示这两个元素是完全独立的，不要复用它们

```js
<template v-if="loginType === 'username'">
				<label>Username</label>
				<input placeholder="Enter your username"  key="111" id="name">
			</template>
			<template v-else>
				<label>Email</label>
				<input placeholder="Enter your email address"  key="222" id="name">
			</template>
```

# 列表渲染

#### 数组元素的``v-for``
```html
//栗子 1

<ul id="example-1">
			<li v-for="(item,index) in items">
				{{ index+" "+item.message }}
			</li>
		</ul>

		<script>
			var example1 = new Vue({
				el: '#example-1',
				data: {
					items: [{
							message: 'Foo'
						},
						{
							message: 'Bar'
						}
					]
				}
			})
		</script>
```
* ``v-for`` 指令需要使用 ``item in items`` 形式的特殊语法（可以用 of 代替 in 作为分隔符），items 是源数据数组并且 item 是数组元素迭代的别名。
* 数组的``v-for``支持两个参数 ，第二个参数的可选的，表示当前项的索引

#### 对象的``v-for``
```html
//栗子 2

<ul id="demo" class="demo">
			<li v-for="(value,name,index) in object">
				{{ index+" : "+name+" : "+value }}
			</li>
		</ul>

		<script>
			new Vue({
				el: '#demo',
				data: {
					object: {
						one:1,
						two:2,
						three:3
					}
				}
			})
		</script>
```

* 对象的 ``v-for``接受三个参数，后两个参数的可选的。第二个参数为对象的键名，第三个参数为索引

## 数组的更新检测

#### 变异方法

变异方法会触发视图的更新

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

参照栗子1 引用如下：

在控制台输入：``example1.items.push({message:'xiaoming'})`` 页面显示的内容将会 ++动态更新++

#### 替换数组
* filter()
* concat()
* slice()

这些方法 ++不会改变原数组的值++ ，但总是会返回一个新数组，当使用非变异方法时，可以用新数组替换旧数组：

#### **注意** 
不同于上面的两种形式~~ Vue 不能检测以下变动的数组：

```html
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决上面两种情况的问题
```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
```

```js
vm.items.splice(newLength)
```