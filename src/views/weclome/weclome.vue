<template>
	<view>

		<view class="footer">
			<button type="default" @tap="loadToIndex">进入考试</button>
		</view>
	</view>
</template>

<script>
	 // import Global from "../../util/global";
	  import Global from "../../util/global";
	export default {
	    name:"s-welcome",
		data() {
			return {

			}
		},
		onReady() {
			// 可以引入
			console.log("Global.axiosUrl")
			console.log(Global.axiosUrl)
		},
		methods: {
			loadToIndex:function(){//点击按钮，跳转考试页面

			console.log("Global.axiosUrl")
			console.log(Global.axiosUrl)
				uni.navigateTo({
					url: '../paperType/paperType',
					success: res => {
						setTimeout(function(){
							uni.showLoading({
								title: '跳转中,请稍后',
								mask: false
							},3000);
						});
					},
				});
			}
		}
	}
</script>

<style>
	page{
		position: relative;
	}

	.footer{
		position: fixed;
		bottom: 10%;
		width: 100%;
		height: 100upx;
	}
</style>
