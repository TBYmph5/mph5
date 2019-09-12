<template>
  <div class='container pay-container'>
    <div class='order-detail-wrap'>
      <div class='order-detail-content'>
        <div class='payment-security-tips'>
          <img src="../assets/images/paySucess.png" alt="">   支付成功...
        </div>
        <div class='order-content'>
          <div class='middle-wrap payment'>
            <span class='order-good-name'>{{goodName}}</span>
            <div class='order-finished-number'>订单编号：
              <span class='order-finished-number-span'> {{orderId}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 价格 -->
    <div class='order-need-price-wrap'>金额 <span class='order-price'>￥{{prciePay}}</span>  <span class='rediv-price-detail' @click='redivPriceDetail'>费用明细 </span> </div>
    <!-- 价格弹窗 -->
    <!-- 费用明细 -->
    <van-popup
      v-model="costDetailShow"
      position="bottom"
      @close="costDetailOnClose"
    >
      <div class="cost-detail-wrap" v-if="feeDetail.goodType==1">
        <span class="good-type-title" style="margin-bottom:0.2rem;">费用明细</span>
        <div v-for="(item,index) in feeDetail.hotelchooseValenceArray" class="daily-price" :key="index">
          <span class="date" style="margin-right: 0.1rem;">{{item.date}}</span>
          <span class="daily">¥{{item.price}}</span>
        </div>
        <div class="ticket-number">
          房间数量:
          <span>{{feeDetail.roomNumber}}</span> 间
        </div>
        <div v-if=" feeDetail.payablePrice !== feeDetail.priceOrder" class="payablePrice">
          活动前价格：
          <span>人民币{{ feeDetail.payablePrice}}</span>
        </div>
        <div v-if="feeDetail.matchSalesList.length>0">
          <div v-for="(item,index) in feeDetail.matchSalesList" :key="index">
            <div class="sales-item-type discount" v-if="item.type==0">
              促销活动：折扣
              （<span>{{item.ruleJson.discount}}%</span>）
            </div>
            <div class="sales-item-type discount" v-else>
              促销活动：满减
              （
              <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                <span style="margin-right: 0.1rem;">单日满：{{item.full}} 减{{item.reduction}}</span>
              </div>
              ）
            </div>
          </div>
        </div>
        <div class="priceOrder" >价格：¥ {{feeDetail.priceOrder}}</div>
      </div>
      <!-- 门票价格明细 -->
      <div class="cost-detail-wrap" v-if="feeDetail.goodType==2">
        <span class="good-type-title" style="margin-bottom:0.85rem;">费用明细</span>

        <div class="ticket-number">
          门票信息: {{feeDetail.goodName}}
          <span>{{feeDetail.ticketOrderDate|timestampToTime}}</span>门票
          <span>{{feeDetail.ticketNumber}}</span>一张
        </div>

        <div v-if="feeDetail.payablePrice !== feeDetail.priceOrder" class="payablePrice">
          活动前价格：
          <span>¥{{ feeDetail.payablePrice}}</span>
        </div>
        <div v-if="feeDetail.matchSalesList.length>0">
          <div v-for="(item,index) in feeDetail.matchSalesList" :key="index">
            <div class="sales-item-type discount" v-if="item.type=='0'">
              促销活动:
              折扣（
              <span>{{item.ruleJson.discount}}%</span>)
            </div>
            <div class="sales-item-type discount" v-if="item.type=='1'">
              促销活动: 满减
              (
              <div v-for="(item,index) in item.ruleJson" :key="index" style="display: inline;">
                <span style="margin-right: 0.1rem;">单日满：{{item.full}} 减 {{item.reduction}}</span>
              </div>
              )
            </div>
          </div>
        </div>

        <div class="priceOrder">
          价格：
          <span>¥{{prciePay}}</span>
        </div>
      </div>
    </van-popup>

    <!-- 为您推荐 -->
    <div class='recommended-wrap'>
      <span class='part-title'>为您推荐</span>
      <!-- 单个商品 -->
      <div class='hot-good-item' v-for="(item,index) in goodShowArray" :key='index' >
        <div class='img-wrap'>
          <img :src='item.cover'>
        </div>
        <!-- 商品介绍 -->
        <div class='hot-good-figure'>
          <span class='hot-good-name'>{{item.name}}</span>
          <div class='hot-good-discribe'> {{item.description}}</div>
          <div class='price-option-wrap'>
            <span class='hot-good-price' v-if="item.minPrice">¥{{item.minPrice}}</span>
            <button type='warn' class='hot-good-option'  @click="getDetail(item)">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    <!--返回按钮-->
    <div class="go-back" @click="goBack"></div>  </div>
</template>

