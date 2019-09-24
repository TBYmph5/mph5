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
            <span class="iconfont icon-Magnifier" style="display: inline-block;" @click="getRecodesSearch"></span>
            <input placeholder='请输入您要查找的景区名称' v-model="keyWords">

          </div>
        </div>
        <!-- 筛选条件 -->
        <div class='screening-condition-wrap' id="screening-condition-wrap">
          <div class='screening-item  ' :class="comprehensiveArrow?'active':''"
               @click='comprehensiveConditionsChange'>
            综合
            <span class='iconfont  ' :class="comprehensiveArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item' :class="salesArrow?'active':''" @click='salesConditionsChange'>
            销量
            <span class='iconfont ' :class="salesArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item  ' :class="evaluationArrow?'active':''" @click='evaluationConditionsChange'>
            好评
            <span class='iconfont ' :class="evaluationArrow ? 'icon-jiantou':'icon-xiajiantou'"></span>
          </div>
          <div class='screening-item ' :class="moreArrow?'active':''" @click='moreConditionsChange'>
            更多筛选
          </div>
        </div>
      </div>
      <!-- 商品列表 -->
      <div class='good-content-list' :style='{height:height}'>

        <!-- 加载动画 -->
        <div class="loade-animate" v-show="loadingAnimate">
          <img class="animate" src="../../src/assets/images/loading.gif"/>
        </div>

        <div class='good-content-wrap' v-show="!loadingAnimate">
          <!--@load="loadingMoreGood"-->
          <van-list scroll-y  :finished="finished" :offset='offset' :style='{height:height}'>
            <!-- 单个商品 -->
            <div class='hot-good-item' v-for="(item,index) in goodShowArray" :key='index'>
              <div class='img-wrap'>
                <!--pages/Hot/index.wxml-->
                <img :src="qiNiu + '/' + item.cover.split(',')[0]">
              </div>
              <!-- 商品介绍 -->
              <div class='hot-good-figure'>
                <span class='hot-good-name'>{{item.name}}</span>
                <div class='hot-good-discribe'> {{item.description}}</div>
                <div class='price-option-wrap'>
                  <span class='hot-good-price' v-if="item.minPrice !==undefined">¥{{item.minPrice}}  <span
                    style='font-size:0.32rem;color:#959595;'>起</span></span>
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
      <div class='screening-item-mun' :style='{height:height}' v-if="salesConditionsShow"
           @click.stop='salesConditionsHide'>
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

      <div class='screening-item-mun' :style='{height:height}'
           v-if="moreConditionsShow">
        <div class='screening-item-mun-content  ' :class="moreaniStyle?'slideup':'slidedown'">
          <div class='screen-condition more-condition '>
            <div class='price-condition-slide'>
              <span class='condition-title'>价格
                <span class='no-limit'>¥0</span>
              </span>

              <van-slider v-model="currentValue" use-button-slot @change="onDrag" active-color='#409EFF'
                          inactive-color='color: rgba(173, 173, 173, 1);' bar-height='2px' :max='1100' :min="0">
                <div class="custom-button" slot="button">
                  ¥ {{currentValue}}
                  <!--{{filter.showPrice(50)}}-->
                </div>
              </van-slider>
            </div>

            <div class='price-condition-slide hotel-screen' >
              <span class='condition-title'>商品类型：</span>
              <div class="screen-span-wrap" >
                <div v-for="(item,index ) in qualificationsTypes" class="screen-span "
                     :class="item.check==1?'active':''"
                     :key="index" @click='srceenTypeSelect(item,index)'>{{item.text}}
                </div>
              </div>
            </div>
            <div class='price-condition-slide hotel-screen' v-for="(item,index) in  optionsArray" :key="index">
              <span class='condition-title'>{{item.title}}：</span>
              <div class="screen-span-wrap" >
                <!--<a-checkbox-group :options="item.options" v-model="value" @change="onChange"/>-->
                <div v-for="(optionsitem,optionsitemindex ) in item.options" class="screen-span "
                     :class="optionsitem.check==1?'active':''"
                     :key="index" @click='srceenItemSelect(item,optionsitem)'>{{optionsitem.label}}
                </div>
              </div>
            </div>
            <!--<div class='price-condition-slide hotel-screen'>-->
            <!--<span class='condition-title'>酒店星级(可多选)</span>-->
            <!--<div class='screen-span-wrap'>-->
            <!--<div v-for="(item,index ) in hotelStar" class="screen-span " :class="item.check==1?'active':''"-->
            <!--:key="index" @click='hotelStarSelect(index)'>{{item.text}}-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class='price-condition-slide'>-->
            <!--<span class='condition-title'>景区等级(可多选)</span>-->
            <!--<div class='screen-span-wrap'>-->
            <!--<div v-for="(item,index ) in scenicStar" class="screen-span " :class="item.check==1?'active':''"-->
            <!--:key="index" @click='scenicStarSelect(item)'>{{item.text}}-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!-- moreconditionOptions -->
            <div class='more-condition-options'>
              <div class='more-condition-options-item' @click='resetMoreConditin'>清空</div>
              <div class='more-condition-options-item' @click='sureMoreConditin'>确定</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--返回按钮-->
    <div class="go-back" @click="goBack"></div>
  </div>
