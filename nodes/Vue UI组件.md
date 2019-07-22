* 左右切换过渡
```
<style>
			button{
				position: absolute;
			}
			.on-enter-active,
			.off-leave-active,
			.on-leave-active,
			.off-enter-active {
				transition: 2s;
			}
			.off-leave,
			.on-leave {
				opacity: 1;
			}

			.off-leave-to,
			.on-leave-to {
				opacity: 0;
				transform: translateX(40px);
			}

			.off-enter,
			.on-enter {
				opacity: 0;
				transform: translateX(40px);
			}

			.off-enter-to,
			.on-enter-to {
				opacity: 1;
				transform: translateX(0px);
			}
		</style>
	</head>
	<body>
		<div id="slip">

			<transition name="off">

				<button v-if="off" @click="off=!off">
					off
				</button>
			</transition>
			<transition name="on" >
				<button v-if="!off" @click="off=!off">
					on
				</button>
			</transition>
		</div>
		<script>
			var ob = new Vue({
				el: '#slip',
				data: {
					off: true
				}
			})
		</script>
```

* 轮播过渡
```

```