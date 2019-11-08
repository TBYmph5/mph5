<template>
  <div class="wrap">
    <div class="travel-note-content">
      <div class="travel-note-content-wrap">
        <!--轮播图开始-->
        <div class="banner">
          <div class="swiper-container">
            <van-swipe :autoplay="3000"
                       indicator-color="white">
              <van-swipe-item v-for="(item,index) in  imgs"
                              :key="index">
                <img :src="item"
                     alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <!--轮播图结束-->
        <div class="travel-note">
          <p class="travel-note-title">{{note.title}}</p>
          <span class="play-spots">
            <i>{{note.abstracts}}</i>
          </span>
          <div class="note"
               v-html="note.content">

          </div>
          <div class="view-number">{{note.author}} 发表于{{note.date}} <span class="view-item"> <i class="view-icon see-icon"></i> 浏览量：{{note.visit}}</span>
          </div>
        </div>
        <div class="comment-list"
             v-if="commentList.length">
          <div class="title">游客评价</div>
          <div class="list">
            <div class="item van-hairline--bottom"
                 v-for="item in commentList"
                 :key="item.id">
              <van-row type="flex"
                       align="center"
                       justify="center">
                <van-col span="3">
                  <van-icon size="2em"
                            name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
                </van-col>
                <van-col span="13"
                         class="phone">{{item.username|fuzzyPhone}}</van-col>
                <van-col span="8"
                         class="time">{{item.commentDate}}</van-col>
              </van-row>
              <div class="item-content">{{item.comment}}</div>
            </div>
          </div>
        </div>
      </div>
      <!--操作-->
      <div class="option-wrap">
        <div class="option-item">
          <span :class="like? 'active':''"><i class="option-icon"
               @click="likeIt"></i>{{note.LikeTime}}</span>
        </div>
        <div class="option-item"
             @click="showComments">
          <span><i class="option-icon"></i>{{note.comment}}</span>
        </div>
      </div>
    </div>
    <van-action-sheet v-model="isShowComments"
                      title="发表评价"
                      :close-on-click-overlay="false">
      <div class="submitComments">
        <van-cell-group>
          <van-field v-model="comment"
                     rows="5"
                     autosize
                     type="textarea"
                     maxlength="300"
                     placeholder="请发表评价"
                     show-word-limit />
        </van-cell-group>
        <van-row>
          <van-col span="12"
                   style="text-align:center;">
            <van-button type="default"
                        plain
                        color="rgba(0, 170, 77, 1)"
                        class="comment-btn"
                        @click="cancelComment">取消</van-button>
          </van-col>
          <van-col span="12"
                   style="text-align:center;">
            <van-button type="primary"
                        class="comment-btn"
                        :loading="commentLoading"
                        @click="submitComment">发表</van-button>
          </van-col>
        </van-row>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import http from '../../api/public'
import { getStore, removeStore, setStore } from '@/utils/storage'
import { Toast } from 'vant'
export default {
  name: "noteDetail",
  data () {
    return {
      note: {},
      playSpot: [],
      noteArray: [],
      userName: '',
      like: false,
      imgs: [],
      isShowComments: false,
      comment: '',
      commentList: [],
      commentLoading: false
    }
  },
  mounted () {
    this.getUserInfo()
    this.getComments()
  },
  filters: {
    fuzzyPhone: function (value) {
      return value.substring(0, value.length - 4) + '****'
    }
  },
  methods: {
    getUserInfo () {
      http.get('/customer/info/getCurrentInfo').then(res => {
        if (res.obj.nickName !== '') {
          this.userName = res.obj.nickName
        } else {
          this.userName = res.obj.phone
        }
        this.getNoteDetail()
      })
    },
    getNoteDetail () {
      let params = {}
      params['noteId'] = this.$route.query.noteId;
      params['openId'] = getStore('openId');
      params['username'] = this.userName
      http.post('/App/wechat/getNoteById', params).then(result => {
        let imgList = []
        this.like = result.like;
        this.note = result.data;
        result.logos.forEach(item => {
          this.imgs.push(item)
        })
      })

    },
    likeIt () {
      let parmas = {};
      parmas['noteId'] = this.$route.query.noteId;
      parmas['openId'] = getStore('openId');
      parmas['username'] = this.userName;

      if (!this.like) {
        parmas['like'] = 1
      } else {
        parmas['like'] = 0
      }
      http.post('/App/wechat/updateUserAction', parmas).then(res => {
        this.getNoteDetail();

      })
    },
    // 获取游客评价
    getComments () {
      let that = this
      http.post('/App/wechat/getComments', { noteId: this.$route.query.noteId }).then(res => {
        that.commentList = res.list
        that.note.comment = res.list.length
      })
    },
    //发表评论
    submitComment () {
      let that = this
      this.commentLoading = true
      let param = {
        username: this.userName,
        openId: getStore('openId'),
        noteId: this.$route.query.noteId,
        comment: this.comment
      }
      http.post('/App/wechat/saveComment', param).then(res => {
        that.commentLoading = false
        that.comment = ''
        that.cancelComment()
        that.getComments()
        Toast.success('发表成功');
      })
    },
    //关闭评论弹框
    cancelComment () {
      this.isShowComments = false
    },
    //打开评论弹框
    showComments () {
      this.isShowComments = true
    }
  }
}
</script>
<style>
.submitComments .van-cell__value--alone {
  background: rgba(244, 244, 244, 0.7);
  padding: 0.31rem;
}
.submitComments .van-field__control {
  max-height: 5.5rem;
}
.submitComments .comment-btn {
  border-radius: 0.53rem;
  padding: 0 1.3rem;
  margin: 0.53rem auto;
}
</style>
<style scope>
.wrap {
  width: 100%;
  height: 100%;
}

