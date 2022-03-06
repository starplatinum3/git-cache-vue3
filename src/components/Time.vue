<template>
    <!-- 注意： link 不能使用，因为它是内置的标签
       你要使用另外一个名称就行了，一般加上一个前缀
     -->
    <div>
        <div>
            <span>{{newDate}}</span>
        </div>

        <div>
            <span>{{dateFormat(newDate)}}</span>
        </div>

    </div>
</template>
<!--https://blog.csdn.net/CDZAllier/article/details/109368523-->
<script>
    import {reactive, toRefs} from 'vue'

    export default {
        name: 'starp-time',
        setup() {
            const state = reactive({
                newDate: new Date(),
            })

            return {
                ...toRefs(state)
            }
        },
        // data() {
        //     retrun
        //     {
        //         // 当前时间
        //         newDate: new Date()
        //     }
        // },
        // 挂载时间
        mounted() {
            let that = this
            this.timer = setInterval(function () {
                that.newDate = new Date().toLocaleString()
            })
        },
        // 销毁时清除计时器
        // beforeDestroy: function () {
        beforeUnmount: function () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },

        methods: {
            // 时间格式化
            dateFormat() {
                var date = new Date()
                var year = date.getFullYear()
                //
                //  在日期格式中，月份是从0开始的
                //   使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                //
                var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
                var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                let week = date.getDay() // 星期
                let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                // 拼接 时间格式处理
                return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + ' ' + weekArr[week]
            }
        }


    }
</script>

<style lang="scss" scoped>

</style>

