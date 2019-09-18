<template>
  <!-- banner -->
  <div class='swiper-container'>
    <div class='swiper-cont'>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in config" :key="index">
          <img :src="item" class="slide-img"/>
        </van-swipe-item>
      </van-swipe>
      <div class='search-wrap'>
                    <span class='area-wrap' @click="openAreaChoosePopup">{{areaValue}}
                        <span class="iconfont icon-xiajiantou"></span>
                    </span>
        <div class='input-wrap'>

          <input placeholder='请输入您要查找的酒店名称'
                 v-model="inputValue"/>
          <span class="iconfont icon-Magnifier" @click='goGlobalSearch'></span>
        </div>
      </div>
    </div>
    <van-popup v-model="areaChooseShow" position="bottom" overlay="overlay" @close="areaChooseShowonClose">

      <van-area :area-list="areaList" :columns-num="2" @confirm='sureArea' @cancel='cancelAreaChoose'/>
    </van-popup>
  </div>
</template>

<script>
  import areaJson from '../../../src/utils/address'

  export default {
    name: "gallery",
    props: ['config'],
    data() {
      return {

        areaValue: '杭州',
        areaChooseShow: false,
        areaList: areaJson,
        inputValue: ''
      }
    },
    mounted(){
      console.log(this.config)
    },
    methods: {
      /**
       * 地区选择弹窗关闭
       */
      openAreaChoosePopup() {
        // console.log(111)
        this.areaChooseShow = true;
        console.log(this.areaChooseShow)
      },
      areaChooseShowonClose() {
        this.areaChooseShow = false
      },
      sureArea(e) {
        // console.log(e);
        let area = e[1].name;
        this.areaValue = area.slice(0, area.length - 1);
        this.areaChooseShow = false;
      },
      cancelAreaChoose() {
        this.areaChooseShow = false
      },
      goGlobalSearch() {

        this.$router.push({
          path: '/globalSearch',
          query: {
            keyWords: this.inputValue,
            area: this.areaValue
          }
        })
      },
    }
  }
</script>

<style scoped>
  .swiper-container {
    width: 100%;
    height: 4.8rem;
    position: relative;
    margin: 0 auto 0.4rem;
    padding: 0.4rem;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .swiper-cont {
    width: 100%;
    height: 4rem;
  }

  .swiper-cont .van-swipe {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.106rem;
    -moz-border-radius: 0.106rem;
    border-radius: 0.106rem;
  }

  .swiper-cont .van-swipe-item {
    height: 4rem;
    width: 100%;
  }

  .swiper-cont .van-swipe img {
    width: 100%;
    height: 100%;
  }

  swiper-item {
    width: 100%;
    height: 100%;
    border-radius: 0.13rem;
    overflow: hidden;
  }

  swiper-item .slide-image {
    width: 100%;
    height: 100%;
    border-radius: 0.13rem;
    overflow: hidden;
  }

  .search-wrap {
    width: 8.245rem;
    height: 0.90rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 6px 0px rgba(130, 130, 130, 0.21);
    border-radius: 0.45rem;
    position: absolute;
    margin: 0 auto;
    bottom: 0.06rem;
    left: 0;
    right: 0;
  }

  .area-wrap {
    display: inline-block;
    width: 1.6rem;
    height: 100%;
    line-height: .9rem;
    text-align: center;
    position: relative;
    font-size: 0.3rem;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    float: left;
  }

  .area-wrap::after {
    content: "";
    width: 0.03rem;
    height: .5rem;
    background: rgba(102, 102, 102, 1);
    position: absolute;
    top: 0.2rem;
    right: 0;
  }

  .input-wrap {
    width: calc(100% - 1.6rem);
    line-height: 0.9rem;
    display: inline-block;
    font-size: 0.48rem;
    font-weight: 400;
    color: rgba(218, 218, 218, 1);
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  .input-wrap input {
    line-height: 0.9rem;
    width: 5.7rem;
    height: 100%;
    display: inline-block;
    color: rgba(102, 102, 102, 1);
    border: none;
    outline: none;
    font-size: 0.36rem;
    position: relative;
    top: -0.05rem;
    text-indent: 0.1rem;
  }

  .input-wrap text {
    float: left;
    margin-right: 0.065rem;
    color: #333;
  }
  .iconfont.icon-xiajiantou{
    font-size: 0.21rem;

  }
  .iconfont.icon-Magnifier{
    font-size: 0.45rem;
    float: right;
    /*color:#DADADA;*/
  }
  .input-wrap span{
    float: right;
    padding-right: 0.1rem;
  }
</style>