.travel-note-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(244, 244, 244, 1);
}
.banner {
  background: #fff;
  padding: 0.4rem 0;
}
.travel-note-content .swiper-container {
  width: 92%;
  height: 4.56rem;
  background: #e5e5e5;
  /* margin: 0.4rem auto; */
  -webkit-border-radius: 0.26rem;
  -moz-border-radius: 0.26rem;
  border-radius: 0.26rem;
}

.swiper-container .van-swipe {
  width: 100%;
  height: 100%;
}

.van-swipe-item img {
  width: 100%;
  height: 100%;
}

.travel-note-title {
  font-size: 0.426rem;
  font-weight: bold;
  color: #333;
  letter-spacing: 1px;
  margin-bottom: 0.36rem;
}

.travel-note {
  height: auto;
  width: 100%;
  padding: 0.4rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
}

.play-spots {
  font-size: 0.36rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin-bottom: 0.4rem;
}

.play-spots i {
  display: inline-block;
  font-style: normal;
  line-height: 0.6rem;
  color: #469aff;
  font-size: 0.32rem;
  padding: 0 0.2rem;
}

.note {
  line-height: 0.8rem;
  font-size: 0.34rem;
  letter-spacing: 1px;
  color: rgba(102, 102, 102, 1);
}

.view-number {
  font-size: 0.32rem;
  font-weight: 400;
  color: #666;
  margin-top: 0.5rem;
}

.view-number span {
  display: inline-block;
  height: 0.48rem;
  line-height: 0.48rem;
  min-width: 0.8rem;
  padding: 0 0.2rem 0 0;
  float: right;
  color: #333;
}

.view-number {
  height: 0.48rem;
  line-height: 0.48rem;
}

.view-number span .view-icon {
  display: inline-block;
  width: 0.48rem;
  float: left;
  height: 0.48rem;
  background: url("../../assets/images/see.png") center no-repeat;
  background-size: 100% 100%;
  margin-right: 0.2rem;
}

.option-wrap {
  width: 100%;
  height: 1.173rem;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -1px 1px 0px rgba(88, 88, 88, 0.1);
  background: #fff;
}

.option-wrap .option-item {
  width: 50%;
  height: 1.173rem;
  line-height: 1.173rem;
  float: left;
  font-size: 0.36rem;
  color: #333333;
  text-align: center;
}

.option-wrap .option-item span {
  padding: 0 0.3rem;
  height: 0.53rem;
  line-height: 0.53rem;
  width: 1rem;
  display: inline-block;
  position: relative;
}

.option-wrap .option-item span i {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 0.53rem;
  height: 0.53rem;
  background: url("../../assets/images/youjizan.png") center no-repeat;
  background-size: 100% 100%;
  float: left;
}

.option-wrap .option-item span.active i {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 0.53rem;
  height: 0.53rem;
  background: url("../../assets/images/notAvtive-noteLike.png") center no-repeat;
  background-size: 100% 100%;
  float: left;
}
.option-wrap .option-item:nth-child(2) span i {
  background: url("../../assets/images/notepinglun.png") center no-repeat;
  background-size: 100% 100%;
}

.travel-note-content-wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1.8rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.img-array {
  width: 100%;
  height: auto;
  padding: 0 0.4rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid transparent;
}
.img-array img {
  width: 100%;
  height: auto;
}
/*.note-words{*/
/*text-indent: 0.4rem;*/
/*}*/
p {
  color: #333;
  letter-spacing: 1px;
  font-size: 0.37rem;
  font-weight: bold;
}
.comment-list {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0.53rem;
}
.comment-list .title {
  font-size: 0.4rem;
  margin-bottom: 0.2rem;
}
.comment-list .list .item {
  padding: 0.4rem 0;
}
.comment-list .list .item-content {
  margin-top: 0.2rem;
  color: rgba(102, 102, 102, 1);
  font-size: 0.34rem;
}
.comment-list .list .phone {
  color: rgba(51, 51, 51, 1);
  font-size: 0.35rem;
}
.comment-list .list .time {
  color: rgba(173, 173, 173, 1);
  font-size: 0.3rem;
  text-align: right;
}
</style>
