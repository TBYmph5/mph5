<template>
  <div class="wrap">

    <div class='container'>
      <div class='info-item avtar-info'>
        <div class='cell-title cell-content'>我的头像</div>
        <div class='cell-content'>

          <!--<van-uploader class='avatar-img-wrap'  :after-read="afterRead" accept="image/*" multiple>-->
            <!--<img  class="head-img" :src="avatar" />-->
          <!--</van-uploader>-->

          <div class='avatar-img-wrap'>
            <img :src='avatar'>

          </div>
          <van-uploader :after-read="afterRead" >
            <span class='iconfont icon-arrow-right-copy-copy-copy'></span>
          </van-uploader>

        </div>
      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>昵称</div>
        <div class='cell-content' v-if='replaceNickName'>
          <input placeholder="" v-model="nickName"/>
        </div>
        <div class='cell-content' v-else>
          {{nickName}}
          <span class='iconfont icon-arrow-right-copy-copy-copy' @click='replaceThisNickerName'></span>
        </div>
      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>姓名</div>
        <div class='cell-content' v-if="replaceUserName">
          <input placeholder="" v-model="userName"/>
        </div>
        <div class='cell-content' v-else>
          {{userName}}
          <span class='iconfont icon-arrow-right-copy-copy-copy' @click='replaceThisUserName'></span>
        </div>

      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>性别</div>

        <div class='cell-content' v-if="replaceSex">
          <div class='cell-content' @click='opensexPopupShow'
               style='padding-right:1.13rem;font-size:0.42rem;font-weight:400;color:rgba(51, 51, 51, 1);'>
            {{sexArray[index].text}}
          </div>

          <van-popup
            v-model="sexPopupShow"
            position="bottom"
            @close="onClose"
            :overlay="overlay" class='sex-mune-poup'
          >
            <div class='sex-mune-wrap'>
              <div class='sex-mune-item' v-for="(item,index ) in sexArray" :key='index' @click='sexChoose(item,index)'>
                {{item.text}}
              </div>
            </div>
            <div class='close-sex-popup' @click="onClose">关闭</div>
          </van-popup>
        </div>
        <div class='cell-content' v-else>
          {{sexArray[index].text}}
          <span class='iconfont icon-arrow-right-copy-copy-copy' @click='replaceThisSex'></span>
        </div>

      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>我的生日</div>
        <div class='cell-content' v-if="replaceBirthDay">
          <div @click='openChooseBirthDay'>{{date|formmatterTimer}}</div>

          <van-popup
            v-model=" chooseBirthDayshow "
            position="bottom"
            :overlay="overlay"
            @close="chooseBirthDayshowonClose"
          >
            <van-datetime-picker
              type="date"
              v-model="date"
              :formatter="formatter"
              @cancel="chooseBirthDayCancel"
              @confirm='chooseBirthDayConfirm'
            />
          </van-popup>
        </div>
        <div class='cell-content' v-else>
          {{date|formmatterTimer}}
          <span class='iconfont icon-arrow-right-copy-copy-copy' @click='replaceThisBirthDay'></span>
        </div>

      </div>
      <div class='user-introduce '>
        <span class='cell-title'>自我介绍</span>
        <span class='iconfont icon-bianji' @click='replaceUserIntro' v-if="!replaceUserIntroduce"></span>
        <div class='user-introduce-show' v-if="replaceUserIntroduce">
          <text-area auto-focus maxlength='100' v-model='userIntroduce'/>
        </div>
        <div class='user-introduce-show' v-else>
          {{userIntroduce}}
        </div>

      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>绑定手机</div>
        <div class='cell-content'>
          {{ phone}}
          <span class='tips' @click='bindPhone' v-if="  phone !==''">修改</span>
          <span class='tips' @click='bindPhone' v-else>去绑定</span>
          <!-- <span class='iconfont icon-arrow-right-copy-copy-copy'></span> -->
        </div>
      </div>
      <div class='info-item '>
        <div class='cell-title cell-content'>绑定邮箱</div>
        <div class='cell-content' style="span-align:right;">
          {{email}}
          <span class='tips' style="margin-left: 0.15rem;" @click='bindEmail' v-if="email !==''">修改</span>
          <span class='tips' style="margin-left: 0.15rem;" @click='bindEmail' v-else>去绑定</span>
          <!-- <span class='iconfont icon-arrow-right-copy-copy-copy'></span> -->
        </div>
        <!-- 保存按钮 -->
        <div class="btn-group" style="margin: 0rem auto 0 !important">
          <button class="cancel submit-btn" @click="goBack">返回</button>
          <button class="submit-btn"
                  v-if='replaceAvtar||replaceNickName||replaceUserName||replaceSex ||replaceBirthDay ||replaceUserIntroduce'
                  @click="saveUserInfo">保存
          </button>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  import http from '../api/public'
  import axios from 'axios'
  import moment from 'moment'
  import {Toast} from 'vant';
  import lrz from 'lrz'
  export default {
    name: "userInfo",
    data() {
      return {
        res:'',
        userId: '',
        avatar: '',
        qiNiuAvatar: '',
        replaceAvtar: false,
        replaceNickName: false,
        nickName: 'Na ya Na',
        replaceUserName: false,
        userName: '未填写',
        phone: '',
        email: '',
        replaceSex: false,
        sexPopupShow: false,
        overlay: true,
        index: 0,
        sexArray: [{
          text: '女'
        }, {
          text: '男'
        }],
        replaceBirthDay: false,
        chooseBirthDayshow: false,
        formatter(type, value) {
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`;
          }
          return `${value}日`;
        },
        date: new Date(),
        userIntroduce: '这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左 这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，字数大约在50字左右，这是一段用户的自我介绍，自我介自我介自我介自我介自我介自我介自我介字数大约在100字左',
        replaceUserIntroduce: false,
        qiNiu: this.$store.state.qiNiuLink,

      }
    },
    mounted() {
      this.getCurrentUserInfo()
    },
    filters: {
      formmatterTimer: function (value) {
        return moment(value).format("YYYY-MM-DD")

      }
    },

    methods: {
      /**
       * 获取用户信息
       */
      getCurrentUserInfo() {
        var that = this;
        http.get('/customer/info/getCurrentInfo').then(res => {
          console.log(res.obj);
          let UserInfoJson = res.obj;
          let avatarImgUrl = '';
          debugger
          if (UserInfoJson.avatar == '') {
            avatarImgUrl = 'http://image.supconit.net/avtar.png'
          } else {
            avatarImgUrl = this.qiNiu + '/' + UserInfoJson.avatar

          }
          that.avatar = avatarImgUrl;
          if (UserInfoJson.birthDate !== '') {
            that.date = new Date(parseInt(UserInfoJson.birthDate));
          }
          ;
          if (UserInfoJson.sex !== '') {
            that.index = UserInfoJson.sex;
          }
          ;
          if (UserInfoJson.nickName !== '') {
            that.nickName = UserInfoJson.nickName;
          } else {
            that.nickName = UserInfoJson.phone;
          }
          ;
          if (UserInfoJson.realName !== '') {
            that.userName = UserInfoJson.realName;
          }
          if (UserInfoJson.email !== '') {
            that.email = UserInfoJson.email;
          }
          if (UserInfoJson.phone !== '') {
            that.phone = UserInfoJson.phone;
          }


          // that.qiNiuAvatar = UserInfoJson.avatar;
          that.userId = UserInfoJson.id;

        })
      },
      /**
       * 更换头像
       */

      afterRead(file) {
        this.replaceAvtar = true;
        this.avatar=file.content;
        let that=this;
        /* 压缩图片 */
        lrz(file.file, {
          width: 400, //设置压缩参数,
          quality:0.7
        }).then(function (rst) {
          /* 处理成功后执行 */
          rst.formData.append('file', rst.base64); // 添加额外参数
          axios.post('/maintenance/qiniu',rst.formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            let responceObj = res.data.obj[0];
            that.qiNiuAvatar = responceObj.key;
            // this.avatar = this.qiNiu + '/' + responceObj.key;
            Toast.success('图片上传成功')

          }).catch(e=>{
            Toast.fail('图片上传成功失败')
          })
        })


      },
      /**
       * 修改昵称
       */
      replaceThisNickerName() {
        this.replaceNickName = true
      },
      /**
       * 修改姓名
       */
      replaceThisUserName() {
        this.replaceUserName = true
      },
      /**
       * 修改性别
       */
      replaceThisSex() {
        this.replaceSex = true
      },
      opensexPopupShow() {
        this.sexPopupShow = true
      },
      onClose() {
        this.sexPopupShow = false
      },
      sexChoose(item, index) {
        this.index = index

      },
      // 修改生日
      replaceThisBirthDay() {
        this.replaceBirthDay = true

      },
      openChooseBirthDay: function () {
        this.chooseBirthDayshow = true

      },
      chooseBirthDayCancel() {
        this.chooseBirthDayshow = false

      },
      chooseBirthDayshowonClose() {
        this.chooseBirthDayshow = false
      },
      chooseBirthDayConfirm(value) {
        console.log(value)
        this.date = value,
          this.chooseBirthDayshow = false;
      },
      // 修改介绍
      replaceUserIntro() {
        this.replaceUserIntroduce = true

      },
      /**
       * 绑定邮箱
       */
      bindEmail() {
        this.$router.push({
          path: '/bindemail'
        })

      },
      /**
       * 绑定手机
       */
      bindPhone() {
        this.$router.push({
          path: '/bindphone'
        })

      },
// 保存info
      saveUserInfo() {
        let parmas = {};
        parmas["ali"] = '';
        parmas["avatar"] = this.qiNiuAvatar;
        parmas["birthDate"] = this.date;
        parmas["email"] = this.email;
        parmas["nickName"] = this.nickName;
        parmas["phone"] = this.phone
        parmas["qq"] = '';
        parmas["realName"] = this.userName;
        parmas["sex"] = this.index;
        parmas["wx"] = '';
        http.put('/customer/info/' + this.userId, parmas).then(res => {
          Toast.success("信息修改成功");
          debugger
          this.getCurrentUserInfo()
        })
      },
      goBack() {
        this.$router.go(-1);
      }

    }
  }
</script>

<style scoped>
  /* pages/userInfo/index.wxss */

  .container {
    background: #f3f3f3;
  }

  .avatar-img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .info-item {
    height: 1.46rem;
    width: 100%;
    background: #fff;
    line-height: 1.46rem;
    padding: 0 0.4rem;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom: 1px solid #f3f3f3;
  }

  .info-item.avtar-info {
    height: 1.76rem;
    line-height: 1.76rem;
  }

  .info-item .cell-content {
    display: inline-block;
    height: 1.46rem;
    overflow: hidden;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    /* line-height: 110rpx; */
  }

  .info-item .cell-content:first-child {
    float: left;
  }

  .info-item .cell-content:last-child {
    float: right;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .info-item .avatar-img-wrap {
    width: 1.173rem;
    height: 1.173rem;
    border-radius: 50%;
    margin-top: 0.29rem;
    float: left;
  }

  .iconfont.icon-arrow-right-copy-copy-copy {
    color: #969696;
    font-size: 0.53rem;
    margin-left: 0.53rem;
  }

  .user-introduce {
    width: 100%;
    height: 2.84rem;
    background: rgba(255, 255, 255, 1);
    margin: 0.26rem 0;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0 0.4rem;
    position: relative;
  }

  .user-introduce .cell-title {
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .iconfont.icon-bianji {
    position: absolute;
    top: 0.2rem;
    right: 0.4rem;
    color: #409eff;
  }

  .user-introduce-show {
    margin-top: 0.13rem;
    width: 100%;
    height: 1.73rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 0.43rem;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  .tips {
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
  }

  .cell-content input {
    height: 100%;
    text-align: center;
    width: 2.66rem;
    outline: none;
    border: none;
  }

  .cell-content .picker {
    height: 100%;
    text-align: center;
    width: 2.66rem;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .user-introduce-show textarea {
    width: 100%;
    height: 100%;
  }

  .sex-mune-poup .van-bottom-enter.van-bottom-enter.van-bottom-enter-active.van-bottom-enter-active.van-popup .van-popup.van-popup--bottom.van-popup--bottom {
    background: transparent !important;
  }

  .sex-mune-poup .van-popup--bottom {
    background: transparent !important;
  }

  .sex-mune-wrap {
    width: 94%;
    height: 2.94rem;
    background: rgba(249, 249, 249, 1);
    border-radius: 0.21rem;
    margin: 0 auto;
    text-align: center;
  }

  .sex-mune-wrap .sex-mune-item {
    width: 100%;
    height: 1.46rem;
    line-height: 1.46rem;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
  }

  .sex-mune-wrap .sex-mune-item:first-child {
    border-bottom: 1px solid rgba(173, 173, 173, 0.5);
  }

  .close-sex-popup {
    width: 94%;
    height: 1.46rem;
    background: rgba(249, 249, 249, 1);
    border-radius: 0.21rem;
    margin: 0.13rem auto 0.26rem;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    line-height: 1.46rem;
  }

  .save-userInfo {
    width: 4.02rem;
    height: 0.90rem;
    background: rgba(64, 158, 255, 1);
    border-radius: 0.45rem;
    margin: 0 auto 0;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.373rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .sex-mune-poup .van-ellipsis {
    padding: 0 0.46rem;
    display: inline-block;
    font-size: 0.32rem;
  }


</style>
