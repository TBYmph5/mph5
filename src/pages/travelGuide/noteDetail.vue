<template>
  <div class="wrap">
    <div class="travel-note-content">
      <div class="travel-note-content-wrap">
        <!--轮播图开始-->
        <div class="swiper-container">
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in note.img" :key="index">
              <img :src="item" alt="">
            </van-swipe-item>
          </van-swipe>
        </div>
        <!--轮播图结束-->
        <div class="travel-note">
          <p class="travel-note-title">{{note.name}}</p>
          <span class="play-spots">
         <i v-for="(item,index ) in playSpot" :key="index">{{item}}</i>
        </span>
          <div class="note" v-for="(noteDetailItem,index) in noteArray">
            <p v-if="noteDetailItem.words.title!==''">{{noteDetailItem.words.title}}</p>
            <div class="note-words" v-if="noteDetailItem.words.discribe!==''"> {{noteDetailItem.words.discribe}}</div>
            <div class="img-array" v-if="noteDetailItem.notesImgs.length>0" v-for="(imgItem,ingIndex) in noteDetailItem.notesImgs" :key="ingIndex">
              <img :src="imgItem" alt="" >
            </div>


          </div>
          <div class="view-number">Na ya na 发表于2019-10-07 <span class="view-item"> <i class="view-icon see-icon"></i> 浏览量：{{note.seeTime}}</span>
          </div>
        </div>
      </div>
      <!--操作-->
      <div class="option-wrap">
        <div class="option-item">
          <span><i class="option-icon"></i>{{note.LikeTime}}</span>
        </div>
        <div class="option-item">
          <span><i class="option-icon"></i>{{note.commentTime}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "noteDetail",
    data() {
      return {
        note: {},
        playSpot: [],
        noteArray:[]

      }
    },
    mounted() {
      this.note = JSON.parse(this.$route.query.noteDetail);
      this.noteArray= this.note.notes;

      let spotArray = []
      this.note.notes.forEach((item) => {
        if (item.words.title !== '') {
          let index = item.words.title.indexOf('—');
          spotArray.push(item.words.title.slice(0, index))
        }
      })
      this.playSpot = spotArray
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
    color: #333;
    letter-spacing: 1px;
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
    margin-bottom: 0.4rem;
  }

  .play-spots i {
    display: inline-block;
    font-style: normal;
    line-height: 0.6rem;
    color: #469AFF;
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
.img-array{
  width: 100%;
  height: auto;
  padding: 0 0.4rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid transparent;
}
  .img-array img{
    width: 100%;
    height: auto;
  }
  .note-words{
    text-indent: 0.4rem;
  }
  p{
    color: #333;
    letter-spacing: 1px;
    font-size: 0.37rem;
    font-weight: bold;
  }
</style>
