<template>
  <div class="wrap">
    <div class='container'>
      <div class='search-wrap'>
        <div class='search-content'>
          <div class='search-tab-wrap'>
            <div class="tab-item " :class="currentTab===index?'active':''" @click='showSearch(item)'
                 v-for="(item,index) in tabsType" :key='index'>
              <span>{{item.span}}</span>
            </div>

          </div>
          <!-- tab完 -->
          <div class='tabs-content'>
            <!-- 全局 -->
            <div class='ticket-order-wrap gobal-search-form' v-show='currentTab ==0'>
              <van-search v-model="gobalKeyWord " placeholder="请输入搜索关键词" @search="onSearch"
                          />
              <div class="gobal-hot-words-wrap">
                <span class="hot-title">热门关键词</span>
                <div class="hot-word-item "   v-for="(item,index) in gobalHotWords"  :class="index==activeGobalWordIndex?'active':''"
                      :key="index" @click="gobalHotWordActive(item,index)">{{item}}
                </div>

              </div>
            </div>
            <!-- 门票 -->
            <div class='ticket-order-wrap' v-show='currentTab ==1'>
              <div class='form'>

                <div class='form-item '>
                  <span class='form-label'>目的地</span>
                  <div class='form-it-content'>
                    <input v-model='ticketFormDestination' placeholder='请输入目的地(选填)'/>
                  </div>
                  <div class='recommended-list'>
                    <span class='recommended-item' v-for="(item,index) in recommendedList" :key='index'
                          @click='autoFill(item)' >{{item}}</span>
                  </div>
                </div>
                <!-- 目的地 -->
                <div class='form-item '>
                  <span class='form-label'>预计出行日期</span>
                  <div class='form-it-content'>
                    <div class="picker" @click='openTravelTimePopup'>
                      当前选择: {{ticketFormDate|formmatterTimer}}
                    </div>
                    <van-popup v-model=" travelTimePopupShow" position="bottom" :overlay="overlay"
                               @close="travelTimePopupShowonClose">
                      <van-datetime-picker type="date" v-model="ticketFormDate" :min-date="minDate"
                                           :formatter="formatter " @cancel="travelTimeonInputCancel"
                                           @confirm="travelTimeonInputConfirm"/>
                    </van-popup>
                  </div>
                </div>
                <!-- 出行人数 -->
                <div class='form-item '>
                  <span class='form-label'>出行人数</span>
                  <div class='form-it-content' style='font-size:0.34rem;'>
                    <input type='number' v-model='ticketFormTravelNumber'
                           style='width:1.333rem;display:inline-block;position:relative;
                           text-align:center;'/>
                    人
                  </div>
                </div>

              </div>
            </div>
            <!-- 酒店 -->
            <div class='ticket-order-wrap' v-show='currentTab ==2'>
              <div class='form-item '>
                <span class='form-label'>星级</span>
                <div class='form-it-content'>
                  <input v-model='hotelFormGend' placeholder='请输入酒店星级（选填）'/>
                </div>
                <div class="star-list-wrap">
                  <div class="star-item"  v-for="(item,index) in hotelGendList" :class="item.active?'active':''"
                       :key='index' @click="starActive(item,index)">{{item.span}}
                  </div>
                </div>
              </div>

              <div class='form-item '>
                <span class='form-label'>预计入住时间</span>
                <div class='form-it-content'>
                  <div class="picker" @click='openCheckInTimePopup'>
                    当前选择: {{hotelFormDate|formmatterTimer}}
                  </div>
                  <van-popup v-model="checkInTimePopupShow" position="bottom" :overlay="overlay"
                             @close="checkInTimePopupShowonClose">
                    <van-datetime-picker type="date" v-model="hotelFormDate" :min-date="minDate" :formatter="formatter"
                                         @cancel="checkInTimeonInputCancel" @confirm="checkInTimeonInputConfirm"/>
                  </van-popup>
                </div>
              </div>
              <!-- 入住人数 -->
              <div class='form-item '>
                <span class='form-label'>出行人数</span>
                <div class='form-it-content' style='font-size:0.37rem;'>
                  <input type='number' v-model='hotelTravelNumber'
                         style='width:1.33rem;display:inline-block;position:relative;text-align:center;'/>
                  人
                </div>
              </div>
            </div>
            <!-- 餐饮 -->
            <div class='ticket-order-wrap  food-order-wrap ' v-show='currentTab==3'>
              <div class='form-item '>
                <span class='form-label'>类型</span>
                <div class='form-it-content'>
                  <input v-model='mealTypeValue' placeholder='请输入餐饮类型（选填）'/>
                </div>
                <div class="star-list-wrap">
                  <div class="star-item "  v-for="(item,index) in mealTypeList" :class="item.active?'active':''" :key='index'
                       @click="mealTypeActive(item,index)" >
                    {{item.span}}
                  </div>
                </div>
              </div>

              <div class='form-item '>
                <span class='form-label'>预计用餐时间</span>
                <div class='form-it-content'>
                  <div class="picker" @click='openEatingTimePopup'>
                    当前选择: {{foodFormDate|formmatterTimer}}
                  </div>
                  <van-popup v-model="eatingTimePopupShow" position="bottom" :overlay="overlay"
                             @close="eatingTimePopupShowonClose">
                    <van-datetime-picker type="date" v-model="foodFormDate" :min-date="minDate" :formatter="formatter"
                                         @cancel="eatingTimeonInputCancel" @confirm="eatingTimeonInputConfirm"/>
                  </van-popup>
                </div>
              </div>
              <!-- 用餐时间 -->
              <div class='form-item '>
                <span class='form-label'>用餐时间</span>
                <div class="star-list-wrap">
                  <div class="star-item" :class="item.active==true?'active':''" v-for="(item,index) in mealTimeList"
                       :key='index' @click="mealTimeActive(item,index)">{{item.span}}
                  </div>
                </div>
              </div>
              <!-- 入住人数 -->
              <div class='form-item '>
                <span class='form-label'>出行人数</span>
                <div class='form-it-content' style='font-size:0.34rem;'>
                  <input type='number' v-model='foodFormEatNumber'
                         style='width:1.33rem;display:inline-block;position:relative;text-align:center;'/>
                  人
                </div>
              </div>
            </div>
            <!-- 旅游+ -->
            <div class='ticket-order-wrap' v-show='currentTab ==4'>
              <div class='form-item '>
                <span class='form-label'>目的地</span>
                <div class='form-it-content'>
                  <input v-model='travelPlusdestination' placeholder='请输入目的地(选填)'/>
                </div>
                <div class="star-list-wrap">
                  <div class="star-item"   v-for="(item,index) in travelPlusdestinationList"  :class="item.active?'active':''"
                       :key='index'  @click="travelPlusdestinationActive(item,index)">{{item.span}}
                  </div>
                </div>
              </div>
              <div class='form-item '>
                <span class='form-label'>预计出行时间</span>
                <div class='form-it-content'>
                  <div class="picker" @click='travelPlusTimePopup'>
                    当前选择: {{travelPlusFormDate|formmatterTimer}}
                  </div>
                  <van-popup v-model="travelPlusTimePopupShow" position="bottom" :overlay="overlay"
                             @close="travelPlusPopupShowonClose">
                    <van-datetime-picker type="date" v-model="travelPlusFormDate" :min-date="minDate"
                                         :formatter="formatter" @cancel="travelPlusTimeonInputCancel"
                                         @confirm="travelPlusTimeonInputConfirm"/>
                  </van-popup>
                </div>
              </div>
              <!-- 套餐包含 -->
              <div class='form-item '>
                <span class='form-label'>包含</span>
                <div class="star-list-wrap">

                  <van-checkbox v-for="(item,index) in travelPlusIncludelist " :key="index"
                               v-model="item.checked" @click="travelPlusCheckboxOnChange(item,index)">
                    <img slot="icon" slot-scope="item" :src="item.checked ? icon.active : icon.normal "/> {{ item.span }}
                  </van-checkbox>

                </div>
              </div>
              <!-- 入住人数 -->
              <div class='form-item '>
                <span class='form-label'>出行人数</span>
                <div class='form-it-content' style='font-size:0.34rem;'>
                  <input type='number' v-model='travelPlusNumber'
                         style='width:1.33rem;display:inline-block;position:relative;text-align:center;'/>
                  人
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 搜索按钮 -->

      <button class='btn' @click='goDetailPage'>搜索</button>


    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "searchtab",
    data() {
      return {
        overlay: true,
        travelTimePopupShow: false,
        tabsType: [{
          span: '搜索',
          id: 0
        },
          {
            span: '门票',
            id: 1
          },
          {
            span: '酒店',
            id: 2
          },
          {
            span: '餐饮',
            id: 3
          },

          {
            span: '旅游+',
            id: 4
          },
        ],
        recommendedList: ['上海', '广州', '重庆', '北京'],

        minDate: new Date(),
        formatter(type, value) {
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`;
          }
          return `${value}日`;
        },
        currentTab: 4,
        // 全局搜索
        gobalKeyWord: '',
        gobalHotWords: ['三星级', '5A', '四星级', '4A', '五星级', '3A'],
        activeGobalWordIndex: -1,
        // 门票查询表单
        ticketFormDestination: '',
        ticketFormDate: new Date(),
        ticketFormTravelNumber: 4,
        // 1为酒店 2是景区
        searchType: '2',
        // 酒店等级
        hotelFormGend: '',
        hotelGendList: [{
          span: '三星级',
          active: false
        },
          {
            span: '四星级',
            active: false
          },
          {
            span: '五星级',
            active: false
          }
        ],
        hotelFormDate: new Date(),
        checkInTimePopupShow: false,
        hotelTravelNumber: 1,
        // 餐饮
        mealTypeValue: '',
        mealTypeList: [{
          span: '中式',
          active: false
        },
          {
            span: '西式',
            active: false
          },
          {
            span: '日料',
            active: false
          },
          {
            span: '韩式',
            active: false
          },
        ],

        mealTimeList: [{
          span: '早餐',
          active: false
        },
          {
            span: '午餐',
            active: false
          },
          {
            span: '下午茶',
            active: false
          },
          {
            span: '晚餐',
            active: false
          },

        ],
        eatingTimePopupShow: false,
        foodFormDate: new Date(),
        foodFormEatNumber: 1,
// 旅游加
        travelPlusdestination: '',
        travelPlusdestinationList:[
          {span:'北京',active:false},
          {span:'上海',active:false},
          {span:'台湾',active:false}
        ],
        travelPlusTimePopupShow:false,
        travelPlusFormDate: new Date(),
        travelPlusIncludelist: [
          {span: '门票', checked: false},
          {span: '酒店', checked: false},
          {span: '餐饮', checked: false},
          {span: '服务', checked: false},
        ],

        travelPlusNumber: 1,
        checked: false,
        icon: {
          normal: require('../assets/images/unchecked.png'),
          active: require('../assets/images/checked.png')
        },
        chooseIncludeArray: []


      }
    },
    filters: {
      formmatterTimer: function (value) {
        return moment(value).format("YYYY-MM-DD")
      }
    },
    methods: {
      /**
       * 全局关键词搜索
       */
      onSearch(event) {
        console.log(event.detail);
        this.setData({
          gobalKeyWord: event.detail
        })
      },
      /**
       * 全局hotWords 点击
       */
      gobalHotWordActive(item, ind) {
        debugger
        console.log(item,ind)
        this.activeGobalWordIndex = ind,
          this.gobalKeyWord = item
      },
      /**
       * 开启门票选择popup
       */
      openTravelTimePopup() {
        this.travelTimePopupShow = true
      },
      /**
       * 关闭门票选择日期
       */
      travelTimePopupShowonClose() {
        this.travelTimePopupShow = false

      },
      travelTimeonInputCancel: function () {
        var that = this;
        that.travelTimePopupShow = false

      },
      travelTimeonInputConfirm: function (value) {
        console.log(value);
        var that = this;
        that.ticketFormDate = value;
        that.travelTimePopupShow = false

      },
      // 事件处理
      showSearch(item) {
        this.currentTab = item.id
      },
      autoFill(item) {
        this.ticketFormDestination = item

      },
      bindDateChange(e) {
        var that = this;
      },
      /**
       * 酒店星级选择
       */
      starActive(item, index) {
        let currentStarArray = this.hotelGendList;
        currentStarArray.forEach(function (item, ind) {
          if (ind == index) {
            item.active = true
          } else {
            item.active = false
          }
        });
        this.hotelGendList = currentStarArray;
        this.hotelFormGend = item.span
      },
      /**
       * 入住时间弹窗起
       */
      openCheckInTimePopup() {
        this.checkInTimePopupShow = true;
      },
      /**入住时间弹窗收 */
      checkInTimePopupShowonClose() {
        this.checkInTimePopupShow = false

      },
      /**
       * 确定入住时间
       */
      checkInTimeonInputConfirm(value) {
        console.log(value);
        this.hotelFormDate =value;
        this.checkInTimePopupShow = false;
      },

      /**
       * 取消入住时间选择
       */
      checkInTimeonInputCancel() {
        this.checkInTimePopupShow = false
      },

      /**用餐类型选择 */
      mealTypeActive(item, index) {
        let currentMealTypeArray = this.mealTypeList;
        currentMealTypeArray.forEach(function (item, ind) {
          if (index == ind) {
            item.active = true
          } else {
            item.active = false
          }
        })
          this.mealTypeList = currentMealTypeArray;
          this.mealTypeValue = item.span;
      },
      // 用餐时间picker弹出
      openEatingTimePopup() {
        this.eatingTimePopupShow=true
      },
      // 用餐时间picker关闭
      eatingTimePopupShowonClose() {
        this.eatingTimePopupShow=false
      },
      // 用餐时间选定
      eatingTimeonInputConfirm(value) {
        this.foodFormDate=value;
        this.eatingTimePopupShow=false
      },
      // 用餐时间取消选定
      eatingTimeonInputCancel() {
        this.eatingTimePopupShow=false
      },
      // 用餐时段选择
      mealTimeActive(item,index) {

        let currentMealTimeArray = this.ealTimeList;
        currentMealTimeArray.forEach(function (item, ind) {
          if (index == ind) {
            item.active = true
          } else {
            item.active = false
          }
        })
        this.mealTimeList=currentMealTimeArray
      },
      // 用餐时间段选择
      travelPlusCheckboxOnChange(item,index) {
        let currentMealTimeArray = this.travelPlusIncludelist;
        let currentChooseIncludeArray = this.chooseIncludeArray
        currentMealTimeArray.forEach(function (item, ind) {
          if (index == ind) {
            item.checked = !item.checked
            if (item.checked) {
              currentChooseIncludeArray.push(item.span)
            } else {
              let arrayIndex = currentChooseIncludeArray.indexOf(item.span);
              currentChooseIncludeArray.splice(arrayIndex, 1)
            }
          }
        })
        console.log(currentChooseIncludeArray);
        this.travelPlusIncludelist=currentMealTimeArray;
          this.chooseIncludeArray=currentChooseIncludeArray
      },

      /**
       * 旅游+
       */
      travelPlusdestinationActive(item,index){
        this.travelPlusdestination=item.span;
        this.travelPlusdestinationList.forEach((it,ind)=>{
          if(index==ind){
            item.active=true
          }else{
            item.active=false
          }
        })
      },
      travelPlusTimePopup(){
this.travelPlusTimePopupShow=true
      },
      travelPlusPopupShowonClose(){
        this.travelPlusTimePopupShow=false
      },
      travelPlusTimeonInputConfirm(value){
        this.travelPlusFormDate=value;
        this.travelPlusTimePopupShow=false
      },
      travelPlusTimeonInputCancel(){
        this.travelPlusTimePopupShow=false
      },

      // 搜索进入详情页
      goDetailPage() {
        let queryType = '';
        let date = new Date().getTime();
        let travelNumber=0;
        let conditionKey=''
        let keyword='';
        switch (this.currentTab) {
          case 0:
            queryType = '';
            break;
          case 1:
            queryType = 'scenic';
            break;
          case 2:
            queryType = 'hotel';
            break;
          case 3:
            queryType = 'food';
            break;
          case  4:
            queryType = 'travelPlus';
            break

        }
        switch (queryType){

          case  'hotel':
            date = this.hotelFormDate;
            conditionKey = this.hotelFormGend;
            travelNumber = this.hotelTravelNumber;
            break
          case 'scenic':
            keyword=this.ticketFormDestination;
            date=this.ticketFormDate;
            travelNumber= this.ticketFormTravelNumber
            break
          default:
            keyword=this.gobalKeyWord;
        }
        this.$router.push({
          path: '/classificationQueryResult',
          query: {
            type: queryType,
            travelNumber: travelNumber,
            travelDate: moment(date).format('YYYY-MM-DD'),
            keyWord: keyword,
            conditionKey :  conditionKey
          }
        })

      }
    }
  }
</script>

<style scoped>
  .search-wrap {
    width: 100%;
    height: 11rem;
    background: url('https://image.supconit.net/searchBg.png') center no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .search-content {
    width: 92%;
    height: 8.62rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.26rem 0.53rem 0px rgba(130, 130, 130, 0.12);
    border-radius: 0.21rem;
    position: absolute;
    top: 0.77rem;
    left: 0.4rem;
  }

  .search-tab-wrap {
    width: 2.08rem;
    height: 100%;
    border-right: 1px solid #EBEEF5;
    box-sizing: border-box;
    float: left;
  }

  .tab-item {
    height: 20%;
    width: 100%;
   text-align: center;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 0.13rem 0;
    box-sizing: border-box;
    position: relative;

  }

  .tab-item span {
    width: 100%;
    height: 100%;
    line-height: 1.45rem;
    display: block;
  }

  .tab-item.active span:after {
    content: " ";
    width: 0.85rem;
    height: 0.062rem;
    background: rgba(64, 158, 255, 1);
    border-radius: 0.04rem;
    position: absolute;
    bottom: 0.04rem;
    left: 0.61rem;
  }

  .tabs-content {
    width: calc(100% - 2.08rem);
    height: 100%;
    float: right;
    overflow: hidden;
  }

  .ticket-order-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1.106rem 0.48rem 0;
  }

  .form-it-content {
    padding: 0.2rem 0;
    position: relative;
    border-bottom: 1px solid rgba(235, 238, 245, 1);
  }

  .recommended-list {
    width: 100%;
  }

  ::-webkit-input-placeholder {
    color: rgba(192, 196, 204, 1);
    font-size: 0.42rem;
  }

  .recommended-item {
    padding: 0 0.06rem;
    font-size: 0.32rem;
    color: rgba(192, 196, 204, 1);
    display: inline-block;
  }

  input {
    font-size: 0.34rem;
    color: rgba(51, 51, 51, 1);
    outline: none;
    border: none;
  }

  .form-label {
    font-size: 0.32rem;
    color: rgba(102, 102, 102, 1);
  }

  .btn {
    width: 60%;
    height: 1.17rem;
    background: rgba(64, 158, 255, 1);
    border-radius: 0.58rem;
    font-size: 0.42rem;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 1px;
    margin: 1.106rem auto 0 !important;
    outline: none;
    border: none;
    box-shadow: 1px 0.106rem 0.06rem #eee;
    display: block;
  }

  input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    font-size: 0.26rem;
    font-family: 微软雅黑;
    font-weight: 400;
    color: rgba(192, 196, 204, 1);
  }

  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    font-size: 0.26rem;
    font-family: 微软雅黑;
    font-weight: 400;
    color: rgba(192, 196, 204, 1);
  }

  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    font-size: 0.26rem;
    font-family: 微软雅黑;
    font-weight: 400;
    color: rgba(192, 196, 204, 1);
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    font-size: 0.26rem;
    font-family: 微软雅黑;
    font-weight: 400;
    color: rgba(192, 196, 204, 1);
  }

  .form-item {
    margin-bottom: 0.15rem;
  }

  .hello {
    background: #fff !important;
  }

  /* 酒店样式 */
  .star-item.active {
    border: 1px solid rgba(64, 158, 255, 1);
    color: #409EFF;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  /* 餐饮 */
  .food-order-wrap {
    padding: 0.6rem 0.48rem 0;
  }

  .van-checkbox img {
    width: 0.4rem;
    height: 0.4rem;
  }

  van-checkbox {
    width: 25%;
    display: inline-block;
  }

  .van-checkbox__label {
    font-size: 0.37rem;
    margin-left: 5px !important;
  }


  .gobal-hot-words-wrap {
    width: 100%;
    height: auto;
    margin-top:0.773rem;
    /* text-align: center; */
  }
  .gobal-hot-words-wrap .hot-title{
    font-size:0.293rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    display: block;
    text-align: left;
    margin-bottom: 0.26rem;

  }
.star-item{
    display: inline-block;
    width:1.25rem;
    height:0.5rem;
    line-height: 0.48rem;
    border:0.026rem solid rgba(192,196,204,1);
    border-radius:0.25rem;
    font-size:0.26rem;
    font-weight:400;
    color:rgba(192,196,204,1);
    margin-right:0.26rem;
    text-align: center;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin-bottom: 0.13rem;

  }
 .hot-word-item.active{
    border:1px solid rgba(64,158,255,1);
    color:#409EFF;
  }
 /*.hot-word-item:nth-child(5n){*/
    /*margin-right: 0;*/
  /*}*/
.star-list-wrap{
  margin-top: 0.2rem;
}

</style>
