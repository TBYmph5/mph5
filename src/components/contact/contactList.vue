
<template>
  <div class="wrap">
    <div class='container'>
      <!-- 加载动画 -->
      <div class="loade-animate" v-show="loading">
        <img class="animate" src="../../assets/images/loading.gif">
      </div>
      <!-- 加载完内容 -->
      <div class="container-content" v-show="!loading">
        <div class="record-wrap" v-if="hasRecord">
          <div class='flex_center'>
            <div v-for="(item,index) in manList" :key='index'>
              <div class='mainInfo'>
                <van-list      direction="down">
                  <van-swipe-cell  :right-width="rightWidth"   :on-close="onClose" :name="item.id">
                    <van-cell-group>
                      <div class='info'>
                        <div class='name'>{{item.name}}</div>
                        <span @click="editInfo(item)"  class="iconfont icon-bianji edit"></span>
                        <div class='idCardNum'>证件号:
                          <span>{{item.idenCard}}</span>
                        </div>
                        <div class='phoneNum'>手机号：
                          <span>{{item.phone}}</span>
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
          <div class="btn-group" style="margin-top: 0.8rem">
            <button @click="goBack"  class="cancel submit-btn">返回</button>
            <button @click="addNewContanct"  class=" submit-btn" >新增联系人</button>

          </div>

          <van-toast id="van-toast" />

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
  import http from '../../api/public'
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  export default {
    name: "contactList" ,
    data(){
      return{
        manList:[],//联系人列表,
        loading: true,
        hasRecord:false,
        rightWidth:65,

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
              that.deleteMan(detail.name)
              instance.close();
            }).catch(() => {
              instance.close();
            });
            break;
        }
      },

      deleteMan(id) {
        const that = this;
        http.delete('/customer/contacts/'+id).then(res=>{
          switch (res.code) {
            case 1:
              Toast.success('删除成功');
              that.getList();
              break;
            default:
              Toast.success('删除失败');
          }
        })
      },
      editInfo(item) {
        this.$router.push({
          path: '/myContacts/addContact',
          query:{
            contactId:item.id
          }
        })
      },
      addNewContanct() {
        this.$router.push({
          path: '/myContacts/addContact',
          // query:{
          //   contactId:
          // }
        })
      },
      loadingMoreGood(){

      },
      getList() { //获取联系人列表
        let that = this;
        http.get("/customer/contacts/list", {}).then(res => {
          that.manList = res.obj;
          console.log(that.manList);
          // debugger
          that.loading = false;
          if(that.manList.length>0){
            that.hasRecord=true
          }else{
            that.hasRecord=false
          }
        })

        // wx.request({
        //   url: 'https://www.supconit.net/customer/contacts/list',
        //   data: '',
        //   header: {
        //     'cookie': wx.getStorageSync("sessionid") //读取cookie
        //   },
        //   method: 'GET',
        //   dataType: 'json',
        //   responseType: 'text',
        //   success: function (res) {
        //     switch (res.statusCode) {
        //       case 200:
        //         // that.manList = res.data.obj
        //         if (res.data.obj.length > 0) {
        //           that.setData({
        //             manList: res.data.obj,
        //             loading: false //联系人列表赋值
        //           })
        //         } else {
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
  .wrap{
    height: 100%;
    background: #F3F3F3;
  }
  .container {
    background: #F3F3F3;
    height: 100%;
    /*display: flex;*/
    /*justify-content: center;*/
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
    box-shadow:0.053rem 0.053rem 0.13rem 0px rgba(130,130,130,0.12);
    position: relative;
  }
  .name{
    color:rgba(51,51,51,1);
    font-size: 0.37rem;
    position: absolute;
    left: 0.41rem;
    top: 0.54rem;
  }
  .idCardNum{
    font-size:0.32rem;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    left: 0.41rem;
    bottom: 0.41rem;
  }
  .phoneNum{
    font-size:0.32rem;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    position: absolute;
    right: 0.4rem;
    bottom: 0.41rem;
  }
  .edit{
    position: absolute;
    right: 0.26rem;
    top:0.26rem;
    width:0.426rem;
    height:0.426rem;
    color:rgba(64, 158, 255, 1);
  }
  .slotRight{
    width:1.6rem;
    height: 2.13rem;
    position: relative;
  }
  .reduce{
    width:0.506rem;
    height: 0.506rem;
    border-radius: 50%;
    background-color: rgba(216, 0, 0, 1);
    color: #fff;
    position: absolute;
    left: 0.533rem;
    top: 0.81rem;
    text-align:center;
    line-height:0.506rem;
  }
  .delete{
    position: absolute;
    top: 1.45rem;
    left: 0.506rem;
    color: rgba(216, 0, 0, 1);
    font-size: 0.29rem;

  }
  .button{
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #F3F3F3;
  }
  .button button{
    width: 92%;
    height: 1.173rem;
    outline: none;
    border: none;
    background-color: #409EFF;
    font-size:0.426rem;
    font-weight:500;
    color:rgba(255,255,255,1);
    display: block;
    margin: 0 auto 0.38rem !important;
  }

  .button button.goback-btn{
    background: #f3f3f3;
    border:1px solid #409EFF;
    color:#409EFF;
  }
  .record-wrap,.container-content{
    width: 100% !important;
    height: 100% !important;
    position: relative;
  }

 .flex_center .van-swipe-cell{
  -webkit-border-radius: 0.21rem;
  -moz-border-radius: 0.21rem;
  border-radius: 0.21rem;
}
  .iconfont.icon-jia{
    font-size: 0.37rem;
    margin-right: 0.1rem;
    position: relative;
    top: -0.01rem;
  }
</style>
