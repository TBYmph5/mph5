<template>
  <div class="wrap">
    <div class="header">
      <div class="header-swiper-container">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item><img src="https://image.supconit.net/hotBanner.png" alt=""></van-swipe-item>
          <van-swipe-item><img src="https://image.supconit.net/hotBanner.png" alt=""></van-swipe-item>
          <van-swipe-item><img src="https://image.supconit.net/hotBanner.png" alt=""></van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="avtivity-wrap">
      <!-- 热门景区 -->
      <div class='hot-activity ' v-for="(item,index) in activityOptimization" v-key="index">
        <div class='item-title'>{{item.name}}</div>
        <div class='tabs-content-wrap-science'>
          <div class='tabs-content'>
            <div class='figure' v-for="(productItem,productIndex) in item.productList" v-key='productIndex'
                 @click="getGoodDetail(productItem)">
              <div class='img-wrap'>
                <img :src='productItem.cover'>
              </div>
              <div class='figcaption'>
                <div class='good-name'>{{productItem.name}}</div>
                <div class='good-discribe'>{{productItem.introduction}}</div>
                <span class='price' v-if="productItem.minPrice!==undefined">￥{{productItem.minPrice}}起</span>
                <span class='price' v-else></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../api/public'

  export default {
    name: "avtivities",
    data() {
      return {
        qiniu: 'https://image.supconit.net',
        activityOptimization: []
      }
    },
    mounted() {
      this.getActivityOptimization()
    },
    methods: {
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
                  priceList.forEach(function (priceDaliyItem,
                                              index) {
                    dailPriceArray.push(priceDaliyItem
                      .price)
                  })
                  if (dailPriceArray.length > 0) {
                    item['minPrice'] = Math.min.apply(null,
                      dailPriceArray);
                  }
                  item['cover'] = _vm.qiniu + '/' + item.cover.split(',')[0];
                })
              }

              activityContactArray.push(ActivityItem)
            })
          })
          _vm.activityOptimization = activityContactArray;
          console.log(_vm.activityOptimization)

        })
      },
      getGoodDetail(item) {
        this.$router.push({
          path: '/goodDetails',
          query: {
            id: item.id,
            name: item.name
          }
        })
      },
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
  }

  .header {
    width: 100%;
    height: 4.106rem;
  }

  .avtivity-wrap {
    width: 100%;
    height: auto;
  }

  .hot-activity {
    width: 100%;
    box-sizing: border-box;
    box-sizing: border-box;
  }

  .hot-activity:last-child {
    margin-bottom: 0.35rem;
  }

  .item-title {
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    margin-bottom: 0.45rem;
    display: block;
  }

  .tabs-content-wrap-science {
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }

  .tabs-content {
    /* height: 5.6rem; */
    height: auto;
    padding: 0.13rem 0 0.13rem 0.13rem;
    width: 100%;
    white-space: nowrap;
    /* display: flex; */
    overflow-x: scroll;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .figure {
    width: 4.16rem;
    height: 5.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(12, 3, 6, 0.2);
    border-radius: 0.21rem;
    display: inline-block;
    margin-right: 0.26rem;
  }

  .figure .img-wrap {
    width: 100%;
    height: 3.12rem;
    border-radius: 0.21rem;
    overflow: hidden;
  }

  .figure .figcaption {
    width: 100%;
    height: calc(100% - 3.12rem);
    padding: 0.2rem 0.226rem;
    border: 1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .good-name {
    height: 0.5rem;
    font-size: 0.34rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .good-discribe {
    display: flex;
    width: 100%;
    height: 0.82rem;
    line-height: 0.41rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(162, 162, 162, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-line;
    margin-bottom: 0.23rem;
  }

  .price {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(203, 0, 0, 1);
    position: relative;
    top: -0.21rem;
    display: inline-block;
  }

  .figure .img-wrap {
    width: 100%;
    height: 3.12rem;
    border-radius: 0.21rem;
    overflow: hidden;
    text-align: center;
  }

  .figure .img-wrap img {
    width: 100%;
    height: 100%;
    /*width: auto;*/
    /*height: auto;*/
    /*max-width: 100%;*/
    /*max-height: 100%;*/
  }

  .hot-activity {
    padding: .57rem 0 0 .4rem;
  }

  .header-swiper-container {
    width: 100%;
    height: 100%;
    padding-top: 0.4rem;
    border: 1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .van-swipe {
    width: 92%;
    height: 100%;
    margin: 0 auto;
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

</style>
