通俗的来说vuex是一个**状态管理工具**，主要是解决不同组件之间的数据共享，及数据持续化

Vuex是一个专门为vue.js 应用程序开发的状态管理模式

1. vuex 解决了组件之间同一状态的共享问题（解决了不同组件之间的数据共享）
2. 组件里面数据的持久化

小项目不建议使用vuex

localStorage、sessionStorage、Cookie ！！！！！

## 使用

### 创建一个store
1. 在Scr下面新建一个vuex的文件夹
2. vuex文件夹下面新建一个store.js
3. 安装vuex
```js
     cnpm install vuex --save
```
4. 在创建的store.js中引入vuex
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
### state
vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state来获取我们定义的数据；
5. 定义数据
```js
// state在vuex中存储数据
var state = {
	count: 1
}
```
### mutation
6. 定义方法
```js
// mutations 里面放的是方法主要用于改变state里面的数据
var mutations = {
	addCount() {
		++state.count;
	}
}
```
*注：上面的数据和方法的定义可以写在一起

将实例化的 vuex.store暴露出来
```js
//vuex 实例化 Vuex.store
const store = new Vuex.Store({
	state,
	mutations

})

export {  //暴露一组数据
	store
}

//  export default store  暴露出一个对象
//	import store from "@/vuex/store.js";  上述情况这样引入
```

### 各个组件间的引用
（相当于个组件间可以同时改变仓库里面的数据）

在要使用的组件中（.vue文件中）或者全局中引入（全局main.js中 引入的可以在各个组件中直接引用）：

1. 引入&. 注册
```js
import {store} from "@/vuex/store.js";  //引入一组数据

export default {
	name: 'FadeInOut',
	data() {
		return {
			off: true
		}
	},
	store,  //注册
	methods:{
		
	}
}
```

2. 获取数据 
```js
{{this.$store.state.count}}
```

3. 触发函数 改变·state里面的数据
```js
methods:{
    add(){  //在对应组件中直接执行add函数即可
        this.$store.commit('addCount');  
    }
}
```

## Getter
 ```js
 //在score中注册getter
 //优点类似于计算属性  改变state里面的count数据的时候就会触发getters里面的方法  获取新的值
var getters={
    	doubleCount(){
    		return state.count*2
    	}
}

//上述注册的方法使用直接可以--
{{this.$store.getters.doubleCount}}
 ```
 
 ## Action
 
 Action 类似于 mutation，不同在于：

* Action 提交的是 mutation，而不是直接变更状态。 （相当于action通过提交mutation来修改状态值）
* Action 可以包含任意异步操作。

 ```
 var mutations = {
	addCount:function() {
		++state.count;
	}
}

var actions = {
    add:function(context){
		 context.commit('addCount')   //执行mutation里面的addCount方法
	}
  }
  
  
  this.$store.dispatch('add')//执行该方法
 ```
 
 
 ## 优点
1. 多层嵌套的组件、兄弟组件间的状态会更好管理维护。
 
2. 缓存一些当前要使用请求远程或本地的数据集（刷新后会自己销毁）减少向服务器的请求

## 应用
场景有：单页应用中，组件之间的状态、音乐播放、登录状态、加入购物车

## 总的来说

只用来读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。
 
 
 
 
 下面有一篇很好的文章：5分钟带你入门vuex（vue状态管理）：https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc
 