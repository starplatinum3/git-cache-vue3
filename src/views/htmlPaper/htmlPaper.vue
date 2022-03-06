<template>
	<view>
		<form id="frm" @submit="formSubmit">
			<view v-if="showNameAndTel" class="">
				姓名：{{ name }}
				手机号：{{ phoneNumber }}
			</view>
			<view id="top-box" class="cu-bar bg-white solid-bottom">
				<!--题型-->
				<view class="action text-black">
					<text v-if="currentType===1">单选题</text>
					<text v-else-if="currentType===2">多选题</text>
				</view>
				<!--倒计时-->
				<view id="time" v-if="hiddeBtnAndTime">
					<uni-countdown :show-day="false" border-color="#ffffff" :hour="0" :minute="30" :second="0" @timeup="timeup"></uni-countdown>					
				</view>
				<!--提交按钮-->
				<view class="action" v-if="hiddeBtnAndTime">
					<button size="mini" form-type="submit" type="primary" @click="show()">提交</button>
					<unik-modal ref="unikModal" :modalTitle="modalTitle" @confirmModal="confirmModal" @cancelModal="cancelModal">
						<view class="action">
							<text>还有 {{ totalQuestionNumber + 1 }} 未做,</text>
						</view>
						<view>
							<text>是否确认提交？</text>
						</view>
					</unik-modal>
				</view>
			</view>
			<!-- 题目 -->
			<swiper :current="questionIndex" class="swiper-box" @change="swiperChange" :style="{'height':swiperHeight}">
				<swiper-item v-for="(question,index) in questionList" :key="index">
					<!-- 题目 -->
					<view class="cu-bar bg-white solid-bottom">
						<view class="action text-black">
							<text class="cuIcon-title text-red"></text>{{index + 1}}. {{question.title}}
						</view>
					</view>
					<view>
						<!--单选-->
						<radio-group class="block"  @change="radioboxChange" v-if="question.type===1">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<radio :value="option.id" :disabled="activeDisabled"></radio>
								<view class="title text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</radio-group>
						<!--多选-->
						<checkbox-group class="block" @change="checkboxChange" v-else-if="question.type===2">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<checkbox :disabled="activeDisabled" :value="option.id" :class="question.userAnswer.indexOf(option.id) > -1?'checked':''" :checked="question.userAnswer.indexOf(option.id) > -1?true:false"></checkbox>
								<view class="title  text-black">{{option.id}}.{{option.content}}</view>
							</view>
						</checkbox-group>
					</view>
					<view v-show="question.showAnswer" class="margin-top solid-top">
						<view class="cu-bar">
							<view class="action  text-grey">
								<text>正确答案：</text>
								<text class="solid-bottom  padding-left text-green">{{question.answer}}</text>
							</view>
						</view>
						<view class="cu-bar cu-bar-title">
							<view class="action  text-grey">
								<text>解析：</text>
							</view>
						</view>
						<view class="text-content padding  text-grey">
							{{question.explain}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</form>
		<!-- 底部按钮 上一页 下一页 题卡 -->
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="moveQuestion(-1)">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-back text-gray"></text>
				</view>
				<view class="text-gray">上一题</view>
			</view>
			<view class="action" @click="moveQuestion(1)">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-right"></text>
				</view>
				<view class="text-gray">下一题</view>
			</view>
			<view v-if="showAnswerBtn" class="action" @click="showAnswerChange">
				<view class="cuIcon-cu-image">
					<text class="lg text-gray cuIcon-question"></text>
				</view>
				<view class="text-gray">解答</view>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showCardModal" data-target="modalCard">题卡</button>
			</view>
			<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
				<view class="cu-dialog" @tap.stop>
					
					<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}" >				
						<view class="cu-bar solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-red"></text>题卡
							</view>					
						</view>
						<view class="grid col-5 ">
							<view class="margin-tb-sm text-center" v-for="(question,index) in questionList" :key="index">
								<button class="cu-btn round" :class="[question.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(index)" >{{index+1}}</button>
							</view>
						</view>
					
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue";
	import unikModal from '@/components/unik-modal/unik-modal.vue';
	export default {
		data() {
			return {
				showNameAndTel:false,
				hiddeBtnAndTime:true,//隐藏时间和提交按钮
				activeDisabled:false,//单选、多选按钮不可编辑
				showAnswerBtn:false,//显示答案解析
				name:"",
				phoneNumber:"",
				totalNumber:0,
				modalTitle: '标题',//确认按钮标题
				currentType: 0, //当前题型
				totalQuestionNumber:0,//总题目数
				questionIndex: 0,//跳转索引
				autoRadioNext:true,//单选题，自动移下一题
				swiperHeight: '800px',//
				modalCard: null,//显示答题卡
				totalpoints:0,//当前分数
				rightQuestionNumber:0,//正确题目数量
				mistakeQuestionNumber:0,//错误题目数量
				questionList:[
					{title:"用来在网页中显示图形的标记为（ ）",type:1,optionList:[{id:"A",content:'<image src="文件名" ...>'},{id:"B",content:'<img  src="文件名"  ... >'},{id:"C",content:'<center src="文件名" ... >'},{id:"D",content:'<picture src="文件名" ... > '}],answer:"B",userAnswer:"",explain:"答错回炉重造"},
					{title:"要使单选框默认状态为被选中，下列正确的是",type:1,optionList:[{id:"A",content:'<input type="radio" selected/>蓝桥'},{id:"B",content:'<input type="radio" checked="checked"/>蓝桥'},{id:"C",content:'<input type="radio" />蓝桥'},{id:"D",content:'<input type="radio" enabled/>蓝桥'}],answer:"B",userAnswer:"",explain:'单选框、复选框默认勾选状态：checked=”checked”下拉列表默认：selected'},
					{title:"<img>标签中，alt属性的含义是",type:1,optionList:[{id:"A",content:'图像链接地址'},{id:"B",content:'图像无法显示时，替代显示的文本'},{id:"C",content:'设置显示在图像上的文字'},{id:"D",content:'设置图像是可选的'}],answer:"B",userAnswer:"",explain:'图片链接地址是：src=""'},
					{title:"在jquery中想要找到所有元素的同辈元素，下面哪一个是可以实现的？",type:1,optionList:[{id:"A",content:'eq(index)'},{id:"B",content:'find(expr)'},{id:"C",content:'siblings([expr])'},{id:"D",content:'next()'}],answer:"C",userAnswer:"",explain:"eq(index)获取第N个元素;find(expr)搜索所有与指定表达式匹配的元素;siblings([expr])取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合;next()取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。"},
					{title:"<title></title>标记在<head></head>标记之间，<title></title>标记之间的内容将显示到（）",type:1,optionList:[{id:"A",content:'浏览器的页面上部'},{id:"B",content:'浏览器的标题栏上'},{id:"C",content:'浏览器的状态栏中'},{id:"D",content:'浏览器的页面下部'}],answer:"B",userAnswer:"",explain:"头部<head></head>;"},
					
					{title:"function bt1(){var x=3;var y = 4;}var a = new bt1();alert(a.x+a.y);打印的结果是()",type:1,optionList:[{id:"A",content:'34'},{id:"B",content:'7'},{id:"C",content:'undefined'},{id:"D",content:'NaN'}],answer:"B",userAnswer:"",explain:""},
					{title:'HTML 代码:<div>DIV</div><span>SPAN</span><p>P</p>;jQuery 代码:$("*");请问该代码选中的元素有哪些？',type:1,optionList:[{id:"A",content:'[ <div>DIV</div>]'},{id:"B",content:'[<span>SPAN</span> ]'},{id:"C",content:'[<p>P</p>]'},{id:"D",content:'[<div>DIV</div>,<span>SPAN</span>,<p>P</p>]'}],answer:"D",userAnswer:"",explain:"* 为通配符，匹配所有元素"},
					{title:'下列元素中，（）不是input元素 ',type:1,optionList:[{id:"A",content:'下拉列表框'},{id:"B",content:'多行文本域'},{id:"C",content:'图像'},{id:"D",content:'复选框'}],answer:'B',userAnswer:'',explain:''},
					{title:'在HTML 中（ ）标记用于创建无序列表',type:1,optionList:[{id:"A",content:'<ol></ol>'},{id:"B",content:'<unorderlist></unorderlist>'},{id:"C",content:'<ul></ul>'},{id:"D",content:'<li></li>'}],answer:'A',userAnswer:'',explain:'<ul></ul>有序列表;<li></li>里面的元素'},
					{title:'以下关于jQuery的说法中错误的是（）。',type:1,optionList:[{id:"A",content:'jQuery是JavaScript的程序库之一，它是对JavaScript的封装'},{id:"B",content:'相对于JavaScript，jQuery语法更为简单，能大幅提高开发效率'},{id:"C",content:'相对于JavaScript，jQuery解决了大部分浏览器兼容性问题，减少了出错的概率'},{id:"D",content:'jQuery功能强大，能完全代替JavaScript'}],answer:'D',userAnswer:'',explain:''},
					
					{title:' WWW 是____的意思',type:1,optionList:[{id:"A",content:'网页	'},{id:"B",content:'万维网'},{id:"C",content:'浏览器'},{id:"D",content:'超文本传输协议'}],answer:'B',userAnswer:'',explain:'www: World Wide Web，即万维网。'},
					{title:'在HTML 中，使用外部样式表可以通过（）元素进行引入',type:1,optionList:[{id:"A",content:'REL'},{id:"B",content:'HREF'},{id:"C",content:'LINK'},{id:"D",content:'CSS'}],answer:'C',userAnswer:'',explain:''},
					{title:'获取dom元素的方式是',type:1,optionList:[{id:"A",content:'document.getElementById()'},{id:"B",content:'document.getElementByName()'},{id:"C",content:'document.getElementByTagName()'},{id:"D",content:'以上都不对'}],answer:'D',userAnswer:'',explain:'此题注意区分英文的单复数;document.getElementsByName(elementName);document.getElementsByTagName(tagName)'},
					{title:'如何显示这样一个边框：上边框 10 像素、下边框 5 像素、左边框 20 像素、右边框 1 像素？',type:1,optionList:[{id:"A",content:'border-width:10px 5px 20px 1px'},{id:"B",content:'border-width:10px 20px 5px 1px'},{id:"C",content:'border-width:5px 20px 10px 1px'},{id:"D",content:'border-width:10px 1px 5px 20px'}],answer:'D',userAnswer:'',explain:''},
					{title:'下列不属于css选择符的是 ',type:1,optionList:[{id:"A",content:'超文本标记选择符'},{id:"B",content:'类选择器'},{id:"C",content:'ID选择器'},{id:"D",content:'对象选择器'}],answer:'A',userAnswer:'',explain:''},
					
					{title:'关于CSS样式表的优先级',type:1,optionList:[{id:"A",content:'外部样式优先级最高'},{id:"B",content:'内部样式优先级最高'},{id:"C",content:'内联样式优先级最高'},{id:"D",content:'各种样式优先级一样'}],answer:'C',userAnswer:'',explain:''},
					{title:'如何弹出警告框，并显示 "Hello World"？',type:1,optionList:[{id:"A",content:'alertBox="Hello World"'},{id:"B",content:'msgBox("Hello World")'},{id:"C",content:'alert("Hello World")'},{id:"D",content:'alertBox("Hello World")'}],answer:'C',userAnswer:'',explain:''},
					{title:'下列那个属性为单元格向右打通的列数，用于合并单元格。（）',type:1,optionList:[{id:"A",content:'rowspan'},{id:"B",content:'colspan'},{id:"C",content:'height'},{id:"D",content:'width'}],answer:'B',userAnswer:'',explain:''},
					{title:'在HTML中，可以使用( )标记向网页中插入GIF动画文本。',type:1,optionList:[{id:"A",content:'<form>'},{id:"B",content:'<body>'},{id:"C",content:'<table>'},{id:"D",content:'<img>'}],answer:'D',userAnswer:'',explain:''},
					{title:'在页面中看不见的表单元素是哪些( )',type:1,optionList:[{id:"A",content:'<input type="password" />'},{id:"B",content:'<input type="radio" />'},{id:"C",content:'<input type="hidden" />'},{id:"D",content:'<input type="reset" />'}],answer:'C',userAnswer:'',explain:''},
					
					{title:"用来在网页中显示图形的标记为（ ）",type:1,optionList:[{id:"A",content:'<image src="文件名" ...>'},{id:"B",content:'<img  src="文件名"  ... >'},{id:"C",content:'<center src="文件名" ... >'},{id:"D",content:'<picture src="文件名" ... > '}],answer:"B",userAnswer:"",explain:"答错回炉重造"},
					{title:"要使单选框默认状态为被选中，下列正确的是",type:1,optionList:[{id:"A",content:'<input type="radio" selected/>蓝桥'},{id:"B",content:'<input type="radio" checked="checked"/>蓝桥'},{id:"C",content:'<input type="radio" />蓝桥'},{id:"D",content:'<input type="radio" enabled/>蓝桥'}],answer:"B",userAnswer:"",explain:'单选框、复选框默认勾选状态：checked=”checked”下拉列表默认：selected'},
					{title:"<img>标签中，alt属性的含义是",type:1,optionList:[{id:"A",content:'图像链接地址'},{id:"B",content:'图像无法显示时，替代显示的文本'},{id:"C",content:'设置显示在图像上的文字'},{id:"D",content:'设置图像是可选的'}],answer:"B",userAnswer:"",explain:'图片链接地址是：src=""'},
					{title:"在jquery中想要找到所有元素的同辈元素，下面哪一个是可以实现的？",type:1,optionList:[{id:"A",content:'eq(index)'},{id:"B",content:'find(expr)'},{id:"C",content:'siblings([expr])'},{id:"D",content:'next()'}],answer:"C",userAnswer:"",explain:"eq(index)获取第N个元素;find(expr)搜索所有与指定表达式匹配的元素;siblings([expr])取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合;next()取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。"},
					{title:"<title></title>标记在<head></head>标记之间，<title></title>标记之间的内容将显示到（）",type:1,optionList:[{id:"A",content:'浏览器的页面上部'},{id:"B",content:'浏览器的标题栏上'},{id:"C",content:'浏览器的状态栏中'},{id:"D",content:'浏览器的页面下部'}],answer:"B",userAnswer:"",explain:"头部<head></head>;"},
					
					{title:"function bt1(){var x=3;var y = 4;}var a = new bt1();alert(a.x+a.y);打印的结果是()",type:1,optionList:[{id:"A",content:'34'},{id:"B",content:'7'},{id:"C",content:'undefined'},{id:"D",content:'NaN'}],answer:"B",userAnswer:"",explain:""},
					{title:'HTML 代码:<div>DIV</div><span>SPAN</span><p>P</p>;jQuery 代码:$("*");请问该代码选中的元素有哪些？',type:1,optionList:[{id:"A",content:'[ <div>DIV</div>]'},{id:"B",content:'[<span>SPAN</span> ]'},{id:"C",content:'[<p>P</p>]'},{id:"D",content:'[<div>DIV</div>,<span>SPAN</span>,<p>P</p>]'}],answer:"D",userAnswer:"",explain:"* 为通配符，匹配所有元素"},
					{title:'下列元素中，（）不是input元素 ',type:1,optionList:[{id:"A",content:'下拉列表框'},{id:"B",content:'多行文本域'},{id:"C",content:'图像'},{id:"D",content:'复选框'}],answer:'B',userAnswer:'',explain:''},
					{title:'在HTML 中（ ）标记用于创建无序列表',type:1,optionList:[{id:"A",content:'<ol></ol>'},{id:"B",content:'<unorderlist></unorderlist>'},{id:"C",content:'<ul></ul>'},{id:"D",content:'<li></li>'}],answer:'A',userAnswer:'',explain:'<ul></ul>有序列表;<li></li>里面的元素'},
					{title:'以下关于jQuery的说法中错误的是（）。',type:1,optionList:[{id:"A",content:'jQuery是JavaScript的程序库之一，它是对JavaScript的封装'},{id:"B",content:'相对于JavaScript，jQuery语法更为简单，能大幅提高开发效率'},{id:"C",content:'相对于JavaScript，jQuery解决了大部分浏览器兼容性问题，减少了出错的概率'},{id:"D",content:'jQuery功能强大，能完全代替JavaScript'}],answer:'D',userAnswer:'',explain:''},
					
				],
			}
		},
		onReady() {
			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {                  
					tempHeight = res.windowHeight;
					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							_me.swiperHeight = tempHeight + 'px';
						}).exec();
			
					}).exec();
				}
			});

		},
		onLoad(e) {
			this.currentType = this.questionList[0].type;
			uni.hideLoading();
			for(var j = 0; j<this.questionList.length; j++){
				this.totalQuestionNumber = j;
			}
			//添加用户显示答案字段
			for (var i = 0; i < this.questionList.length; i++) {		
				this.$set(this.questionList[i],"showAnswer",false);				
			}
			if(e.name){
				this.name = e.name;
			}
			if(e.tel){
				this.phoneNumber = e.tel;
			}
		},
		methods: {
			//显示题卡
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target
			},
			//隐藏题卡
			hideCardModal: function(e) {
				this.modalCard = null
			},
			//滑动事件
			swiperChange: function(e) { 
				let index = e.target.current;
				if (index != undefined) {
					this.questionIndex = index;
					this.currentType = this.questionList[index].type;
				}
			},
			//单选选中
			radioboxChange : function(e) { 
				var items = this.questionList[this.questionIndex].optionList;
				var values = e.detail.value;//e.detail.value 用户的选择
				this.questionList[this.questionIndex].userAnswer = values;
				if(this.autoRadioNext && this.questionIndex < this.questionList.length - 1){
					this.questionIndex += 1;
				};
				
				var rightAnswers = this.questionList[this.questionIndex - 1].answer;
				//判断选项是否相等
				if(values != null){
					if (values === rightAnswers && this.questionIndex === this.questionIndex) {
						this.totalpoints = this.totalpoints + 2;
						this.rightQuestionNumber = this.rightQuestionNumber + 1;
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else if(values !== rightAnswers && this.questionIndex != this.questionIndex){
						this.mistakeQuestionNumber = this.mistakeQuestionNumber + 1;
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else{
						this.totalQuestionNumber = this.totalQuestionNumber;
					}
				}
				
			},
			//复选选中
			checkboxChange: function(e) { 
				var items = this.questionList[this.questionIndex].optionList;
				var values = e.detail.value;
				this.questionList[this.questionIndex].userAnswer = "";
				var lenI = items.length;
				var lenJ = values.length;
				for (var i = 0 ; i < lenI; ++i) {
					for (var j = 0 ; j < lenJ; ++j) {
						if (items[i].id == values[j]) {
							this.questionList[this.questionIndex].userAnswer += items[i].id;
							break;
						}
					}
				}
				var rightAnswer = this.questionList[this.questionIndex].answer;
				//判断选项是否和答案相等
				if(values != null){
					if(values.toString() === rightAnswer && this.questionIndex === this.questionIndex ){
						this.totalpoints = this.totalpoints + 2;
						this.rightQuestionNumber = this.rightQuestionNumber + 1;
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else if(values.toString() !== rightAnswer && this.questionIndex != this.questionIndex ){
						this.mistakeQuestionNumber = this.mistakeQuestionNumber + 1;
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else{
						this.totalQuestionNumber = this.totalQuestionNumber;
					}
				}
			},
			//上一题、下一题
			moveQuestion: function(e) { 
				if (e === -1 && this.questionIndex != 0) {
					this.questionIndex -= 1;
				}
				if (e === 1 && this.questionIndex < this.questionList.length - 1) {
					this.questionIndex += 1;
				}
			},
			//题卡指定
			appointedQuestion: function(e) { 
					this.modalCard = null;
					this.questionIndex = e;									
			},
			formSubmit:function(){
				
			},
			show () {
				this.$refs.unikModal.show();
			},
			//确认提交
			confirmModal () {
				const totalNumberOfQuestion = this.totalQuestionNumber;
				for(var j = 0; j<this.questionList.length; j++){
					this.totalNumber = j;
				}
				var accuracy = Math.round((this.rightQuestionNumber/(this.totalNumber+1)*100)*100)/100 ;
				this.showAnswerBtn = true;
				this.activeDisabled = true;
				this.hiddeBtnAndTime  = false;
				this.inputNameAndTel = false;
				this.showNameAndTel = true;
				uni.showModal({
					title:"答题情况",
					content:"共" + (this.totalNumber+1) + "题," + "正确率:" + accuracy + "%" + ",正确:" + this.rightQuestionNumber + "题," + "错误:" + this.mistakeQuestionNumber + "题",
					showCancel:false,
					confirmText:"确定"
				});
			},
			//取消
			cancelModal() {
				console.log("您点击了取消");
			},
			//显示解析
			showAnswerChange:function(e){
				if(this.questionList[this.questionIndex].showAnswer){
					this.questionList[this.questionIndex].showAnswer = false;
				}else{
					this.questionList[this.questionIndex].showAnswer = true;
				}
			},
			timeup:function(e){
				tis.confirmModal();
			}
		},
		components:{uniCountdown,unikModal}
	}
</script>

<style>
	@import "../../colorui/animation.css";
	page {
		background-color: #FFFFFF;
	}
	
	.cu-form-group {
		justify-content: flex-start
	}
	
	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}
	
	.cu-form-group+.cu-form-group {
		border-top: none;
	}
	
	.cu-bar-title {
		min-height: 50upx;
	}
	
	.cu-list.menu>.cu-item-error{justify-content: flex-start;}
	.bg-haveFinashed {
		background-color:#4CD964;
		color: #ffffff;
	}
</style>
