<template>
  <div class="wrap">
    <!--pages/userCenter/index.wxml-->
    <div class="container">
      <div class='user-info-wrap'>
        <div class='user-info-content'>
          <span class='username' v-if="userInfo.nickName!==''">{{userInfo.nickName}}</span>
          <span class='username' v-else>{{userInfo.phone}}</span>
          <!--<div class='user-introduction'>-->
          <!--暂无个人简介-->
          <!--</div>-->
          <div class='avtar'>
            <div class='avtar-content'>
              <img :src='qiNiu+"/"+ userInfo.avatar'>
            </div>
          </div>
          <!--二维码-->
          <div class="erweima-wrap" v-if="qrcodeImg!==''" @click="checkQrCode">
          </div>
          <!-- 用户积分信息 -->
          <!--<div class='user-gender-wrap'>-->
            <!--<div class='user-gender-item'>-->
              <!--<span class='gender-content'>0</span> 优惠券-->
            <!--</div>-->
            <!--<div class='user-gender-item'>-->
              <!--<span class='gender-content'>0</span> 积分-->
            <!--</div>-->
            <!--<div class='user-gender-item'>-->
              <!--<span class='gender-content'>V1</span> 会员等级-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <!-- 用户模块菜单 -->
      <div class='user-menu-wrap'>
        <div class='menu-item'>
          <img src='../../src/assets/images/myorders.png'>
          <div class='menu-item-content' @click="myOrders">我的订单</div>
        </div>
        <div class='menu-item'>
          <img src='../../src/assets/images/mycollection.png'>
          <div class='menu-item-content' @click='myCollections'>我的收藏</div>
        </div>

        <van-collapse v-model="activeName" @change="onChange" :border='border'>
          <van-collapse-item name="1" style="padding: 0  15px 0 0 !important;">
            <div slot="title" class='slot-title'>
              <img src='../../src/assets/images/myinfo.png'> 信息管理
            </div>
            <div class='sub-menu' @click='myContacts'> 我的联系人</div>
            <div class='sub-menu' @click='myAddress'> 我的地址</div>
          </van-collapse-item>
          <van-collapse-item name="2" style="padding: 0  15px 0 0 !important;">
            <div slot="title" class='slot-title'>
              <img src='../../src/assets/images/mymember.png'>我的会员
            </div>
            <div class='sub-menu' @click='getUserInfo'> 会员信息</div>
            <div class='sub-menu' @click='getMemberIntegral'> 会员积分</div>
          </van-collapse-item>

        </van-collapse>
      </div>


    </div>
    <!--二维码-->
    <van-popup v-model="Qrshow">
      <div class="qrcode"
           style="width:300px;height:300px;overflow:hidden;">
        <img :src="qrcodeImg"
             style="width:260px;height:260px;position:absolute;left:0;right:0;bottom:0;top:0;margin:auto;"/>
        <!--<img :src="logo"-->
        <!--class="logo">-->
      </div>
    </van-popup>
    <div class="qrcodeCanvas"
         id="qrcodeDom"
         ref="qrcodeCanvas"
         v-show="false">
    </div>

  </div>
</template>

<script>
  import http from '../api/public'
  import QRCode from "qrcodejs2";
  export default {
    name: "mytab",
    data() {
      return {
        avatar: '',
        userInfo: {},
        activeName: [],
        border: false,
        qiNiu: this.$store.state.qiNiuLink,
        qrcodeImg: '',
        goodId:'1184754390184067073',
        Qrshow:false,
      }
    },
    mounted() {
      this.getCurrentUserInfo();
      this.getCurrentUserThisGoodOrder();
    },
    methods: {
      myOrders() {
        this.$router.push({
          path: '/ordertab'
        })
      },
      myCollections() {
        this.$router.push({
          path: '/myCollection'
        })
      },
      onChange() {

      },
      myContacts() {
        this.$router.push({
          path: '/myContacts'
        })
      },
      myAddress() {
        this.$router.push({
          path: '/myAddress'
        })
      },
      getUserInfo() {
        this.$router.push({
          path: '/userInfo'
        })

      },
      getMemberIntegral() {
        this.$router.push({
          path: '/integral'
        })
      },
      getCurrentUserInfo() {
        let that=this;
        http.get('/customer/info/getCurrentInfo').then(res => {
          console.log(res, 'reesssss')
          if (res.obj.avatar == '') {
            res.obj['avatar'] = 'avtar.png'
          }
          that.userInfo = res.obj;
        })
      },
      /**
       *根据商品Id 获取用户这个商品的用户订单
       */
      getCurrentUserThisGoodOrder() {
        let parmas={};
        parmas['productId']=this.goodId
        http.post('/order/info/page?current=1&size=8', parmas).then(res => {
          let orderArray = res.obj.records[0];
          if(res.obj.records.length>0){
            this.viewQRcode(orderArray.checkCode);
          }

        })

      },
      checkQrCode(){
        this.Qrshow=true
      },
      viewQRcode(code) {
        this.show = true;
        document.getElementById("qrcodeDom").innerHTML = "";
        let qrcode = new QRCode(document.getElementById("qrcodeDom"), {
          width: 260,
          height: 260,
          text: code,
          colorDark: "#000",
          colorLight: "#fff",
          correctLevel: QRCode.CorrectLevel.M
        });
        this.qrcodeImg = this.$refs["qrcodeCanvas"]
          .getElementsByTagName("canvas")[0]
          .toDataURL("image/png");
      },
    }
  }
</script>

