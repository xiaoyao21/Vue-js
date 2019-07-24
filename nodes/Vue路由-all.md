* VUE路由去除#问题

在new Router()的下一行添加上：mode: 'history'
```
export default new Router({

	mode: 'history',  //去掉url中的#
	
	routes: [{
		path: '/',
		name: 'Main',
		component: Main
	}...]
})
```

当然去掉#后 在地址栏输入对应的路径相当于刷新页面

## 路由的跳转
```
<ul>
    <li><router-link to="/router1">路由1</router-link></li>
    <li><router-link to="/router2">路由2</router-link></li>
</ul>


export default new Router({
  routes: [
    {
      path: '/',  //注册路由 '/'
      name: 'Main',
      component: Main
    }
    ,{
		path:'/router1',
		component:router1
	}
	,{
		path:'/router2',
		component:router2
	}
  ]
})
```
整个页面更新为对应的组件（相当于页面的跳转）

## 子路由
可以实现页面 局部组件的更新
```
<ul>
    <li><router-link to="/router1">路由1</router-link></li>
    <li><router-link to="/router2">路由2</router-link></li>
    
    <router-view></router-view> 
</ul>


export default new Router({
  routes: [
    {
      path: '/',  //注册路由 '/'
      name: 'Main',
      component: Main,
			children:[
				{
					path:'router1',
					component:router1
				},{
					path:'router2',
					component:router2
				}
			]
    }
  ]
})

```
## 路由间的传参 params
*注 这样写路由跳转到格式严格遵照``.../router/123/2`` 

在导航栏中输入``../router``是无效的

1. 定义路由
```
{
    path:'router/:id/:num',
    component:Router
}
```
2. 跳转传参
```
<router-link to="/router/123/2">路由</router-link>
```
3. 接收参数 (在对应组件中)
```
mounted(){
    console.log(this.$route);
    console.log(this.$route.params.id)
    ...
}
```

*注 此处路由的显示
``http://localhost:8080/slip/123/2``

## 路由间传参 query

* 推荐推荐！！
 
 1. 跳转传参
 ```
 <router-link v-bind:to="{path:'route',query:{id:123,num:3}}">路由</router-link>
 
 //注意!!! v-bind
 ```
 2. 接收参数
 ```
 mounted(){
     console.log(this.$route);
     console.log(this.$route.query.id);
     ...
 }
 ```
 *注 此处路由的显示
 ``http://localhost:8080/slip?id=123&num=2``
 
 ## 页面的跳转及传参
 
 1. 使用push
 ```
 methods:{
    go1(){
        // 使用params传递参数
        this.$router.push({path:'/word/router1/123'});
    }
}
 ```
2. 使用replace实现页面的跳转
```
methods:{
    go2(){
        // 使用query传递参数
        this.$router.replace({path:'/word/router2',query:{id:123}});
    }
}
```
## 页面的前进&后退
1、页面代码
```
<input type="button" value="前进" @click="next"/>
<input type="button" value="后进" @click="prevent"/>
```
2、事件方法代码
```
methods:{
    next(){
        this.$router.go(1);
    },
    prevent(){
        this.$router.go(-1);
    }
}
```

## vue-router 钩子函数
首页可以控制导航跳转，beforeEach，afterEach等，一般用于页面title的修改。一些需要登录才能调整页面的重定向功能。

    beforeEach主要有3个参数to，from，next：

    to：route即将进入的目标路由对象，

    from：route当前导航正要离开的路由

    next：function一定要调用该方法resolve这个钩子。执行效果依赖next方法的调用参数。可以控制网页的跳转。



## vue重定向
1、配置路由

在默认路径/ 下自动重定向跳转到/route
```
{
    path:'/',  // path路径 
    redirect:'/route'  // 重定向指向的路径
}
```
2、配置页面跳转
```
<li><router-link to="/word/router">路由4</router-link></li>
```
***


* 关于钩子函数的博客：

https://blog.csdn.net/hellowXDW/article/details/81774304

https://blog.csdn.net/qxb5215/article/details/80346820


## add Vue的页面拦截

？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？

遗留的问题如何利用钩子函数实现 在地址栏中输入地址的阻拦功能

*注：下面的栗子：只有从'/'过来才可以到'/fade'中去 
```
{
		path: '/fade',
		component: fade,
		beforeEnter(to,form,next){
			// console.log(arguments);
			if(arguments[0].fullPath=="/fade"&&arguments[1].fullPath=="/")
			{
				console.log(arguments[0].fullPath,arguments[1].fullPath);
				console.log(to,form)
				next()
			}
			console.log(arguments[0].fullPath,arguments[1].fullPath);
		}
	}
```
https://www.cnblogs.com/xufeikko/p/10169826.html
