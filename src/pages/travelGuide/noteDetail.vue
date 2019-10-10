<template>
  <div class="wrap">
    <div class="travel-note-content">
      <div class="travel-note-content-wrap">
      <!--轮播图开始-->
      <div class="swiper-container">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in imgs" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--轮播图结束-->
      <div class="travel-note">
        <p class="travel-note-title">标题标题标题</p>
        <span class="play-spots">
         <i>游玩地点1, </i>  <i>游玩地点1, </i>  <i>游玩地点1, </i>  <i>游玩地点1</i> <i>游玩地点1</i></span>
        <div class="note">
          奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广 奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻广场奇幻
        </div>
        <div class="view-number">Na ya na 发表于2019-10-07</div>
        <div class="view-number" style="margin-top: 0.2rem">
          <span class="view-item"> <i class="view-icon see-icon"></i> 111人浏览</span>
          <span class="view-item"><i class="view-icon zan-icon"></i>111人点赞 </span>
        </div>
      </div>
    </div>
    <!--操作-->
    <div class="option-wrap">
      <span>评论</span>
      <span>点赞</span>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "noteDetail",
    data() {
      return {
        imgs: [
          'https://image.supconit.net/ScenicIntroduction5.png',
          'https://image.supconit.net/ScenicIntroduction3.png'
        ]
      }
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
  }

  .travel-note-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .swiper-container {
    width: 92%;
    height: 4.56rem;
    background: #e5e5e5;
    margin: 0.4rem auto;
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
    color: rgba(51, 51, 51, 1);
    margin-bottom: 0.36rem;
  }

  .travel-note {
    height: auto;
    width: 100%;
    padding: 0 0.4rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .play-spots {
    font-size: 0.36rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .play-spots i {
    display: inline-block;
    font-style: normal;
    margin-right: 0.1rem;
    line-height: 0.6rem;
  }

  .note {
    text-indent: 0.3rem;
    line-height: 0.8rem;
    font-size: 0.35rem;
    color: rgba(51, 51, 51, 1);
  }

  .view-number {
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-top: 0.5rem;
  }

  .view-number span {
    display: inline-block;
    height: 0.48rem;
    line-height: 0.48rem;
    min-width: 0.8rem;
    padding: 0 0.2rem 0 0;
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
  }

  .view-number span .view-icon.zan-icon {
    background: url("../../assets/images/focus.png") center no-repeat;
    background-size: 100% 100%;
  }

  .option-wrap {
    width: 100%;
    height: 1.173rem;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0px -1px 2px 0px rgba(88, 88, 88, 0.28);
    background: #fff;
  }
  .option-wrap span{
    width: 50%;
    height: 1.173rem;
    line-height: 1.173rem;
    float:left;
    font-size: 0.36rem;
    color: #333333;
   text-align: center;
  }
  .option-wrap span:last-child{
    background: #00AA4D;
    color:#fff;
  }
  .travel-note-content-wrap{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-bottom: 1.8rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
