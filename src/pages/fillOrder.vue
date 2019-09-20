<template>
  <div>
    <div class="container">
      <!-- 这里根据类型不同显示不同信息 -->
      <div class="order-good-info-wrap">
        <div class="order-good-info-content" v-if="goodType==1">
          <div class="qualification-details">
            <span class="good-type-title">酒店信息</span>
            <div class="order-good-info-name">{{goodObject.name}}</div>
            <div class="start-date">
              <div
                class="start-date-item"
                @click="checkInStartDatePopupShow = true"
              >入住：{{timestampToTime(checkInStartDate)}}
              </div>
              <div
                class="start-date-item"
                @click="checkInEndDatePopupShow = true"
              >离店：{{timestampToTime(checkInEndDate)}}
              </div>

              <span>共{{daysDetween}}晚</span>
            </div>
            <!-- 入住时间选择 -->
            <van-popup
              v-model="checkInStartDatePopupShow"
              position="bottom"
              :overlay="overlay"
              @close="closeCheckInStartDatePopup"
            >
              <van-datetime-picker
                show-toolbar
                type="date"
                v-model="checkInStartDate"
                :min-date="minDate"
                @confirm="sureCheckInStartDate"
                @cancel="cancelCheckInStartDate"
              />
            </van-popup>
            <!-- 离店时间选择 -->
            <van-popup
              v-model="checkInEndDatePopupShow"
              position="bottom"
              :overlay="overlay"
              @close="closeCheckInEndDatePopup"
            >
              <van-datetime-picker
                type="date"
                v-model="checkInEndDate"
                :min-date="minDate"
                @confirm="sureCheckInEndDate"
                @cancel="cancelCheckInEndDate"
              />
            </van-popup>
            <!-- 房间数量 -->
            <div class="room-number">
              房间数量
              <div class="room-number-span">{{roomNumber}}</div>
              <div class="number-option">
                <div class="number-option-item" @click="addRoomNumber">
                  <span class="iconfont icon-jia"></span>
                </div>
                <div class="number-option-item" @click="minusRoomNUmber">
                  <span class="iconfont icon-jian1"></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 联系人信息开始 -->
          <div class="contact-wrap">
            <span class="good-type-title">联系人信息</span>
            <div class="contact-wrapper" v-for="(item,index) in playerArray" :key="index">
              <div class="contact-content">
                联系人{{index+1}}
                <span class="iconfont icon-jian" @click="deleteThisPlayer(index)" v-show="goodType"></span>
              </div>
              <div class="conatct-item-wrap">
                <div class="choose-from-contact-list" @click="chooseContacts(index)" v-if="hasContacts">
                  <img src="../assets/images/contactlist.png"/>
                  联系人
                </div>
                <div class="choose-from-contact-list" v-else style="color: #BABABA;">
                  <img src="../assets/images/nocontactlist.png"/>
                  联系人
                </div>

                <div class="conatct-item">
                  <span class="iconfont icon-bitian"></span>
                  姓名：
                  <input
                    placeholder="请输入联系人姓名"
                    class="conatct-input"
                    placeholder-style="color:#BABABA;font-size:0.4rem;"
                    v-model="item.name"
                    bindinput="nameInput"
                  />
                </div>
                <div class="conatct-item">
                  <span class="iconfont icon-bitian"></span>
                  联系电话：
                  <input
                    placeholder="请输入联系人电话"
                    class="conatct-input"
                    placeholder-style="color:#BABABA;font-size:0.4rem;"
                    v-model="item.phone"
                    bindinput="phoneInput"
                  />
                </div>
              </div>
              <!-- 保存联系人 -->
              <div class="saveContact" @click="saveContact(item)">保存联系人</div>
            </div>
            <!-- 添加联系人 -->
            <div class="add-contact-number" @click="addPlayNumber" v-show="goodType==1">
              <span class="iconfont icon-jia1"></span> 继续添加联系人
            </div>
          </div>
        </div>
        <div class="order-good-info-content" v-if="goodType==2">
          <div class="qualification-details">
            <span class="good-type-title">门票信息</span>
            <div class="order-good-info-name">{{goodObject.name}}</div>
            <div class="start-date">
              <div class="start-date-item">
                预定日期 :
                <div
                  class="ticketOrderDate"
                  @click="openticketOrderDatePopup"
                >{{timestampToTime(ticketOrderDate)}}
                </div>
              </div>

              <!-- 门票时间选择 -->
              <van-popup
                v-model="ticketOrderDatePopupShow"
                position="bottom"
                :overlay="overlay"
                @close="closeTicketOrderDatePopup"
              >
                <van-datetime-picker
                  type="date"
                  v-model="ticketOrderDate"
                  :min-date="minDate"
                  @confirm="sureTicketOrderDate"
                  @cancel="cancelTicketOrderDateDate"
                />
              </van-popup>
            </div>

            <!-- 房间数量 -->
            <div class="room-number">
              门票数量
              <div class="room-number-span">{{ticketNumber}}</div>
              <div class="number-option">
                <!--<div class="number-option-item" @click="addTicketNumber">-->
                  <!--<span class="iconfont icon-jia"></span>-->
                <!--</div>-->
                <!--<div class="number-option-item" @click="minusTicketNUmber">-->
                  <!--<span class="iconfont icon-jian1"></span>-->
                <!--</div>-->
              </div>
            </div>
          </div>
          <!-- 联系人信息开始 -->
          <div class="contact-wrap">
            <span class="good-type-title">游玩人信息</span>
            <div class="contact-wrapper" v-for="(item,index) in playerArray" :key="index">
              <div class="contact-content">
                游玩人{{index+1}}
                <!--<span class="iconfont icon-jian" @click="deleteThisPlayer(index)"></span>-->
              </div>
              <div class="conatct-item-wrap">
                <div class="choose-from-contact-list" @click="chooseContacts(index)">
                  <img src="../assets/images/contactlist.png"/>
                  联系人
                </div>
                <div class="conatct-item">
                  <span class="iconfont icon-bitian"></span>
                  姓名：
                  <input
                    placeholder="请输入游玩人姓名"
                    class="conatct-input"
                    v-model="item.name"
                  />
                </div>
                <div class="conatct-item">
                  <span class="iconfont icon-bitian"></span>
                  联系电话：
                  <input
                    placeholder="请输入游玩人电话"
                    class="conatct-input"
                    v-model="item.phone"

                  />
                </div>
              </div>
              <div class="conatct-item" @click="openThisChooseType(index)">
                <span class="iconfont icon-bitian"></span>
                证件类型：
                <div class="card-type">{{item.IdCardType}}</div>
                <span class="iconfont icon-arrow-right"></span>
              </div>
              <div class="conatct-item">
                <span class="iconfont icon-bitian"></span>
                证件号码：
                <input
                  placeholder="请输入证件号码" class="conatct-input" v-model="item.idcard"/>
              </div>
              <!-- 保存联系人 -->
              <div class="saveContact" @click="saveContact(item)">保存新的联系人</div>
            </div>
            <van-popup
              v-model="idCardTypePopShow"
              position="bottom"
              :overlay="overlay"
              @close="chooseIdTypeonClose"
            >
              <van-picker

                show-toolbar
                :columns="columns" @cancel="IdCardTypeCancel"
                @confirm="IdCardTypeConfirm"/>
            </van-popup>
            <!-- 添加联系人 -->
            <div class="add-contact-number" @click="addPlayNumber" v-show="goodType==1">
              <span class="iconfont icon-jia1"></span> 继续添加游玩人
            </div>
          </div>
        </div>
      </div>

      <!-- 出行须知 -->
      <!--<div class="travel-information">-->
        <!--<span class="good-type-title" style="margin-bottom:0.42rem;display:block;">出行须知</span>-->
        <!--<span class="good-type-title" style="margin-bottom:0.14rem;">注意事项</span>-->
        <!--<div-->
          <!--class="matters-attention"-->
        <!--&gt;-->
          <!--根据上海市《公共场所吸烟控制条例》，自2017年3月1日起酒店不能安排吸烟房，并禁止在酒店室内区域吸烟。根据上海市《公共场所吸烟控制条例》，自2017年3月1日起酒店不能安排吸烟房，并禁止在酒店室内区域吸烟。根据上海市《公共场所吸烟控制条例》，自2017年3月1日起酒店不能安排吸烟房，并禁止在酒店室内区域吸烟。根据上海市《公共场所吸烟控制条例》，自2017年3月1日起酒店不能安排吸烟房，并禁止在酒店室内区域吸烟.-->
        <!--</div>-->
      <!--</div>-->

      <!-- 支付金额 -->
      <div class="pay-ment-wrap">
        <div class="price-detaile">
          支付金额：
          <span class="order-price">¥ {{priceOrder}}</span>
          <span class="cost-detail" @click="costDetailShowOpen">费用明细</span>
        </div>
        <div class="pay-now" @click="payNow">提交订单</div>
      </div>
      <!-- 费用明细 -->
      <van-popup
        v-model="costDetailShow"
        position="bottom"
        @close="costDetailOnClose"
      >
        <div class="cost-detail-wrap" v-if="goodType==1">
          <span class="good-type-title">费用明细</span>
          <div v-for="(item,index) in chooseValenceArray" class="daily-price" :key="index"
               style="display: inline-block;width: 48%;">
            <span class="date">{{item.date}}</span>
            <span class="daily">¥{{item.price}}</span>
          </div>
          <div class="ticket-number">
            房间数量:
            <span style="color:#409EFF;">{{roomNumber}} 间</span>
          </div>
          <div v-if=" payablePrice !== priceOrder" class="payablePrice">
            活动前价格：
            <span>¥{{ payablePrice}}</span>
          </div>
          <div v-if="matchSalesList.length>0">
            <div v-for="(item,index) in matchSalesList" :key="index">
              <div class="sales-item-type discount" v-if="item.type==0">
                促销活动：折扣
                (<span>{{item.ruleJson.discount}}%</span>)
              </div>
              <div class="sales-item-type discount" v-else>
                促销活动：满减
                （
                <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                  <span class="full-reduction-feeDetail">单日满：{{item.full}} 减{{item.reduction}}</span>
                </div>
                ）
              </div>
            </div>
          </div>
          <div class="priceOrder">活动价格：¥ {{priceOrder}}</div>
        </div>
        <!-- 门票价格明细 -->
        <div class="cost-detail-wrap" v-if="goodType==2">
          <span class="good-type-title" style="margin-bottom:0.2rem;">费用明细</span>

          <div class="ticket-number">
            门票信息: {{goodObject.name}}
            <div>
              <span style="margin-right: 0.15rem;" class="ticketInfo">{{timestampToTime(ticketOrderDate)}}</span>
              <span style="color:#409EFF;" class="ticketInfo">{{ticketNumber}}张</span>
            </div>
          </div>
          <div v-if="payablePrice !== priceOrder" class="payablePrice">
            活动前总价：
            <span>{{ payablePrice}}</span>
          </div>
          <div v-if="matchSalesList.length>0">
            <div v-for="(item,index) in matchSalesList" :key="index">
              <div class="sales-item-type discount" v-if="item.type=='0'">
                促销活动:
                折扣
                ( <span>{{item.ruleJson.discount}}%</span>)
              </div>
              <div class="sales-item-type discount" v-if="item.type=='1'">
                促销活动: 满减
                (
                <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                  <span class="full-reduction-feeDetail" style="margin-right: 0.1rem;">单日满:{{item.full}}减{{item.reduction}}</span>
                </div>
                )
              </div>
            </div>
          </div>

          <div class="priceOrder">
            活动总价：
            <span>¥{{priceOrder}}</span>
          </div>
        </div>
      </van-popup>
      <!-- 选择联系人弹窗 -->
      <van-popup
        v-model="chooseContact"
        position="bottom"
        :overlay="true"
        @close="chooseContactonClose"
      >
        <div class="choose-contact-wrap">
          <div class="choose-contact-content">
            <span class="contact-title">联系人</span>
            <div
              class="contact-choose-item"
              :class="item.select? 'active':''"
              v-for="(item,index) in chooseContactList"
              :key="index"
              @click="chooseThisContact(item)"
            >{{item.name}}
            </div>
          </div>
        </div>
      </van-popup>
    </div>
    <van-toast id="van-toast"/>
    <!--返回按钮-->
    <div class="go-back userCenter" @click="goBack"></div>
  </div>
