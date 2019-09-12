<template>
<div class="wrap">
  <!--pages/MyAddress/index.wxml-->
  <div class='container'>
    <!-- 加载动画 -->
    <div class="loade-animate" v-show="loading">
      <img class="animate" src="../../assets/images/loading.gif">
    </div>
    <!-- 加载完内容 -->
    <div class="container-content" v-show="!loading">
      <div class='flex_center'>
        <div v-for="(item,index ) in addressList" :key='index'>
          <div class='mainInfo'>
            <van-list  >
              <van-swipe-cell :right-width="rightWidth"  :on-close="onClose" :name="item.id">
                <van-cell-group>
                  <div class='info'>
                    <div class='name'>
                      <span>{{item.name}}</span>
                      <span >&emsp;{{item.phone}}</span>
                        <span class="address-type">({{item.type|juadgeType}})</span>
                      <van-tag class="moren" type="primary" v-if="item.default">默认</van-tag>
                    </div>

                    <span @click="editInfo(item)"  class="iconfont icon-bianji edit"></span>
                    <div class='idCardNum'>
                      <span>{{item.province}} {{item.city}} {{item.area}} {{item.address}}</span>
                    </div>
                  </div>
                </van-cell-group>
                <div slot="right">
                  <div class='slotRight'>
                    <div class='reduce'><span class="iconfont icon-jian1"></span></div>
                    <div class='delete'>删除</div>
                  </div>
                </div>
              </van-swipe-cell>
            </van-list>

          </div>
        </div>
        <van-dialog id="van-dialog" />
      </div>
      <div class="btn-group" style="margin-top: 0.8rem;">
        <button @click="goBack"  class="cancel submit-btn">返回</button>
        <button @click="editInfo"   class=" submit-btn">新增地址</button>

      </div>

      <van-toast id="van-toast" />

    </div>
  </div>

</div>
</template>

