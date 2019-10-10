<template>
  <div class="wrap">
    <!--&lt;!&ndash;轮播图&ndash;&gt;-->
    <!--<gallery :imgUrls="bannerArray" ></gallery>-->
    <!--&lt;!&ndash;guide&ndash;&gt;-->
    <!--<guide :guideItemArray="guideItemArray"></guide>-->
    <!--<activitys :activityOptimization="activityOptimization"></activitys>-->
    <!--<recommended :hotHotel="hotHotel"></recommended>-->
    <div class v-for="(item,index) in configComponentArray" :key="index">
      <div :is="item.content" :config="item.config"></div>
    </div>
    <!--<div class="buyTickets">-->
      <!--<div class="TicketsTitle">-->
        <!--<div>热销门票</div>-->
        <!--&lt;!&ndash; <div>查看更多</div> &ndash;&gt;-->
      <!--</div>-->
      <!--<div v-for="(item, index) in tickets" :key="index">-->
        <!--<div class="TicketsKinds">-->
          <!--<div class="TicketsLeft">-->
            <!--{{item.ticketsKind}}-->
          <!--</div>-->
          <!--<div class="TicketsRight">-->
            <!--<div class="nowMoney">￥{{item.nowMoney}}</div>-->
            <!--<div :class="item.buy ?'buy':'notbuy'" @click="buyTicket(item)">购买</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import gallery from "@/components/homeTabs/gallery";
