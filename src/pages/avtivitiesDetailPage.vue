<template>
  <div class="wrap">
    <div class="loading-wrap" v-if="loading">
      <div class="loade-animate">
        <img class="animate" src="asset/images/loading.gif"/>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="header-swiper-container">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in bannerArray">
              <img :src="item" alt/>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="introduce">
        <div class="introduce-dasheBorder">
        <div>活动详情</div>
        <div class="introduce_content">
         {{activeIntroduction}}
        </div>
          <!--四个修饰点-->
          <span class="dot left-top"></span>
          <span class="dot left-bottom"></span>
          <span class="dot right-top"></span>
          <span class="dot right-bottom"></span>
        </div>
      </div>
      <!-- <div class="MerContent">
        <div class="ContentTitle">{{qualificationObj.name}}</div>
        <div class="ContentInfo">
          <div class="ContentInfo_neirongTitle" v-if="type==1">酒店介绍：</div>
          <div class="ContentInfo_neirongTitle" v-if="type==2">景区介绍：</div>
          <div class="ContentInfo_neirong">
            <div>
              {{qualificationObj.introduce}}
              <span class="lookMoreIntrdouction">....</span>
            </div>
          </div>
        </div>
        <div class="ContentDay">
          <div>联系电话：</div>
          <div>{{qualificationObj.phone}}</div>
        </div>
      </div> -->
      <div class="GoodLists" id="GoodLists">
        <div class="GoodListsCenterScroll" scroll-y>
          <div class="GoodListsCenter" v-for="(item, index) in productList" :key="index">
            <div class="GoodImage">
              <img :src="'https://image.supconit.net' + '/' + item.cover.split(',')[0]" alt/>
            </div>
            <div class="GoodName" :title="item.name">
              <div v-for="(saleItem, index) in item.saleList" v-for-item="saleItem" :key="index">
                <span class="sale_logo" v-if="saleItem.type==0">
                  {{saleItem.ruleJson.discount}}
                  <br/>折
                </span>
              </div>
              {{item.name}}
              <div
                class="manjian"
                v-for="(saleItem, index) in item.saleList"
                v-for-item="saleItem"
                :key="index"
              >
                <div class="manjianInside" style="line-height:13px;" v-if="saleItem.type==1">满减</div>
              </div>
            </div>
            <!-- <div v-if="type == '2'">
              <div class="GoodKind" v-if="item.type == 1">成人票</div>
              <div class="GoodKind" v-if="item.type == 2">儿童票</div>
              <div class="GoodKind" v-if="item.type == 3">学生票</div>
              <div class="GoodKind" v-if="item.type == 4">家庭套票</div>
            </div>
            <div v-if="type == '1'">
              <div class="GoodKind" v-if="item.type == 1">单人标间</div>
              <div class="GoodKind" v-if="item.type == 2">大床房</div>
              <div class="GoodKind" v-if="item.type == 3">家庭套房</div>
              <div class="GoodKind" v-if="item.type == 4">总统套房</div>
            </div>
            <div class="GoodPrice">¥{{item.minPrice}}</div> -->
            <div class="TakeGood" @click="ReservePop(item)" >
              <div class="TakeGood_ding" >订</div>
              <div class="TakeGood_daodianfu" >在线付</div>
            </div>
          </div>
        </div>
      </div>


      <van-popup
        v-model="showPop"
        position="bottom"
        @close="onClose"
        style="z-index: 1001 !important"
      >
        <div class="wrapper">
          <div class="date-year-month">
            <img @click="lastMonthEvent" src="../assets/images/left.png"/>
            {{year}}年{{month}}月
            <img
              src="../assets/images/right.png"
              @click="nextMonthEvent"
            />
          </div>

          <div></div>
          <div>
            <div style="background:#F5F5F5;font-size: 0.42rem; ">
              <div class="layout-flex row" style="background-color: #F5F5F5;">
                <span
                  class="date-week"
                  style="width:14.28%;height:0.53rem"
                  v-for="(item, index) in weekStr"
                  :key="index"
                >
                  <span v-if="item !=='日' && item !=='六'">{{item}}</span>
                  <span v-if="item ==='日' || item ==='六'" class="week"  v-bind:style="{color: weekColor}" >{{item}}</span>
                </span>
              </div>
            </div>
            <div class="layout-flex row" style="flex-wrap: wrap;margin-top:0.42rem;">
              <div
                class="date-day"
                :class="item.day<=0?'bgwhite':item.class"
                @click="onPressDateEvent(item,index)"
                v-for="(item, index) in days"
                :key="index"
              >
                <div class="item-days">
                  <div>{{item.day>0?(item.daytext?item.daytext:item.day):''}}</div>
                  <div class="amount" v-if="item.day>0">{{item.amount}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="step">
            <div
              style="font-size:0.4rem;font-family:PingFang-SC-Regular;font-weight:bold;color:rgba(51,51,51,1);padding-left:0.28rem;line-height:1.26rem;"
            >购买份数</div>
            <div style="padding-right:0.28rem;margin-top:0.2rem;">
              <van-stepper v-model="chooseNumber" @change="onChange" />
            </div>
          </div> -->
        </div>
        <div class="CollectionAndReserve" v-if="!loading">
          <div class="goHistoryRoute" @click="goBack" v-bind:style="{color: weekColor}">
            <i class="iconfont icon-zuoyoujiantou"></i>
            返回
          </div>
          <!-- <div class="Collection" @click="CollectionOrNot">
            <span :class=' Collection ? "iconfont icon-hongxin":"iconfont icon-shoucang"'></span>
            <div style="display:inline-block">收藏</div>
          </div>-->
          <div class="Reserve">
            <button @click="SureBuy()" v-bind:style="{background: weekColor}">
              <a style="color: #fff;">{{showPop?'订购':'立即预订'}}</a>
            </button>
          </div>
        </div>
      </van-popup>
    </div>
    <!--返回按钮-->
    <button class="beback-btn"  v-bind:style="{background: weekColor}" @click="beback"><span>返回</span></button>
  </div>
</template>
<script>
  import {Toast} from "vant";
  import http from "../api/public";

  var DATE_YEAR = new Date().getFullYear();
  var DATE_MONTH = new Date().getMonth() + 1;
  var DATE_DAY = new Date().getDate();
  export default {
    data() {
      return {
        login: "", //登陆
        loading: false,
        bgImage: "",
        id: "",
        optionsId: "",
        type: "",
        Collection: "",
        show: false,
        productList: [],
        qualificationObj: {}, //价格列表
        pictureLength: 0,
        showPop: false,
        // dateAndPrice
        year: "",
        month: "",
        day: "",
        days: {},
        optionsId: "",
        id: "",
        ChooseGoodId: "",
        systemInfo: {},
        weekStr: ["日", "一", "二", "三", "四", "五", "六"],
        checkDate: [],
        PriceCalendarList: [],
        chooseNumber: "1", //购买份数
        amount: '',
        bannerArray: [],
        activeIntroduction: '',
        weekColor:'#E4A538'
      };
    },
    mounted() {
      // this.id = parent.window.qualificationId;
      this.optionsId = this.$route.query.id;
      this.type = 2;
      this.getInfo(this.optionsId);
      this.getActive();
      // this.getCurrentUserInfo();
    },
    methods: {

      getActive() {
        // this.$route.query.id
        http.get("/shop/activity/getById/" + this.$route.query.id, "").then(res => {
          let activeObj = res.obj;
          let bannerImgArray=[]
          activeObj.banner.split(',').forEach((item)=>{
            bannerImgArray.push('https://image.supconit.net/'+item)
          });
          this.bannerArray=bannerImgArray;
          this.activeIntroduction=activeObj.description
          console.log(res)
        })
        //
      },
      // 获取商品详情信息
      getInfo(id) {
        console.log(id, "id");
        let that = this;
        http.get("/search/aptitude/byActivityId/" + id, "").then(res => {
          console.log(res, "info");
          let qualificationObj = res.obj

          //资质商品列表 计算商品最小价格
          //资质最小价格
          let qualificationGoodsPrice = [];
          let productArray = qualificationObj;
          productArray.forEach(item => {
            let priceList = item.productDailyList;
            let dailPriceArray = [];
            priceList.forEach(priceDaliyItem => {
              dailPriceArray.push(priceDaliyItem.price);
            });
            let todayTimeStamp = new Date(
              new Date().setHours(0, 0, 0, 0)
            ).getTime();
            let todayPriceItem = priceList.filter(function (item, index) {
              return parseInt(item.dailyDate) == todayTimeStamp;
            });
            if (todayPriceItem.length > 0) {
              item["minPrice"] = todayPriceItem[0].price;
            }
            qualificationGoodsPrice.push(Math.min.apply(null, dailPriceArray));
          });
          if (qualificationGoodsPrice.length > 0) {
            qualificationObj["minPrice"] = Math.min.apply(
              null,
              qualificationGoodsPrice
            );
          }

          qualificationObj["productList"] = productArray;
          let currentTimeStamp = Date.parse(new Date());
          qualificationObj.productList.forEach(item => {
            if (item.saleList !== "") {
              let matchSalesArray = [];
              item.saleList.forEach(salesItem => {
                salesItem["ruleJson"] = JSON.parse(salesItem.ruleJson);
                if (
                  parseInt(salesItem.beginDate) <= currentTimeStamp &&
                  currentTimeStamp <= parseInt(salesItem.endDate)
                ) {
                  matchSalesArray.push(salesItem);
                }
                item.saleList = matchSalesArray;
              });
            }
          });
          that.productList = qualificationObj["productList"]
          that.loading = false
        });
      },
      getCurrentUserInfo() {
        console.log(1112312313);
        var that = this;
        http.get("/customer/info/getCurrentInfo", "").then(res => {
          console.log(res, "resssss");
          that.login = true;
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      SureBuy() {
        this.show = true;
        if (this.showPop) {
          let that = this;
          that.show = false;
          http.get("/customer/info/getCurrentInfo", "").then(res => {
            if (res.msg == "操作成功") {
              let a = {
                choooseValenceList: that.checkDate,
                chooseNumber: that.chooseNumber,
                goodId: that.ChooseGoodId
              };
              if (that.type == 1) {
                if (that.checkDate.length < 2) {
                  Toast.fail("请选择离店日期");
                  return;
                } else {
                  // parent.window.setChoose(a);
                  this.$store.commit("setChooseGoodJson", a);
                  this.$router.push({
                    path: "/fillOrder"
                  });
                }
              } else if (that.type == 2) {
                if (that.checkDate.length < 1) {
                  Toast.fail("请选择门票日期");
                  return;
                } else {
                  if (this.amount == '暂无') {
                    Toast.fail('请选择有价格的日期进行购买')
                  } else {
                    this.$store.commit("setChooseGoodJson", a);
                    this.$router.push({
                      path: "/fillOrder"
                    });
                  }
                  // parent.window.setChoose(a);

                }
              }
            } else {
              this.$router.push("/bindphone");
            }
          });
          // if (that.login) {
          //   let a = {
          //     choooseValenceList: that.checkDate,
          //     chooseNumber: that.chooseNumber,
          //     goodId: that.ChooseGoodId
          //   };
          //   if (that.type == 1) {
          //     if (that.checkDate.length < 2) {
          //       Toast.fail("请选择离店日期");
          //       return;
          //     } else {
          //       // parent.window.setChoose(a);
          //       this.$store.commit("setChooseGoodJson", a);
          //       this.$router.push({
          //         path: "/fillOrder"
          //       });
          //     }
          //   } else if (that.type == 2) {
          //     if (that.checkDate.length < 1) {
          //       Toast.fail("请选择门票日期");
          //       return;
          //     } else {
          //       // parent.window.setChoose(a);
          //       this.$store.commit("setChooseGoodJson", a);
          //       this.$router.push({
          //         path: "/fillOrder"
          //       });
          //     }
          //   }
          // } else {
          //   this.$router.push("/bindphone");
          // }
        }
      },
      ReservePop(item) {
        console.log(item, "ReservePop");
        this.showPop = true;
        this.PriceCalendarList = item.productDailyList;
        this.ChooseGoodId = item.id;
        // dateAndPriceMounted 原组件生命周期
        this.dateAndPriceMounted();
      },
      onClose() {
        this.show = false;
        setTimeout(
          function () {
            for (let i = 0; i < this.checkDate.length; i++) {
              this.days[this.checkDate[i].index].class = "";
            }
            this.morenactive(this.days);
          }.bind(this),
          500
        );
      },
      dateAndPriceMounted() {
        console.log("组件aaa加载！");
        let that = this;
        // 在组件实例进入页面节点树时执行
        var _this = this;
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        (that.year = year), (that.month = month);
        that.onedate();
      },
      // 不用每次装时间格式的方法
      onedate(year, month) {
        let that = this;
        that.optionsId = that.optionsId;
        that.id = that.productList[0].productId;
        let newDateList = [];
        for (var i = 0; i < that.PriceCalendarList.length; i++) {
          if (that.PriceCalendarList[i].dailyDate.length == 13) {
            that.PriceCalendarList[i].dailyDate = that.Conversiontime(
              parseInt(that.PriceCalendarList[i].dailyDate)
            );
            newDateList.push(that.PriceCalendarList[i].dailyDate);
          }
        }
        this.createDateListData(year, month);
        this.morenactive(this.days);
      },
      // 时间戳转时间
      Conversiontime(timestamp) {
        let date = new Date(timestamp);
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        let h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        let m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
        let s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      // 这里是一个自定义方法
      /**创建日历数据 */
      createDateListData(setYear, setMonth) {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let dateArr = []; //需要遍历的日历数组数据
        let arrLen = 0; //dateArr的数组长度
        let now = setYear ? new Date(setYear, setMonth) : new Date();
        let year = setYear || now.getFullYear();
        let nextYear = 0;
        let month = setMonth || now.getMonth();
        //没有+1方便后面计算当月总天数
        // let nextMonth = (month + 1) > 10 ? 1 : (month + 1);
        let nextMonth = month + 1;
        console.log("当前选中月nextMonth：" + nextMonth);
        //目标月1号对应的星期
        let startWeek = this.getWeek(year, nextMonth, 1); //new Date(year + ',' + (month + 1) + ',' + 1).getDay();
        console.log("目标月1号对应的星期startWeek:" + startWeek);
        //获取目标月有多少天
        let dayNums = this.getTotalDayByMonth(year, nextMonth); //new Date(year, nextMonth, 0).getDate();
        console.log("获取目标月有多少天dayNums:" + dayNums);
        let obj = {};
        let num = 0;
        // debugger
        if (month + 1 >= 12) {
          nextYear = year + 1;
          dayNums = new Date(nextYear, nextMonth, 0).getDate();
        } else {
          if (nextMonth >= 10) {
            nextMonth = nextMonth
          } else {
            nextMonth = "0" + nextMonth;
          }
        }
        for (var j = -startWeek + 1; j <= dayNums; j++) {
          var tempWeek = -1;
          if (j > 10 || j == 10) {
            tempWeek = this.getWeek(year, nextMonth, j);
            var monthDay = year + "-" + nextMonth + "-" + j + " 00:00:00";
            console.log(year + "年" + nextMonth + "月" + j + "日" + "星期" + tempWeek);
          } else {
            var monthDay = year + "-" + nextMonth + "-" + "0" + j + " 00:00:00";
            console.log(year + "-" + nextMonth + "-" + j, 'aaaaa')
            console.log(year + "年" + nextMonth + "月" + '0' + j + "日" + "星期" + tempWeek);
          }
          var clazz = "";
          if (tempWeek == 0 || tempWeek == 6) clazz = "week";

          if (j < DATE_DAY && year == DATE_YEAR && nextMonth == DATE_MONTH)
          //当天之前的日期不可用
            clazz = "unavailable " + clazz;
          if (nextMonth < DATE_MONTH && year == DATE_YEAR)
            clazz = "unavailable " + clazz;
          if (year < DATE_YEAR) clazz = "unavailable " + clazz;
          if (year + "-" + nextMonth + "-" + '0' + j == '2019-10-05') clazz = "special" + clazz;

          else clazz = "" + clazz;
          /**如果当前日期已经选中，则变色 */
          var date = year + "-" + nextMonth + "-" + j;
          var index = this.checkItemExist(this.checkDate, date);
          if (index != -1) {
            clazz = clazz + " active active";
          }
          dateArr.push({
            day: j,
            dailyDay: monthDay,
            class: clazz,
            amount: "暂无"
          });
        }
        for (var a = 0; a < dateArr.length; a++) {
          for (var b = 0; b < this.PriceCalendarList.length; b++) {
            if (dateArr[a].dailyDay == this.PriceCalendarList[b].dailyDate) {
              dateArr[a].amount = "￥" + this.PriceCalendarList[b].price;
            }
          }
        }
        this.days = dateArr;
      },
      //默认选择
      morenactive(dateArr) {
        let month = DATE_MONTH;
        let day = DATE_DAY;
        if (DATE_DAY < 10) {
          day = "0" + DATE_DAY;
        }
        if (DATE_MONTH < 10) {
          month = "0" + DATE_MONTH;
        } else {
          month = DATE_MONTH + 1;
        }
        if (this.type == 1) {
          let that = this;

          for (let i = 0; i < dateArr.length; i++) {
            console.log(
              DATE_YEAR.toString() + "-" + month + "-" + day + " 00:00:00"
            );
            console.log(dateArr[i].dailyDay);

            if (
              dateArr[i].dailyDay ==
              DATE_YEAR.toString() + "-" + month + "-" + day + " 00:00:00"
            ) {
              console.log(i, "iii");
              dateArr[i].class = " active active";
              dateArr[i + 1].class = " active";
              that.checkDate = [
                {
                  amount: dateArr[i].amount,
                  day: dateArr[i].dailyDay.substring(
                    0,
                    dateArr[i].dailyDay.length - 9
                  ),
                  index: i
                },
                {
                  amount: dateArr[i + 1].amount,
                  day: dateArr[i + 1].dailyDay.substring(
                    0,
                    dateArr[i].dailyDay.length - 9
                  ),
                  index: i + 1
                }
              ];

            }
          }
        } else if (this.type == 2) {
          let that = this;

          for (let i = 0; i < dateArr.length; i++) {
            // console.log(
            //   DATE_YEAR.toString() + "-" + month + "-" + day + " 00:00:00"
            // );
            // console.log(dateArr[i].dailyDay);

            if (
              dateArr[i].dailyDay ==
              DATE_YEAR.toString() + "-" + month + "-" + day + " 00:00:00"
            ) {
              dateArr[i].class = " active";
              that.checkDate = [
                {
                  amount: dateArr[i].amount,
                  day: dateArr[i].dailyDay.substring(
                    0,
                    dateArr[i].dailyDay.length - 9
                  ),
                  index: i
                }
              ];
              // alert(that.checkDate,'that.checkDate')
              that.amount = that.checkDate[0].amount
            }
          }
        }
      },
      /**
       * 上个月
       */
      lastMonthEvent() {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.month - 2 < 0 ? this.year - 1 : this.year;
        let month = this.month - 2 < 0 ? 11 : this.month - 2;
        (this.year = year), (this.month = month + 1);
        this.createDateListData(year, month);
      },
      /**
       * 下个月
       */
      nextMonthEvent() {
        //全部时间的月份都是按0~11基准，显示月份才+1
        let year = this.month > 11 ? this.year + 1 : this.year;
        let month = this.month > 11 ? 0 : this.month;
        (this.year = year), (this.month = month + 1);
        this.createDateListData(year, month);
        // this.createDateListData(year, month);
      },
      /*
       * 获取月的总天数
       */
      getTotalDayByMonth(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
      },
      /*
       * 获取月的第一天是星期几
       */
      getWeek(year, month, day) {
        var d = new Date(year, month - 1, day);
        return d.getDay();
      },
      /**
       * 点击日期事件
       */
      onPressDateEvent(item, i) {
        console.log(item, "item");
        let year = this.year;
        let month = this.month;
        let index = i;
        var {day, amount} = item;
        console.log("当前点击的日期：" + year + "-" + month + "-" + day);
        //当前选择的日期为同一个月并小于今天，或者点击了空白处（即day<0），不执行
        if (
          (day < DATE_DAY && month == DATE_MONTH) ||
          day <= 0 ||
          month < DATE_MONTH
        )
          return;
        this.renderPressStyle(year, month, day, amount, index);
      },

      renderPressStyle(year, month, day, amount, choseIndex) {
        var days = this.days;
        console.log(days, "days");
        //渲染点击样式
        for (var j = 0; j < days.length; j++) {
          var tempDay = days[j].day;
          if (tempDay == day) {
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            var date = year + "-" + month + "-" + day;
            console.log(date, "date");
            var obj = {
              day: date,
              amount: amount,
              index: choseIndex
            };
            var checkDateJson = this.checkDate;
            console.log(checkDateJson, "checkDateJson");
            var index = this.checkItemExist(checkDateJson, date);
            if (index == -1) {
              checkDateJson.push(obj);
              console.log("111111");
              console.log(this.type, "type");
              if (this.type == "2") {
                console.log("222222");
                //景区
                let NewCheckDateJson = checkDateJson.slice(-1);
                for (let i = 0; i < NewCheckDateJson.length; i++) {
                  days[NewCheckDateJson[i]["index"]].class =
                    days[NewCheckDateJson[i]["index"]].class + " active";
                  console.log(days, "class");
                  console.log(days[NewCheckDateJson[i]["index"]].class, "class");
                  if (checkDateJson.length >= 1) {
                    for (
                      let i = 0;
                      i < checkDateJson.length - NewCheckDateJson.length;
                      i++
                    ) {
                      days[checkDateJson[i]["index"]].class = days[
                        checkDateJson[i]["index"]
                        ].class.replace("active", "");
                      days[checkDateJson[i]["index"]].class = days[
                        checkDateJson[i]["index"]
                        ].class.trim();
                      checkDateJson.splice(i, 1);
                    }
                  }
                }
              } else if (this.type == "1") {
                //酒店
                let yearAndMonth = year + "-" + month;
                let NewCheckDateJson = checkDateJson.slice(-2);
                // console.log(NewCheckDateJson,'trim')
                for (let i = 0; i < NewCheckDateJson.length; i++) {
                  if (NewCheckDateJson[i].day.substring(0, 7) == yearAndMonth) {
                    days[NewCheckDateJson[i]["index"]].class =
                      days[NewCheckDateJson[i]["index"]].class + " active";

                    if (
                      days[NewCheckDateJson[i]["index"]].class.split(" ")
                        .length >= 3
                    ) {
                      days[NewCheckDateJson[i]["index"]].class = " active active";
                    }
                    if (checkDateJson.length > 2) {
                      for (
                        let i = 0;
                        i < checkDateJson.length - NewCheckDateJson.length;
                        i++
                      ) {
                        days[checkDateJson[i]["index"]].class = days[
                          checkDateJson[i]["index"]
                          ].class.replace(" active active", "");

                        days[checkDateJson[i]["index"]].class = days[
                          checkDateJson[i]["index"]
                          ].class.trim();

                        checkDateJson.splice(i, 1);
                      }
                    }
                  }
                }
              }
            } else {
              checkDateJson.splice(index, 1);
              if (days[j].class == " active active") {
                days[j].class = days[j].class.replace(" active active", " ");
                days[j].class = days[j].class.trim();
              } else {
                days[j].class = days[j].class.replace(" active", " ");
                days[j].class = days[j].class.trim();
              }
            }
            this.checkDate = checkDateJson;
            console.log(this.checkDate);
            this.amount = this.checkDate[0].amount
            break;
          }
        }
        this.days = days;
      },
      /**检查数组中是否存在该元素 */
      checkItemExist(arr, value) {
        for (var i = 0; i < arr.length; i++) {
          let b = value.split("-");
          if (b[2].length < 2) {
            b[2] = "0" + b[2];
          }
          let c = b.join("-");
          if (c === arr[i].day) {
            console.log(arr, "arr");
            console.log(value, "value");
            return i;
          }
        }
        return -1;
      },
      //购买份数
      onChange(value) {
        this.chooseNumber = value;
      },
      // 父组件每次关闭选项卡重新赋予年月
      reviewdate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        (this.year = year), (this.month = month + 1);
      },
      //子组件传给父组件所需要的值
      goFatherNeed() {
        console.log(1111111);
        let myEventDetail = {
          choooseValenceList: this.checkDate,
          goodId: this.id,
          chooseNumber: this.chooseNumber
        };
        this.triggerEvent("myevent", myEventDetail);
      },
      beback(){
        this.$router.go(-1)
      }
    }
  };
</script>
<style scoped>
  .wrap {

    width: 100% !important;
    height: 100% !important;
  }

  .header {
    width: 100%;
    height: 5.93rem;
  }

  .header-swiper-container {
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .van-swipe {
    width: 100%;
    height: 5.93rem;
    margin: 0;
  }

  .van-swipe__track {
    width: 100% !important;
    height: 100% !important;
  }

  .van-swipe-item {
    width: 100%;
    height: 100%;
  }

  .van-swipe-item img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.21rem;
    -moz-border-radius: 0.21rem;
    border-radius: 0.21rem;
  }

  .loading-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    background: #fff;
  }

  .loade-animate {
    width: 120px;
    height: 65px;
    position: absolute;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 66666;
  }

  .loade-animate .animate {
    width: 100%;
    height: 100%;
  }

  .container {
    width: 100%;
    height: auto !important;
    /* background: #f3f3f3; */
  }

  .MerPictures {
    width: 100%;
    height: 4.93rem;
    position: relative;
  }

  .MerPictures > img {
    width: 100%;
    height: 100%;
  }

  .PicturesNumber {
    width: 1.46rem;
    height: 0.53rem;
    border-radius: 0.26rem;
    color: #fff;
    font-size: 0.32rem;
    line-height: 0.53rem;
    text-align: center;
    position: absolute;
    right: 0.4rem;
    bottom: 0.61rem;
    background: rgba(0, 0, 0, 0.6);
  }

  .introduce {
    width: 8.7rem;
    height: 3.58rem;
    margin: 0 auto;
   background: #E4A538;
    background-repeat: no-repeat;
    position: relative;
    top:-0.6rem;
    border-radius:0.13rem;
    overflow: hidden;
  }

  .introduce > div:nth-child(1) {
    font-size: 0.4rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }

  .introduce_content {
    font-size: 0.32rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.52rem;
    text-indent: 1rem;
    text-align: justify;
    margin-top: .15rem;
    width: 100%;
    height: 2.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  /* .MerContent {
    width: calc(100% - 0.8rem);
    padding: 0.4rem;
    background-color: #fff;
    border-radius: 0.21rem;
    margin-top: -0.26rem;
    position: relative;
    border-bottom: 1px solid #f3f3f3;
  }
  .ContentTitle {
    font-size: 0.42rem;
    color: #333;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
  }
  .ContentInfo {
    display: flex;
    vertical-align: middle;
    margin-top: 0.32rem;
  }

  .ContentInfo .ContentInfo_neirongTitle {
    color: #303133;
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    display: inline-block;
  }

  .ContentInfo .ContentInfo_neirong {
    display: inline-block;
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
  }
  .ContentDay div:nth-child(1) {
    color: #303133;
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    display: inline-block;
  }

  .ContentDay div:nth-child(2) {
    display: inline-block;
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
  } */
  .GoodLists {
    width: 92%;
    /* max-height: 7.78rem; */
    height: auto;
    background-color: #fff;
    overflow-y: scroll;
    margin: 0 auto;
    margin-top: .5rem;
    box-shadow: 0px 4px 18px 0px rgba(205, 17, 109, 0.16);
    border-radius: 10px;
    -webkit-overflow-scrolling: touch;
  }

  .GoodListsCenterScroll {
    width: 90%;
    height: 100%;
    margin-left: 5%;
    /* border-top: 1px solid #f3f3f3; */
  }

  .GoodListsCenter {
    width: 100%;
    height: 1.94rem;
    position: relative;
    display: flex;
    border-bottom: 1px solid #f8f8f8;
    overflow: hidden;
  }

  .GoodImage {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0.17rem;
  }

  .GoodImage > img {
    width: 100%;
    height: 100%;
  }

  .GoodName {
    width: 3.5rem;
    font-size: 0.34rem;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 1.94rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    margin-left: 1rem;
  }

  .sale_logo {
    position: absolute;
    left: 0;
    top: 0;
    background: url(http://image.supconit.net/discount.png) center no-repeat;
    background-size: 100% 100%;
    width: 0.52rem;
    height: 0.77rem;
    font-size: 0.2rem;
    display: inline-block;
    color: #fff;
    text-align: center;
    line-height: 0.3rem;
  }

  .manjian {
    position: absolute;
    left: 0.37rem;
    bottom: 0.26rem;
    width: 1.09rem;
    height: 0.38rem;
    border: 1px solid #d83d45;
  }

  .manjianInside {
    width: 1.04rem;
    height: 0.33rem;
    margin: 1px auto;
    background-color: #d83d45;
    text-align: center;
    font-size: 0.25rem;
    color: #fff;
  }

  .GoodKind {
    font-size: 0.32rem;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 1.94rem;
    display: inline-block;
    margin-left: 2.6rem;
  }

  .GoodPrice {
    font-size: 0.41rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(251, 90, 79, 1);
    line-height: 1.94rem;
    display: inline-block;
    position: absolute;
    right: 3.5rem;
  }

  .TakeGood {
    width: 1.12rem;
    height: 1.12rem;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0.34rem;
    box-shadow: 0 0.02rem 0.053rem 0 rgba(0, 0, 0, 0.12);
    border-radius: 0.053rem;
  }

  .TakeGood_ding {
    width: 100%;
    height: 50%;
    background-color: #fb5a4f;
    color: #fff;
    font-size: 0.45rem;
    text-align: center;
    line-height: 0.61rem;
  }

  .TakeGood_daodianfu {
    width: 100%;
    height: 50%;
    color: #fb5a4f;
    background-color: #fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.61rem;
  }

  .CollectionAndReserve {
    width: 100%;
    height: 1.3rem;
    /* position: fixed;
    bottom: 0;
    left: 0; */
    display: flex;
    z-index: 1001;
    box-shadow: 0px -0.026rem 0.053rem 0px rgba(88, 88, 88, 0.15);
  }

  .goHistoryRoute {
    width: 50%;
    height: 1.3rem;
    float: left;
    background-color: #fff;
    color: #666;
    font-size: 0.37rem;
    text-align: center;
    line-height: 1.3rem;
    color: RGBA(205, 17, 109, 1);
    position: relative;
  }

  .iconfont.icon-hongxin {
    color: RGBA(205, 17, 109, 1);
  }

  .Collection span.iconfont {
    position: relative;
    top: 0.01rem;
  }

  .goHistoryRoute:after {
    content: "";
    width: 1px;
    height: 100%;
    background: rgba(88, 88, 88, 0.15);
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .iconfont.icon-zuoyoujiantou {
    position: relative;
    top: 0.02rem;
  }

  .Collection {
    color: RGBA(205, 17, 109, 1);
    width: 25%;
    height: 1.3rem;
    float: left;
    background-color: #fff;
    font-size: 0.37rem;
    text-align: center;
    line-height: 1.3rem;
  }

  .Collection span.iconfont {
    position: relative;
    top: 0.01rem;
  }

  .Reserve {
    width: 69%;
    height: 1.3rem;
    float: right;
    background-color: RGBA(205, 17, 109, 1);
  }

  .Reserve button {
    width: 100%;
    height: 100%;
    background-color: RGBA(205, 17, 109, 1);
    outline: none;
    border: none;
    text-align: center;
    line-height: 1.3rem;
    color: #fff;
    font-size: 0.42rem;
  }

  .date-year-month {
    text-align: center;
    font-size: 0.4rem;
    height: 1.42rem;
    line-height: 1.42rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date-year-month img {
    height: 0.71rem;
    width: 0.71rem;
    margin: 0 0.428rem;
  }

  .date-day {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*padding-top: 0.1rem;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 14.28%;
    height: 1.18rem;
    color: #333333;
  }

  .date-day.bgitem {
    background-color: #d8ecf9;
    display: inline-block;
  }

  .date-day.active {
    background: #E4A538;
    border-radius: 0.19rem;
    color: #fff;
    display: inline-block;
  }

  .date-day.unavailable {
    color: #aaa;
    display: inline-block;
  }

  .date-week {
    display: flex;
    /*padding: 4px;*/
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1.215rem;
    /*height: 1.18rem;*/
    /*margin: 0.026rem;*/
    font-size: 0.4rem;
  }

  .week {
    color: #E4A538;

  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .item-days {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.39rem;
    height: 100%;
  }

  .amount {
    font-size: 0.29rem;
  }

  .step {
    width: 100%;
    height: 1.28rem;
    display: flex;
    justify-content: space-between;
  }

  .van-popup--bottom {
    /* bottom: 1.3rem !important; */
    border-radius: 10px 10px 0 0;
  }

  /deep/ .van-overlay {
    z-index: 1000 !important;
  }

  .special {
    color: red;
    font-weight: 900;
    font-family: fantasy;
  }
  .introduce-dasheBorder{
    width:8.5rem;
    height:3.38rem;
    border:1px dashed rgba(243,243,243,1);
    border-radius:10px;
    margin: 0.1rem;
    padding: 0.25rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
  }
  .introduce-dasheBorder .dot{
    display: inline-block;
    width: 0.13rem;
    height: 0.13rem;
    position: absolute;
    background: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .introduce-dasheBorder .dot.left-top{
    top:0.2rem;
    left: 0.2rem;
  }
  .introduce-dasheBorder .dot.left-bottom{
    bottom:0.2rem;
    left: 0.2rem;
  }
  .introduce-dasheBorder .dot.right-bottom{
    bottom:0.2rem;
   right:0.2rem;
  }
  .introduce-dasheBorder .dot.right-top{
    top:0.2rem;
    right:0.2rem;
  }
  .beback-btn{
    width:3.2rem;
    height:0.906rem;
    color:#fff;
    font-size:0.373rem;
    border-radius:0.49rem;
    border:none;
    outline: none;
    display: block;
    margin: 2.5rem auto 0;
  }
</style>