<script>
  import http from '../../api/public'
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
    export default {
        name: "addressList",
      data(){
          return{
            rightWidth:65,
            addressList:'', // 常用地址列表,
            loading:true
          }
      },
      filters:{
         juadgeType(value) {
           let addressType='';
           switch (value) {
             case '1':
               addressType = '家庭地址';
               break;
             case  '2':
               addressType = '公司地址';
               break
             case  '3':
               addressType = '其他地址';
               break
           }
           return addressType
         }
      },
      mounted(){
          this.getList();
      },
      methods:{
        onClose(clickPosition, instance,detail) {
          let that = this;
          switch (clickPosition) {
            case 'right':
              Dialog.confirm({
                message: '确定删除吗？'
              }).then(() => {
                that.deleteAddress(detail.name)
                instance.close();
              }).catch(() => {
                instance.close();
              });
              break;
          }
        },

        editInfo(item){
          this.$router.push({
            path: '/myAddress/addAdress',
            query:{
              AddressId:item.id
            }
          })
          // wx.navigateTo({
          //   url: '/pages/addNewAddress/index?id=' + e.target.dataset.id,
          // })
        },
        // 删除地址
        deleteAddress(id) {
          const that = this
          http.delete("/customer/address/" +id, '').then(res => {
            switch (res.code) {
                    case 1:
                      Toast.success('删除成功');
                      that.getList()
                      break;
                    default:
                      Toast.success('删除失败');
                  }
          })
          // wx.request({
          //   url: 'https://www.supconit.net/customer/address/' + id,
          //   data: '',
          //   header: {
          //     'cookie': wx.getStorageSync("sessionid") //读取cookie
          //   },
          //   method: 'DELETE',
          //   dataType: 'json',
          //   responseType: 'text',
          //   success: function (res) {
          //     switch (res.data.code) {
          //       case 1:
          //         Toast.success('删除成功');
          //         that.getList()
          //         break;
          //       default:
          //         Toast.success('删除失败');
          //     }
          //   }
          // })
        },
        // 获取常用地址列表
        getList() { //获取联系人列表
          let that = this;
        http.get('/customer/address/list',{}).then(res=>{
          if (res.obj.length>0) {
            that.addressList=res.obj ;//联系人列表赋值,
             that.loading=false

          }
        })
          // wx.request({
          //   url: 'https://www.supconit.net',
          //   data: '',
          //   header: {
          //     'cookie': wx.getStorageSync("sessionid") //读取cookie
          //   },
          //   method: 'GET',
          //   dataType: 'json',
          //   responseType: 'text',
          //   success: function (res) {
          //     console.log(res)
          //     switch (res.statusCode) {
          //       case 200:
          //         if (res.data.obj.length>0){
          //           that.setData({
          //             addressList: res.data.obj ,//联系人列表赋值,
          //             loading:false
          //           })
          //         }else{
          //           wx.redirectTo({
          //             url: '/pages/noRecods/index',
          //           })
          //         }
          //
          //         break;
          //       case 401:
          //         wx.showToast({
          //           title: '暂未登录，即将跳转至登录页',
          //         })
          //         wx.navigateTo({
          //           url: '/pages/bindPhone/index',
          //         })
          //         break;
          //     }
          //   },
          // })
        },
        goBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  body,html{
    width: 100%;
    height: 100%;
    background: #f3f3f3 !important;
  }
  .wrap{
    width: 100%;
    height: 100%;
  }

  .container {
    background: #F3F3F3;
    height: 100%;
    min-height: 100%;

  }
  .flex_center{
    width: 100%;
    height: calc(100% - 3.2rem);
    margin: 0 auto;
    overflow-y: auto;
  }
  .mainInfo{
    width: 92%;
    margin:0.26rem auto 0;
    height: 2.13rem;
    background-color: #F3F3F3;
  }
  .info{
    width: 100%;
    height: 2.13rem;
    background-color: #fff;
    border-radius: 0.21rem;
    box-shadow:0.053rem 0.053rem 0.13rem 0px rgba(130,130,130,0.12);
    position: relative;
    padding: 0.48rem  0.4rem;
    border:1px solid transparent;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .name{
    color:rgba(51,51,51,1);
    font-size: 0.37rem;
    /*position: absolute;*/
    /*left: 0.41rem;*/
    /*top:0.54rem;*/
  }
  .name span{
    display: inline-block;
  }
  .name>span:nth-child(2){
    font-size:0.32rem;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .name>span:nth-child(3){
    font-size:0.26rem;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .moren{
    width:1.01rem;
    height:0.38rem;
    background:rgba(64,158,255,1);
    border-radius:0.053rem;
    line-height: 0.38rem;
    text-align: center;
    margin-left: 0.05rem;
  }
  .idCardNum{
    width:8.146rem;
    font-size:0.32rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    left:0.41rem;
    top: 1.16rem;

  }
  .phoneNum{
    font-size:0.32rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    right: 0.4rem;
    bottom: 0.54rem;
  }
  .edit{
    position: absolute;
    right: 0.26rem;
    top: 0.26rem;
    width:0.42rem;
    height:0.42rem;
    color:rgba(64, 158, 255, 1);
  }
  .slotRight{
    width: 1.6rem;
    height: 2.13rem;
    position: relative;
  }
  .reduce{
    width: 0.506rem;
    height:0.506rem;
    border-radius: 50%;
    background-color: rgba(216, 0, 0, 1);
    color: #fff;
    position: absolute;
    left: 0.53rem;
    top: 0.813rem;
    text-align:center;
    line-height:0.44rem;
  }
  .delete{
    position: absolute;
    top: 1.45rem;
    left: 0.506rem;
    color: rgba(216, 0, 0, 1);
    font-size: 0.29rem;
    width: 0.66rem;
  }
  .button{
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #F3F3F3;
  }
  .button button{
    display: block;
    width: 92%;
    height: 1.17rem;
    outline: none;
    border: none;
    background-color: #409EFF;
    font-size:0.426rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin:  0 auto 0.38rem !important;
  }
  .button button.goback-btn {
    background: #f3f3f3;
    border: 1px solid #409eff;
    color: #409eff;
  }
  .address-type{
    font-size:0.26rem;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .iconfont.icon-jia{
    font-size: 0.37rem;
    margin-right: 0.1rem;
    position: relative;
    top: -0.01rem;
  }

</style>
