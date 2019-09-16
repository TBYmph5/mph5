<template>
  <div class='hot-activity ' style='margin-top:0.5rem;margin-bottom:1.6rem;'>
    <div class='item-title'>热门酒店</div>
    <div class='tabs-content-wrap-hotel'>
      <div class='tabs-content'>
        <div class='figure' v-for="(item,index) in hotHotel" v-key='index'
             @click="getQualificationDetail(item)">
          <div class='img-wrap'>
            <img :src='item.cover'>
          </div>
          <div class='figcaption'>
            <div class='good-name'>{{item.name}}</div>
            <div class='good-discribe' style='white-space:pre-line;'>{{item.description}}</div>
            <span class='price' v-if="item.minPrice!==undefined">￥{{item.minPrice}}起</span>
            <span class='price' v-else></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "recommended",
      props:['hotHotel'],
      data(){
          return{


          }
      }
    }
</script>

<style scoped>
  .hot-activity-wrap {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0.4rem 0 0 0.4rem;
    box-sizing: border-box;
    margin-bottom: 0.46rem;
  }.title {
     font-size: 0.37rem;
     font-family: PingFang-SC-Regular;
     font-weight: bold;
     color: rgba(51, 51, 51, 1);
   }

  .tabs-content-wrap {
    width: 100%;
    /*height: 6.13rem;*/
    height: auto;
    padding-top: 0.66rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .tabs-content-wrap-science {
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }

  .tabs-content-wrap-hotel {
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }

  .tabs-content {
    /*height: 5.6rem;*/
    height: auto;
    padding: 0.13rem 0;
    width: 100%;
    white-space: nowrap;
    /* display: flex; */
    overflow-x: scroll;
  }

  .figure {
    width: 4.16rem;
    height: 5.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 10px 0px rgba(12, 3, 6, 0.1);
    border-radius: 0.21rem;
    display: inline-block;
    margin-right: 0.26rem;
  }

  .figure .img-wrap {
    width: 100%;
    height: 3.12rem;
    border-radius: 0.21rem;
    overflow: hidden;
  }

  .figure .img-wrap img {
    width: 100%;
    height: 100%;
  }

  .figure .figcaption {
    width: 100%;
    height: calc(100% - 3.12rem);
    padding:  0.2rem 0.226rem;
    border:1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .good-name {
    height: 0.5rem;
    font-size: 0.34rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  .good-discribe {
    display: flex;
    width: 100%;
    height: 0.82rem;
    line-height: 0.41rem;
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(162, 162, 162, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-line;
    margin-bottom: 0.23rem;
  }

  .price {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(203, 0, 0, 1);
    position: relative;
    top: -0.21rem;
    display: inline-block;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .hot-activity {
    width: 100%;
    padding: 0.26rem 0 0 0.4rem;
    box-sizing: border-box;
    box-sizing: border-box;

  }

  .item-title {
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    text-align: left;
    margin-bottom: 0.26rem;
    display: block;
  }

  .hot-activity scroll-view {
    height: 5.6rem;
    padding: 0.13rem 0;
    width: 100%;
    white-space: nowrap;
    display: flex;

  }

  .list_1_title .icon {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
  }

  .list_1_title .icon img {
    width: 100%;
    height: 100%;
  }


  input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:rgba(218,218,218,1);
    font-size: 0.34rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:rgba(218,218,218,1);
    font-size: 0.34rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:rgba(218,218,218,1);
    font-size: 0.34rem;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:rgba(218,218,218,1);
    font-size: 0.34rem;
  }
  input::-ms-input-placeholder { /* Microsoft Edge */
    color:rgba(218,218,218,1);
    font-size: 0.34rem;
  }


</style>
