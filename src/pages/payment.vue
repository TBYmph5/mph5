<template>
  <div class="payment1">

    <!--pages/paySuccess/index.wxml-->
    <div class='container pay-container'>

      <div class='order-detail-wrap'>
        <div class='order-detail-content'>
          <div class='payment-security-tips'>
            安全支付...
          </div>
          <div class='order-content'>
            <div class='middle-wrap payment'>
              <span class='order-good-name'>{{goodName}}</span>
              <div class='order-finished-number'>支付剩余时间：
                <span class='order-finished-countdown'>{{lastPayTime}}</span>
              </div>
              <div class='order-finished-number'>订单编号：
                <span class='order-finished-number-span'> {{orderId}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 价格 -->
      <div class='order-need-price-wrap'>金额
        <span class='order-price'>￥{{prciePay}}</span>
        <span class='rediv-price-detail' @click="viewFeeDetail">费用明细 </span></div>
      <!-- 费用明细 -->
      <van-popup
        v-model="costDetailShow"
        position="bottom"
        @close="costDetailOnClose"
      >
        <div class="cost-detail-wrap" v-if="feeDetail.goodType==1">
          <span class="good-type-title" style="margin-bottom:0.2rem;">费用明细</span>
          <div v-for="(item,index) in feeDetail.hotelchooseValenceArray" class="daily-price" :key="index">
            <span class="date" style="margin-right: 0.1rem;">{{item.date}}</span>
            <span class="daily">¥{{item.price}}</span>
          </div>
          <div class="ticket-number">
            房间数量:
            <span>{{feeDetail.roomNumber}}</span> 间
          </div>
          <div v-if=" feeDetail.payablePrice !== feeDetail.priceOrder" class="payablePrice">
            活动前价格：
            <span>人民币{{ feeDetail.payablePrice}}</span>
          </div>
          <div v-if="feeDetail.matchSalesList.length>0">
            <div v-for="(item,index) in feeDetail.matchSalesList" :key="index">
              <div class="sales-item-type discount" v-if="item.type==0">
                促销活动：折扣
                （<span>{{item.ruleJson.discount}}%</span>）
              </div>
              <div class="sales-item-type discount" v-else>
                促销活动：满减
                （
                <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                  <span style="margin-right: 0.1rem;">单日满：{{item.full}} 减{{item.reduction}}</span>
                </div>
                ）
              </div>
            </div>
          </div>
          <div class="priceOrder" >价格：¥ {{feeDetail.priceOrder}}</div>
        </div>
        <!-- 门票价格明细 -->
        <div class="cost-detail-wrap" v-if="feeDetail.goodType==2">
          <span class="good-type-title" style="margin-bottom:0.85rem;">费用明细</span>

          <div class="ticket-number">
            门票信息: {{feeDetail.goodName}}
            <span>{{feeDetail.ticketOrderDate|timestampToTime}}</span>门票
            <span>{{feeDetail.ticketNumber}}</span>一张
          </div>

          <div v-if="feeDetail.payablePrice !== feeDetail.priceOrder" class="payablePrice">
            活动前价格：
            <span>¥{{ feeDetail.payablePrice}}</span>
          </div>
          <div v-if="feeDetail.matchSalesList.length>0">
            <div v-for="(item,index) in feeDetail.matchSalesList" :key="index">
              <div class="sales-item-type discount" v-if="item.type=='0'">
                促销活动:
                折扣（
                <span>{{item.ruleJson.discount}}%</span>)
              </div>
              <div class="sales-item-type discount" v-if="item.type=='1'">
                促销活动: 满减
                (
                <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                  <span style="margin-right: 0.1rem;">单日满：{{item.full}} 减 {{item.reduction}}</span>
                </div>
                )
              </div>
            </div>
          </div>

          <div class="priceOrder">
            价格：
            <span>¥{{feeDetail.priceOrder}}</span>
          </div>
        </div>
      </van-popup>
      <!-- 支付方式选择 -->
      <!--<div class='payment-type-wrap'>-->
        <!--<span class='choose-payment-title'>请选择支付方式</span>-->
        <!--<div class='payment-item' v-for="(item,index) in paymentType" :key='index'>-->
          <!--<div class='payment-img-wrap'>-->
            <!--<img :src='item.img'>-->
          <!--</div>-->
          <!--{{item.text}}-->
          <!--<div class='payment-check-wrap' @click='checkPayment(item,index)'>-->
            <!--<div class='check-circle' :class="item.check? 'active':''"></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <button class='go-pay' @click="pay">立即支付</button>


    </div>

  </div>