</template>

<script>
  import areaJson from '../../src/utils/address'
  import http from '../api/public'
  import moment from "moment";
  export default {
    name: "classificationQueryResult",
    data() {
      return {
        keyWords: '',
        queryType: -1,
        qiNiu: this.$store.state.qiNiuLink,
        columnsNum: 2,
        areaList: areaJson,
        offset: 30,
        finished: false,
        loadingAnimate:true,
        areaChooseShow: false,
        overlay: true,
        areaValue: '杭州',
        travelNumber:0,
        travelDate:moment(new Date()).format("YYYY-MM-DD"),
        optionsArray: [],
        conditions: [],
        height: 0,
        recodePage: 0,
        comprehensiveConditionsShow: false,
        aniStyle: true,
        comprehensiveArrow: false,
        comprehensiveCondition: [
          {
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
        salesCondition: [
          {
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
        evaluationCondition: [
          {
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
        currentValue: 0,
        qualificationsTypes: [
          {text: '酒店', check: false,type:1},
          {text: '景区', check: false,type:2},
          {text: '餐饮', check: false,type:3},
          {text: 'Hot', check: false,type:4},
          {text: '自助游', check: false,type:5},
          {text: '旅游+', check: false,type:6},
        ],
        // 商品列表
        goodShowArray: [],

      }
    },
    mounted() {
      /**
       * 获取搜索
       */
      let optionType = '';
      if (this.$route.query.type) {
        switch (this.$route.query.type) {
          case 'scenic':
            optionType = '景区';
            this.queryType = 2;
            break
          case 'hotel':
            optionType = '酒店';
            this.queryType = 1;
            break
          case 'food':
            optionType = '餐饮';
            this.queryType = 4;
            break
          case 'hot':
            optionType = 'Hot';
            this.queryType = 5;
            break
          case 'travelSelf':
            optionType = '自助游';
            this.queryType = 5;
            break
          case 'travelPlus':
            optionType = '旅游+';
            this.queryType = 6;
            break
        }
      };
      if(this.$route.query.travelNumber){
        this.travelNumber=this.$route.query.travelNumber
      };
      if(this.$route.query.keyWords){
        this.keyWords=this.$route.query.keyWords
      }
      if(this.$route.query.travelDate){
        this.travelDate=this.$route.query.travelDate
      }
      this.qualificationsTypes.forEach(item => {
        if (item.text == optionType && optionType !== '') {
          item.check = true
        } else {
          item.check = false
        }
      })
      http.get('/maintenance/search-select', '').then(res => {
        res.obj.forEach(item => {
          item.options.forEach(optionItem => {
            if(this.$route.query.conditionKey){
                if (optionItem.label == this.$route.query.conditionKey){
                  optionItem.check=true,
                    this.conditions= [optionItem.value]
                }
              }else{
                optionItem.check = false

            }


          })

        })
        this.optionsArray = res.obj;
        if (this.$route.query.keyWord) {
          this.keyWords = this.$route.query.keyWord;
        }
        ;
        if (this.$route.query.area) {
          this.areaValue = this.$route.query.area;
        }
        let pxHeight = document.body.clientHeight / 37.5;
        //94px 为1.25rem
        this.height = pxHeight - 1.25 + 'rem';
        this.getRecodes()
      })

    },
    methods: {
      inbtn: function (e) { //这个事件必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡，导致点击in-list这里面的元素时，点击事件冒泡到list-fix触发它的slidedown事件。
        console.log("in")
      },
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
          that.comprehensiveArrow = true;
          //设置其他多选sildeUp
          that.salesConditionsShow = false;
          that.salesaniStyle = false;
          that.salesArrow = false;
          that.evaluationaniStyle = false;
          that.moreaniStyle = false;　　　　　　 //设置动画效果为slidedown
          that.evaluationConditionsShow = false;
          that.evaluationArrow = false;
          that.moreConditionsShow = false;
          that.moreArrow = false;


        } else {
          that.aniStyle = false;　　　　　 //设置动画效果为slidedown
          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.comprehensiveConditionsShow = false;
            that.comprehensiveArrow = false
          }, 500)
        }
      },

      comprehensiveConditionsHide: function () {
        var that = this;//这是list-fix的点击事件，给它绑定事件，是为了实现点击其它地方隐藏蒙层的效果
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
          that.salesArrow = true;
          //设置其他多选sildeUp
          that.aniStyle = false;
          that.evaluationaniStyle = false;
          that.moreaniStyle = false;　　　　　　 //设置动画效果为slidedown
          that.comprehensiveConditionsShow = false;
          that.comprehensiveArrow = false;
          that.evaluationConditionsShow = false;
          that.evaluationArrow = false;
          that.moreConditionsShow = false;
          that.moreArrow = false;
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
        this.salesaniStyle = false;　　　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.salesConditionsShow = false;
          that.salesArrow = false
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
//设置其他多选sildeUp
          that.aniStyle = false;
          that.comprehensiveConditionsShow = false;
          that.comprehensiveArrow = false;
          that.salesaniStyle = false;
          that.salesConditionsShow = false;
          that.salesArrow = false;
          that.moreaniStyle = false;
          that.moreConditionsShow = false;
          that.moreArrow = false;
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
//设置其他多选sildeUp
          that.aniStyle = false;
          that.salesaniStyle = false;
          that.evaluationaniStyle = false;
          //设置动画效果为slidedown
          that.comprehensiveConditionsShow = false;
          that.comprehensiveArrow = false;
          that.salesConditionsShow = false;
          that.salesArrow = false;
          that.evaluationConditionsShow = false;
          that.evaluationArrow = false;

        }
        else {
          this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown
          setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
            that.moreConditionsShow = false,
              that.moreArrow = false
          }, 500)
        }
      }
      ,
      moreConditionsHide() {
        var that = this;
        this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
      }
      ,
      // 价格范围拖动
      onDrag(value) {
        this.currentValue = value
      }
      ,
      /**
       * 条件选择
       * */
      srceenTypeSelect(item,ind){
        this.queryType=item.type;
        this.qualificationsTypes.forEach((qualificationsTypeItem,index)=>{

          if(ind==index){
            qualificationsTypeItem.check=true
          }else{
            qualificationsTypeItem.check=false
          }
        })
      },
      srceenItemSelect(catelog, screemItm) {
        console.log('大类', catelog);
        console.log('item', screemItm);
        if (screemItm.check) {
          screemItm.check = false;
          let currentConditionIndex = this.conditions.indexOf(screemItm.value);
          this.conditions.splice(currentConditionIndex, 1)
          console.log(this.conditions)
        } else {
          screemItm.check = true;
          this.conditions.push(screemItm.value)
          console.log(this.conditions)
        }

        // this.optionsArray.screemItm.
      }
      ,
      /**
       * 取消筛选
       */
      resetMoreConditin() {
        var that = this;
        that.optionsArray.forEach(item => {
          item.options.forEach(optionItem => {
            optionItem.check = false
          })
        })
        that.qualificationsTypes.forEach((item)=>{
          item.check=false
        })
        this.currentValue=0;
        this.queryType=-1;
        this.conditions=[];
        this.moreaniStyle = false　　　　　　 //设置动画效果为slidedown
        //取消其他选项选中效果



        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
        this.getRecodes()
      }
      ,
      /**
       * 确定更多筛选条件
       */
      sureMoreConditin() {
        var that = this;
        that.getRecodesSearch()
        this.moreaniStyle = false;　　　　 //设置动画效果为slidedown
        setTimeout(function () { //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
          that.moreConditionsShow = false;
          that.moreArrow = false
        }, 500)
      }
      ,
      /**
       * 懒加载更多商品
       */
      loadingMoreGood() {
        let currentPage = this.recodePage;
        console.log('拼命加载中');
        this.recodePage++;
        this.getRecodes()
      }
      ,
      goBack() {
        this.$router.go(-1)
      },
      getRecodesSearch(){
        this.goodShowArray=[]
        this.getRecodes()
      },
      /**
       * 获取景区记录
       */
      getRecodes() {
        let that = this;
        let page = that.recodePage + '';
        let area = that.areaValue;
        let keyWord = that.keyWords;
        let order = true;
        let sort = '';
        let queryDate=that.travelDate;
        let travelNumber=that.travelNumber;
        let searchType = that.queryType;
        let minPrice=that.currentValue+'';
        let condition = that.conditions
        let conditionString = condition.join(',');
        console.log(that.queryType);
        let requestUrl = '';
        if (that.queryType == -1) {
          requestUrl = '/search/aptitude?size=8&page=' + page + '&area=' + area + '&keyword=' + keyWord + '&order=' + order + '&sort=' + sort + '&condition=' + conditionString+'&beginData='+queryDate+'&num='+travelNumber+'&beginPrice='+minPrice
        } else {
          requestUrl = '/search/aptitude?size=8&type=' + searchType + '&page=' + page + '&area=' + area + '&keyword=' + keyWord + '&order=' + order + '&sort=' + sort + '&condition=' + conditionString+'&beginData='+queryDate+'&num='+travelNumber+'&beginPrice='+minPrice

        }
        http.get(requestUrl).then(res => {
          let recodesArray = res.obj.hits;
          if (recodesArray.length > 0) {
            recodesArray.forEach(item => {
              let itemProductArray = item.productList;
              console.log(itemProductArray);
              let dailPriceArray = [];
              itemProductArray.forEach(goodItem => {
                let priceList = goodItem.productDailyList;
                priceList.forEach((priceDaliyItem) => {
                  dailPriceArray.push(priceDaliyItem.price)
                })
                // console.log(dailPriceArray)
                item['minPrice'] = Math.min.apply(null, dailPriceArray);

              })


            });
            that.goodShowArray = that.goodShowArray.concat(recodesArray);
            console.log(that.goodShowArray)
            that.loadingAnimate = false;
            if (that.goodShowArray.length === parseInt(res.obj.total)) {
              this.finished = true
            }
          } else {
            that.loadingAnimate = true

          }
        })


      }
      ,
      //跳转到商品详情页
      viewDetails(item) {
        console.log(item, 'navgite')
        this.$router.push({
          path:'/qualificationDetails',
          query: {
            id: item.id,
            type: item.type,
            name:item.name
          }
        })

      }
      ,
      comprehensiveConditionsChoose(ind) {

        console.log(ind);
        this.comprehensiveCondition.forEach((item, index) => {
          if (ind == index) {
            item['check'] = true
          } else {
            item['check'] = false
          }
        })

      }
      ,
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
    height: 12rem;
    position: relative;
  }

  .good-content-list {
    height: calc(100% - 2.50rem);
    background: #f3f3f3;
    width: 100%;
    overflow: auto;

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

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    font-size: 0.346rem;
    font-weight: 400;
    color: rgba(173, 173, 173, 1);
  }

  ::-moz-placeholder { /* Firefox 19+ */
    font-size: 0.346rem;
    font-weight: 400;
    color: rgba(173, 173, 173, 1);
  }

  :-ms-input-placeholder { /* IE 10+ */
    font-size: 0.346rem;
    font-weight: 400;
    color: rgba(173, 173, 173, 1);
  }

  :-moz-placeholder { /* Firefox 18- */
    font-size: 0.346rem;
    font-weight: 400;
    color: rgba(173, 173, 173, 1);
  }

  .search-content {
    margin-bottom: 0.3rem;
  }

  .area-wrap {
    position: relative;
  }

  .area-wrap:after {
    content: '';
    width: 1px;
    height: 0.4rem;
    background: rgba(102, 102, 102, 1);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
  }
.good-content-wrap .hot-good-item{
  width: 92%;
  margin: 0 auto 0.26rem;
}
</style>

