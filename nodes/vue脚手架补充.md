
### 脚手架的目录

index.html当前项目的入口文件(此时将对应的标签插入到入口中 app)

-->

执行main.js（在实例化对象中传递参数此处连接到App.vue）

-->

在App.vue中可以引入我们要使用的组件


### 组件的嵌套
* 全局注册组件
```
//main.js中

import SlipingSwitch from "@/components/Sliping/SlipingSwitch"  //引入组件

Vue.config.productionTip = false
Vue.component("slipingswitch",SlipingSwitch) //定义一个全局的组件  （新起的名字调用组建的标签名，原组件的名字）

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


//在全局调用该组件
<slipingswitch></slipingswitch>
```
* 局部的组件
```
//eg:现在我们想在Main.vue中调用组件 SlipingSwitch

//Main.vue中
<template>
	<SlipingSwitch></SlipingSwitch>
</template>

<script>
	import SlipingSwitch from '@/components/Sliping/SlipingSwitch'  //引入

	export default {
		name: 'Main',
		data() {
			return {
				
			}
		},
		components: {  //注册组件
			SlipingSwitch
			// "slipingswitching"：SlipingSwitch   这样写也可以
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```