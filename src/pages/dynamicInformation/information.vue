<template>
  <div class="wrap">
    <!--pages/consult/consult.wxml-->
    <div class="page">
      <div class="consult-list">
        <div class="item van-hairline--top-bottom"
             v-for="item in list"
             :key="item.id"
             @click="goDetail(item)">
          <img class="cover"
               :src="item.logoPic">
          <van-row>
            <van-col span="18">
              <div class="name">{{item.title}}</div>
            </van-col>
            <!-- <van-col span="3">
              <div class="div"><img class="icon"
                     src="../../assets/images/see.png">{{item.view}}</div>
            </van-col>
            <van-col span="3">
              <div class="focus"><img class="icon"
                     src="../../assets/images/focus.png">{{item.focus}}</div>
            </van-col> -->
          </van-row>
          <div class="describe van-multi-ellipsis--l3">{{item.abstracts}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import http from '../../api/public'
import { getStore } from '@/utils/storage'
export default {
  name: "Information",
  data () {
    return {
      list: []
    }
  },
  methods: {
    goDetail (item) {
      if (item.url) {
        window.location.href = item.url
      } else {
        this.$router.push({
          path: '/informationDetail',
          query: {
            noteId: item.id
          }
        })
      }
    },
    getList () {
      let that = this
      http.post('/App/wechat/getNews').then(res => {
        let list = []
        if (res.list.length) {
          for (let i = 0; i < res.list.length; i++) {
            list.push({
              id: res.list[i].id,
              abstracts: res.list[i].abstracts,
              author: res.list[i].author,
              content: res.list[i].content,
              date: res.list[i].date,
              logoPic: res.list[i].logoPic || require('../../assets/images/information_default.jpg'),
              title: res.list[i].title,
              url: res.list[i].url
            })
          }
          that.list = list
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
/* pages/consult/consult.wxss */
.consult-list {
  padding: 0 0.4rem;
}
.consult-list .item {
  padding: 0.4rem 0;
}
.consult-list .cover {
  width: 100%;
  height: 4.26rem;
  margin-bottom: 0.373rem;
  border-radius: 0.26rem;
}
.consult-list .item .icon {
  width: 0.48rem;
  height: 0.48rem;
  vertical-align: middle;
  margin-right: 0.13rem;
  line-height: 0.48rem;
  float: left;
}
.consult-list .item .name {
  color: #333333;
  font-size: 0.373rem;
  font-weight: bold;
}
.consult-list .item .describe {
  color: #666666;
  font-size: 0.32rem;
  margin-top: 0.373rem;
}
.div,
.focus {
  line-height: 0.48rem;
}
</style>
