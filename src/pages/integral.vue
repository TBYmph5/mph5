<template>
    <div class="wrap">
      <!--pages/integral/index.wxml-->
      <div class='container'>
        <div class='integral-bg'>
          <span>当前积分</span>
          <div class='current-integral-rap'>
            <img src='https://image.supconit.net/jifen.png'>
            38000
          </div>
        </div>
        <div class='view-title'>积分明细</div>

        <van-tabs animated>
          <van-tab title="全部">
            <div class='integral-content-wrap'>
              <div class='integral-content' v-if='!allScoreHasScore' :style='{height:height}' >
                <div class="tips-wrap">
                  空空如也
                </div>
              </div>
              <div class='integral-content'v-if='allScoreHasScore'>
                <van-list  class='van-list' :offset='offset' :style='{height:height}' @load="loadingMoreintegral" >
                  <div class='integral-item' v-for="(item,index ) in scroeArray" :key='index'>
                    <!-- <span class='integral-change-date'>{{filter.formmater(item.createTime)}}</span> -->

                    <div class='change-detail'>
                      <div class='change-detail-name'>{{item.createTime|formmatterTimer}}</div>
                      <div class='change-detail-dis'>{{item.description}}</div>
                      <div class='change-detail-score ':class="item.positive? 'green':'red' ">
                        <span class='plus' v-if='item.positive'>+</span>
                        <span class='minus' v-else>-</span> 200
                      </div>
                    </div>
                  </div>
                </van-list>
              </div>
            </div>
          </van-tab>
          <van-tab title="收入">
            <div class='integral-content-wrap'>
              <div class='integral-content' v-if='!earnScoreHasScore' :style='{height:height}'>
                <div class="tips-wrap">
                  空空如也
                </div>
              </div>
              <div class='integral-content' v-if='earnScoreHasScore'>
                <van-list  class='van-list' :offset='offset' :style='{height:height}' bindscrolltolower="loadingMoreintegral">
                  <div class='integral-item' v-for="(item,index) in scroeArray" :key='index'>
                    <!-- <span class='integral-change-date'>{{filter.formmater(item.createTime)}}</span> -->

                    <div class='change-detail'>
                      <div class='change-detail-name'>{{item.createTime|formmatterTimer}}</div>
                      <div class='change-detail-dis'>{{item.description}}</div>
                      <div class='change-detail-score ' :class="item.positive? 'green':'red' ">
                        <span class='plus' v-if='item.positive'>+</span>
                        <span class='minus' v-else>-</span> 200
                      </div>
                    </div>
                  </div>
                </van-list>
              </div>
            </div>
          </van-tab>
          <van-tab title="支出">
            <div class='integral-content-wrap'>
              <div class='integral-content' v-if='outScoreHasScore' :style='{height:height}'>
                <div class="tips-wrap">
                  空空如也
                </div>
              </div>
              <div class='integral-content' v-if='outScoreHasScore'>
                <van-list scroll-y class='van-list' :offset='offset' :style='{height:height}' @load="loadingMoreintegral">
                  <div class='integral-item' v-for="(item,index ) in scroeArray" :key='index'>
                    <!-- <span class='integral-change-date'>{{filter.formmater(item.createTime)}}</span> -->

                    <div class='change-detail'>
                      <div class='change-detail-name'>{{item.createTime|formmatterTimer}}</div>
                      <div class='change-detail-dis'>{{item.description}}</div>
                      <div class='change-detail-score' :class="item.positive? 'green':'red' ">
                        <span class='plus' v-if='item.positive'>+</span>
                        <span class='minus' v-else>-</span> 200
                      </div>
                    </div>
                  </div>
                </van-list>
              </div>
            </div>
          </van-tab>

        </van-tabs>





      </div>
      <!--返回按钮-->
      <div class="go-back" @click="goBack"></div>
    </div>
</template>

