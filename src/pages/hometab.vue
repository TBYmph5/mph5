<template>
  <div class="wrap">
    <!--轮播图-->
    <gallery :imgUrls="bannerArray" ></gallery>
    <!--guide-->
    <guide :guideItemArray="guideItemArray"></guide>
    <activitys :activityOptimization="activityOptimization"></activitys>
    <recommended :hotHotel="hotHotel"></recommended>
  </div>
</template>
<script>
  import gallery from '@/components/homeTabs/gallery'
  import guide from '@/components/homeTabs/guide'
  import activitys from '@/components/homeTabs/activity'
  import recommended from '@/components/homeTabs/recommended'
  import http from '../api/public'

  export default {
    name: "hometab",
    data() {
      return {
        bannerArray: [],
        guideItemArray: [],
        activityOptimization: [],
        hotHotel: [],

      }

    },
    components: {
      gallery, guide, activitys, recommended
    },
    filters: {},
    mounted() {
      this.getBanner();
      this.getGuide();
      this.getActivityOptimization();
      this.getHotHotel();
      //     console.log(this.$refs['mainPage'])
      //     this.frame();
      // //    挂载路由方法到window
      //   // 将h5RenderData方法绑定到window下面，提供给外部调用
      //   /**
      //    * 挂载gobalSearch
      //    * */
      //   window['gobalsearch']= data =>{
      //     this.goGobalSearch(data);
      //   }
      //   window['routerGo'] = data => {
      //     this.routerPush(data);
      //   }
      //   /**
      //    * 挂载点击获取详情的方法
      //    */
      //   window['setChooseQualificationObj']=data=>{
      //     this.setChooseQualification(data)
      //   },
      //     window['setChooseGoodObj']=data=>{
      //       this.setChooseGood(data)
      //     }

    },
    methods: {

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
        http.get('https://www.supconit.net/maintenance/banner/list').then(res => {
          var imgArray = res.obj;
          this.bannerArray = imgArray;
        })
      },
      /**
       * 获取guide
       */
      getGuide() {
        this.guideItemArray =
          [
            {
              div: 'HOT',
              img: 'https://image.supconit.net/recommend1.png',
              type: 'hot',
            },
            {
              div: '景区',
              img: 'https://image.supconit.net/recommend2.png',
              type: 'scenic',
            },
            {
              div: '酒店',
              img: 'https://image.supconit.net/recommend3.png',
              type: 'hotel'
            },
            {
              div: '餐饮',
              img: 'https://image.supconit.net/recommend4.png',
              type: 'food'
            },
            {
              div: '自助游',
              img: 'https://image.supconit.net/recommend5.png',
              type: 'travelSelf'
            },
            {
              div: '旅游+',
              img: 'https://image.supconit.net/recommend6.png',
              type: 'travelPlus'
            },
          ]
      },
      getActivityOptimization() {
        let _vm = this;
        http.get('/shop/activity/page4C?size=4&&page=0', '').then(res => {
          console.log(res.obj.records);
          // this.activityOptimization = res.obj.records;
          let activititesArray = res.obj.records
          let activityContactArray = [];
          activititesArray.forEach((item) => {
            http.get('/search/aptitude/byActivityId/' + item.id).then(responce => {
              console.log(responce)
              let ActivityItem = {};
              ActivityItem['name'] = item.name;
              ActivityItem['productList'] = responce.obj;
              if (responce.obj.length > 0) {
                responce.obj.forEach(item => {
                  let dailPriceArray = []
                  let priceList = item.productDailyList;
                  let todayTimeStamp = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
                  console.log(todayTimeStamp, '今日时间戳')
                  let todayPriceItem = priceList.filter(function (item, index) {
                    return parseInt(item.dailyDate) == todayTimeStamp
                  })
                  console.log(todayPriceItem, '今日价态')
                  if (todayPriceItem.length > 0) {
                    item['minPrice'] = todayPriceItem[0].price;
                  }
                  // priceList.forEach(function (priceDaliyItem,
                  //                             index) {
                  //     dailPriceArray.push(priceDaliyItem
                  //         .price)
                  // })
                  // if (dailPriceArray.length > 0) {
                  //     item['minPrice'] = Math.min.apply(null,
                  //         dailPriceArray);
                  // }

                })
              }
              activityContactArray.push(ActivityItem)
            })
          })
          _vm.activityOptimization = activityContactArray;
          console.log(_vm.activityOptimization)

        })
      },
      /**
       * 获取推荐酒店
       */
      getHotHotel() {
        var qiNiu = this.$store.getters.getQiNiuLink;
        let _vm = this;
        http.get('/search/aptitudeHotel?size=4&&page=0', '').then(res => {
          // console.log(res.obj)
          let HotViewArray = res.obj.content;
          //资质商品列表 计算 最小价格
          HotViewArray.forEach(item => {
            let itemProductArray = item.productList;
            // console.log(itemProductArray);
            let dailPriceArray = [];
            itemProductArray.forEach(goodItem => {
              let priceList = goodItem.productDailyList;
              priceList.forEach((priceDaliyItem) => {
                dailPriceArray.push(priceDaliyItem.price)
              })
              item['minPrice'] = Math.min.apply(null, dailPriceArray);
            })
            item['cover'] = qiNiu + '/' + item.cover.split(',')[0];
            if (_vm.userCollectionArray.length > 0) {
              item['collectionShow'] = true
              if (_vm.userCollectionArray.includes(item.id)) {
                item['collection'] = true;
              } else {
                item['collection'] = false;
              }
            } else {
              item['collectionShow'] = false
            }
          });
          _vm.hothotel = HotViewArray;
          // console.log(this.hothotel)
        })
      },
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
</style>