</template>

<script>
  import http from '../api/public'
  import {getStore, removeStore, setStore} from '../utils/storage'
  import CryptoJS from 'crypto-js/crypto-js'
  import moment from 'moment'
  import {Toast} from 'vant';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        orderId: '',
        prciePay: 0.1,
        channel: '2',
        orderSnapshot: {},
        paymentType: [
          {
            text: '支付宝',
            img: require('../assets/images/payment_ali.png'),
            check: false,
          },
          {
            text: '微信支付',
            img: require('../assets/images/payment_wechat.png'),
            check: false,

          },
          {
            text: '银联支付',
            img: require('../assets/images/payment_card.png'),
            check: false,
          },
        ],
        costDetailShow: false,
        feeDetail: this.$store.state.feeDetail,
        goodNanme: '',
        lastPayTime: '14分59秒'
      }
    },
    filters: {
      timestampToTime: function (timestamp) {
        return moment(timestamp).format("YYYY-MM-DD")
      }
    },
    mounted() {
      // console.log( this.parseUrl());
      this.orderSnapshot = this.$route.query.orderSnapshot;
      this.$store.commit('setorderSnapshot', this.orderSnapshot)
      this.orderSnapshot['productSnapshot'] = JSON.parse(this.orderSnapshot.productSnapshot)
      console.log(this.orderSnapshot);
      this.orderId = this.orderSnapshot.id;
      this.prciePay = this.orderSnapshot.price;
      this.goodName = this.orderSnapshot.productSnapshot.name
      console.log(this.feeDetail)
      this.computedLastPayTime()
    },
    methods: {
      checkPayment(item, index) {
        item.check = !item.check;
        this.channel = index + 1;
        this.paymentType.forEach((paymentItem, paymentIndex) => {
          if (index !== paymentIndex) {
            paymentItem.check = false
          }
        })
      },
      viewFeeDetail() {
        this.costDetailShow = true
      },
      costDetailOnClose() {
        this.costDetailShow = false
      },
      pay() {
        if (this.channel !== '') {
        /**
         * 微信支付
         * */
        let  paykey='11111'
          console.log('getStore',getStore('openId'))
          console.log('getStore',typeof (getStore('openId')))
        // if(getStore('openId')!=="undefined" || getStore('openId') !== null){
          /**
           * 小程序支付
          **/
        //   http.post('/order/info/beginCharge_min/' + this.orderId + '/' + this.channel + '/'+paykey, {}).then(res => {
        //     let path = '/pages/payment/index?key=' + res.obj + '&orderSnapshot=' + JSON.stringify(this.$store.state.orderSnapshot) + '&feeDetail=' + JSON.stringify(this.$store.state.feeDetail)+'&time='+this.$store.state.creatOrderTime+'&channel='+this.channel+'&orderId='+this.orderId;
        //     wx.miniProgram.redirectTo({url: path});
        //   })
        // } else {
        /**
        * H5支付
        */
          var ua = navigator.userAgent.toLowerCase();
          console.log(ua,'ua')
          var isWeixin = ua.indexOf('micromessenger') != -1;
          console.log(isWeixin,'isWeixin')
            if (isWeixin) {
              alert('微信')
                Toast.fail('请点击右上角选择原生浏览器打开并进行支付')
            }else{
              alert('不在微信中')
              console.log('不在微信中')
                http.post('/order/info/beginCharge_H5/' + this.orderId + '/' + this.channel, {}).then(res => {
                console.log(res);
                window.location.replace(res.obj)
              })
            }
          // }
        }
      },
      // 准备好微信sdk部分
      jsSdk(key){
        // 判断微信的WeixinJSBridge
        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
          }
        }else{
          this.onBridgeReady(key);
        }
      },
      // 支付sdk准备完成
      onBridgeReady(res_paydata) {
        var timeStamp = this.timeStamp();
        var randomString = this.randomString();
        var Mixedicymd5 = this.MixedencryMD5(res_paydata, randomString, timeStamp)
        var paySign = CryptoJS.HmacSHA256(Mixedicymd5, "123456789012345678901234567890SP").toString().toUpperCase()

        // 触发微信支付
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            appId: 'wx9440a9218a0201ae', //公众号名称，由商户传入
            timeStamp: timeStamp, //时间戳，自1970年以来的秒数
            nonceStr: randomString , //随机串
            package: res_paydata, //prepay_id用等式的格式
            signType:'HMAC-SHA256', //微信签名方式：
            paySign: paySign, //微信签名
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              // 支付成功 返回成功页
              // let tempUrl="//paysucc"
              // location.href=tempUr
              console.log('支付失败')
            } else{
              console.log('支付成功')
              //  取消支付或者其他情况 get_brand_wcpay_request:cancel get_brand_wcpay_request:fail
              // let tempUrl='//topay'
              // location.href=tempUrl
            }
          }
        );
      },
      // 调起支付签名
      MixedencryMD5(res_paydata, randomString, timeStamp) {
        return "appId=" + 'wx7ed0955cce3e8d15' + "&nonceStr=" + randomString + "&package=prepay_id=" + res_paydata + "&signType=HMAC-SHA256" + "&timeStamp=" + timeStamp + "&key=" + '123456789012345678901234567890SP';
      },
      // / 时间戳
      timeStamp() {
        return parseInt(new Date().getTime() / 1000) + ''
      },
      /* 随机数 */
      randomString() {
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        // /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < 32; i++) {
          pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      },
      /**
       * 支付倒计时函数
       */
      computedLastPayTime() {
        let orderCreatTime = this.$store.getters.getcreatorderTime;
        let self = this;
        let interval = setInterval(function () {
          let createTime = parseInt(orderCreatTime / 1000);
          let endTime = createTime + 900;
          // 900
          let clientTime = Date.parse(new Date()) / 1000;
          let lastTime = endTime - clientTime;
          let int_minute;
          if (lastTime > 0) {
            int_minute = Math.floor(lastTime / 60);
            lastTime -= int_minute * 60;
            if (lastTime<10){
              lastTime = '0'+ lastTime
            }
            self.lastPayTime = int_minute + '分' + lastTime + '秒'
          } else {
            Toast.fail('订单超时未支付');
            window.clearInterval(interval);
            self.$router.go(-1)
          }
        }, 1000);
      },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* pages/paySuccess/index.wxss */
  .payment1 {
    height: auto !important;
    background-color: #f3f3f3;
  }

  .order-content .middle-wrap.payment {
    height: 2.4rem;
    line-height: 0.6rem;
  }

  .order-content .middle-wrap.payment .order-good-name {
    margin-bottom: 0.35rem;
    font-size: 0.42rem;
    color: rgba(48, 49, 51, 1);
    line-height: 0.52rem;
  }

  .middle-wrap.payment .order-finished-number {
    margin-bottom: 0.13rem;
  }

  .order-finished-countdown {
    font-size: 0.42rem;
    color: rgba(48, 49, 51, 1);
  }

  .payment-type-wrap {
    height: 5.9rem;
    width: 100%;
    background: #fff;
    margin-top: 0.26rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: left;
  }

  .choose-payment-title {
    height: 1.46rem;
    line-height: 1.46rem;
    font-size: 0.42rem;
    color: rgba(51, 51, 51, 1);

  }

  .payment-item {
    height: 1.46rem;
    width: 100%;
    line-height: 1.46rem;
    font-size: 0.375rem;
    color: rgba(51, 51, 51, 1);
  }

  .payment-img-wrap {
    width: 0.85rem;
    height: 100%;
    float: left;
    margin-right: 0.33rem;
  }

  .payment-img-wrap img {
    width: 0.85rem;
    height: 0.85rem;
    margin-top: 0.3rem;
  }

  .payment-check-wrap {
    height: 1.46rem;
    width: 0.66rem;
    float: right;

    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    overflow: hidden;

  }

  .check-circle {
    width: 0.53rem;
    height: 0.53rem;
    margin: 0.45rem auto;
    border: 1px solid rgba(173, 173, 173, 1);
    border-radius: 50%;
  }

  .check-circle.active {
    background: url('../assets/images/payment_check.png') center no-repeat;
    background-size: 110% 110%;
    border: none;
  }

  .go-pay {
    display: block;
    width: 9rem;
    height: 1.17rem;
    background: rgba(64, 158, 255, 1);
    box-shadow: 0px 0.08rem 0.13rem 0px rgba(64, 158, 255, 0.5);
    border-radius: 0.21rem;
    outline: none;
    border: none;
    margin: 0.26rem auto 0;
    font-size: 0.426rem;
    color: rgba(255, 255, 255, 1);
  }

  .order-detail-wrap {
    width: 100%;
    height: 6.45rem;
    background: url("https://image.supconit.net/payBg.png") center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    padding-top: 0.26rem;
    box-sizing: border-box;
    z-index: 999;

  }

  .order-content .middle-wrap.payment .order-good-name {
    margin-bottom: 0.35rem;
    font-size: 0.42rem;
    color: rgba(48, 49, 51, 1);
    line-height: 0.52rem;
  }

  .hot-good-item {
    width: 9.2rem;
    height: 3.62rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0.05rem 0.05rem 0.26rem 0px rgba(130, 130, 130, 0.12);
    border-radius: 0.21rem;
    margin: 0 auto 0.267rem;
    overflow: hidden;
  }

  .hot-good-item .img-wrap {
    width: 2.72rem;
    height: 3.62rem;
    float: left;
    overflow: hidden;
    /* border-radius: 16rpx; */
  }

  .hot-good-item .img-wrap img {
    width: 2.72rem;
    height: 3.62rem;
  }

  .hot-good-figure {
    width: calc(100% - 2.72rem);
    height: 100%;
    float: right;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0.25rem;
  }

  .hot-good-name {
    display: block;
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    letter-spacing: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0.21rem;
  }

  .hot-good-discribe {
    width: 100%;
    height: 1.2rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: rgba(96, 98, 102, 1);
    line-height: 0.4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .price-option-wrap {
    height: 0.625rem;
    line-height: 0.625rem;
    width: 100%;
    margin-top: 0.467rem;
  }

  .hot-good-option {
    width: 1.68rem;
    height: 0.62rem;
    box-shadow: 0px 0.04rem 0.093rem 0px rgba(245, 108, 108, 0.43);
    border-radius: 0.053rem;
    float: right;
    line-height: 0.627rem;
    text-align: center;
    font-size: 0.29rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding: 0;
  }

  .hot-good-price {
    font-size: 0.5rem;
    font-weight: 500;
    color: rgba(245, 108, 108, 1);
  }

  .order-detail-content {
    width: 9.2rem;
    height: auto;
    margin: 0 auto;

  }

  .order-content {
    width: 100%;
    height: 3.73rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 15px 0px rgba(182, 182, 182, 0.5);
    border-radius: 16px;
    margin-top: 0.3rem;
    padding: 0.8rem;;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    position: relative;
    text-align: left;

  }

  .order-detail-content .payment-security-tips {
    font-size: 0.48rem;
    color: rgba(255, 255, 255, 1);
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    overflow: hidden;
    text-align: left;

  }

  .order-need-price-wrap .rediv-price-detail {
    display: block;
    float: right;
    height: 1.46rem;
    line-height: 1.46rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
    cursor: pointer;

  }

  #app {
    background: #f3f3f3;
    text-align: center !important;
  }

  .recommended-wrap {
    text-align: left;
  }

  .order-need-price-wrap {
    width: 100%;
    height: 1.46rem;
    padding: 0 0.7rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background: #fff;
    line-height: 1.46rem;
    z-index: 999;
    text-align: left;

  }

  .order-need-price-wrap .order-price {
    font-size: 0.48rem;
    color: rgba(251, 90, 79, 1);
    position: relative;
    top: 1px;

  }

  .order-need-price-wrap .rediv-price-detail {
    display: block;
    float: right;
    height: 1.46rem;
    line-height: 1.46rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);

  }
</style>
