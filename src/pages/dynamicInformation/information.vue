<template>
<div class="wrap">
  <!--pages/consult/consult.wxml-->
  <div class="page">
    <div class="consult-list">
      <div class="item van-hairline--top-bottom" v-for="(item,index) in list" :key="index">
        <img class="cover" :src="item.cover">
        <van-row>
          <van-col span="18">
            <div class="name">{{item.name}}</div>
          </van-col>
          <van-col span="3">
            <div class="div"><img class="icon" src="../../assets/images/see.png">{{item.view}}</div>
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
                name:'采石矶正式开园',
                view:23,
                focus:18,
                cover:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                describe:'奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广'
              },
              {
                name: '采石矶正式开园',
                view: 23,
                focus: 18,
                cover: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                describe: '奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广'
              }
            ]
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
</style>
