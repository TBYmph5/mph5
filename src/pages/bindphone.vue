<template>
    <div class="wrap">
      <!--pages/bindEmail/index.wxml-->
      <div class='container'>
        <div class='bind-wrap'>
          <div class='bind-item'>手机号
            <div class='input-wrap'>
              <input placeholder="请输入手机号"  v-model="phoneNumber"  />
              <span class='iconfont icon-guanbi' @click='clearInput'></span>
            </div>
          </div>
          <div class='bind-item'>验证码
            <div class='input-wrap'>
              <input placeholder="请输入验证码"   v-model='verification'  maxlength='6' placeholder-style="color:#ADADAD; font-size:32rpx;" v-if='!countdownShow'  />
              <div class='getVerificationCode' v-if='countdownShow' @click="getCode">获取验证码</div>
              <div class='countdown' v-else>重新获取({{countdown}}s)</div>
            </div>
          </div>
          <!-- 提交按钮 -->
          <div class="btn-group">
            <button  @click="goBack"  class="cancel submit-btn" >返回</button>
            <button  @click='bindPhone'  class="submit-btn" >绑定</button>

          </div>


        </div>
      </div>
    </div>
</template>

<script>
  import http from '../api/public'
  import {getStore, removeStore,setStore} from '@/utils/storage'
    export default {
        name: "bindphone",
      data(){
          return{
            countdownShow:true,
            countdown:60,
            phoneNumber:'',
            verification:''
          }
      },
      methods:{

        getCode: function () {

         if(this.checkPhoneNumber(this.phoneNumber)) {
           http.post('/customer/auth/sendLoginSms?phoneNumbers='+this.phoneNumber,{}).then(res=>{
             console.log(res)
             // this.verification=
           })
         }

        },
        // 绑定手机
        bindPhone(){

          // let that=this;
          let params={};
          params['phoneNumber']=this.phoneNumber;
          params['verificationCode']=this.verification;
          params['openId']=getStore('openId');
          // params['openId']='111';
          http.post('/customer/login',params).then(res=>{
            this.$router.back(-1)
          })
          // wx:wx.request({
          //   url: 'https://www.supconit.net/customer/login',
          //   data: {
          //     phoneNumber: that.data.phoneNumber,
          //     verificationCode: that.data.verification
          //   },
          //   header: { 'Content-Type': 'application/json; charset=utf-8',},
          //   method: 'POST',
          //   dataType: 'json',
          //   responseType: 'text',
          //   success: function(res) {
          //     var pagesSrc = wx.getStorageSync('router')
          //     wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
          //     switch (pagesSrc){
          //       case'/pages/order/index':
          //         wx.switchTab({
          //           url: '/pages/order/index',
          //         })
          //         break;
          //       case '/pages/userCenter/index':
          //         wx.switchTab({
          //           url: '/pages/userCenter/index',
          //         })
          //         break;
          //       default:
          //         wx.redirectTo({
          //           url: pagesSrc //或者url: '/page/person/goldcoin/index'
          //         })
          //
          //     }
          //
          //   },
          //   fail: function(res) {
          //
          //     let pages = wx.getStorageSync('router')
          //     wx.setStorageSync("sessionid", res.header["Set-Cookie"])
          //     wx.redirectTo({
          //       url: pages  //或者url: '/page/person/goldcoin/index'
          //     })
          //
          //   },
          //   complete: function(res) {},
          // })
        },
        clearInput(){
          this.phoneNumber=''
        },
        checkPhoneNumber:function (phoneNumber) {
          let str = /^1\d{10}$/
          if (str.test(phoneNumber)) {
            console.log('手机号验证正确')
            this.countdownShow= false
            this.timer();
            return true
          } else {
            Toast.fail('请填写正确的手机号');
            return false

          }
        },
        // 倒计时函数
        timer: function () {
          let promise = new Promise((resolve, reject) => {
            let setTimer = setInterval(() => {

              this.countdown=this.countdown - 1;
              if (this.countdown <= 0) {
                this.countdown= 60;
                  this.countdownShow=true;
                resolve(setTimer)
              }
            }, 1000)
          })
          promise.then((setTimer) => {
            clearInterval(setTimer)
          })
        },
        goBack(){
          this.$router.push({
            path:'/'
          })
        }
      }
    }
</script>

<style scoped>
  /* pages/bindEmail/index.wxss */

  .bind-wrap {
    width: 100%;
    height: 100%;
    background:#f3f3f3;
  }

  .bind-wrap .bind-item {
    width: 100%;
    height: 1.46rem;
    border-bottom: 1px solid #f3f3f3;
    line-height: 1.46rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -moz-box-sizing: border-box;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    background: #fff;
  }
  .bind-wrap .bind-item .input-wrap input{
    width: 5.06rem;
    font-size:0.42rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    outline: none;
    border: none;
  }

  .bind-wrap .bind-item .input-wrap {
    width: 5.86rem;
    height: 100%;
    float: right;

    position: relative;
  }

  .bind-wrap .bind-item .input-wrap  .iconfont.icon-guanbi {
    display: inline-block;
    height: 0.48rem;
    width: 0.48rem;
    font-size: 0.48rem;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0px;
    color: #409eff;
    line-height: 0.48rem;
  }
  .getVerificationCode{
    width: 2.24rem;
    height: 0.72rem;
    border:none;
    outline: none;
    background: #409EFF;
    color:#fff;
    line-height:0.72rem;
    text-align: center;
    padding: 0;
    font-size: 0.32rem;
    position: absolute;
    margin: auto;
    top:0;
    bottom: 0;
    right: 0;
  }
  .countdown{
    width:2.24rem;
    height:0.64rem;
    line-height: 0.64rem;
    text-align: center;
    border:1px solid rgba(64,158,255,1);
    border-radius:0.32rem;
    font-size:0.26rem;
    font-weight:400;
    color:rgba(64,158,255,1);
    position: absolute;
    margin: auto;
    top:0;
    bottom: 0;
    right: 0;
  }
  .container{
    background:#f3f3f3;
  }
  .submit{
   display: block;
    width:90%;
    height:1.173rem;
    background:rgba(64,158,255,1);
    box-shadow:0px 0.08rem 0.173rem 0px rgba(64,158,255,0.5);
    border-radius:0.106rem;
    padding: 0;
    text-align: center;
    line-height:1.173rem;
    font-size:0.42rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 1.2rem auto 0 !important;


  }
  .button button{
    width: 92%;
    height: 1.173rem;
    outline: none;
    border: none;
    background-color: #409eff;
    font-size: .426rem;
    font-weight: 500;
    color: #fff;
    display: block;
    margin: 0 auto .38rem!important;
    box-shadow:0px 0.08rem 0.13rem 0px rgba(64,158,255,0.5);
    border-radius:0.10rem;
  }
  .button{
    margin: 1.2rem auto 0 !important;
  }
  .button button.goback-btn {
    background: #f3f3f3;
    border: 1px solid #409eff;
    color: #409eff;
    box-shadow: none;
  }

</style>