<script>
  import http from '../api/public'
    export default {
        name: "paymentSucess",
      data(){
          return{
            costDetailShow:false,
            reviewPriceDetail:false,
            feeDetail:JSON.parse(this.$route.query.feeDetail),
            orderSnapshot:JSON.parse(this.$route.query.orderSnapshot),
            goodShowArray: [],
            prciePay:{},
            orderId:'',
            goodName:''
          }
      },
      mounted(){
        this.orderId = this.orderSnapshot.id;
        this.prciePay = this.orderSnapshot.price;
        this.goodName = this.orderSnapshot.productSnapshot.name

        // this.orderSnapshot['productSnapshot'] = JSON.parse(this.orderSnapshot.productSnapshot)
        // console.log(this.orderSnapshot);
        // this.orderId = this.orderSnapshot.id;
        // this.prciePay = this.orderSnapshot.price;
        // this.goodName = this.orderSnapshot.productSnapshot.name;
        // console.log(this.feeDetail);
        this.getRecommended();
      },
      methods:{
        redivPriceDetail(){
          this.costDetailShow=true;
        },
        goBack(){
          let path = '/pages/index/index?routers=ordertab'
          wx.miniProgram.redirectTo({url: path});
        },
        /**
         * 获取推荐
         */
        getRecommended(){
          let that=this;
          http.get('/search/aptitude?size=5&page=0').then(res=>{
            let HotViewArray = res.obj.hits;
            //资质商品列表 计算 最小价格
            // for (var i = 0; i < HotViewArray)
            HotViewArray.forEach(function (item, index) {
              let itemProductArray = item.productList;
              // console.log(itemProductArray);
              let dailPriceArray = [];
              itemProductArray.forEach(function (goodItem, index) {
                let priceList = goodItem.productDailyList;
                priceList.forEach(function (priceDaliyItem, index) {
                  dailPriceArray.push(priceDaliyItem.price)
                })
                item['minPrice'] = Math.min.apply(null, dailPriceArray);

              })
              console.log(item['minPrice'])
              item['cover'] = that.$store.state.qiNiuLink + '/' + item.cover.split(',')[0];
            })
            console.log(HotViewArray)
            that.goodShowArray=HotViewArray
          })


        },
        getDetail(item){
          this.$router.push({
            path:'/qualificationDetails',
            query: {
              id: item.id,
              type: item.type,
              name:item.name
            }
          })
        },

      }
    }
</script>

<style scoped>
.container{
  height: auto !important;
  background-color: #f3f3f3;
}
  /* pages/paySuccess/index.wxss */
  .order-detail-wrap {
    width: 100%;
    height:6.45rem;
    background: url("https://image.supconit.net/payBg.png") center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    padding-top: 0.26rem;
    box-sizing: border-box;
    z-index: 999;

  }
  .order-detail-content{
    width: 9.2rem;
    height: auto;
    margin: 0 auto;

  }
  .order-content {
    width: 100%;
    height: 3.73rem;
    background: rgba(255,255,255,1);
    box-shadow: 0px 5px 15px 0px rgba(182,182,182,0.5);
    border-radius: 16px;
    margin-top: 0.3rem;
    padding: 0.8rem;;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    position: relative;
    text-align: left;

  }
  .order-detail-content .payment-security-tips {
    font-size: 0.48rem;
    color: rgba(255,255,255,1);
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    overflow: hidden;
    text-align: left;

  }
  .recommended-wrap{
    width: 100%;
    height: auto;
    padding-top: 0.13rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border:1px solid transparent;
  }
  .recommended-wrap .part-title{
    font-size:0.42rem;
    color:rgba(51,51,51,1);
    line-height: 1.467rem;
  }
  .order-detail-content .payment-security-tips img {
    height: 0.9rem;
    width: 0.9rem;
    float: left;
    margin-top: 0.053rem;
    margin-right: 0.42rem;

  }
  .order-detail-content .payment-security-tips{
    font-size: 0.48rem;
    color: rgba(255,255,255,1);
    height: 1.01rem;
    line-height: 1.01rem;
    width: 100%;
    overflow: hidden;

  }
  .order-content .order-good-name {
    display: block;
    width: 100%;
    height: 1.06rem;
    line-height: 0.53rem;
    font-size: 0.42rem;
    color: rgba(48,49,51,1);
    margin-bottom: 0.53rem;

  }
  .hot-good-item {
width: 9.2rem;
    height: 3.62rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0.053rem 0.053rem 0.13rem 0px rgba(130, 130, 130, 0.12);
    border-radius: 0.21rem;
    margin: 0 auto 0.26rem;
    overflow: hidden;

  }
  .hot-good-item .img-wrap {
width: 2.72rem;
    height: 23.62rem;
    float: left;
    overflow: hidden;

  }
  .hot-good-figure {
width: calc(100% - 2.72rem);
    height: 100%;
    float: right;
    border: 1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: 0.253rem;

  }
  .hot-good-name {
display: block;
    font-size: 0.373rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    letter-spacing: 1px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0.21rem;

  }
  .hot-good-discribe {
width: 100%;
    height: 1.2rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: rgba(96,98,102,1);
    line-height: 0.4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-family: 微软雅黑;

  }

  .price-option-wrap {
height: 0.62rem;
    line-height: 0.62rem;
    width: 100%;
    margin-top:0.46rem;

  }
  .hot-good-price {
 font-size: 0.506rem;
    font-weight: 500;
    color: rgba(245,108,108,1);

  }
  .hot-good-option {
  width: 1.68rem;
    height: 0.62rem;
    box-shadow: 0px 0.04rem 0.093rem 0px rgba(245,108,108,0.43);
    border-radius:0.053rem;
    float: right;
    line-height: 0.64rem;
    text-align: center;
    font-size: 0.293rem;
    font-weight: 400;
    color: rgba(255,255,255,1);
    padding: 0;
    background:rgba(245,108,108,1);
    outline: none;
    border: none;

  }

  .order-need-price-wrap {
width: 100%;
    height: 1.46rem;
    padding: 0 0.7rem;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 0.37rem;
    font-weight: 400;
    color: rgba(51,51,51,1);
    background: #fff;
    line-height: 1.46rem;
    z-index: 999;
    text-align: left;

  }
  .order-need-price-wrap .order-price {
 font-size:0.48rem;
    color: rgba(251,90,79,1);
    position: relative;
    top: 1px;

  }
  .order-need-price-wrap  .rediv-price-detail{
   display: block;
  float: right;
  height: 1.46rem;
  line-height: 1.46rem;
  font-size: 0.32rem;
  font-weight: 400;
  color: rgba(64,158,255,1);

  }
.order-content .middle-wrap.payment{
  vertical-align: top;
  line-height: 0.62rem !important;
}



</style>