<script>
  import http from '../api/public'
  import moment from 'moment'
    export default {
        name: "integral",
      data(){
          return{
            offset:30,
            finished:false,
            height: 0,
            recordPage: 0,
            scroeArray: [],
            allScoreHasScore:false,
            earn: false,
            outScoreHasScore:false,
            earnScoreHasScore:false
          }
      },
      filters: {
        formmatterTimer: function (value) {
          return moment(value).format("YYYY-MM-DD")
        }
      },
      created(){
        this.height = document.body.clientHeight- 225 + 'px'
      },
      mounted(){
          this.getAllReocde();
      },
      methods:{
        loadingMoreintegral() {
          console.log('加载数据中')
        },
        /**
         * 获取全部积分
         */
        getAllReocde() {
          let that = this;
          let page = that.recordPage;
          http.get('/customer/score?size=8&page='+ page ).then(res=>{
            let recordArray = res.obj.records;
            if (recordArray.length>0) {
              recordArray.forEach(function (item, index) {
                if (item.scoreChange > 0) {
                  item['positive'] = true
                } else {
                  item['positive'] = false
                }
                item['createTime']=parseInt(item.createTime)
              })
              that.scroeArray=recordArray;
                that.allScoreHasScore=true;
                that.earn=false;
                that.outScoreHasScore=false

            }else{
              that.allScoreHasScore=false;
                that.earn=false;
                that.outScoreHasScore=false

            }
          })

        },

        goBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  /* pages/integral/index.wxss */

  .integral-bg {
    width: 100%;
    height: 2.93rem;
    background: url('http://image.supconit.net/jifenBg.png')center no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }

  .integral-bg span {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

  }

  .current-integral-rap {
    height: 0.86rem;
    width: 0.86rem;
    line-height: 0.86rem;
    min-width:3.6rem;
    margin: 0.53rem auto 0;
    font-size:0.86rem;
    font-family:MicrosoftYaHei;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  .current-integral-rap img{
    width: 0.85rem;
    height:0.85rem;
    float: left;
  }
  .view-title{
    height:1.46rem;
    background:rgba(255,255,255,1);
    width: 100%;
    text-indent: 0.46rem;
    font-size:0.37rem;
    color:rgba(51,51,51,1);
    line-height: 1.46rem;
  }
  .integral-content-wrap{
    width: 100%;
    height: auto;
    padding: 0.4rem 0.4rem 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background: #f3f3f3;
  }
  .integral-content{
    width: 100%;
    /* height: 200rpx; */
    /* background: red; */
    background:#fff;
    box-shadow:0.053rem 0.053rem 0.13rem 0px rgba(130,130,130,0.12);
    border-radius:0.21rem;
  }
  .integral-item{
    height:1.44rem;
    padding:0 0.26rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom:1px solid #f3f3f3;
  }
  .integral-item .integral-change-date{
    font-size:0.32rem;
    color:rgba(102,102,102,1);
    display: block;
    line-height:0.8rem;
    height:0.8rem;
  }
  .integral-item .change-detail{
    height: 1.44rem;
    width: 100%;
    line-height:1.44rem;

  }
  .integral-item .change-detail>div{
    float: left;
    font-size:0.34rem;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .integral-item .change-detail .change-detail-name{
    width: 25%;
  }
  .integral-item .change-detail .change-detail-dis{
    width:50%;
    text-align: center;
  }
  .integral-item .change-detail .change-detail-score{
    width: 25%;
    text-align: right;
    font-size:0.42rem;
  }
  .integral-item .change-detail .change-detail-score.red{

    color:rgba(244,51,60,1);
  }
  .integral-item .change-detail .change-detail-score.green{
    color:#0EDB51;
  }
  .van-ellipsis.van-ellipsis.van-tab__title.van-tab__title{
    padding: 0 0.46rem;
    display: inline-block;
    width: 1.06rem !important;
  }
  .van-ellipsis.van-ellipsis.van-tab.van-tab{
    /* width: 80rpx !important; */
    display: inline-block;
  }
  .tips-wrap{
    position: absolute;
    width: 5.2rem;
    height: 5.2rem;
    margin: auto;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    background: url('https://image.supconit.net/noRecodes.png') center no-repeat;
    background-size: 100% 100%;
    padding-top: 3.81rem;
    border:1px solid transparent;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    text-align: center;
    font-size:0.42rem;
    letter-spacing: 1px;
    font-weight:500;
    color:rgba(102,102,102,1);
  }
  .integral-content{
    position: relative;
  }
  .integral-bg span{
    font-size:0.26rem;
    font-weight:400;
    color:rgba(255,255,255,1);

  }

</style>
