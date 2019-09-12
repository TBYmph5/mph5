<template>
    <div class="wrap">
      <!--pages/bindEmail/index.wxml-->
      <div class='container'>
        <div class='bind-wrap'>
          <div class='bind-item'>邮箱
            <div class='input-wrap'>
              <input placeholder="请输入邮箱地址" auto-focus placeholder-style="color:#ADADAD;font-size:32rpx;"   v-model="email"/>
              <span class='iconfont icon-guanbi' @click='clearInput'></span>
            </div>
          </div>
          <div class='bind-item'>验证码
            <div class='input-wrap'>
              <input placeholder="请输入验证码"  placeholder-style="color:#ADADAD;font-size:32rpx;" v-if='!countdownShow' />
              <div class='getVerificationCode' v-if='countdownShow' @click="getCode">获取验证码</div>
              <div class='countdown' v-else>重新获取({{countdown}}s)</div>
            </div>
          </div>
          <!-- 提交按钮 -->
          <div class="btn-group">
            <button  class="cancel submit-btn">取消</button>
          <button class="submit-btn"  @click='bindGo'>绑定</button>


          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import http from '../api/public'
  import {Toast} from 'vant';
    export default {
        name: "bindemail",
      data(){
          return{
            countdownShow: true,
            countdown: 60,
            email: '1542142885@qq.com'
          }
      },
      methods:{
        clearInput: function() {
          this.email= ''
        },
        getCode:function() {
          this.checkEmail(this.email)
        },
        bindGo: function() {

        },
        checkEmail: function(email) {
          let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
          if (str.test(email)) {
            console.log('邮箱验证正确')
            this.countdownShow=false
            this.timer()
            return true
          } else {
            Toast.fail('请填写正确的邮箱号');
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
    border-bottom:1px solid #f3f3f3;
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

  .bind-wrap .bind-item .input-wrap {
    width: 58%;
    height: 100%;
    float: right;
    position: relative;
  }
  .bind-wrap .bind-item .input-wrap input{
    width: 5.06rem;
    font-size:0.42rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    outline: none;
    border: none;
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
    right: 0;
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
    outline: none;
    border: none;
    width:90%;
    height:1.15rem;
    background:rgba(64,158,255,1);
    box-shadow:0px 0.08rem  0.13rem 0px rgba(64,158,255,0.5);
    border-radius:0.106rem;
    padding: 0;
    text-align: center;
    line-height: 1.15rem;
    font-size:0.426rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin: 1.2rem auto 0 !important;

  }

</style>
