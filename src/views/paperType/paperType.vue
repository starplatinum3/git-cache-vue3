<template>
	<view>
		<view class="text-box"><text>选择以下试卷进入答题</text></view>
		<view>
			<uni-list>
				<uni-list-item title="JAVA试题" note="题目三十题,时间30分钟" @tap="showInput"></uni-list-item>
				<view v-if="show" class="uni-padding-wrap uni-common-mt">
					<view>
						<view class="uni-flex uni-row">
							<view class="text" style="width: 200upx;">姓名:</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;">
								<input type="text" v-model="name" placeholder="请输入姓名" placeholder-class="inputStyle" />
							</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="text" style="width: 200upx;">手机号:</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;">
								<input maxlength="11" placeholder-class="inputStyle" type="number" v-model="telphone" placeholder="请输入手机号,或后四位" />
							</view>
						</view>
					</view>
					<view style="text-align: center;">
						<button size="mini" type="primary" @tap="toJavaQuestion()">进入答题</button>
					</view>
				</view>
			</uni-list>
			<uni-list>
				<uni-list-item title="HTML试题" note="题目三十题,时间20分钟" @tap="showHtmlInput()"></uni-list-item>
				<view v-if="showHtml" class="uni-padding-wrap uni-common-mt">
					<view>
						<view class="uni-flex uni-row">
							<view class="text" style="width: 200upx;">姓名:</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;">
								<input type="text" v-model="name" placeholder="请输入姓名" />
							</view>
						</view>
						<view class="uni-flex uni-row">
							<view class="text" style="width: 200upx;">手机号:</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;">
								<input maxlength="11" class="inputStyle" type="number" v-model="telphone" placeholder="请输入手机号,或后四位" />
							</view>
						</view>
					</view>
					<view style="text-align: center;">
						<button size="mini" type="primary" @tap.enter="toHtmlQuestion()">进入答题</button>
					</view>
				</view>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				showHtml:false,
				show:false,
				name:"",
				telphone:""
			}
		},
		methods: {
			showInput:function(){
				this.show = !this.show;
			},
			toJavaQuestion:function(){
				var name = this.name;
				var tel = this.telphone;
				if(name.length === 0 && tel.length === 0){
					uni.showModal({
						title: '进入失败',
						content: '姓名和手机号不能为空',
						showCancel: false,
					});
				}else if(tel.length < 4 | (tel.length > 4 && tel.length < 11)){
					uni.showModal({
						title: '进入失败',
						content: '请输入手机尾号后四位或手机号',
						showCancel: false,
					});
				}else{
					uni.setStorageSync('name',this.name);
					uni.setStorageSync('tel',this.telphone);
					uni.redirectTo({
						url: '../index/index',
						success: res => {
							uni.showLoading({
								title: '试题准备中.....',
								mask: false
							});
						},
						fail: () => {
							uni.showModal({
								title: '进入失败',
								content: '请检查网络连接或联系管理员',
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
							});
						},
					});
				}
				
			},
			showHtmlInput:function(){
				// this.showHtml = !this.showHtml;
				uni.showToast({
					title: '暂无试卷....',
					icon:'none',
				});
			},
			toHtmlQuestion:function(){
				var name = this.name;
				var tel = this.telphone;
				if(name.length === 0 && tel.length === 0){
					uni.showModal({
						title: '进入失败',
						content: '姓名和手机号不能为空',
						showCancel: false,
					});
				}else if(tel.length < 4 | (tel.length > 4 && tel.length < 11)){
					uni.showModal({
						title: '加载失败',
						content: '请输入手机尾号后四位或手机号',
						showCancel: false,
					});
				}else{
					uni.redirectTo({
						url: '../htmlPaper/htmlPaper',
						success: res => {
							uni.showLoading({
								title: '试题准备中....',
								mask: false
							});
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		},
		onLoad() {
			uni.hideLoading();
		}
	}
</script>

<style>
	.text-box{
		background: #FFFFFF;
		text-align: center;
		font-size: 20px;
		line-height: 3em;
	}
	.inputStyle{
		font-size: 14px;
	}
	.enterNameAndTel{
		font-size: 12px;
	}
	.uni-padding-wrap{
		width:690upx;
		padding:0 30upx;
	}
	.uni-common-mt{
		margin-top:30upx;
	}
	.uni-flex {
		display: flex;
		flex-direction: row;
	}
	.uni-row {
		flex-direction: row;
	}
	.text {
		margin: 15upx 10upx;
		padding: 0 20upx;
		background-color: #ebebeb;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #777;
		font-size: 26upx;
	}
	
	
	
</style>