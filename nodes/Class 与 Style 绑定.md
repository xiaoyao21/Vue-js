# Class 与 Style 绑定
在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。

## html中class的绑定
### 对象语法
方法1
```html
        <div class="demo" v-bind:class="{name,text}"></div> <!-- <div class="demo text"></div> -->
		<div class="demo" v-bind:class="{one:name,two:text}"></div><!-- <div class="demo two"></div> -->
		 <!--第二个div出错了 <div class="demo" v-bind:class="{one:name,two:text}"></div> -->
		<script>
			new Vue({
				el: ".demo",
				data: {
					name: false,
					text: true
				}
			})
		</script>
```
上面的栗子，当为一个element元素绑定两个Vue实例时，第二个element元素的结果就回出错。
``在Vue中只允许将一个实例绑定在一个element元素上``，那我们在实际开发中如果需要绑定两个元素怎么办，我们可以在要绑定的div的父级上绑定Vue实例，那么在它的子元素上就可以调用实例上的东西。

上面的代码我们可以改成如下的样子：
```html
    	<div class="demo">
			<div v-bind:class="{name,text}"></div> <!-- <div class="demo text"></div> -->
			<div v-bind:class="{one:name,two:text}"></div><!-- <div class="demo two"></div> -->
		</div>
		
		<script>
			new Vue({
				el: ".demo",
				data: {
					name: false,
					text: true
				}
			})
		</script>
```
方法2
```html
<div id="demo" v-bind:class=obj></div>  <!-- <div id="demo" class="text"></div> -->
		<script>
			new Vue({
				el:"#demo",
				data:{
					obj:{
						name:false,
						text:true
					}
				}
			})
		</script>
```
### 数组语法
```html
<div id="demo" v-bind:class="[activeClass, errorClass]"></div> <!--<div id="demo" class="active text-danger"></div> -->
		<script>
			new Vue({
				el: "#demo",
				data: {
					activeClass: 'active',
					errorClass: 'text-danger'
				}
			})
		</script>
```
当然你也可以用数组对象的嵌套形式书写 ~~

* 组件上：当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类不会被覆盖。
## 内联样式的绑定

### 对象语法
v-bind:style 的对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，此种形式要用引号将属性括起来) 来命名：
```html
<div class="demo" v-bind:style="{ color: color, 'font-Size': fontSize + 'px' }"></div>
		<script>
			new Vue({
				el: '.demo',
				data: {
					color: 'red',
					fontSize: 30
				}
			})
		</script>
```
* 数组语法与class类名的数组语法相同

