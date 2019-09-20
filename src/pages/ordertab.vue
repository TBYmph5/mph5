<template>
  <div class="wrap">
    <div class="header"></div>
    <div class='container'>
      <!-- 加载动画 -->
      <div class="loade-animate"
           v-if="loading">
        <img class="animate"
             src="../../src/assets/images/loading.gif">
      </div>
      <!-- 加载完内容 -->
      <div class="container-content"
           v-else>
        <!-- 内容 -->
        <div class="record-wrap"
             v-if='hasRecord'>
          <div class='order-content-wrap'>
            <van-list v-model="listLoading"
                      :style="{'height':height+'px'}"
                      @load='loadMoreAllOrder'
                      finished-text="没有更多了"
                      :finished="finished">
              <div class='order-item-wrap'
                   v-for="(item,index) in allOrderRecods"
                   :key="index"
                   @click='getDetail'>
                <div class='order-info-wrap'>
                  <div class='order-icon-wrap'>
                    <img :src='item.icon'>
                  </div>
                  <div class='order-info-content'>
                    <span class='order-name'>{{item.productSnapshot.name}}</span>
                    <span class='order-number'>订单编号：{{item.id}}</span>
                    <span class='order-effective-date'>行程有效期：{{item.effectiveDate}}</span>
                    <div class='order-price'>
                      <span class='unit'>¥</span>{{item.price}}
                    </div>
                    <!--<div class='order-state' > {{item.completed| judgeSate}}</div>-->
                  </div>

                </div>
                <div class='order-option-wrap'>
                  <button @click="viewQRcode(item.id)">扫二维码</button>
                </div>
                <div class='circle-decoration left'></div>
                <div class='circle-decoration right'></div>
              </div>
            </van-list>
          </div>
        </div>
        <!-- 没有数据 -->
        <div class="record-wrap"
             v-else>
          <div class="no-records-wrap">
            <div class="tips-wrap">
              空空如也
            </div>
          </div>
        </div>
      </div>
      <van-popup v-model="show">
        <div class="qrcode"
             style="width:300px;height:300px;">
          <img :src="qrcodeImg"
               style="width:300px;height:300px;" />
        </div>
      </van-popup>
      <div class="qrcodeCanvas"
           id="qrcodeDom"
           ref="qrcodeCanvas"
           v-show="false"></div>
    </div>
  </div>
</template>

