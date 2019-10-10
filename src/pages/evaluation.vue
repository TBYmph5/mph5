<template>
  <div class="wrap">
    <!--pages/evaluation/index.wxml-->
    <div class="container">
      <div class="order-detail-content">
        <div class='order-info-wrap'>
          <div class='order-icon-wrap'>
            <img :src='orderDteial.icon'>
          </div>
          <div class='order-info-content'>
          <span class='order-name'>
            {{productSnapshot.name}}

          </span>
            <span class='order-number'>订单编号:
            {{orderDteial.id}}
          </span>
            <span class='order-effective-date'>行程有效期：
            {{orderDteial.effectiveDate}}
          </span>
            <div class='order-price'>
              <span class='unit'>¥</span>
              {{orderDteial.price}}

            </div>
          </div>
        </div>
      </div>
      <!-- 订单信息end -->
      <div class="evaluation-wrap">
        <span class="conmment-title">评价</span>
        <div class="evaluation-content">
          <div class="comment-star">
            <div class="satr-item iconfont icon-collection " :class="index<=gend-1?'active':''"
                 v-for="(item,index) in 5" :key="index" @click="lightStar(item,index)"></div>
            <span class="gend">{{gend}} 分</span>
          </div>
          <!-- 评论 -->
          <div class="comment-area">
            <textarea placeholder="写下你想法吧" auto-focus
                      placeholder-style="font-size:12px;color:rgba(153,153,153,1);line-height:30rpx;"
                      v-model="comment"/>
          </div>
          <div class='imgs-gallery'>
            <div :class="postData.length>4?'upload-img-5':'upload-img-1'">
              <div class="posting-uploader">
                <div class="posting-uploader-item" v-for="(item,nn) in postData" :key="nn">
                  <img :src="item.content" alt="图片" class="imgPreview">
                  <span @click="delImg(nn)" class="delte iconfont  icon-lajitong"/>
                </div>
                <van-uploader :after-read="afterRead" :accept="'image/*'" v-show="postData.length<4">
                  <span class="iconfont icon-xiangji">  <i>添加图片</i></span>

                </van-uploader>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group">
      <button class="cancel submit-btn" @click="goBack">取消</button>
      <button class="submit-btn" @click="submitComment">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '../api/public'
  import axios from 'axios'
  import {Toast} from 'vant';
  export default {
    name: "evaluation",
    data() {
      return {
        fileList: [],
        postData: [],
        orderDteial: {},
        productSnapshot: {},
        responseString: [],
        gend: 1,
        comment: '',

        uploadResponceArray: []
      }

    },
    mounted() {
      this.getOrderDetail(this.$route.query.orderId)
    },
    methods: {
      /**
       * 星星点击
       */
      lightStar(index) {
        var that = this;

        that.gend = index


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
        let deletKey = this.responseString[index];
        this.responseString.splice(index, 1);
        http.delete('/maintenance/qiniu/' + deletKey).then(res => {
          Toast.success('删除成功')
          console.log(this.responseString)
        })


      },

      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
        let that=this;
        that.postData.push(file)  // postData是一个数组
        lrz(file.file, {
          width: 400, //设置压缩参数,
          quality:0.7
        }).then(function (rst) {
          /* 处理成功后执行 */
          rst.formData.append('file', rst.base64); // 添加额外参数
          axios.post('/maintenance/qiniu', rst.formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            console.log(res)
            let responceObj = res.data.obj[0];
            that.responseString.push(responceObj.key);
            console.log(this.responseString)
          })
        })
      },

      submitComment() {
        let imgKeyString = this.responseString.join(',')
        let parmas = {};
        console.log();
        parmas['orderId'] = this.$route.query.orderId;
        parmas['score'] = this.gend;
        parmas['comment'] = this.comment;
        parmas['imgUrl'] = imgKeyString.slice(0, imgKeyString.length - 1);
        http.post('/order/comment', parmas).then(res => {
          Toast.success('评论成功')
          this.$router.go(-1);//返回上一层
        })
        // wx.request({
        //   url: 'https://www.supconit.net/order/comment',
        //   data: parmas,
        //   header: {
        //     'cookie': wx.getStorageSync("sessionid") //读取cookie
        //   },
        //   method: 'POST',
        //   dataType: 'json',
        //   responseType: 'text',
        //   success: function (res) {
        //
        //   }
        // })
      },
      getOrderDetail(id) {
        var that = this;
        http.get('/order/info/getById/' + id,).then(res => {
          console.log(res);
          let record = res.obj;
          record['productSnapshot'] = JSON.parse(record.productSnapshot);
          switch (record.type) {
            case 1:
              record['icon'] = 'https://image.supconit.net/hotelOrder.png'
              break;
            case 2:
              record['icon'] = 'https://image.supconit.net/viewOrder.png'
              break;
          }
          console.log(record.productSnapshot)
          if (record['productSnapshot'].productInfoList.length > 1) {
            record['effectiveDate'] = record.productSnapshot.productInfoList[0].useDate + ' 至' + record.productSnapshot[record.productSnapshot.productInfoList.length - 1].useDate
          } else {
            record['effectiveDate'] = record.productSnapshot.productInfoList[0].useDate
          }
          that.orderDteial = record;
          this.productSnapshot = record.productSnapshot

        })


      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  /* pages/evaluation/index.wxss */
  .container {
    background: rgba(243, 243, 243, 1);
    position: relative;
  }

  .order-detail-content {
    width: 100%;
    height: 2.64rem;
    background: rgba(255, 255, 255, 1);
    text-align: left;
  }

  .order-item-wrap {
    width: 100%;
    height: 2.64rem;
    position: relative;
    overflow: hidden;
    border-radius: 0.13rem;
    margin-bottom: 0.13rem;
  }

  .order-item-wrap:last-child {
    margin-bottom: 0;
  }

  .order-info-wrap {
    height: 100%;
    width: 100%;
    padding: 0 0.4rem;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;

  }

  .order-icon-wrap {
    width: 1.146rem;
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
    /* padding-top:47rpx; */
  }

  .order-info-content .order-name {
    display: block;
    height: 0.53rem;
    font-size: 0.34rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 0.066rem;
    margin-top: 0.62rem;
  }

  .order-info-content .order-number, .order-info-content .order-effective-date {
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
    right: 0.667rem;
  }

  .order-state {
    position: absolute;
    top: 0.13rem;
    right: 0.26rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
  }

  .evaluation-wrap {
    width: 9.2rem;
    margin: 0.26rem auto 0;
  }

  .conmment-title {
    font-size: 0.37rem;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 0.13rem;
    display: block;
    text-align: left;
  }

  .evaluation-content {
    width: 100%;
    height: 8.7rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.21rem;
    overflow: hidden
  }

  .comment-star {
    width: 100%;
    text-align: center;
    margin-top: 0.66rem;
  }

  .satr-item {
    display: inline-block;
    color: rgba(255, 198, 0, 0.5);
    font-size: 0.64rem;
    margin-right: 0.4rem;
    cursor: pointer;
  }

  .satr-item.active {
    color: rgba(255, 198, 0, 1);
  }

  .gend {
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(255, 198, 0, 1);
  }

  .comment-area textarea {
    width: 8.66rem;
    height: 3.2rem;
    background: rgba(243, 243, 243, 1);
    border-radius: 0.106rem;
    margin: 0.53rem auto;
    line-height: 0.6rem;
    padding-top: 0.133rem;
    text-indent: 0.26rem;
    font-size: 0.37rem;
    outline: none;
    border: none;
    resize: none;
    letter-spacing: 1px;

  }
  .comment-area{
    text-align: center;
  }

  .add-images-wrap {
    width: 1.49rem;
    height: 1.49rem;
    border: 1px dashed rgba(153, 153, 153, 1);
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
    margin-left: 0.26rem;
    overflow-anchor: hidden;
    display: inline-block;
  }

  .add-images-wrap .iconfont {
    display: block;
    font-size: 0.85rem;
    margin-top: 0.13rem;
  }

  .gallery-item {
    display: inline-block;
    margin-left: 20.26rem;
    float: left;

    background: red;
  }

  .posting-uploader-item {
    width: 2rem;
    height: 2rem;
    position: relative;
    float: left;
    margin-right: 0.1rem;
  }

  .gallery-item img, .posting-uploader-item img {
    float: left;
    width: 2rem;
    height: 2rem;
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
    bottom: 2px;
    right: 2px;
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
    color:#999999;
  }

  .van-uploader .iconfont.icon-xiangji i {
    font-size: 0.26rem;
    display: block;
    font-style: normal;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    position: relative;
    top:-0.7rem;
  }
  ::-webkit-input-placeholder {
    color: #999999;
  }
  :-moz-placeholder {/* Firefox 18- */
    color: #999999;
  }
  ::-moz-placeholder{/* Firefox 19+ */
    color: #999999;
  }
  :-ms-input-placeholder {
    color: #999999;
  }
</style>