import guide from "@/components/homeTabs/guide";
import activitys from "@/components/homeTabs/activity";
import recommended from "@/components/homeTabs/recommended";
import http from "../api/public";
import {Toast} from 'vant';
import {getStore, removeStore,setStore} from '@/utils/storage'
export default {
  name: "hometab",
  data() {
    return {
      componentsArray: [
        { content: gallery, key: "gallery", prop: "imgUrls" },
        { content: guide, key: "guide", prop: "guideItemArray" },
        { content: activitys, key: "activitys", prop: "activityOptimization" },
        { content: recommended, key: "recommended", prop: "hotHotel" }
      ],
      imgUrls: [],
      guideItemArray: [],
      activityOptimization: [],
      hotHotel: [],
      configComponentArray: [],
      tickets: [
        {
          ticketsKind: "活动门票",
          time: "预定一小时后可用",
          nowMoney: "0",
          buy:true,
        },
        {
          ticketsKind: "园区门票",
          time: "预定一小时后可用",
          nowMoney: "价格待定",
          buy:false,
        },
        {
          ticketsKind: "园区通票",
          time: "预定一小时后可用",
          nowMoney: "价格待定",
          buy:false,
        },
        {
          ticketsKind: "户外公园通票",
          time: "预定一小时后可用",
          nowMoney: "价格待定",
          buy:false,
        },
        {
          ticketsKind: "年卡",
          time: "预定一小时后可用",
          nowMoney: "价格待定",
          buy:false,
        }
      ]
    };
  },
  components: {
    gallery,
    guide,
    activitys,
    recommended
  },
  filters: {},
  mounted() {
    console.log(this.$route.query.openId);
    if(this.$route.query.openId !==''){
      setStore('openId',this.$route.query.openId)
    }
    // Toast(getStore('openId'));
    this.getConfigArray().then(val => {
      // this.getBanner();
      // this.getGuide();
      // this.getActivityOptimization();
      // this.getHotHotel();
    });
  },
  methods: {
    getConfigArray() {
      http.get("/maintenance/component-config/list", "").then(res => {
        console.log(res);
        let a = res.obj[0].config;
        console.log(JSON.parse(a), "aaaaa ");
        let configList = res.obj;
        let needComponentArray = [];
        configList.forEach(item => {
          let matchedComponent = this.componentsArray.filter(
            (matchItem, index) => {
              return item.name == matchItem.key;
            }
          );
          matchedComponent[0].config = JSON.parse(item["config"]);
          needComponentArray.push(matchedComponent[0]);
          console.log(needComponentArray);
          this.configComponentArray = needComponentArray;
          return Promise.resolve(/* 这里是需要返回的数据*/);
        });
      });
      // let configList = [
      //   {
      //     name: "gallery",
      //     config: '["banner.png","banner.png"]'
      //   },
      //   {
      //     name: "guide",
      //     config:
      //       '[ {"div": "景区概况","img":"https://image.supconit.net/gaikuang.png","type":"hot","href":"https://tby.kidzzn.xyz/public/#/"},' +
      //       '{"div": "在线购票","img":"https://image.supconit.net/goupiao.png","type":"scenic","href":"https://www.supconit.net/wechat/dist/index.html#/classificationQueryResult?type=scenic"},' +
      //       '{"div": "导游导览","img": "https://image.supconit.net/daolan.png","type":"hotel","href":"https://dqtour.xuanyantech.com/"},' +
      //       '{"div": "酒店预订","img": "https://image.supconit.net/jiudian.png","type":"food","href":"https://www.supconit.net/wechat/dist/index.html#/classificationQueryResult?type=hotel"},' +
      //       '{"div": "找停车","img": "https://image.supconit.net/tingche.png","type":"travelSelf","href":"null"},' +
      //       '{"div": "游记攻略","img": "https://image.supconit.net/gonglue.png","type":"travelPlus","href":"https://tby.kidzzn.xyz/public/#/Travelnotes"},' +
      //       '{"div": "资讯动态","img": "https://image.supconit.net/zixun.png","type":"travelPlus","href":"null"},' +
      //       '{"div": "停车缴费","img": "https://image.supconit.net/jiaofei.png","type":"travelPlus","href":"null"},' +
      //       '{"div": "景交车查询","img": "https://image.supconit.net/gongche.png","type":"travelPlus","href":"null"},' +
      //       '{"div": "找厕所","img": "https://image.supconit.net/cesuo.png","type":"travelPlus","href":"null"}]'
      //   },
      //   {
      //     name: "recommended",
      //     config: '["1","2"]'
      //   }
      // ];
      // let needComponentArray = [];
      // configList.forEach(item => {
      //   let matchedComponent = this.componentsArray.filter(
      //     (matchItem, index) => {
      //       return item.name == matchItem.key;
      //     }
      //   );
      //   matchedComponent[0].config = JSON.parse(item.config);
      //   needComponentArray.push(matchedComponent[0]);
      // });
      // console.log(needComponentArray);
      // this.configComponentArray = needComponentArray;
      // return Promise.resolve(/* 这里是需要返回的数据*/);
    },

    /**
     * 全局搜索
     * */
    // goGobalSearch(params){
    //   console.log(params)
    //   this.$router.push({
    //     path:'/globalSearch',
    //     query:{
    //       keyWords:params.words,
    //       area:params.area
    //     }
    //   })
    // },
    //
    // /**
    //  * 路由跳转
    //  */
    // routerPush(data) {
    //   switch (data) {
    //     case 'hot':
    //       this.$router.push({
    //         path: '/avtivities',
    //       })
    //       break
    //     default:
    //       this.$router.push({
    //         path: '/classificationQueryResult',
    //         query:{
    //           type:data
    //         }
    //       })
    //   }
    //
    // },
    // /**
    //  * 查看资质详情
    //  */
    // setChooseQualification(data){
    //   debugger
    //   this.chooseQualificationObj=data;
    //   if(data.id){
    //     this.$router.push({
    //       path: '/qualificationDetails',
    //       query:{
    //         type:data.type,
    //         id:data.id,
    //         name:data.name
    //       }
    //     })
    //   }
    //
    // },
    // setChooseGood(data){
    //   debugger
    //   this.$router.push({
    //     path: '/goodDetails',
    //     query:{
    //       id:data.id,
    //       name:data.name
    //     }
    //   })
    // },
    // frame() {
    //   var frame = this.$refs.mainPage;
    //   frame.onload = function() {
    //     var u = navigator.userAgent;
    //     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //     if (isiOS) {
    //       var iframebody = frame.contentWindow.document.body;
    //       console.log(iframebody);
    //       iframebody.style.width = document.body.clientWidth + "px";
    //       // alert('iphone')
    //     }
    //   };
    // }
    /**
     * 获取轮播
     */
    getBanner() {
      http.get("/maintenance/banner/list").then(res => {
        var imgArray = res.obj;
        this.imgUrls = imgArray;
      });
    },
    /**
     * 获取guide
     */
    getGuide() {
      this.guideItemArray = [
        {
          div: "HOT",
          img: "https://image.supconit.net/recommend1.png",
          type: "hot"
        },
        {
          div: "景区",
          img: "https://image.supconit.net/recommend2.png",
          type: "scenic"
        },
        {
          div: "酒店",
          img: "https://image.supconit.net/recommend3.png",
          type: "hotel"
        },
        {
          div: "餐饮",
          img: "https://image.supconit.net/recommend4.png",
          type: "food"
        },
        {
          div: "自助游",
          img: "https://image.supconit.net/recommend5.png",
          type: "travelSelf"
        },
        {
          div: "旅游+",
          img: "https://image.supconit.net/recommend6.png",
          type: "travelPlus"
        }
      ];
    },
    getActivityOptimization() {
      let that = this;
      http.get("/shop/activity/page4C?size=4&&page=0", "").then(res => {
        console.log(res.obj.records);
        // this.activityOptimization = res.obj.records;
        let activititesArray = res.obj.records;
        let activityContactArray = [];
        activititesArray.forEach(item => {
          http
            .get("/search/aptitude/byActivityId/" + item.id)
            .then(responce => {
              console.log(responce);
              let ActivityItem = {};
              ActivityItem["name"] = item.name;
              ActivityItem["productList"] = responce.obj;
              if (responce.obj.length > 0) {
                responce.obj.forEach(item => {
                  let dailPriceArray = [];
                  let priceList = item.productDailyList;
                  let todayTimeStamp = new Date(
                    new Date().setHours(0, 0, 0, 0)
                  ).getTime();
                  console.log(todayTimeStamp, "今日时间戳");
                  let todayPriceItem = priceList.filter(function(item, index) {
                    return parseInt(item.dailyDate) == todayTimeStamp;
                  });
                  console.log(todayPriceItem, "今日价态");
                  if (todayPriceItem.length > 0) {
                    item["minPrice"] = todayPriceItem[0].price;
                  }
                });
              }
              activityContactArray.push(ActivityItem);
            });
        });
        that.activityOptimization = activityContactArray;
        console.log(that.activityOptimization);
      });
    },
    /**
     * 获取推荐酒店
     */
    getHotHotel() {
      let that = this;
      http.get("/search/aptitudeHotel?size=4&&page=0", "").then(res => {
        // console.log(res.obj)
        let HotdivArray = res.obj.content;
        //资质商品列表 计算 最小价格
        HotdivArray.forEach(item => {
          let itemProductArray = item.productList;
          // console.log(itemProductArray);
          let dailPriceArray = [];
          itemProductArray.forEach(goodItem => {
            let priceList = goodItem.productDailyList;
            priceList.forEach(priceDaliyItem => {
              dailPriceArray.push(priceDaliyItem.price);
            });
            item["minPrice"] = Math.min.apply(null, dailPriceArray);
          });
          item["cover"] = item.cover.split(",")[0];
        });
        that.hotHotel = HotdivArray;
        // console.log(this.hothotel)
      });
    },
    buyTicket(item){
      if(item.buy){
        this.$router.push('/goodDetails?id=1174575036284088322&name=活动门票')
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

iframe {
  position: absolute;
  width: 100%;
  height: 100%;
}

.buyTickets {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 0.26rem;
  padding-bottom: 1.4rem;
}
.TicketsTitle {
  width: 100%;
  height: 1.306rem;
  display: flex;
  justify-content: space-between;
  line-height: 1.306rem;
  background-color: #fff;
}
.TicketsTitle > div:nth-child(1) {
  font-size: 0.4rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-indent: 0.4rem;
}
.TicketsTitle > div:nth-child(2) {
  font-size: 0.293rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-right: 0.4rem;
}
.TicketsKinds {
  width: 100%;
  height: 1.706rem;
  border-top: 1px solid #f4f4f4;
  display: flex;
}
.TicketsLeft {
  width: 40%;
  font-size: 0.373rem;
  font-family: PingFang SC;
  font-weight: bold;
  text-align: center;
  line-height: 1.706rem;
}
.TicketsRight {
  width: 50%;
  position:relative;
}
.TicketsRight > div {
  display: inline-block;
}
.nowMoney{
  font-size:0.48rem;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(251,90,79,1);line-height: 1.706rem;
}
.beforeMoney{
  font-size:0.226rem;
  font-family:PingFang SC;
  font-weight:400;
  text-decoration:line-through;
  color:rgba(153,153,153,1);line-height: 1.706rem;
  position: relative;
  margin-left: 0.213rem;
}
.buy{
  width:1.226rem;
  height:0.613rem;
  background:rgba(251,90,79,1);
  border-radius:4px;
  position: absolute;
  top: 0.546rem;
  right: 0;
  line-height: 0.613rem;
  font-size:0.32rem;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
}
.notbuy{
  width:1.226rem;
  height:0.613rem;
  background:rgba(153, 153, 153, 1);
  border-radius:4px;
  position: absolute;
  top: 0.546rem;
  right: 0;
  line-height: 0.613rem;
  font-size:0.32rem;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
}
</style>
