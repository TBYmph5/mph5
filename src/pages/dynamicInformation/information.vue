<template>
<div class="wrap">
  <!--pages/consult/consult.wxml-->
  <div class="page">
    <div class="consult-list">
      <div class="item van-hairline--top-bottom" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
        <img class="cover" :src="item.cover">
        <van-row>
          <van-col span="18">
            <div class="name">{{item.name}}</div>
          </van-col>
          <van-col span="3">
            <div class="div" ><img class="icon" src="../../assets/images/see.png">{{item.view}}</div>
          </van-col>
          <van-col span="3">
            <div class="focus"><img class="icon" src="../../assets/images/focus.png">{{item.focus}}</div>
          </van-col>
        </van-row>
        <div class="describe van-multi-ellipsis--l3">{{item.describe}}</div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
    export default {
        name: "Information",
      data(){
          return{
            list:[
              {
                name:'上渚山奇幻谷首届稻草人节来啦！',
                view:725,
                focus:10,
                cover:'https://image.supconit.net/%E7%A8%BB%E8%8D%89%E4%BA%BA.jpg',
                describe:'带孩子亲近自然！上渚山奇幻谷首届稻草人节强势来袭！',
                src:'https://mp.weixin.qq.com/s/FtdlIuHZOoFOS17LEghB1w'
                // src:'http://www.deqing.gov.cn/jrdq/tpxw/20190906/i2488794.html'
              },
              {
                name: '终于等来了奇幻彩色跑开始的这一天！',
                view: 241,
                focus:10,
                cover: 'https://image.supconit.net/%E5%BD%A9%E8%89%B2%E8%B7%91.jpg',
                describe: '嗨翻天！首届奇幻彩色跑酷炫开炮，每个人都是最靓的仔！',
                src:'https://mp.weixin.qq.com/s/fO75THAdy3PRLYjD1bhUMg'
              }
            ]
          }
      },
      methods:{
        goDetail(item){
          window.location.href=item.src
        }
      }
    }
</script>

<style scoped>
.wrap{
  width: 100%;
  height: 100%;
}
/* pages/consult/consult.wxss */
.consult-list{
  padding:0 0.4rem;
}
.consult-list .item{
  padding:0.4rem 0;
}
.consult-list .cover{
  width:100%;
  height:4.26rem;
  margin-bottom:0.373rem;
  border-radius:0.26rem;
}
.consult-list .item .icon{
  width:0.48rem;
  height:0.48rem;
  vertical-align: middle;
  margin-right:0.13rem;
  line-height: 0.48rem;
  float: left;
}
.consult-list .item .name{
  color:#333333;
  font-size:0.373rem;
  font-weight:bold;
}
.consult-list .item .describe{
  color:#666666;
  font-size:0.32rem;
  margin-top:0.373rem;
}
  .div,.focus{
    line-height: 0.48rem;
  }
</style>
