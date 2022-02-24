
const Util=
{
  getMsg(win){
    return  win.$message
  },
  methods: {


    // import { selectStyle,outStyle } from "@/util/util";
     selectStyle(item, lst, attrName, that) {
      // console.log("selectStyle");

      // var _this = this;
      // console.log("_this")
      // console.log(_this)
      // _this 是被选中的
      // 防止没有渲染出来吗
      // var lst = this.$attrs[lstName];
      that.$nextTick(function () {
        // console.log("this");
        // console.log(this);
        lst.forEach(function (eachItem) {
          // console.log("_this in");
          // console.log(_this);
          // this.$set(item,'active',false);
          // 这样会没有
          // this.$get 没有的嘛
          // vue 获得一个 item 的 属性
          //  var   getVal=    eachItem.hover ;
          // var   getVal= _this.$get(eachItem, "hover");
          //  console.log("getVal");
          //    console.log(getVal);

          that.$set(eachItem, attrName, false);

          // console.log("this in");
          // console.log(this);
        });

        // this 代表vue
        that.$set(item, attrName, true);
      });
      // 这个时候 还是全都是 false ,因为 nextTick
      // 那么怎么判断呢 如果全都是false 需要一个默认 true
      // console.log("this.items");
      // console.log(this.items);
    },

     outStyle(item, lst, attrName, that) {
      // console.log("lstName");
      // console.log(lstName);
      // console.log("outStyle");
      // this.$set(item, "hover", false);

      // 不能不失去样式  但是文章要不失去
      // var allFalse = true;
      // this.items.forEach(function(eachItem) {
      //   // _this.$set(eachItem, "hover", false);
      //   if (eachItem.hover === true) {
      //     allFalse = false;
      //   }
      // });
      // if (allFalse) {
      //   this.$set(item, "hover", true);
      // }

      // console.log("item");
      // console.log(item);
      // 这个怎么是true 了
      var cnt = 0;
      // 不能不失去样式  但是文章要不失去
      // var allFalse = true;
      // console.log("this.items");
      //    console.log(this.items);
      //  移开的时候 ,hover 没了嘛
      // 但是这里要set 但是取到的时候是false ,难道是不一样的取值方法
      // this.$set 的值 怎么取
      // 取不到 hover 值啊
      // console.log("this.$attrs");
      // console.log(this.$attrs);
      // 没东西的 确实
      // var lst = this.$attrs[lstName];
      for (let i = 0; i < lst.length; i++) {
        var eachItem = lst[i];
        //  var eachItem =    this.$attrs[lst];
        if (eachItem[attrName] === true) {
          cnt++;
          // allFalse = false;
        }
      }

      // this.items.forEach(function(eachItem) {
      //   // _this.$set(eachItem, "hover", false);
      //   if (eachItem.hover === true) {
      //     cnt++;
      //     // allFalse = false;
      //   }
      // });
      // 如果只有他一个 就不要消失

      // console.log("cnt");
      // console.log(cnt);
      if (cnt > 1) {
        // this.$set(item, attrName, false);
        that.$set(item, attrName, false);
      }
      // vue js 不能有类型吗

      // 之前一直再弄 items 但是我们维护的是 places 啊 ,我是傻逼
      // this.$nextTick(function() {
      //   // console.log("this");
      //   // console.log(this);
      //   console.log("this.items");
      //   console.log(this.items);
      //   this.items.forEach(function(eachItem) {
      //     // console.log("_this in");
      //     // console.log(_this);
      //     // this.$set(item,'active',false);
      //     // 这样会没有
      //     // this.$get 没有的嘛
      //     // vue 获得一个 item 的 属性
      //     //  var   getVal=    eachItem.hover ;
      //     // var   getVal= _this.$get(eachItem, "hover");
      //     //  console.log("getVal");
      //     //    console.log(getVal);
      //     // 注释
      //     // _this.$set(eachItem, "hover", false);
      //     // console.log("this in");
      //     // console.log(this);
      //   });

      //   // this 代表vue
      //   // 注释
      //   // this.$set(item, "hover", true);
      // });
    }


  },

}

export default  Util
