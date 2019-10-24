<template>
  <div class="wrap">
    <!--pages/evaluation/index.wxml-->
    <div class="page">
      <!-- 热门景点 -->
      <div class="hot-spot">
        <div class="part-name">游记标题</div>
        <van-field v-model="title" placeholder="请输入游记标题"/>
      </div>
      <div class="hot-spot">
        <div class="part-name">游记摘要</div>
        <van-field v-model="abstracts" placeholder="请输入游记摘要"/>
      </div>
      <!-- 评论 -->
      <div class="comment-area">
        <div class="part-name">发表游记</div>
        <div class="text-area-wrap">
          <textarea placeholder="请发表你的游记体验"
                    placeholder-style="font-size:26rpx;color:rgba(153,153,153,1);line-height:30rpx;letter-space:1px;"
                    v-model="content"/>
          <div class="words-number">{{content.length}}/100</div>
        </div>
        <div class="part-name">添加图片 <i>（请添加少于4张图片）</i></div>
        <div class='imgs-gallery'>
          <div :class="postData.length>4?'upload-img-5':'upload-img-1'">
            <div class="posting-uploader" >
              <div class="posting-uploader-item" v-for="(item,nn) in postData" :key="nn" >
                <img :src="item.content" alt="图片" class="imgPreview">
                <span @click="delImg(nn)" class="delte iconfont  icon-lajitong"/>
              </div>
              <van-uploader :after-read="afterRead" :accept="'image/*'" v-show="postData.length<4">
                <span class="iconfont icon-xiangji">  <i>添加图片</i></span>

              </van-uploader>
            </div>
          </div>
        </div>
        <button class="submit-btn" @click="submitComment">发表游记</button>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../../api/public'
  import axios from 'axios'
  import {Toast} from 'vant';

  export default {
    name: "publishNote",
    data() {
      return {
        title: '',
        content: '',
        wordsNumber: 0,
        postData: [],
        logoPic: [],
        abstracts: ''
      }
    },
    methods: {
      submitComment() {
        if (this.title == '') {
          Toast.fail('请填写游记标题')
        } else {
          if (this.abstracts == '') {
            Toast.fail('请填写游玩景点')
          } else {
            if (this.content == '') {
              Toast.fail('请填写小于100字游记体验')
            } else {
              if (this.content.length > 100) {
                Toast.fail('请填写小于100字游记体验')
              } else {
                let parmas = {};
                parmas['title'] = this.title;
                parmas['abstracts'] = this.abstracts;
                parmas['content'] = this.content;
                parmas['author'] = this.$route.query.nickName;
                parmas['logoPic'] = this.logoPic.join(',');
                http.post('/App/wechat/saveNote', parmas).then(res => {
                  Toast.success('游记发表成功');
                  this.$router.go(-1)
                })
              }
            }
          }

        }

      },

      delImg(index) {
        // 删除指定下标的图片对象
        if (isNaN(index) || index >= this.postData.length) {
          return false
        }
        let tmp = []
        for (let i = 0, len = this.postData.length; i < len; i++) {
          if (this.postData[i] !== this.postData[index]) {
            tmp.push(this.postData[i])
          }
        }
        this.postData = tmp;
        console.log(index);
        let deletKey = this.logoPic[index];
        this.logoPic.splice(index, 1);
        http.delete('/maintenance/qiniu/' + deletKey).then(res => {
          Toast.success('删除成功')
          console.log(this.logoPic)
        })


      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        //console.log(file);
        let that = this;
        that.postData.push(file)  // postData是一个数组
        lrz(file.file, {
          width: 400, //设置压缩参数,
          quality: 0.7
        }).then(function (rst) {
          /* 处理成功后执行 */
          rst.formData.append('file', rst.base64); // 添加额外参数
          axios.post('/maintenance/qiniu', rst.formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            //console.log(res)
            let responceObj = res.data.obj[0];
            that.logoPic.push(responceObj.key);
            //that.logoPic += responceObj.key + ",";
            console.log("pics",that.logoPic)
          })
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

  /* pages/evaluation/index.wxss */
  .container {
    height: 100%;
    width: 100%;
    background: rgba(244, 244, 244, 1);
    position: relative;
    text-align: left;
    display: block;
  }

  .hot-spot {
    width: 100%;
    background: #fff;
    margin-bottom: 0.26rem;
    padding: 0.49rem 0 0 0.4rem;
    box-sizing: border-box;

  }

  .part-name {
    font-size: 0.4rem;
    font-weight: bold;
    color: rgba(48, 49, 51, 1);
    margin-bottom: 0.53rem;

  }

  .hot-div-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap
  }

  .hot-spot-item {
    display: inline-block;
    padding: 0.13rem 0.33rem;
    background: rgba(244, 244, 244, 1);
    border-radius: 0.346rem;
    font-size: 0.346rem;
    font-weight: 400;
    color: rgba(127, 127, 127, 1);
    margin-right: 0.426rem;
    margin-bottom: 0.426rem;
  }

  .hot-spot-item.active {
    background: rgba(0, 170, 77, 1);
    color: rgba(255, 255, 255, 1);
  }

  .evaluation-wrap {
    width: 92%;
    margin: 0.26rem auto 0;
  }

  .conmment-title {
    font-size: 0.373rem;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 0.13rem;
    display: block;
  }

  .evaluation-content {
    width: 100%;
    height: 8.37rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.21rem;
    overflow: hidden
  }

  .comment-area {
    background: #fff;
    width: 100%;
    height: auto;
    padding: 0.49rem 0.4rem 0 0.4rem;
    box-sizing: border-box;
    height: calc(100% - 3.98rem);
    box-sizing: border-box;
  }

  .text-area-wrap {
    width: 100%;
    height: 3.76rem;
    position: relative;
    margin-bottom: 0.4rem;
  }

  .comment-area textarea {
    width: 100%;
    height: 3.76rem;
    background: rgba(243, 243, 243, 1);
    border-radius: 0.106rem;
    /* margin: 40rpx auto ; */
    line-height: 0.4rem;
    padding-top: 0.26rem;
    text-indent: 0.26rem;
    font-size: 0.373rem;
    box-sizing: border-box;
    border-color: rgba(243, 243, 243, 1);

  }

  .words-number {
    position: absolute;
    bottom: 0.13rem;
    right: 0.26rem;
    font-size: 0.32rem;
    color: rgba(153, 153, 153, 1);
  }

  .imgs-gallery {
    width: 100%;
    box-sizing: border-box;
    /* padding-left: 30rpx; */
    margin-top: 0.53rem;
    height: 2rem;
  }

  .add-imgs-wrap {
    width: 1.86rem;
    height: 1.86rem;;
    border: 1px dashed rgba(228, 228, 228, 1);
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-left: 0.26rem;
    overflow-anchor: hidden;
    display: inline-block;
    position: relative;
  }

  .add-imgs-wrap img {
    display: block;
    width: 1.06rem;
    height: 1.06rem;
    margin: 1.06rem;
  }

  .img-length {
    position: absolute;
    bottom: 0.13rem;
    right: 0.13rem;
  }

  .gallery-item {
    display: inline-block;
    margin-left: 0.26rem;
    float: left;
    width: 1.86rem;
    height: 1.86rem;
    position: relative;
  }

  .gallery-item img {
    width: 1.86rem;
    height: 1.86rem;

  }

  .submit-btn {
    width: 4.26rem;
    height: 1.173rem;
    background: rgba(0, 170, 77, 1);
    box-shadow: 0px 6px 15px 0px rgba(0, 170, 77, 0.3);
    border-radius: 0.57rem;
    margin: 0 auto;
    line-height: 1.173rem;
    text-align: center;
    font-size: 0.4rem;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    margin-top: 1.6rem;
  }

  .delet-icon {
    width: 0.36rem;
    height: 0.36rem;

    position: absolute;
    top: -0.073rem;
    right: 0;

  }

  .delet-icon img {
    width: 100%;
    height: 100%;
  }

  .imgs-gallery {
    text-align: left;
    padding-left: 0.3rem;
  }

  .upload-img-5 {
    margin: 5px 0 90px 0;
  }

  .upload-img-1 {
    margin: 5px 0 15px 0;
  }

  .icon-lajitong {
    position: absolute;
    top: 2px;
    right: 2px;
    color: #fff;
  }

  .van-uploader {
    width: 2rem;
    height: 2rem;
    border: 1px dashed rgba(153, 153, 153, 1);
    border-radius: 0.08rem;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .van-uploader__input-wrapper, .van-uploader__wrapper {
    width: 1.49rem;
    height: 1.49rem;
    text-align: center;
  }

  .van-uploader .iconfont.icon-xiangji {
    font-size: 1rem;
    width: 2rem;
    height: 2rem;
    display: inline-block;
    line-height: 1.5rem;
    color: #999999;
  }

  .van-uploader .iconfont.icon-xiangji i {
    font-size: 0.26rem;
    display: block;
    font-style: normal;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    position: relative;
    top: -0.7rem;
  }

  ::-webkit-input-placeholder {
    color: #999999;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #999999;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #999999;
  }

  :-ms-input-placeholder {
    color: #999999;
  }

  .submit-btn {
    display: block;
    margin: 1.8rem auto 0;
  }
.posting-uploader.height{
  height: 2rem;
}
  .posting-uploader-item {
    width: 2rem;
    height: 2rem;
    float: left;
    margin-right: 0.1rem;
    position: relative;
  }

  .posting-uploader-item img {
    width: 100%;
    height: 100%;
  }
  .part-name i{
    font-style: normal;
    font-size: 0.27rem;
    color: #999999;
    font-weight: normal;
  }
</style>
