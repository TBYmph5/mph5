<template>
  <!-- 热门活动开始 -->
  <div class='hot-activity-wrap'>
    <div class='tabs-wrap'>
      <span class='title'>热门活动</span>
      <div class='tabs-item-wrap'>
        <div v-for="(item,index) in config" :key='index'
             :class="activeTabIndex==index? 'active' : 'tabs-item'" @click='setActiveKey(index)'>
          {{item.name}}
        </div>
        <!-- <div class=" tabs-item {{activeTabIndex==1? 'active' : ''}}" @click='setActiveKey2'>品质优选</div>
        <div class="tabs-item {{activeTabIndex==2? 'active' : ''}}" @click='setActiveKey3'>餐饮</div> -->
      </div>
    </div>
    <!-- tab完 -->
    <div class='tabs-content-wrap'>
      <!-- 今日必抢 -->
      <div class='tabs-content' v-for="(ActiveItem,index) in activityOptimization" :key="index"
           v-show='activeTabIndex==index'>
        <div class='figure' v-for="(productItem,index) in ActiveItem.productList" :key='index'
             @click="getGoodDetail(productItem)">
          <div class='img-wrap'>
            <img :src="qiniu +'/'+productItem.cover.split(',')[0]">
          </div>
          <div class='figcaption'>
            <div class='good-name'>{{productItem.name}}</div>
            <div class='good-discribe'>{{productItem.introduction}}</div>
            <span class='price'
                  v-if="productItem.minPrice!==undefined">￥{{productItem.minPrice}}起</span>
            <span class='price' v-else></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "activity",
      props:['config'],
      data(){
          return{
            qiniu: 'https://image.supconit.net',
            activeTabIndex:0
          }

      },
      methods:{
        setActiveKey(index) {
          this.activeTabIndex = index
        },
        getGoodDetail(item){
          this.$router.push({
                path: '/goodDetails',
                query:{
                  id:item.id,
                  name:item.name
                }
              })
        }
      }


    }
</script>

<style scoped>
  .tabs-wrap {
    height: 0.66rem;
  }

  .tabs-wrap text {
    font-size: 0.37rem;
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
  }

  .tabs-wrap .tabs-item {
    display: inline-block;
    padding: 0 0.06rem;
    height: 100%;
    line-height: 0.66rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    text-align: center;
    margin-right: 0.26rem;
  }

  .tabs-wrap {
    width: 100%;
    height: 0.66rem;
  }

  .tabs-item-wrap {
    display: inline-block;
    margin-left: 0.4rem;
  }

  .hot-activity-wrap {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0.4rem 0 0 0.4rem;
    box-sizing: border-box;
    margin-bottom: 0.46rem;
  }

  .active {
    display: inline-block;
    padding: 0 0.06rem;
    height: 100%;
    line-height: 0.66rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    text-align: center;
    margin-right: 0.26rem;
    border-bottom: 2px solid #409EFF;
  }

  .title {
    font-size: 0.37rem;
    font-family: PingFang-SC-Regular;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
  .title {
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
