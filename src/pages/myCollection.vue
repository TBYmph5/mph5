<template>
<div class="wrap">
  <!--pages/MyContacts/index.wxml-->
  <div class='container'>
    <!-- 加载动画 -->
    <div class="loade-animate" v-show="loading">
      <img class="animate" src="../../src/assets/images/loading.gif"/>
    </div>
    <!-- 加载完内容 -->
    <div class="container-content" v-show="!loading">
      <!--有数据-->
      <div class="record-wrap" v-if="hasRecord">
      <div class='flex_center'>
        <div class='mainInfo'>
          <van-list  @load="loadingMoreGood" :offset='offset' :finished="finished" direction="down">
            <!--<div v-for="(item,index) in goodShowArray" :key='index'>-->
              <van-swipe-cell v-for="(item,index) in goodShowArray"  v-if="item" :key='index' :right-width="rightWidth"  :on-close="onClose"  :name="item._id">
                <div class='hot-good-item'>
                  <div class='img-wrap'>
                    <img :src="qiNiu +'/'+item.cover.split(',')[0]">
                  </div>
                  <!--&lt;!&ndash; 商品介绍 &ndash;&gt;-->
                  <div class='hot-good-figure'>
                    <span class='hot-good-name'>{{item.name}}</span>
                    <div class='hot-good-discribe'> {{item.description}}</div>
                    <div class='price-option-wrap'>
                      <span class='hot-good-price' v-if="item.minPrice !==undefined">¥{{item.minPrice}}  <span style='font-size:0.34rem;color:#959595;'>起</span></span>
                      <van-button type="danger" class='hot-good-option'  @click='divDetails(item)'>查看详情 </van-button>
                    </div>
                  </div>
                </div>
                <div slot="right">
                  <div class='slotRight'>
                    <div class='reduce'><span class="iconfont icon-jian1"></span></div>
                    <div class='delete'>删除</div>
                  </div>
                </div>
              </van-swipe-cell>
            <!--</div>-->
          </van-list>
        </div>
        <van-dialog id="van-dialog" />
        <van-toast id="van-toast" />
      </div>
<!--返回按钮-->
        <div class="go-back" @click="goBack"></div>
      </div>
      <div class="record-wrap" v-else>
        <div class="no-records-wrap">
          <div class="tips-wrap">
            空空如也
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import http from '../api/public'
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
    export default {
        name: "myContacts",
      data(){
          return{
            recodePage:0,
            height: 0,
            goodShowArray: [],
            loading:true,
            hasRecord:false,
            finished:false,
            offset:30,
            rightWidth:65,
            qiNiu:this.$store.state.qiNiuLink,
            total:0
          }
      },
      mounted(){
          this.getGoodList()
      },
      methods:{
        onClose(clickPosition, instance,detail) {
          let that = this;
          switch (clickPosition) {
            case 'right':
              Dialog.confirm({
                message: '确定删除吗？'
              }).then(() => {
                that.deleteGood(detail.name)

                instance.close();
              }).catch(() => {
                instance.close();
              });
              break;
          }
        },
        deleteGood(id) {
          const that = this
          http.delete('/customer/store/'+id,{}).then(res => {
            console.log(res)
            switch (res.code) {
              case 1:
                Toast.success('删除成功');
                that.getGoodList();
                break;
              default:
                Toast.success('删除失败');
            }
          })

        },
        // 获取商品收藏页列表
        getGoodList() {
          let current = this.recodePage;
          http.get('/customer/store/page?size=5&current='+current, {}).then(res => {
            console.log(res);
            let collectionRecodes = res.obj.hits;
            if(collectionRecodes.length>0){
            //资质商品列表 计算 最小价格
            collectionRecodes.forEach(item => {
              let itemProductArray = item.productList;
              let dailPriceArray = [];
              itemProductArray.forEach(goodItem => {
                let priceList = goodItem.productDailyList;
                priceList.forEach((priceDaliyItem) => {
                  dailPriceArray.push(priceDaliyItem.price)
                })
                console.log(dailPriceArray)
                item['minPrice'] = Math.min.apply(null, dailPriceArray);
              })
            });
            }
            let that = this;
            that.goodShowArray=this.goodShowArray.concat(collectionRecodes);
            that.total=parseInt(res.obj.total)
           // console.log(that.goodShowArray)
              if(that.goodShowArray.length>0){
              this.hasRecord=true;
              debugger
                if(that.goodShowArray.length>=that.total){
                  that.finished=true
                }
              }else{
                that.hasRecord=false
              }
            that.loading=false

          })

        },
        /**
         * 懒加载更多商品
         */
        loadingMoreGood() {
        this.recodePage=this.recodePage+1;
          console.log('拼命加载中');
if(this.goodShowArray.length<this.total){
  this.getGoodList()
}else{
  console.log('到底了')
}

        },
        //跳转到商品详情页
        divDetails(item) {
          this.$router.push({
            path: '/qualificationDetails',
            query:{
              type:item.type,
              id:item.id,
              name:item.name
            }
          })
          // console.log(e, 'navgite')
          // wx.navigateTo({
          //   url: '/pages/DetailsPage/index?id=' + e.target.dataset.id,
          // })
        },
        goBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>

  .container {
    background: #F3F3F3;
    /*height: auto;*/
    /*min-height: 100%;*/
    /*!* display: flex; *!*/
    /*justify-content: center;*/
  }
  .flex_center{
    width:92%;
    height: 100%;
    padding-bottom: 1.6rem;
    margin:0 auto;
    border:1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .mainInfo{
    width: 100%;
    margin-top: 0.267rem;
    height: 2.13rem;
    background-color: #F3F3F3;
  }
  .info{
    width: 100%;
    height:2.13rem;
    background-color: #fff;
    border-radius: 0.21rem;
    box-shadow:0.053rem 0.053rem 0.13rem 0px rgba(130,130,130,0.12);
    position: relative;
  }
  .name{
    color:rgba(51,51,51,1);
    font-size: 0.373rem;
    position: absolute;
    left: 0.41rem;
    top: 0.546rem;
  }
  .idCardNum{
    font-size:0.32rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    left: 0.41rem;
    bottom: 0.546rem;
  }
  .phoneNum{
    font-size:0.32rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    right: 0.4rem;
    bottom: 0.546rem;
  }
  .edit{
    position: absolute;
    right: 0.267rem;
    top: 0.267rem;
    width:0.426rem;
    height:0.426rem;
    color:rgba(64, 158, 255, 1);
  }
  .slotRight{
    width:1.6rem;
    height:2.13rem;
    position: relative;
  }
  .reduce{
    width: 0.506rem;
    height: 0.506rem;
    border-radius: 50%;
    background-color: rgba(216, 0, 0, 1);
    color: #fff;
    position: absolute;
    left: 0.53rem;
    top:1.46rem;
    text-align:center;
    line-height:0.506rem;
  }
  .delete{
    position: absolute;
    top: 2.06rem;
    left: 0.506rem;
    color: rgba(216, 0, 0, 1);
    font-size: 0.29rem;

  }
  .container, .record-wrap{
    overflow-y: auto;
  }
  /* .loade-animate{
    top:100%;
  } */
</style>