<script>
import http from '../api/public'
import QRCode from "qrcodejs2";
export default {
  name: "ordertab",
  data () {
    return {
      height: 0,
      allOrderPages: 1,
      currntPageRecods: [],
      allOrderRecods: [],
      untravelRecods: [],
      finishRecods: [],
      loading: false,
      offset: 300,
      listLoading: false,
      finished: false,
      total: 0,
      hasRecord: true,
      show: false,
      qrcodeImg: require('../assets/logo.png')
    }
  },
  filters: {
    judgeSate: function (state) {
      if (state) {
        return '已完成'
      } else {
        return '未出行'
      }
    }

  },
  created () {
    this.height = document.body.clientHeight - 50;
  },
  mounted () {
  },
  methods: {
    viewQRcode (code) {
      this.show = true
      document.getElementById("qrcodeDom").innerHTML = "";
      let qrcode = new QRCode(document.getElementById("qrcodeDom"), {
        width: 300,
        height: 300,
        text: code,
        colorDark: "#000",
        colorLight: "#fff"
      });
      this.qrcodeImg = this.$refs["qrcodeCanvas"]
        .getElementsByTagName("canvas")[0]
        .toDataURL("image/png");
    },
    getDetail (e) {
      console.log(e)
    },
    /**
     * 滚动加载
     */
    loadMoreAllOrder () {
      let that = this
      setTimeout(() => {
        http.post('/order/info/page?current=' + that.allOrderPages + '&size=8', {}).then(res => {
          if (res.success) {
            let recodesArray = res.obj.records;
            recodesArray.forEach((item, index) => {
              switch (item.type) {
                case 1:
                  item['icon'] = 'https://image.supconit.net/hotelOrder.png';
                  break;
                case 2:
                  item['icon'] = 'https://image.supconit.net/viewOrder.png';
                  break;
              }
              item['productSnapshot'] = JSON.parse(item.productSnapshot);
              if (item['productSnapshot'].productInfoList.length > 1) {
                item['effectiveDate'] = item.productSnapshot.productInfoList[0].useDate + ' 至' + item.productSnapshot[item.productSnapshot.productInfoList.length - 1].useDate
              } else {
                item['effectiveDate'] = item.productSnapshot.productInfoList[0].useDate
              }
            })
            that.allOrderRecods = that.allOrderRecods.concat(recodesArray);
            //页数递增
            that.allOrderPages = that.allOrderPages + 1
            //加载状态结束
            that.listLoading = false;
            //数据全部加载完成
            if (that.allOrderRecods.length === Number(res.obj.total)) {
              that.finished = true;
            }
          }
        })
      }, 500)
    },
    // 判断订单状态
    // judageSate () {
    //   var that = this;
    //   let fliterRecodesArray = that.currntPageRecods;
    //   var currentallOrderRecods = that.allOrderRecods;
    //   var currentuntravelRecods = that.untravelRecods;
    //   var currentfinishRecods = that.finishRecods;

    //   fliterRecodesArray.forEach(function (item, index) {
    //     http.get('/runtime/process-instances/' + item.processInstanceId).then(res => {
    //       if (res.completed) {
    //         item['completed'] = true;
    //         currentfinishRecods.push(item)
    //       } else if (res.completed == false && index == 0) {
    //         item['completed'] = true;
    //         currentuntravelRecods.push(item)
    //       } else {
    //         item['completed'] = false;
    //         currentuntravelRecods.push(item)
    //       }
    //       currentallOrderRecods.push(item)
    //       that.allOrderRecods = currentallOrderRecods;
    //       that.untravelRecods = currentuntravelRecods;
    //       that.finishRecods = currentfinishRecods;
    //       if (that.allOrderRecods.length > 0) {
    //         that.hasRecord = true
    //       } else {
    //         that.hasRecord = false
    //       }
    //     })
    //   })
    //   return Promise.resolve(/* 这里是需要返回的数据*/)
    // },
    // evaluation (item) {
    //   this.$router.push({
    //     path: '/evaluation',
    //     query: {
    //       orderId: item.id
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  /* height: auto; */
}

.van-tabs {
  width: 100%;
  height: 100%;
}

.van-list {
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 0.4rem 0.4rem;
  overflow: auto;
}

.order-item-wrap {
  width: 100%;
  height: 3.12rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 4px 4px 10px 0px rgba(130, 130, 130, 0.12);
  position: relative;
  overflow: hidden;
  border-radius: 0.13rem;
  margin-bottom: 0.26rem;
}

.order-item-wrap:last-child {
  margin-bottom: 0;
}

.order-info-wrap {
  height: 2rem;
  border-bottom: 1px dashed rgba(235, 238, 245, 1);
  width: 100%;
}

.order-icon-wrap {
  width: 1.14rem;
  height: 100%;
  float: left;
  position: relative;
}

.order-icon-wrap img {
  width: 0.64rem;
  height: 0.64rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.order-info-content {
  width: calc(100% - 1.146rem);
  height: 100%;
  position: relative;
  float: right;
  border: 1px solid transparent;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 0.29rem;
}

.order-info-content .order-name {
  display: block;
  height: 0.53rem;
  font-size: 0.346rem;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 0.06rem;
}

.order-info-content .order-number,
.order-info-content .order-effective-date {
  font-size: 0.26rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: block;
  margin-bottom: 0.106rem;
}

.order-info-content .order-price {
  height: 0.33rem;
  font-size: 0.42rem;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
  right: 0.66rem;
}

.order-state {
  position: absolute;
  top: 0.13rem;
  right: 0.26rem;
  font-size: 0.26rem;
  font-weight: 400;
  color: rgba(64, 158, 255, 1);
}

.order-item-wrap .circle-decoration {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 1.8rem;
  background: #f3f3f3;
  border-radius: 50%;
  /* box-shadow:1px 1px 3px 0px rgba(130,130,130,0.12) inset; */
}

.order-item-wrap .circle-decoration.left {
  left: -0.2rem;
}

.order-item-wrap .circle-decoration.right {
  right: -0.2rem;
}

.order-option-wrap {
  height: calc(100% - 2rem);
  width: 100%;
  padding: 0.25rem 0.26rem 0 0px;
  border: 1px solid transparent;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  text-align: right;
}

.order-option-wrap button {
  width: 1.97rem;
  height: 0.58rem;
  /*line-height: 0.58rem;*/
  background: rgba(64, 158, 255, 1);
  box-shadow: 0px 0.026rem 0.08rem 0px rgba(64, 158, 255, 0.6);
  border-radius: 0.29rem;
  text-align: center;
  display: inline-block;
  font-size: 0.32rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-left: 0.4rem;
  padding: 0;
  outline: none;
  border: none;
}

.van-tabs--line {
  padding-top: 1.2rem !important;
}

.van-ellipsis.van-ellipsis.van-tab.van-tab {
  /* width: 80rpx !important; */
  display: inline-block;
}

.van-tab {
  padding: 0 0.26rem;
}

.container {
  background: #f3f3f3;
}
.container,
.record-wrap {
  /* overflow-y: auto; */
}
.header{

}
</style>
