
# 介绍
```
<span v-bind:title="message">  
    //将这个元素节点的 title 特性和 Vue 实例的 message 属性保持一致
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
  </span>
```
* 指令带有前缀 v-，以表示它们是 Vue 提供的特殊特性。
```
<input v-model="message">
```
* v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。 
***

# Vue实例
1. 实例属性和方法   (data 有当实例被创建时 data 中存在的属性才是响应式的)

2. 用户定义的属性  前缀+$

**实例的生命周期钩子**

``created``钩子可以用来在一个实例被创建之后执行代码
```js
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```
* 生命周期钩子的 this 上下文指向调用它的 Vue 实例
****
# 模板语法

## 插值
**文本**

``{{}}`` 标签将会替代为对应``数据对象``上的属性值，如果要向下查询，必须逐层找
```html
<div id="app">
			<p>{{ aoo.j }}</p>
			<p>{{ aoo }}</p> 
			<!-- 这里的 `foo` 不会更新！ -->
			<button v-on:click="foo = 'baz'">Change it</button>
		</div>
```
```js
new Vue({
			el: '#app',
			data: {
				foo: 'bar',
				aoo: {
					j: 00
				}
			}
		})
		
//0
//{ "j": 0 }
```
!! 问题
```js
var obj = {
			j: xiaoming;
		}

		new Vue({
			el: '#app',
			data: {
				foo: 'bar',
				aoo: obj
			}
		})
//{{ aoo.j }}
//{{ aoo }}
```
html代码如上：why???

你可以想一下，在下面的 （问题1） 中将会有解释~~


**特性：**

* ``{{}}`` 不能作用在HTML 特性上,遇到下面的情况应该使用 ``v-bind指令``
```html
<div id="app">
			<p v-bind:id="name">{{ aoo }}</p>  <!-- <p id="xiaoming"></p> -->
		</div>
```
```js
new Vue({
			el: '#app',
			data: {
				foo: 'bar',
				name: "xiaoming"
			}
		})
```
* 这些包含在{{}}中的表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，``每个绑定都只能包含单个表达式``，所以下面的例子都不会生效。
```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```
* 模板表达式都被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。``你不应该在模板表达式中试图访问用户定义的全局变量。`` 
即{{}}中的值不可为全局定义的变量，``<p v-bind:id="name">{{ aoo }}</p>``中name值一样

下面这个栗子是可以的:
```html
//栗子 1
<div id="app">
			<p v-bind:id="name">{{ name }}</p>  //<p id="xiaoming">xiaoming</p>
		</div>
	

	<script>
		var name="xiaoming"
		new Vue({
			el: '#app',
			data: {
				foo: 'bar',
				name: name
			}
		})
	</script>
```
```
//问题 1
<div id="app">
			<p v-bind:id="name">{{ name }}</p>  <!--<p id="[object Object]">[object Object]</p>-->
		</div>
	</body>

	<script>
		var name={
			namename:"xiaoming"
		}
		var j=new Vue({
			el: '#app',
			data: {
				foo: 'bar',
				name: name
			}
		})
		
	</script>
```
对比上面的（栗子1），这是为什么呢？
因为Vue中的data对象里面属性值都是转化为字符串的形式的，所以当存储的值为对象时直接利用obj.toString()直接转化为``[object Object]``

## 指令
**参数**：在指令名称后面以冒号表示，一个指令能接受一个参数。
* v-bind 指令可以用于响应式地更新 HTML 特性，另一个例子是 v-on 指令，它用于监听 DOM 事件

**动态参数**：可以用方括号括起来的 JavaScript 表达式作为一个指令的参数
* 对动态参数的值的约束，动态参数预期会求出一个字符串，异常情况下值为 null。

## 缩写
``v-bind缩写``
```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

``v-on缩写``
```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```