<style scoped>
  @import '../assets/css/user.css';
  /* pages/userCenter/index.wxss */
  page {
    background-color: #f3f3f3;
  }

  .container {
     /*background: #000;*/
  }

  .user-info-wrap {
    width: 100%;
    height: 6.4rem;
    /*background: rgba(64, 158, 255, 1);*/
    overflow: hidden;
  }

  .user-info-content {
    width: 9.2rem;
    height:5.09rem;
    background: url("https://image.supconit.net/union%20Card.png") center no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 0.06rem 0.2rem 0px rgba(182, 182, 182, 0.5);
    border-radius: 0.21rem;
    margin: 0.53rem auto 0;
    padding: 2.6rem 0.37rem 0;
    border: 1px solid transparent;
    box-sizing: border-box;
    position: relative;
  }

  .username {
    display: block;
    height: 0.66rem;
    font-size: 0.48rem;
    /* font-weight:bold; */
    color: #fff;
    margin-bottom: 0.13rem;
    text-align: center;
    /*text-indent: 3rem;*/
  }

  .user-introduction {
    width: 5.3rem;
    height: 0.93rem;
    font-size: 0.32rem;
    color: rgba(102, 102, 102, 1);
    line-height: 0.46rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .avtar {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    background: #71BB67;
    border-radius: 50%;
    left: 0;
    right: 0;
    margin: auto;
    top: 0.69rem;
  }

  .avtar .avtar-content {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.05rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .avtar .avtar-content img {
    width: 100%;
    height: 100%;
  }

  .user-gender-wrap {
    height: 1.33rem;
    width: 8.46rem;
    margin: 0.4rem auto 0;
    border-top: 1px dashed rgba(235, 238, 245, 0.5);
    text-align: center;
  }

  .user-gender-wrap .user-gender-item {
    width: 2.75rem;
    height: 100%;
    display: inline-block;
    position: relative;
  }

  .user-gender-wrap .user-gender-item::after {
    content: '';
    width: 1px;
    height: 0.66rem;
    background: rgba(235, 238, 245, 0.5);
    position: absolute;
    top: 0.33rem;
    right: 0;
  }

  .user-gender-wrap .user-gender-item:last-child::after {
    background: transparent;
  }

  .user-gender-wrap .user-gender-item {
    font-size: 0.34rem;
    font-weight: bold;
    color: #fff;
    line-height: 0.8rem;
  }

  .user-gender-wrap .gender-content {
    display: block;
    height: 0.53rem;
    font-size: 0.42rem;
    font-weight: bold;
    color: rgba(64, 158, 255, 1);
  }

  .user-menu-wrap {
    width: 100%;
    height: auto;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0.53rem 0 0 0.26rem;
  }

  .menu-item {
    width: 100%;
    height: 1.3rem;
    overflow: hidden;
  }

  .menu-item img {
    width: 0.66rem;
    height: 0.66rem;
    margin-top: 0.33rem;
    float: left;
    display: inline-block;
  }

  .menu-item img, .slot-title img {
    width: 0.66rem;
    height: 0.66rem;
    margin-top: 0.33rem;
    float: left;
    display: inline-block;
  }

  .slot-title img {
    margin-right: 0.33rem;
  }

  .slot-title {
    font-size: 0.34rem;
    font-weight: bold;
    color: rgba(48, 49, 51, 1);
    height: 1.33rem;
    line-height: 1.33rem;
  }

  .menu-item-content {
    width: calc(100% - 0.66rem);
    float: right;
    height: 100%;
    line-height: 1.33rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    box-sizing: border-box;
    font-size: 0.34rem;
    font-weight: bold;
    color: rgba(48, 49, 51, 1);
    text-indent: 0.33rem;
    text-align: left;
  }

  .item-index--van-cell.van-cell {
    padding-left: 0 !important;
    line-height: 1.33rem;
    /* padding-right:0 !important; */
  }

  .van-collapse-item.van-collapse-item {
    line-height: 1.33rem !important;
    text-align: left;
  }

  .item-index--van-cell.van-cell {
    background: transparent !important;
    position: relative;

  }

  /* .item-index--van-cell.van-cell */
  .van-cell {
    height: 1.33rem;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    line-height: 1.33rem;

  }

  van-collapse-item {
    border: none !important;
    position: relative;
  }

  .van-collapse-item__content {
    background: transparent !important;
  }

  .van-cell__title.van-cell__title {
    position: relative;
    /* border: 1px solid red; */
  }

  .van-cell__title.van-cell__title::after {
    content: "";
    width: 9.066rem;
    height: 1px;
    position: absolute;
    bottom: 0;
    right: -12%;
    background: rgba(238, 238, 238, 1);
  }

  .user-menu-wrap .van-cell__right-icon {
    line-height: 1.33rem !important;
    height: 1.33rem;
  }

  .sub-menu {
    line-height: 1.33rem;
    height: 1.33rem ;
    span-indent: 0.53rem;
  }

  .van-cell__right-icon-wrap.van-cell__right-icon-wrap.item-index--van-cell__right-icon {
    height: auto;
  }

  .user-menu-wrap .van-cell.van-cell--clickable.van-collapse-item__title {
    padding: 0 15px 0 0 !important;
  }

  .van-cell {
    padding: 0 15px 0 0 !important;
  }

  .sub-menu {
    text-indent: 0.8rem;
    line-height: 1.13rem !important;
  }

  .user-menu-wrap .van-cell__left-icon, .van-cell__right-icon {
    line-height: 1.33rem !important;;
  }

  .erweima-wrap {
    height: 1.02rem;
    width: 1.02rem;
    position: absolute;
    top:0.44rem;
    right: 0.6rem;
    background: url("../assets/images/erweima.png")center no-repeat;
    background-size: 100% 100%;
  }


</style>