</template>
<script>
  import http from "../api/public";
  import moment from "moment";
  import {debug} from "util";
  import {Toast} from 'vant';
  import {getStore, removeStore, setStore} from '../utils/storage'
  // import wx from 'weixin-js-sdk'
  export default {
    data() {
      return {
        goodType: 2,
        chooseValenceList: [],
        chooseDate: "",
        goodId: "",
        chooseNumber: "",
        goodObject: {},
        overlay: true,
        chooseValenceArray: [],
        salesList: [],
        matchSalesList: [],
        payablePrice: 0,
        priceOrder: 0,
        realTimePriceList: [],
        checkInStartDatePopupShow: false,
        checkInStartDate: new Date(),
        minDate: new Date(),
        formatter: function (type, value) {
          if (type === "year") {
            return `${value}年`;
          } else if (type === "month") {
            return `${value}月`;
          }
          return `${value}日`;
        },
        // 离店popup
        checkInEndDatePopupShow: false,
        // checkInEndDate: new Date() + 24 * 60 * 60 * 1000,
        checkInEndDate: new Date(),
        // 间隔天数
        daysDetween: 1,
        // 房间数
        roomNumber: 1,

        // 费用明细
        costDetailShow: false,
        // 门票数量
        // 门票日期
        ticketOrderDate: new Date(),
        ticketOrderDatePopupShow: false,
        ticketNumber: 1,
        // 游玩人
        playerArray: [
          {
            name: "",
            idcard: "",
            phone: "",
            IdCardType: "身份证"
          }
        ],
        palyerIndex: 0,
        columns: ["身份证", "港澳居民通行证", "台湾居民通行证", "护照"],
        idCardTypePopShow: false,
        currentPlayer: 0,
        chooseContact: false,
        chooseContactList: [],
        hasContacts: false
      };
    },
    mounted() {
      let chooseGoodJson = this.$store.state.chooseGoodJson;
      // let chooseGoodJson = this.$route.query;
      let optionchooseValenceAray = chooseGoodJson.choooseValenceList;
      let shijianc = Date.parse(optionchooseValenceAray[0].day);
      optionchooseValenceAray.forEach(function (item) {
        item["price"] = item.amount.substr(1); //删除第一个字符
        item["dailyDate"] = Date.parse(item.day);
      });
      var chooseValenceAray = optionchooseValenceAray;
      var statDate;
      var endDate;
      var ticketOrderTime;
      if (chooseValenceAray.length > 1) {
        chooseValenceAray.forEach(function (item, index) {
          item["dailyDate"] = parseInt(item.dailyDate);
          if (index == 0) {
            statDate = item;
          } else {
            endDate = item;
          }
        });
        this.goodId = chooseGoodJson.goodId;
        this.checkInStartDate = statDate.dailyDate;
        this.checkInEndDate = endDate.dailyDate;
        this.roomNumber = parseInt(chooseGoodJson.chooseNumber)
        this.count();
      } else {
        this.goodId = chooseGoodJson.goodId;
        this.ticketOrderDate = chooseValenceAray[0].dailyDate;
        this.ticketNumber = parseInt(chooseGoodJson.chooseNumber);
      }

      this.getGoodDetail(this.goodId);
      this.getList();
      this.timestampToTime();
    },
    methods: {
      timestampToTime(timestamp) {
        var t1 = moment(timestamp).format("YYYY-MM-DD");
        return t1;
      },

      // 获取联系人列表
      getList() {
        //获取联系人列表
        let that = this;
        http.get("/customer/contacts/list").then(res => {
          that.chooseContactList = res.obj;
          debugger
          if (res.obj.length > 0) {
            that.hasContacts = true
          } else {
            that.hasContacts = false
          }
        });
      },
      /**
       * 匹配价态
       */
      getBatchValence() {
        let betweenDateArray = this.getBetweenDateStr(
          moment(this.checkInStartDate).format("YYYY-MM-DD"),
          moment(this.checkInEndDate).format("YYYY-MM-DD")
        );
        let needDateArray = betweenDateArray.slice(0, -1);
        let ValenceArray = [];
        for (var i = 0; i < needDateArray.length; i++) {
          let matchPriceArray = this.goodObject.productDailyList;
          matchPriceArray.forEach(function (item) {
            if (
              needDateArray[i] ==
              moment(parseInt(item.dailyDate)).format("YYYY-MM-DD")
            ) {
              item["date"] = moment(parseInt(item.dailyDate)).format(
                "YYYY-MM-DD"
              );
              ValenceArray.push(item);
            }
          });
        }
        this.chooseValenceArray = ValenceArray;
      },

      /**
       * 计算价格，保存基本订单信息
       */
      calculatePrice() {
        var that = this;
        let price = 0;
        let orderPrice = 0;
        let realTimePriceArray = [];
        switch (this.goodType) {
          case 1:
            let chooseValenceArray = that.chooseValenceArray;
            if (that.salesList.length > 0) {
              let matcSaleshArray = that.salesList;
              chooseValenceArray.forEach(function (chooseValenceArrayItem) {
                let contactSales = matcSaleshArray.filter(function (item) {
                  return (
                    parseInt(item.beginDate) <=
                    parseInt(chooseValenceArrayItem.dailyDate) &&
                    parseInt(chooseValenceArrayItem.dailyDate) <=
                    parseInt(item.endDate)
                  );
                });
                that.matchSalesList = contactSales;
                console.log(contactSales);
                //匹配各个日期期间存在的促销活动
                if (contactSales.length >= 0) {
                  let percentage = parseInt(contactSales[0].ruleJson.discount);
                  let floatPercent = percentage / 100.0;
                  switch (contactSales[0].type) {
                    case 0:
                      if (chooseValenceArrayItem.price) {
                        realTimePriceArray.push(
                          chooseValenceArrayItem.price *
                          floatPercent *
                          that.roomNumber
                        );
                        price += chooseValenceArrayItem.price * that.roomNumber;
                        orderPrice +=
                          chooseValenceArrayItem.price *
                          floatPercent *
                          that.roomNumber;
                      }
                      (that.payablePrice = price.toFixed(2)),
                        (that.priceOrder = orderPrice.toFixed(2)),
                        (that.realTimePriceList = realTimePriceArray);
                      break;
                    case 1:
                      if (chooseValenceArrayItem.price) {
                        price += chooseValenceArrayItem.price * that.roomNumber;
                        let roomNuber = that.roomNumber;
                        //匹配满足哪一个满减规则，若多个规则都符合则挑选最大的
                        console.log(contactSales);
                        let matchRuleJson = contactSales[0].ruleJson;
                        let contactFullReduction = matchRuleJson.filter(function (
                          item
                        ) {
                          return (
                            chooseValenceArrayItem.price * roomNuber >= item.full
                          );
                        });
                        if (contactFullReduction.length > 0) {
                          console.log(contactFullReduction);
                          //寻找满足要求最大的一条满减规则,通过排序获得，取出第一条
                          contactFullReduction.sort(function (a, b) {
                            return b.full - a.full;
                          });
                          console.log(contactFullReduction);
                          orderPrice +=
                            chooseValenceArrayItem.price * that.roomNumber -
                            contactFullReduction[0].reduction;
                          realTimePriceArray.push(
                            chooseValenceArrayItem.price * that.roomNumber -
                            contactFullReduction[0].reduction
                          );
                        } else {
                          orderPrice +=
                            chooseValenceArrayItem.price * that.roomNumber;
                          realTimePriceArray.push(
                            chooseValenceArrayItem.price * that.roomNumber
                          );
                        }
                      }
                      (that.payablePrice = price.toFixed(2)),
                        (that.priceOrder = orderPrice.toFixed(2)),
                        (that.realTimePriceList = realTimePriceArray);
                      break;
                  }
                }
              });
            } else {
              chooseValenceArray.forEach(function (item) {
                if (item.price) {
                  price += item.price * that.roomNumber;
                  realTimePriceArray.push(item.price * that.roomNumber);
                }
              });
              (that.payablePrice = price),
                (that.priceOrder = price),
                (that.realTimePriceList = realTimePriceArray);
            }
            break;
          case 2:
            let ValenceArray = that.goodObject.productDailyList;
            console.log(ValenceArray);
            let ValenceDate = moment(that.ticketOrderDate).format("YYYY-MM-DD");
            //获取选择时间的时间戳，便于对比是否在促销活动存在期间此刻已是时间戳不需要再修改格式
            let ValenceDateTimeStamp = that.ticketOrderDate;
            let matchdaily = ValenceArray.filter(function (item) {
              return (
                moment(parseInt(item.dailyDate)).format("YYYY-MM-DD") ==
                ValenceDate
              );
            });

            if (matchdaily.length > 0) {
              let matchdailyPrice = matchdaily[0].price;
              if (that.salesList !== '' && that.salesList.length > 0) {
                let matcSaleshArray = that.salesList;
                let contactSales = matcSaleshArray.filter(function (item) {
                  return (
                    parseInt(item.beginDate) <= ValenceDateTimeStamp &&
                    ValenceDateTimeStamp <= parseInt(item.endDate)
                  );
                });

                that.matchSalesList = contactSales;

                console.log(contactSales)

                // 折前价格
                let discountPrice = matchdailyPrice * that.ticketNumber;
                if (contactSales.length > 0) {
                  switch (contactSales[0].type) {
                    case 0:
                      let percentage = parseInt(contactSales[0].ruleJson.discount);
                      let floatPercent = percentage / 100.0;
                      realTimePriceArray.push(
                        matchdailyPrice *
                        that.ticketNumber *
                        floatPercent.toFixed(2)
                      );
                      //  折后价格
                      let disCountedPrice = discountPrice * floatPercent;
                      (that.payablePrice = discountPrice.toFixed(2)),
                        (that.priceOrder = disCountedPrice.toFixed(2)),
                        (that.realTimePriceList = realTimePriceArray);

                      break;
                    case 1:
                      let ticketNuber = that.ticketNumber;

                      let matchRuleJson = contactSales[0].ruleJson;
                      let contactFullReduction = matchRuleJson.filter(function (
                        item
                      ) {
                        return matchdailyPrice * ticketNuber >= item.full;
                      });
                      if (contactFullReduction.length > 0) {
                        console.log(contactFullReduction);
                        //寻找满足要求最大的一条满减规则,通过排序获得，取出第一条
                        contactFullReduction.sort(function (a, b) {
                          return b.full - a.full;
                        });
                        (that.payablePrice = discountPrice.toFixed(2)),
                          (that.priceOrder =
                            discountPrice.toFixed(2) -
                            contactFullReduction[0].reduction),
                          (that.realTimePriceList = realTimePriceArray);
                      } else {
                        realTimePriceArray.push(discountPrice).toFixed(2);
                        (that.payablePrice = discountPrice.toFixed(2)),
                          (that.priceOrder = discountPrice.toFixed(2)),
                          (that.realTimePriceList = realTimePriceArray);
                      }
                      break;
                  }
                }

              } else {
                realTimePriceArray.push(
                  (matchdailyPrice * that.ticketNumber).toFixed(2)
                );
                (that.payablePrice = (
                  matchdailyPrice * that.ticketNumber
                ).toFixed(2)),
                  (that.priceOrder = (
                    matchdailyPrice * that.ticketNumber
                  ).toFixed(2)),
                  (that.realTimePriceList = realTimePriceArray),
                  (that.ticketDaliyprice = matchdailyPrice);
              }
              break;
            }

        }
        console.log(that.matchSalesList);
        let feeDetail = {};
        feeDetail['goodType'] = this.goodType;
        feeDetail['goodName'] = this.goodObject.name;
        feeDetail['hotelchooseValenceArray'] = this.chooseValenceArray;
        feeDetail['roomNumber'] = this.roomNumber;
        feeDetail['payablePrice'] = this.payablePrice;
        feeDetail['priceOrder'] = this.priceOrder;
        feeDetail['matchSalesList'] = this.matchSalesList;
        feeDetail['ticketOrderDate'] = this.ticketOrderDate;
        feeDetail['ticketNumber'] = this.ticketNumber;
        this.$store.commit('setfeeDetail', feeDetail);

      },
      /**
       * 相隔几晚
       */
      count() {
        var date1 = new Date(this.checkInStartDate);
        var date2 = new Date(this.checkInEndDate);
        var date = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
        /*不用考虑闰年否*/
        // alert("相差" + date + "天");
        this.daysDetween = Math.ceil(date);
      },
      /**
       * 获取两个日期间的所有日期
       */
      getBetweenDateStr(start, end) {
        var result = [];
        var beginDay = start.split("-");
        var endDay = end.split("-");
        var diffDay = new Date();
        var dateList = new Array();
        var i = 0;
        diffDay.setDate(beginDay[2]);
        diffDay.setMonth(beginDay[1] - 1);
        diffDay.setFullYear(beginDay[0]);
        result.push(start);
        while (i == 0) {
          var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
          diffDay.setTime(countDay);
          dateList[2] = diffDay.getDate();
          dateList[1] = diffDay.getMonth() + 1;
          dateList[0] = diffDay.getFullYear();
          if (String(dateList[1]).length == 1) {
            dateList[1] = "0" + dateList[1];
          }
          if (String(dateList[2]).length == 1) {
            dateList[2] = "0" + dateList[2];
          }
          result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
          if (
            dateList[0] == endDay[0] &&
            dateList[1] == endDay[1] &&
            dateList[2] == endDay[2]
          ) {
            i = 1;
          }
        }
        // console.log(result);
        return result;
      },
      /**
       * 获取商品详情
       */
      getGoodDetail(goodId) {
        var that = this;
        http.get("/search/aptitude/byProductId/" + goodId).then(res => {
          console.log(res);
          let qualificationJson = res.obj.hits[0];
          let goodJson = qualificationJson._source.productList[0];
          console.log(goodJson);
          let type = 0;
          switch (res.obj.hits[0]._type) {
            case "hotel":
              type = 1;
              break;
            case "scenic":
              type = 2;
              break;
          }

          let salesArray = goodJson.saleList;
          if (salesArray !== "") {
            salesArray.forEach(function (item) {
              item["ruleJson"] = JSON.parse(item.ruleJson);
            });
          }
          that.goodObject = goodJson;
          that.goodType = type;
          that.salesList = salesArray;

          if (type == 1) {
            that.getBatchValence();
          }

          that.calculatePrice();
        });
      },
      //门票日期选择
      openticketOrderDatePopup() {
        this.ticketOrderDatePopupShow = true;
      },
      // 关闭开始时间弹窗
      closeCheckInStartDatePopup() {
        this.checkInStartDatePopupShow = false;
      },
      // 入住开始时间确定
      sureCheckInStartDate: function (event) {
        var that = this;
        that.checkInStartDate = event
        that.checkInStartDatePopupShow = false
        that.count();
        that.getBatchValence();
        that.calculatePrice();
      },
      // 取消选择开始时间
      cancelCheckInStartDate() {
        this.checkInStartDatePopupShow = false;
      },
      // 关闭离店时间选择
      closeCheckInEndDatePopup() {
        this.checkInEndDatePopupShow = false;
      },
      // 离店开始时间确定
      sureCheckInEndDate: function (event) {
        console.log(event, 'event')
        var that = this;
        that.checkInEndDate = event
        that.checkInEndDatePopupShow = false
        that.count();
        that.getBatchValence();
        that.calculatePrice();
      },
      // 取消选择开始时间
      cancelCheckInEndDate() {
        this.checkInEndDatePopupShow = false
      },
      // 增加房间数
      addRoomNumber() {
        let currentNumber = this.roomNumber
        this.roomNumber = currentNumber + 1
        this.calculatePrice()
      },
      // 减少房间数
      minusRoomNUmber() {
        let currentNumber = this.roomNumber
        this.roomNumber = currentNumber - 1
        if (this.roomNumber < 1) {
          this.roomNumber = 1
        }
        this.calculatePrice()
      },
      // 删除当前游玩人
      deleteThisPlayer(index) {
        console.log(index);
        let currentplayerArray = this.playerArray;
        if (currentplayerArray.length <= 1) {
          Toast({
            message: '需一位游玩人',
            icon: 'fail'
          });
        } else {
          currentplayerArray.splice(index, 1);
          this.playerArray = currentplayerArray
        }
      },
      // 选择联系人
      chooseContacts(index) {
        this.chooseContact = true,
          this.palyerIndex = index
      },
      /**
       * 保存新的联系人
       */
      saveContact(item) {
        console.log(item);
        var that = this;
        var dataSet = item;
        let validation;
        switch (that.goodType) {
          case 1:
            validation = dataSet.name == '' || dataSet.phone == ''
            break
          case 2:
            validation = dataSet.name == '' || dataSet.phone == '' || dataSet.idenCard == ""
            break
        }
        if (validation) {
          Toast('联系人信息不能为空');
        } else {
          let params = {};
          params['idenCard'] = dataSet.idcard;
          params['name'] = dataSet.name;
          params['phone'] = dataSet.phone;
          params['IdCardType'] = dataSet.idcardtype;
          http.post('/customer/contacts', params).then(res => {
            that.chooseContactList = res.obj
            Toast('保存成功');
            that.getList()
          })
        }
      },
      // 添加游玩人
      addPlayNumber() {
        let currentplayrArray = this.playerArray;
        var playerJson = {};
        playerJson['name'] = '';
        playerJson['phoneNumber'] = '';
        playerJson['idcard'] = '',
          playerJson['IdCardType'] = '身份证',
          currentplayrArray.push(playerJson);
        this.playerArray = currentplayrArray
      },
      // 费用明细弹出层open
      costDetailShowOpen() {
        this.costDetailShow = true
      },
      /**
       * 提交订单
       */
      payNow() {
        let contactsJson = [];
        let parmas = {};
        console.log(this.playerArray);
        //拼接联系人
        parmas['contactsJson'] = this.playerArray;
        parmas['productId'] = this.goodId;
        // parmas['quantity'] = this.chooseValenceArray.length;
        parmas['other'] = '';
        parmas['price'] = this.priceOrder;
        //拼接商品list
        let productArray = [];
        let realTimePriceList = this.realTimePriceList;
        let validationArray = this.playerArray;
        debugger
        switch (this.goodType) {
          case 1:
            validationArray.forEach((item, index) => {
              if (this.checkPhone(item.phone) && item.name !== '') {
                contactsJson.push(item)
              } else if (item.name == '') {
                Toast('联系人' + (index + 1) + '姓名不能为空',);
                // break
              } else if (!this.checkPhone(item.phoneNumber)) {
                Toast('联系人' + (index + 1) + '预留号码填写错误');
              }

            });
            let ValenceArray = this.chooseValenceArray;
            console.log(ValenceArray);
            ValenceArray.forEach((item, index) => {
              let productItem = {};
              productItem['buyDate'] = moment(new Date()).format('YYYY-MM-DD');
              productItem['realTimePrice'] = this.realTimePriceList[index];
              productItem['useDate'] = item.date;
              productItem['quantity'] = this.roomValue;
              productArray.push(productItem);
            });
            parmas['productInfoList'] = productArray;
            parmas['quantity'] = this.roomValue * this.chooseValenceArray.length;
            break
          case  2:
            let certificateValidationResult;
            validationArray.forEach((item, index) => {
              console.log(item.IdCardType, '身份证类型')
              if (item.IdCardType !== undefined) {
                switch (item.IdCardType) {
                  case '身份证':
                    certificateValidationResult = this.idCardValid(item.idcard).status;
                    break
                  case '港澳居民通行证':
                    certificateValidationResult = this.isHKCard(item.idcard).status;
                    break
                  case '台湾居民通行证':
                    certificateValidationResult = this.isTWCard(item.idcard).status;
                  default:
                    certificateValidationResult = this.isPassPortCard(item.idcard).status;
                }
                console.log(certificateValidationResult, '身份验证')
                /**
                 * 验证信息
                 */
                if (this.checkPhone(item.phone) && item.name !== '' && certificateValidationResult) {
                  contactsJson.push(item)
                } else if (!this.checkPhone(item.phone)) {
                  Toast('联系人' + (index + 1) + '预留号码填写错误');
                } else if (item.name == '') {
                  Toast('联系人' + (index + 1) + '姓名不能为空');
                } else if (!this.idCardValid(item.idCard).status) {
                  Toast('联系人' + (index + 1) + '证件号码有误');
                }

              } else {
                Toast('用户证件信息有误')
              }


            });
            console.log(this.realTimePriceList)
            let productItem = {};
            productItem['buyDate'] = moment(new Date()).format('YYYY-MM-DD');
            productItem['realTimePrice'] = this.realTimePriceList[0];
            productItem['useDate'] = moment(this.ticketOrderDate).format('YYYY-MM-DD');
            productItem['quantity'] = this.ticketNumber;
            productArray.push(productItem);
            parmas['productInfoList'] = productArray;
            parmas['quantity'] = this.ticketNumber;

            break

        }
        if (this.playerArray.length == contactsJson.length) {
          http.post('/order/info/finishOrder', parmas).then(res => {
            if (res.msg == '操作成功') {
              console.log(wx)

              // console.log(this.$cookies.get('SESSION'))
              //  debugger// return value
              //  let path = '/pages/payment/index?orderSnapshot=' + JSON.stringify(res.obj) + "feeDetail" + JSON.stringify(this.$store.state.feeDetail);
              //  wx.miniProgram.navigateTo({url: path});
              this.$store.commit('setcreatorderTime', moment(new Date()).valueOf());
              // if (this.priceOrder == 0) {
              //   Toast.success('门票预定成功');
              //   this.$router.push({
              //     path: '/orderTab',
              //
              //   })
              // } else {
                this.$router.push({
                  path: '/payment',
                  query: {
                    orderSnapshot: res.obj
                  }
                })
              // }

              // wx.navigateTo({
              // 	url: '/pages/paymentH5/index?orderId=' + res.obj + '&cookie=' + wx.getStorageSync("sessionid"),
              // })
            } else {
              Toast('操作失败，' + res.msg)
            }
          })
        }
      },
      /**
       * 手机号正则
       * */
      checkPhone(phone) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(phone)) {
          return false;
        } else {
          return true;
        }
      },
      /**
       * 大陆身份证
       * */
      idCardValid(id) {
        // 1 "验证通过!", 0 //校验不通过
        var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        //号码规则校验
        if (!format.test(id)) {
          return {'status': false, 'msg': '身份证号码不合规'};
        }
        //区位码校验
        //出生年月日校验   前正则限制起始年份为1900;
        var year = id.substr(6, 4),//身份证年
          month = id.substr(10, 2),//身份证月
          date = id.substr(12, 2),//身份证日
          time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
          now_time = Date.parse(new Date()),//当前时间戳
          dates = (new Date(year, month, 0)).getDate();//身份证当月天数
        if (time > now_time || date > dates) {
          return {'status': false, 'msg': '出生日期不合规'}
        }
        //校验码判断
        var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   //系数
        var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');  //校验码对照表
        var id_array = id.split("");
        var sum = 0;
        for (var k = 0; k < 17; k++) {
          sum += parseInt(id_array[k]) * parseInt(c[k]);
        }
        if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
          return {'status': false, 'msg': '身份证校验码不合规'}
        }
        return {'status': true, 'msg': '校验通过'}
      },
      /**
       * 港澳身份验证
       * **/
      isHKCard(card) {
        // 港澳居民来往内地通行证
        // 规则： H/M + 10位或6位数字
        // 样本： H1234567890
        var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
        if (reg.test(card) === false) {
          return {'status': false, 'msg': '港澳居民来往内地通行证号码不合规'};
        } else {
          return {'status': true, 'msg': '校验通过'};
        }
      },
      /**
       * 台湾同胞来往大陆通行证
       * */
      isTWCard(card) {
        // 台湾居民来往大陆通行证
        // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
        // 样本： 12345678 或 1234567890B
        var reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
        if (reg.test(card) === false) {
          return {'status': false, 'msg': '台湾居民来往大陆通行证号码不合规'};
        } else {
          return {'status': true, 'msg': '校验通过'};
        }

      },
      /**
       * 护照验证
       */
      isPassPortCard(card) {
        // 护照
        // 规则： 14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等
        // 样本： 141234567, G12345678, P1234567
        var reg = /^([a-zA-z]|[0-9]){5,17}$/;
        if (reg.test(card) === false) {
          return {'status': false, 'msg': '护照号码不合规'};
        } else {
          return {'status': true, 'msg': '校验通过'};
        }
      },
      // 费用明细弹出层close
      costDetailOnClose() {
        this.costDetailShow = false
      },

      chooseContactonClose() {
        this.chooseContact = false
      },
      closeTicketOrderDatePopup() {
        this.ticketOrderDatePopupShow = false
      },
      //  确定日期选择
      sureTicketOrderDate(value) {
        var that = this;
        that.ticketOrderDate = value;
        that.ticketOrderDatePopupShow = false
        that.calculatePrice();
      },
      cancelTicketOrderDateDate() {
        this.ticketOrderDatePopupShow = false
      },
      // 门票数量加
      addTicketNumber() {
        this.ticketNumber = this.ticketNumber + 1;
        let crearplayArray = [];
        for (let i = 0; i < this.ticketNumber; i++) {
          let person = new Object();
          person.name = '';
          person.phoneNumber = '';
          person.contact = '';
          person.idcard = '';
          person.idCardType = '身份证';
          person.contactlistShow = false;
          crearplayArray.push(person)
        }
        this.playerArray = crearplayArray
        this.calculatePrice();
      },
      // 门票数量减
      minusTicketNUmber() {
        this.ticketNumber = this.ticketNumber - 1
        if (this.ticketNumber < 1) {
          this.ticketNumber = 1
          Toast('不能少于一张')
        }
        let crearplayArray = [];
        for (let i = 0; i < this.ticketNumber; i++) {
          let person = new Object();
          person.name = '';
          person.phoneNumber = '';
          person.contact = '';
          person.idcard = '';
          person.idCardType = '身份证';
          person.contactlistShow = false;
          crearplayArray.push(person)
        }
        this.playerArray = crearplayArray
        this.calculatePrice();
      },
      openThisChooseType(index) {
        this.idCardTypePopShow = true,
          this.currentPlayer = index
      },
      // 游玩人证件类型关闭
      chooseIdTypeonClose() {
        this.idCardTypePopShow = false
      },
      chooseThisContact(item) {
        var that = this;
        let ind = item.index;
        let currentContactList = that.chooseContactList;
        for (var ContactI = 0; ContactI < currentContactList.length; ContactI++) {
          if (ind == ContactI) {
            currentContactList[ContactI].select = true
          } else {
            currentContactList[ContactI].select = false
          }
        }
        let currenrPlayerArray = that.playerArray;
        currenrPlayerArray.forEach(function (PlayerItem, PlayerIndex) {
          if (PlayerIndex == that.palyerIndex) {
            PlayerItem['name'] = item.name,
              PlayerItem['phone'] = item.phone,
              PlayerItem['idcard'] = item.idcard
          }
        })
        that.chooseContactList = currentContactList
        that.playerArray = currenrPlayerArray
        that.chooseContact = false
      },
      // 证件类型选择
      IdCardTypeConfirm(value, index) {
        let that = this;
        console.log(value, '证件类型')
        that.playerArray.forEach((item, ind) => {
          if (ind == that.currentPlayer) {
            item['IdCardType'] = value
          }
        })
        that.idCardTypePopShow = false;
      },

      IdCardTypeCancel() {
        that.idCardTypePopShow = false;
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  };
</script>
<style scoped>
  /* pages/fillOrder/index.wxss */

  .good-type-title {
    font-size: 0.4rem;
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
    display: block;
  }

  .container {
    width: 100%;
    height: 100%;
    padding-bottom: 1.4rem;
  }

  .order-good-info-name {
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.14rem;
  }

  .start-date {
    width: 100%;
    font-size: 0.37rem;
    color: rgba(51, 51, 51, 1);
  }

  .start-date-item {
    display: inline-block;
    font-size: 0.37rem;
    line-height: 0.7rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .room-number {
    width: 100%;
    height: 1.57rem;
    line-height: 1.57rem;
    font-size: 0.4rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    position: relative;
  }

  .room-number-span {
    display: inline-block;
    margin-left: 23%;
  }

  .room-number .number-option {
    width: 2.14rem;
    height: 0.71rem;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.28rem;
  }

  .room-number .number-option-item {
    display: inline-block;
    width: 0.64rem;
    height: 0.64rem;
    border: 1px solid rgba(64, 158, 255, 1);
    border-radius: 0.053rem;
    float: left;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    line-height: 0.59rem;
    text-align: center;
    color: rgba(64, 158, 255, 1);
    cursor: pointer;
    font-size: 0.5rem;
  }

  .room-number .number-option .number-option-item:last-child {
    float: right;
  }

  .room-number-text {
    display: inline-block;
    width: 0.71rem;
    height: 0.68rem;
    line-height: 0.68rem;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    left: 0;
  }

  .order-good-info-content {
    width: 100%;
    height: auto;
  }

  .qualification-details {
    background: rgba(255, 255, 255, 1);
    padding: 0.28rem 0.42rem 0;
    box-sizing: border-box;
    margin-bottom: 0.28rem;
  }

  .contact-wrap {
    width: 100%;
    height: auto;
    padding: 0.28rem 0.3rem 0.28rem 0.42rem;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    margin-bottom: 0.28rem;
    margin-right: 0.28rem;
  }

  .contact-content {
    height: 0.57rem;
    line-height: 0.57rem;
    width: 100%;
    font-size: 0.37rem;
    color: rgba(51, 51, 51, 1);
    margin: 0.14rem 0.28rem;
  }

  .choose-from-contact-list {
    display: inline-block;
    width: 1.2rem;
    height: 1rem;
    font-size: 0.34rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.14rem;
    margin: auto;
    color: rgba(65, 159, 255, 1);
    text-align: center;
  }

  .choose-from-contact-list img {
    width: 0.58rem;
    height: 0.58rem;
    margin: 0 auto 0.1rem;
    display: block;
  }

  .conatct-item {
    height: 1.2rem;
    width: 100%;

    position: relative;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 1.2rem;
  }

  .saveContact {
    width: 100%;
    height: 0.35rem;
    font-size: 0.34rem;
    text-decoration: underline;
    color: rgba(65, 159, 255, 1);
    margin: 0.71rem auto 0.42rem;
    text-align: right;
  }

  .add-contact-number .iconfont {
    font-size: 0.57rem;
    float: left;
    color: #409eff;
    margin-right: 0.14rem;
  }

  .add-contact-number {
    height: 0.828rem;
    line-height: 0.828rem;
    font-size: 0.34rem;
    font-weight: 400;
    color: rgba(65, 159, 255, 1);
    letter-spacing: 1px;
  }

  .iconfont.icon-jian {
    color: #bababa;
    margin-left: 0.1rem;
  }

  .travel-information {
    width: 100%;
    height: auto;
    padding: 0.28rem 0.42rem 0;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    padding-bottom: 0.28rem;
  }

  .matters-attention {
    font-size: 0.34rem;
    font-weight: 400;
    color: rgba(144, 147, 153, 1);
    line-height: 0.51rem;
  }

  .pay-ment-wrap {
    width: 100%;
    height: 1.4rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 2px 0px rgba(88, 88, 88, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .pay-now {
    width: 3.57rem;
    height: 1.4rem;
    background: rgba(64, 158, 255, 1);
    box-shadow: 0px -1px 2px 0px rgba(88, 88, 88, 0.2);
    float: right;
    font-size: 0.45rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 1.4rem;
  }

  .price-detaile {
    width: calc(100% - 3.57rem);
    height: 1.4rem;
    float: left;
    line-height: 1.4rem;
    padding: 0 0.42rem;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.34rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .cost-detail {
    font-size: 0.34rem;
    font-weight: 400;
    color: rgba(64, 158, 255, 1);
    float: right;
    line-height: 1.4rem;
  }

  .price-detaile .order-price {
    display: inline-block;
    font-size: 0.51rem;
    font-weight: 500;
    color: rgba(245, 108, 108, 1);
  }

  .iconfont.icon-arrow-right {
    float: right;
    font-size: 0.57rem;
  }

  .card-type {
    display: inline-block;
    padding-left: 0.78rem;
  }

  .choose-contact-wrap {
    width: 100%;
    height: 7.28rem;
  }

  .choose-contact-content {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-top-left-radius: 0.22rem;
    border-top-right-radius: 0.22rem;
    box-sizing: border-box;
    padding-top: 0.2rem;
  }

  .contact-title {
    font-size: 0.51rem;
    font-family: "微软雅黑";
    color: #333333;
    display: block;
    margin-bottom: 0.42rem;
    text-indent: 0.42rem;
  }

  .contact-choose-item {
    width: 2.97rem;
    height: 0.97rem;
    border-radius: 0.48rem;
    display: inline-block;
    line-height: 0.97rem;
    text-align: center;
    color: rgba(51, 51, 51, 1);
    font-size: 0.37rem;
    background: rgba(243, 243, 243, 1);
    margin: 0 0.21rem;
    margin-bottom: 0.28rem;
    box-sizing: border-box;
  }

  .contact-choose-item:nth-child(3),
  .contact-choose-item:nth-child(6),
  .contact-choose-item:nth-child(9) {
    margin-right: 0;
  }

  .contact-choose-item.active {
    border: 1px solid rgba(65, 159, 255, 1);
    background: rgba(255, 255, 255, 1);
    color: #409eff;
  }

  .conatct-item-wrap {
    z-index: 99;
    position: relative;
  }

  .conatct-item-wrap .conatct-item {
    width: calc(100% - 1.28rem);
  }

  .conatct-item-wrap .conatct-input {
    right: 0.5rem;

  }

  .conatct-input {
    height: 0.57rem;
    line-height: 0.57rem;
    width: 4.28rem;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 1.6rem;
    outline: none;
    border: none;
  }

  .ticket-number {
    font-size: 0.34rem;
  }

  .ticket-number text {
    font-size: 0.4rem;
    color: #409eff;
  }

  .payablePrice {
    font-size: 0.37rem;
  }

  .payablePrice text {
    font-size: 0.4rem;
    color: gray;
    text-decoration: line-through;
  }

  .discount {
    font-size: 0.37rem;
  }

  .discount text {
    color: #ff8547;
  }

  .priceOrder {
    font-size: 0.37rem;
  }

  .priceOrder text {
    color: rgba(245, 108, 108, 1);
    font-size: 0.45rem;
  }

  .cost-detail-wrap {
    line-height: 0.8rem;
  }

  .daily-price {
    font-size: 0.4rem;
  }

  .daily-price .date {
    color: #333;
  }

  .daily-price .daily {
    color: #409eff;
  }

  .ticketOrderDate {
    display: inline-block;
  }

  .start-date {
    margin: 0.14rem 0 0 0;
  }

  .conatct-item .iconfont.icon-arrow-right {
    color: #666;
  }

  .conatct-item {
    border-bottom: 1px solid rgba(243, 243, 243, 1);
  }

  ::-webkit-input-placeholder {
    color: #BABABA;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #BABABA;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #BABABA;
  }

  :-ms-input-placeholder {
    color: #BABABA;
  }

  .van-popup--bottom {
    border-top-left-radius: 0.21rem;
    border-top-right-radius: 0.21rem;
  }

  .iconfont.icon-bitian {
    font-size: 0.4rem;
    color: #C40000;
    position: relative;
    top: -0.2rem;
  }
</style>
