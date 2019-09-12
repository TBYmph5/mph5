<template>
  <div class="wrap">
    <div class="container">
      <!-- 搜索 -->
      <div class='top-serach'>
        <div class='search-content'>
          <span class='area-wrap' @click="openAreaChoosePopup">{{areaValue}}  <span
            class="iconfont icon-xiajiantou"></span></span>
          <van-popup
            v-model="areaChooseShow"
            position="bottom"
            :overlay="overlay"
            @close="areaChooseShowonClose"
          >

            <van-area :area-list="areaList" :columns-num="columnsNum" @confirm='sureArea' @cancel='cancelAreaChoose'/>
          </van-popup>
          <div class='input-wrap'>
            <span class="iconfont icon-Magnifier"></span>
            <input placeholder='请输入您要查找的景区名称'>
          </div>
        </div>
        <!-- 筛选条件 -->
        <div class='screening-condition-wrap' id="screening-condition-wrap">
          <div class='screening-item  ' :class="comprehensiveArrow?'active':''" @click.stop='comprehensiveConditionsChange'>
            综合
            <span class='iconfont  ' :class="comprehensiveArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item' :class="salesArrow?'active':''" @click.stop='salesConditionsChange'>
            销量
            <span class='iconfont ' :class="salesArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item  ' :class="evaluationArrow?'active':''" @click.stop='evaluationConditionsChange'>
            好评
            <span class='iconfont ' :class="evaluationArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item ' :class="moreArrow?'active':''" @click.stop='moreConditionsChange'>
            更多筛选
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class='good-content-list' :style='{height:height}' >

        <!-- 加载动画 -->
        <div class="loade-animate" v-show="loading">
          <img class="animate" src="../../src/assets/images/loading.gif"/>
        </div>

        <div class='good-content-wrap' v-show="!loading"   >
          <van-list scroll-y @load="loadingMoreGood"   :finished="finished" :offset='offset' :style='{height:height}'>
            <!-- 单个商品 -->
            <div class='hot-good-item' v-for="(item,index) in goodShowArray" :key='index' >
              <div class='img-wrap'>
                <!--pages/Hot/index.wxml-->
                <img :src='item.cover'>
              </div>
              <!-- 商品介绍 -->
              <div class='hot-good-figure'>
                <span class='hot-good-name'>{{item._source.name}}</span>
                <div class='hot-good-discribe'> {{item._source.description}}</div>
                <div class='price-option-wrap'>
                  <span class='hot-good-price' v-if="item.minPrice !==undefined">¥{{item.minPrice}}  <span style='font-size:0.32rem;color:#959595;'>起</span></span>
                  <van-button type="danger" class='hot-good-option' @click='viewDetails(item)'>查看详情</van-button>
                </div>
              </div>
            </div>

          </van-list>
        </div>
      </div>

      <!-- 单个筛选菜单 综合筛选 -->
      <div class='screening-item-mun' :style='{height:height}' v-if="comprehensiveConditionsShow"
           @click.stop='comprehensiveConditionsHide'>
        <div class='screening-item-mun-content ' :class="aniStyle?'slideup':'slidedown'">
          <div class='screen-condition'>
            <div class='condition-item' v-for="(item,index) in comprehensiveCondition" :key='index'
                 @click='comprehensiveConditionsChoose(index)'> {{item.text}}
              <span v-if='item.check' class='icon iconfont icon-duihao'></span></div>
          </div>
        </div>
      </div>
      <!-- 销量菜单筛选 -->
      <div class='screening-item-mun' :style='{height:height}' v-if="salesConditionsShow" @click.stop='salesConditionsHide'>
        <div class='screening-item-mun-content ' :class="salesaniStyle?'slideup':'slidedown'">
          <div class='screen-condition sales-condition'>
            <div class='condition-item' v-for="(item,index) in salesCondition" :key='index'
                 @click='salesConditionsConditionsChoose(index)'> {{item.text}}
              <span v-if='item.check' class='icon iconfont icon-duihao'></span></div>
          </div>
        </div>
      </div>

      <!-- 好评菜单筛选 -->
      <div class='screening-item-mun' :style='{height:height}' v-if="evaluationConditionsShow"
           @click.stop='evaluationConditionsHide'>
        <div class='screening-item-mun-content ' :class="evaluationaniStyle?'slideup':'slidedown'">
          <div class='screen-condition sales-condition'>
            <div class='condition-item' v-for="(item,index) in evaluationCondition" :key='index'
                 @click='evaluationConditionsConditionsChoose(index)'> {{item.text}}
              <span v-if='item.check' class='icon iconfont icon-duihao'></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 更多筛选条件 -->

      <div class='screening-item-mun' :style='{height:height}' @click.stop='moreConditionsHide' v-if="moreConditionsShow">
        <div class='screening-item-mun-content  ' :class="moreaniStyle?'slideup':'slidedown'">
          <div class='screen-condition more-condition '>
            <div class='price-condition-slide'>
              <span class='condition-title'>价格
                <span class='no-limit'>不限</span>
              </span>

              <van-slider v-model="currentValue" use-button-slot @change="onDrag" active-color='#409EFF'
                          inactive-color='rgba(243,243,243,1)' bar-height='2px' :max='100'>
                <div class="custom-button" slot="button">
                  50
                  <!--{{filter.showPrice(50)}}-->
                </div>
              </van-slider>
            </div>
            <div class='price-condition-slide hotel-screen'>
              <span class='condition-title'>酒店星级(可多选)</span>
              <div class='screen-span-wrap'>
                <div v-for="(item,index ) in hotelStar" class="screen-span " :class="item.check==1?'active':''"
                     :key="index" @click='hotelStarSelect(index)'>{{item.text}}
                </div>
              </div>
            </div>
            <div class='price-condition-slide'>
              <span class='condition-title'>景区等级(可多选)</span>
              <div class='screen-span-wrap'>
                <div v-for="(item,index ) in scenicStar" class="screen-span " :class="item.check==1?'active':''"
                     :key="index" @click='scenicStarSelect(item)'>{{item.text}}
                </div>
              </div>

            </div>
            <!-- moreconditionOptions -->
            <div class='more-condition-options'>
              <div class='more-condition-options-item' @click='resetMoreConditin'>清空</div>
              <div class='more-condition-options-item' @click='sureMoreConditin'>确定</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import areaJson from '../../src/utils/address'
  import http from '../api/public'
  export default {
    name: "searchResult",
    data() {
      return {
        qiNiu:this.$store.state.qiNiuLink,
        columnsNum: 2,
        areaList: areaJson,
        offset:30,
        finished:false,
        loading: true,
        areaChooseShow: false,
        overlay: true,
        areaValue: '杭州',
        height: 0,
        recodePage: 0,
        comprehensiveConditionsShow: false,
        aniStyle: true,
        comprehensiveArrow: false,
        comprehensiveCondition: [{
          'text': '综合',
          check: true,
          index: 0
        },
          {
            'text': '上新',
            check: false,
            index: 1
          },
          {
            'text': '价格降序',
            check: false,
            index: 2
          },
          {
            'text': '价格升序',
            check: false,
            index: 3
          }
        ],
        // 销量筛选
        salesArrow: false,
        salesConditionsShow: false,
        salesaniStyle: true,
        salesCondition: [{
          'text': '销量降序',
          check: true,
          index: 0
        },
          {
            'text': '销量降序',
            check: false,
            index: 1
          },
        ],
        // 好评筛选
        evaluationArrow: false,
        evaluationConditionsShow: false,
        evaluationaniStyle: true,
        evaluationCondition: [{
          'text': '好评率降序',
          check: true,
          index: 0
        },
          {
            'text': '好评率降序',
            check: false,
            index: 1
          },
        ],
        // 更多筛选
        moreArrow: false,
        moreConditionsShow: false,
        moreaniStyle: true,
        currentValue: 30,
        hotelStar: [{
          text: '不限',
          index: 0,
          check: 0
        },
          {
            text: '二星级/经济',
            index: 1,
            check: 0
          },
          {
            text: '三星级/舒适',
            index: 2,
            check: 0
          },
          {
            text: '四星级/高档',
            index: 3,
            check: 0
          },
          {
            text: '五星级/豪华',
            index: 4,
            check: 0
          },
        ],
        scenicStar: [
          {
            text: '不限',
            index: 0,
            check: 0
          },
          {
            text: 'AAA级',
            index: 1,
            check: 0
          },
          {
            text: 'AAAA级',
            index: 2,
            check: 0
          },
          {
            text: 'AAAAA级',
            index: 3,
            check: 0
          }
        ],
        // 商品列表
        goodShowArray: []
      }
    },
    mounted() {
      let pxHeight=document.body.clientHeight/37.5;
      debugger
      //94px 为1.25rem
      this.height = pxHeight-1.25 +'rem'
      this.getRecodes()
    },
    methods: {
      getContainer() {
        return document.querySelector('#screening-condition-wrap');
      },
      /**
       * 地区选择弹窗关闭
       */
      openAreaChoosePopup() {
        this.areaChooseShow = true
      },
      areaChooseShowonClose() {
        this.areaChooseShow = false
      },
      /**
       * 确定地区训责
       */
      sureArea(value) {
        console.log(value);
        if (value[2] == undefined) {
          this.areaValue = value[0].name + value[1].name
        } else {
          this.areaValue = value[0].name + value[1].name + value[2].name
        }

        this.areaChooseShow = false

      },
      cancelAreaChoose() {
        this.areaChooseShow = false
      },

      comprehensiveConditionsChange() {
        var that = this;
        var currentState = that.comprehensiveConditionsShow;
        if (currentState == false) {
          that.comprehensiveConditionsShow = true;
          that.aniStyle = true;
          that.comprehensiveArrow = true
        } else {
          that.aniStyle = false　　　　　　 //设置动画效果为slidedown
          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.comprehensiveConditionsShow = false;
            that.comprehensiveArrow = false
          }, 500)
        }
      },

      comprehensiveConditionsHide: function () {
        var that=this;//这是list-fix的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
        that.aniStyle = false　　　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.comprehensiveConditionsShow = false;
          that.comprehensiveArrow = false
        }, 500)

      },
      /**销量筛选动画 */
      salesConditionsChange() {

        var that = this;
        var currentState = that.salesConditionsShow;
        if (currentState == false) {
          that.salesConditionsShow = true;
          that.salesaniStyle = true;
          that.salesArrow = true

        } else {
          that.salesaniStyle = false　　　　　　 //设置动画效果为slidedown

          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.salesConditionsShow = false,
              that.salesArrow = false
          }, 500)
        }
      },
      salesConditionsHide() {
        var that = this;
        this.salesaniStyle=false　　　　　　 //设置动画效果为slidedown
        setTimeout(function() { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.salesConditionsShow=false;
          that.salesArrow=false
        }, 500)
      },
      /**好评率筛选 */

      evaluationConditionsChange() {
        var that = this;
        var currentState = that.evaluationConditionsShow;
        if (currentState == false) {
          that.evaluationConditionsShow = true;
          that.evaluationaniStyle = true;
          that.evaluationArrow = true

        } else {
          that.evaluationaniStyle = false　　　　　　 //设置动画效果为slidedown
          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.evaluationConditionsShow = false;
            that.evaluationArrow = false
          }, 500)
        }
      },
      evaluationConditionsHide() {
        var that = this;
        that.evaluationaniStyle = false　　　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.evaluationConditionsShow = false;
          that.evaluationArrow = false
        }, 500)
      },
      evaluationConditionsConditionsChoose(ind) {
        console.log(ind);
        this.evaluationCondition.forEach((item, index) => {
          if (ind == index) {
            item.check = true
          } else {
            item.check = false
          }
        })

      },
      // 更多筛选
      moreConditionsChange() {
        var that = this;
        var currentState = that.moreConditionsShow;
        if (currentState == false) {
          that.moreConditionsShow = true;
          that.moreaniStyle = true;
          that.moreArrow = true;
        } else {
          this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown

          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.moreConditionsShow = false,
              that.moreArrow = false
          }, 500)
        }
      },
      moreConditionsHide() {
        var that = this;
        this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
      },
      // 价格范围拖动
      onDrag(value) {
        this.currentValue = value
      },
      // 酒店等级选择
      hotelStarSelect(e) {
        // var index=e.target.dataset.index;
        // console.log(index);
        // var hotelStarArray = this.data.hotelStar;
        // for (var i = 0; i < hotelStarArray.length;i++){
        //   if(i==index){
        //     if (hotelStarArray[i].check==0){
        //       hotelStarArray[i].check = 1;
        //     }else{
        //       hotelStarArray[i].check = 0;
        //     }
        //
        //   }
        // }
        // this.setData({
        //   hotelStar: hotelStarArray
        // })
      },
      // 景区等级选择
      scenicStarSelect(e) {
        // var index = e.target.dataset.index;
        // console.log(index);
        // var scenicStarArray = this.data.scenicStar;
        // for (var i = 0; i < scenicStarArray.length; i++) {
        //   if (i == index) {
        //     if (scenicStarArray[i].check == 0) {
        //       scenicStarArray[i].check = 1;
        //     } else {
        //       scenicStarArray[i].check = 0;
        //     }
        //
        //   }
        // }
        // this.setData({
        //   scenicStar: scenicStarArray
        // })
      },
      /**
       * 取消筛选
       */
      resetMoreConditin() {
        var that = this;
        this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown

        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
      },
      /**
       * 确定更多筛选条件
       */
      sureMoreConditin() {
        var that = this;
        this.moreaniStyle = false;　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
      },
      /**
       * 懒加载更多商品
       */
      loadingMoreGood() {
        let currentPage = this.recodePage;
        console.log('拼命加载中');
        this.recodePage++
        this.getRecodes()
      },

      /**
       * 获取景区记录
       */
      getRecodes() {
        let that=this;
        let page = that.recodePage+'';
        http.get('search/aptitude?type=2&size=8&page='+page).then(res=>{
          let recodesArray=res.obj.hits;
          if (recodesArray.length>0){
            recodesArray.forEach(item=> {
              let itemProductArray = item._source.productList;
              // console.log(itemProductArray);
              let dailPriceArray = [];
              itemProductArray.forEach(goodItem => {
                let priceList = goodItem.productDailyList;
                priceList.forEach((priceDaliyItem) => {
                  dailPriceArray.push(priceDaliyItem.price)
                })
                // console.log(dailPriceArray)
                item['minPrice'] = Math.min.apply(null, dailPriceArray);

              })
              item['cover'] = that.qiNiu + '/' + item._source.cover.split(',')[0]
            });
            that.goodShowArray= that.goodShowArray.concat(recodesArray);
            that.loading=false;
            if( that.goodShowArray.length=res.obj.total){
              this.finished=true
            }
          }else{
            that.loading=true
          }
        })


      },
      //跳转到商品详情页
      //跳转到商品详情页
      viewDetails(item) {
        console.log(item, 'navgite')
        this.$router.push({
          path: '/qualificationDetails',
          query: {
            id: item._id,
            type: item._type
          }
        })
      },
      comprehensiveConditionsChoose(ind) {

        console.log(ind);
        this.comprehensiveCondition.forEach((item, index) => {
          if (ind == index) {
            item['check'] = true
          } else {
            item['check'] = false
          }
        })

      },
    }
  }
</script>

<style scoped>
  .screening-item-mun {
    width: 100%;
    /* height: calc(100% - 188rpx); */
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0;
    top: 2.5rem;
  }

  .screen-condition {
    height: 2.73rem;
  }

  .screen-condition.more-condition {
    height:10rem;
    position: relative;
  }

  .good-content-list {
    height: calc(100% - 2.50rem);
    background: #f3f3f3;
    width: 100%;

  }

  .good-content-list scroll-div {
    padding: 0.37rem 0;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .screen-condition {
    height: 2.73rem;

  }


</style>
