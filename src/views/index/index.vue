<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<view v-if="showNameAndTel" class="uni-flex uni-row">
					<view class="text" style="flex: 1;">姓名:{{ name }}</view>
					<view class="text" style="flex: 1;">手机号：{{ phoneNumber }}</view>
				</view>
			</view>
		</view>
		<form id="frm" @submit="formSubmit">
			<view id="top-box" class="cu-bar bg-white solid-bottom">
				<!--题型-->
				<view class="action text-black">
					<text v-if="currentType===1">单选题</text>
					<text v-else-if="currentType===2">多选题</text>
				</view>
				<!--倒计时-->
				<view id="time" v-if="hiddeBtnAndTime">
					<uni-countdown :show-day="false" border-color="#ffffff" :hour="hour" :minute="minute" :second="second" @timeup="timeup"></uni-countdown>
				</view>
				<!--提交按钮-->
				<view class="action" v-if="hiddeBtnAndTime">
					<button size="mini" form-type="submit" type="primary" @click="show()">提交</button>
					<unik-modal :class="[mask == true ? 'showMask':'']" ref="unikModal" :modalTitle="modalTitle" @confirmModal="confirmModal" @cancelModal="cancelModal">
						<view style='font-size: 14px;padding: 15px;'>
							还有 <text style="color: #f00;">{{ totalQuestionNumber + 1 }}</text> 题未做,
							是否确认提交?
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
						<radio-group class="block" @change="radioboxChange" v-if="question.type===1">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<radio :value="option.id" :disabled="activeDisabled"></radio>
								<view class="title text-black">{{option.id}}. {{option.content}}</view>
							</view>
						</radio-group>
						<!--多选-->
						<checkbox-group class="block" @change="checkboxChange" v-else-if="question.type===2">
							<view class="cu-form-group" v-for="(option,index) in question.optionList" :key="index">
								<checkbox :disabled="activeDisabled" :value="option.id" :class="question.userAnswer.indexOf(option.id) > -1?'checked':''"
								 :checked="question.userAnswer.indexOf(option.id) > -1?true:false"></checkbox>
								<view class="title text-black">
									<view>{{option.id}}.{{option.content}}</view>
								</view>
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
				<view class="text-gray">解析</view>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showCardModal" data-target="modalCard">题卡</button>
			</view>
			<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
				<view class="cu-dialog" @tap.stop>

					<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}">
						<view class="cu-bar solid-bottom">
							<view class="action">
								题卡
							</view>
						</view>
						<!-- 答题时 显示的题卡 -->
						<view class="grid col-5" v-if="activeShow">
							<view class="margin-tb-sm text-center" v-for="(question,index) in questionList" :key="index">
								<button class="cu-btn round" :class="[question.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(index)">{{index+1}}</button>
							</view>
						</view>
						<!-- 提交之后显示的题卡 -->
						<view class="grid col-5" v-else-if="confrimShow">
							<view class="margin-tb-sm text-center" v-for="(question,index) in questionList" :key="index">
								<button class="cu-btn round" :class="[question.userAnswer === question.answer ? 'bg-haveFinashed':'bg-red']"
								 @click="appointedQuestion(index)">{{index+1}}</button>
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
				mask:false,
				hour:0,
				minute:30,
				second:0,
				answerArr: [], //定义一个数组 装答案
				userAnswerArr: [], //选择的答案的数组
				activeShow: true,
				confrimShow: false,
				showNameAndTel: false,
				hiddeBtnAndTime: true, //隐藏时间和提交按钮
				activeDisabled: false, //单选、多选按钮不可编辑
				showAnswerBtn: false, //显示答案解析
				name: "",
				phoneNumber: "",
				totalNumber: 0,
				modalTitle: '', //确认按钮标题
				currentType: 0, //当前题型
				totalQuestionNumber: 0, //总题目数
				questionIndex: 0, //跳转索引
				autoRadioNext: true, //单选题，自动移下一题
				swiperHeight: '800px', //
				modalCard: null, //显示答题卡
				rightQuestionNumber: 0, //正确题目数量
				rightNumber:0,
				mistakeQuestionNumber: 0, //错误题目数量
				mistakeNumber:0,
				questionList: [{
						id: 1,
						title: "在以下数据类型中，不是Java基础数据类型的是( )",
						type: 1,
						optionList: [{
							id: "A",
							content: "int"
						}, {
							id: "B",
							content: "double"
						}, {
							id: "C",
							content: "char"
						}, {
							id: "D",
							content: "String"
						}],
						answer: "D",
						userAnswer: "",
						explain: "String类型是引用数据类型，不属于基本数据类型"
					},
					{
						id: 2,
						title: "Java所定义的版本中不包括( )",
						type: 1,
						optionList: [{
							id: "A",
							content: "J2EE"
						}, {
							id: "B",
							content: "J2ME"
						}, {
							id: "C",
							content: "J2SE"
						}, {
							id: "D",
							content: "J2HE"
						}],
						answer: "D",
						userAnswer: "",
						explain: "本题考察的是Java的发展简史，Java版本包括J2EE 、 J2ME 、 J2SE ，不存在J2HE"
					},
					{
						id: 3,
						title: "下列选项中不属于Java算术运算符的是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "/"
						}, {
							id: "B",
							content: "%"
						}, {
							id: "C",
							content: "*"
						}, {
							id: "D",
							content: "!="
						}],
						answer: "D",
						userAnswer: "",
						explain: "!= 是逻辑运算符"
					},
					{
						id: 4,
						title: "在Java中,( )方法可以比较两个对象的值是否相等,如两个对象值相等,则返回true。",
						type: 1,
						optionList: [{
							id: "A",
							content: "toString()"
						}, {
							id: "B",
							content: "equals()"
						}, {
							id: "C",
							content: "compare()"
						}, {
							id: "D",
							content: "以上所有选项都不正确"
						}],
						answer: "B",
						userAnswer: "",
						explain: "java.lang包中Object的equals方法将比较两个对象是否相等，如果相等则返回true"
					},
					{
						id: 5,
						title: "在Java中,java.util.Arrays类中用来排序的方法是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "sort()"
						}, {
							id: "B",
							content: "sorp()"
						}, {
							id: "C",
							content: "paixu()"
						}, {
							id: "D",
							content: "list()"
						}],
						answer: "A",
						userAnswer: "",
						explain: "Arrays是Java提供的一个类，而sort()是该类的一个方法，用于完成对数组的排序（升序）。因此A是正确选项"
					},

					{
						id: 6,
						title: "在Java中，下列标识符用于定义变量名，合法的是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "class"
						}, {
							id: "B",
							content: "$Usdollars"
						}, {
							id: "C",
							content: "1234"
						}, {
							id: "D",
							content: "car.taxi"
						}],
						answer: "B",
						userAnswer: "",
						explain: "Java标识符以字母，数字，下划线，$符号组成，不能以数字开头，不能是关键字。class是java关键字。"
					},
					{
						id: 7,
						title: "在JAVA中，以下创建变量错误的是()。",
						type: 1,
						optionList: [{
							id: "A",
							content: 'String str="";'
						}, {
							id: "B",
							content: "String str=new String();"
						}, {
							id: "C",
							content: "StringBuffer sb=new StringBuffer();"
						}, {
							id: "D",
							content: "Integer i=new Integer();"
						}],
						answer: "D",
						userAnswer: "",
						explain: "Integer i = new Integer(&quot;1234&quot;); 也就是说必须是有参的"
					},
					{
						id: 8,
						title: "在Java中，关于开发程序的步骤，说法错误的是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "第一步：编写源程序"
						}, {
							id: "B",
							content: "第二步：编译"
						}, {
							id: "C",
							content: "第三步：运行"
						}, {
							id: "D",
							content: "第四步：反编译"
						}],
						answer: "D",
						userAnswer: "",
						explain: " 反编译是将编译好了的.class文件反编译为可以查看的代码，并非开发程序的步骤"
					},
					{
						id: 9,
						title: "在Java中，下列变量命名规范的是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "Student%1"
						}, {
							id: "B",
							content: "1Stduent_avg"
						}, {
							id: "C",
							content: "_$Hello"
						}, {
							id: "D",
							content: "int"
						}],
						answer: "C",
						userAnswer: "",
						explain: "变量名首字母必须为字母(a-z A-Z)，下划线(_)，或者美元符号($)开始，变量名只能是字母(a-z A-Z)，数字(0-9)，下划线(_)的组合，并且之间不能包含空格，数字不能放在变量名首位"
					},
					{
						id: 10,
						title: "在Java中，需要向控制台打印输出“Welcome!”并自动换行，可以实现此功能的语句是（）。",
						type: 2,
						optionList: [{
							id: "A",
							content: 'System.print("Welcome!\\n");'
						}, {
							id: "B",
							content: 'System.out.print("Welcome!\\n");'
						}, {
							id: "C",
							content: 'System.out.println("Welcome!");'
						}, {
							id: "D",
							content: 'System.println("Welcome!");'
						}],
						answer: "B,C",
						userAnswer: "",
						explain: "在控制台输出打印是System.out.println();println 自带换行效果;\n也有换行的效果"
					},

					{
						id: 11,
						title: "如何把Person类中的name属性封装起来，则name属性应定义为()。",
						type: 1,
						optionList: [{
							id: "A",
							content: "public"
						}, {
							id: "B",
							content: "final"
						}, {
							id: "C",
							content: "static"
						}, {
							id: "D",
							content: "private"
						}],
						answer: "D",
						userAnswer: "",
						explain: "面向对象三个特性是封装、继承、多态，其中，封装的一个体现就是讲属性私有，方法公开，将属性私有的方式，就是使其使用private修饰"
					},
					{
						id: 12,
						title: "在Java类中，以下（ ）是定义公有的int类型常量MIN。",
						type: 1,
						optionList: [{
							id: "A",
							content: "public int MIN = 0;"
						}, {
							id: "B",
							content: "public static int MIN = 0;"
						}, {
							id: "C",
							content: "public final int MIN = 0;"
						}, {
							id: "D",
							content: "static final int MIN = 0;"
						}],
						answer: "C",
						userAnswer: "",
						explain: "本题考察final关键字定义常量，公有的常量应该为public final修饰，常量名通常全部大写，所以C正确"
					},
					{
						id: 13,
						title: "下列（  ）不是Java中面向对象程序设计方法的特点。",
						type: 1,
						optionList: [{
							id: "A",
							content: "抽象"
						}, {
							id: "B",
							content: "继承"
						}, {
							id: "C",
							content: "多态"
						}, {
							id: "D",
							content: "结构化"
						}],
						answer: "D",
						userAnswer: "",
						explain: "抽象相当于特殊类 ，抽象类只能被继承，抽象方法只能被重写，都是为了面向对象设计出来的机构化跟面向对象没有必然联系"
					},
					{
						id: 14,
						title: "在Java中下列关于方法的重载说法正确的是（）",
						type: 1,
						optionList: [{
							id: "A",
							content: "Overriding 表示方法的重载"
						}, {
							id: "B",
							content: "方法重载中方法名必须相同，参数类型和个数也必须相同"
						}, {
							id: "C",
							content: "方法重载提高了代码的灵活性和重用性"
						}, {
							id: "D",
							content: "可以用方法的返回类型来决定方法的重载"
						}],
						answer: "C",
						userAnswer: "",
						explain: "，a Overriding表示方法的重写，而不是重载，b 方法重载参数类型或者个数必须不同， 所以选c 提高了方法的灵活性和重用性 正确，d 不能用方法的返回类型来决定方法的重载"
					},
					{
						id: 15,
						title: "以下（ ）不是Java所支持的数据类型。",
						type: 1,
						optionList: [{
							id: "A",
							content: "boolean"
						}, {
							id: "B",
							content: "int"
						}, {
							id: "C",
							content: "float"
						}, {
							id: "D",
							content: "bool"
						}],
						answer: "D",
						userAnswer: "",
						explain: "bool为C# 语言中的布尔类型"
					},

					{
						id: 16,
						title: "属于java的访问控制符的是（）。",
						type: 2,
						optionList: [{
							id: "A",
							content: "public"
						}, {
							id: "B",
							content: "protected"
						}, {
							id: "C",
							content: "private"
						}, {
							id: "D",
							content: "static"
						}],
						answer: "A,B,C",
						userAnswer: "",
						explain: "static是静态的（修饰符）"
					},
					{
						id: 17,
						title: "下列关于Java中Object类说法正确的是（）。",
						type: 2,
						optionList: [{
							id: "A",
							content: "Object类的构造方法可以重写"
						}, {
							id: "B",
							content: "Object类有一个默认构造方法pubilc Object()在构造子类实例时，都会先调用这个默认构造方法"
						}, {
							id: "C",
							content: "可以使用类型为Object的变量指向任意类型的对象"
						}, {
							id: "D",
							content: "Object类的变量只能用作各种值的通用持有者"
						}],
						answer: "B,C,D",
						userAnswer: "",
						explain: "了解Object类"
					},
					{
						id: 18,
						title: "下面哪些是Thread类的方法（）",
						type: 2,
						optionList: [{
							id: "A",
							content: "start() "
						}, {
							id: "B",
							content: "run() "
						}, {
							id: "C",
							content: "exit()"
						}, {
							id: "D",
							content: "getPriority()"
						}],
						answer: "A,B,D",
						userAnswer: "",
						explain: "看Java API docs吧：http://tool.oschina.net/apidocs/apidoc?api=jdk-zh，exit()是System类的方法，如System.exit(0)。"
					},
					{
						id: 19,
						title: "下列属于关系型数据库的是（）",
						type: 2,
						optionList: [{
							id: "A",
							content: "Oracle"
						}, {
							id: "B",
							content: "MySql"
						}, {
							id: "C",
							content: " IMS"
						}, {
							id: "D",
							content: "MongoDB"
						}],
						answer: "A,B",
						userAnswer: "",
						explain: "IMS（Information Management System ）数据库是IBM公司开发的两种数据库类型之一; 非关系型数据库有MongoDB、memcachedb、Redis等。"
					},
					{
						id: 20,
						title: "0.6332的数据类型是（）",
						type: 1,
						optionList: [{
							id: "A",
							content: "float"
						}, {
							id: "B",
							content: "double"
						}, {
							id: "C",
							content: "Float"
						}, {
							id: "D",
							content: "Double"
						}],
						answer: "B",
						userAnswer: "",
						explain: "默认为double型，如果为float型需要加上f显示说明，即0.6332f"
					},
					{
						id: 21,
						title: "Java接口的修饰符可以为（）",
						type: 2,
						optionList: [{
							id: "A",
							content: " private"
						}, {
							id: "B",
							content: "protected"
						}, {
							id: "C",
							content: "final"
						}, {
							id: "D",
							content: "abstract"
						}],
						answer: "C,D",
						userAnswer: "",
						explain: "接口用于描述系统对外提供的所有服务,因此接口中的成员常量和方法都必须是公开(public)类型的,确保外部使用者能访问它们；（2）接口仅仅描述系统能做什么,但不指明如何去做,所以接口中的方法都是抽象(abstract)方法；"
					},
					{
						id: 22,
						title: 'System.out.println("5" + 2);的输出结果应该是（）。',
						type: 1,
						optionList: [{
							id: "A",
							content: "52"
						}, {
							id: "B",
							content: "7"
						}, {
							id: "C",
							content: "2"
						}, {
							id: "D",
							content: "5"
						}],
						answer: "A",
						userAnswer: "",
						explain: "Java会自动将2转换为字符串。"
					},
					{
						id: 23,
						title: "关于 JAVA 堆,下面说法错误的是( )",
						type: 1,
						optionList: [{
							id: "A",
							content: "所有类的实例和数组都是在堆上分配内存的"
						}, {
							id: "B",
							content: "对象所占的堆内存是由自动内存管理系统回收"
						}, {
							id: "C",
							content: "堆内存由存活和死亡的对象，空闲碎片区组成"
						}, {
							id: "D",
							content: "数组是分配在栈中的"
						}],
						answer: "D",
						userAnswer: "",
						explain: "首先数组是分配在堆中的，故D的说法不正确。"
					},
					{
						id: 24,
						title: "下列说法正确的是：",
						type: 1,
						optionList: [{
							id: "A",
							content: "一个文件里可以同时存在两个public修饰的类"
						}, {
							id: "B",
							content: "构造函数可以被重写（override）"
						}, {
							id: "C",
							content: "子类不能访问父类非public和protected修饰的属性"
						}, {
							id: "D",
							content: "final修饰的类可以被继承"
						}],
						answer: "C",
						userAnswer: "",
						explain: "一个Java源文件中最多只能有一个public类，当有一个public类时，源文件名必须与之一致，否则无法编译，如果源文件中没有一个public类，则文件名与类中没有一致性要求。至于main()不是必须要放在public类中才能运行程序"
					},
					{
						id: 25,
						title: "以下for循环的执行次数是：____ for(int x=0,y=0;(y!=0)&&(x<4);x++)",
						type: 1,
						optionList: [{
							id: "A",
							content: "无限次"
						}, {
							id: "B",
							content: "执行4次"
						}, {
							id: "C",
							content: "执行3次"
						}, {
							id: "D",
							content: "一次也不执行"
						}],
						answer: "D",
						userAnswer: "",
						explain: "y初始值为0，在整个for循环中，y的值不变，故判断语句中的(y!=0)不成立，故一次也不执行。"
					},

					{
						id: 26,
						title: "哪个（些）是java关键字?",
						type: 2,
						optionList: [{
							id: "A",
							content: "run"
						}, {
							id: "B",
							content: "default"
						}, {
							id: "C",
							content: "implement"
						}, {
							id: "D",
							content: "import"
						}],
						answer: "B,C,D",
						userAnswer: "",
						explain: "参考Java关键字列表"
					},
					{
						id: 27,
						title: "下面的哪一个不属于MVC模式中的对象",
						type: 1,
						optionList: [{
							id: "A",
							content: "Model"
						}, {
							id: "B",
							content: "View"
						}, {
							id: "C",
							content: "Collection"
						}, {
							id: "D",
							content: "Controller"
						}],
						answer: "C",
						userAnswer: "",
						explain: "MVC : Model - View - Controller"
					},
					{
						id: 28,
						title: "下列说法正确的是()",
						type: 1,
						optionList: [{
							id: "A",
							content: "JAVA程序的main方法必须写在类里面"
						}, {
							id: "B",
							content: "JAVA程序中可以有多个main方法"
						}, {
							id: "C",
							content: "JAVA程序中类名必须与文件名一样"
						}, {
							id: "D",
							content: "JAVA程序的main方法中如果只有一条语句，可以不用写{}"
						}],
						answer: "A",
						userAnswer: "",
						explain: ""
					},
					{
						id: 29,
						title: "在Java中，下列标识符用于定义变量名，合法的是( )。",
						type: 1,
						optionList: [{
							id: "A",
							content: "class"
						}, {
							id: "B",
							content: "$Usdollars"
						}, {
							id: "C",
							content: "1234"
						}, {
							id: "D",
							content: "car.taxi"
						}],
						answer: "B",
						userAnswer: "",
						explain: "Java标识符以字母，数字，下划线，$符号组成，不能以数字开头，不能是关键字。class是java关键字。"
					},
					{
						id: 30,
						title: "在JAVA中，以下创建变量错误的是()。",
						type: 1,
						optionList: [{
							id: "A",
							content: 'String str="";'
						}, {
							id: "B",
							content: "String str=new String();"
						}, {
							id: "C",
							content: "StringBuffer sb=new StringBuffer();"
						}, {
							id: "D",
							content: "Integer i=new Integer();"
						}],
						answer: "D",
						userAnswer: "",
						explain: "Integer i = new Integer(&quot;1234&quot;); 也就是说必须是有参的"
					},

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
			for (var j = 0; j < this.questionList.length; j++) {
				this.totalQuestionNumber = j;
			}
			for (var j = 0; j < this.questionList.length; j++) {
				this.totalNumber = j;
			}
			//添加用户显示答案字段
			for (var i = 0; i < this.questionList.length; i++) {
				this.$set(this.questionList[i], "showAnswer", false);
			}
			for (var i = 0; i < this.questionList.length; i++) {
				this.answerArr.push({id:this.questionList[i].id,answer:this.questionList[i].answer});
			}
			const name = uni.getStorageSync('name');
			const tel = uni.getStorageSync('tel');
			if (name) {
				this.name = name;
			}
			if (tel) {
				this.phoneNumber = tel;
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
			radioboxChange: function(e) {
				var items = this.questionList[this.questionIndex].optionList;
				var values = e.detail.value; //e.detail.value 用户的选择
				this.questionList[this.questionIndex].userAnswer = values;
				var flag = true;
				for (var i = 0; i< this.userAnswerArr.length; ++i ) {
					if (this.userAnswerArr[i].id == this.questionList[this.questionIndex].id) {
						this.userAnswerArr[i].value = values;
						flag = false;
						break;
					}
				}
				if (flag) {
					this.userAnswerArr.push({
						id: this.questionList[this.questionIndex].id,
						value: values
					});
				}
				if (this.autoRadioNext && this.questionIndex < this.questionList.length - 1) {
					this.questionIndex += 1;
				};
			},
			//复选选中
			checkboxChange: function(e) {
				var items = this.questionList[this.questionIndex].optionList;
				var values = e.detail.value;
				this.questionList[this.questionIndex].userAnswer = "";
				var lenI = items.length;
				var lenJ = values.length;
				console.log(items)
				console.log(values)
				var flag = true;
				for (var i = 0; i < this.userAnswerArr.length; ++i) {
					if (this.userAnswerArr[i].id == this.questionList[this.questionIndex].id) {
						this.userAnswerArr[i].value = values.sort().join(',');
						flag = false;
						break;
					}
				}
				if(flag) {
					this.userAnswerArr.push({
						id: this.questionList[this.questionIndex].id,
						value: values.sort().join(',')
					});
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
			// 提交按钮
			formSubmit: function() {
				this.mask = !this.mask;
				for (var i = 0 ; i < this.answerArr.length ; i++) {
					for (var j = 0 ; j < this.userAnswerArr.length ;j++) {
						var answerStr = this.answerArr[i].answer.split(',').sort().toString();
						var userAnswerStr = this.userAnswerArr[j].value;
						if(this.answerArr[i].id === this.userAnswerArr[j].id && answerStr === userAnswerStr) {
							this.rightQuestionNumber += 1;
							this.totalQuestionNumber -= 1;
						}else if (this.answerArr[i].id === this.userAnswerArr[j].id && answerStr != userAnswerStr) {
							this.mistakeQuestionNumber += 1;
							this.totalQuestionNumber -= 1;
						}
					}
				}
			},
			show: function() {
				this.$refs.unikModal.show();
			},
			//确认提交
			confirmModal:function() {
				//var userAnswerMap = JSON.stringify(this.userAnswerMap);
				uni.setStorageSync("userAnswerArr",this.userAnswerArr);
				uni.redirectTo({
					url : '../showAnswer/showAnswer',//?userAnswerMap=' + userAnswerMap,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				this.rightNumber = this.rightQuestionNumber;
				this.mistakeNumber = this.mistakeQuestionNumber;
				var accuracy = Math.round((this.rightNumber / (this.totalNumber + 1) * 100) * 100) / 100;
				//this.showAnswerBtn = true;
				//this.activeDisabled = true;
				//this.hiddeBtnAndTime = false;
				//this.showNameAndTel = true;
				//this.activeShow = false;
				//this.confrimShow = true;
				uni.showModal({
					title: "答题情况",
					content: "共" + (this.totalNumber + 1) + "题," + "正确率:" + accuracy + "%" + ",正确:" + this.rightNumber +
						"题," + "错误:" + this.mistakeNumber + "题",
					showCancel: false,
					confirmText: "确定",
				});
			},
			//取消
			cancelModal() {
				this.mask = !this.mask;
				this.rightQuestionNumber = this.rightNumber;
				this.mistakeQuestionNumber = this.mistakeNumber;
				this.totalQuestionNumber = this.totalNumber;
			},
			//显示解析
			showAnswerChange: function(e) {
				if (this.questionList[this.questionIndex].showAnswer) {
					this.questionList[this.questionIndex].showAnswer = false;
				} else {
					this.questionList[this.questionIndex].showAnswer = true;
				}
			},
			//倒计时结束之后自动提交
			timeup: function() {
				this.confirmModal();
			}
		},
		components: {
			uniCountdown,
			unikModal
		}
	}
</script>

<style>
	@import "../../colorui/animation.css";

	page {
		background-color: #FFFFFF;
	}

	.cu-form-group {
		justify-content: flex-start;
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

	.cu-list.menu>.cu-item-error {
		justify-content: flex-start;
	}

	.bg-haveFinashed {
		background-color: #4CD964;
		color: #ffffff;
	}

	.uni-padding-wrap {
		width: 690upx;
		padding: 0 30upx;
	}

	.uni-common-mt {
		margin-top: 30upx;
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
		/* background-color: #ebebeb; */
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: #777;
		font-size: 26upx;
	}
	
	.showMask {  
	  position: fixed;  
	  top:0;  
	  left:0;  
	  z-index:999;  
	  width:100%;  
	  height:100vh;  
	  background:rgba(0,0,0,0.4);
	}  
</style>
