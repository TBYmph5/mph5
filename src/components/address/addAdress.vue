<template>
  <div class="wrap">
    <!--pages/addNewAddress/index.wxml-->
    <div class='container'>
      <div class='input_top'>
        <div class='nameAndPhone'>
          <div style='width:100%;height:1.46rem;position:relative;border-bottom:1px solid #F3F3F3;'>
            <div class='name'>姓名
              <span style="color:#D80000">*</span>
            </div>
            <div class='inputName'>
              <input type='text' style="direction: rtl;" placeholder="请输入姓名" v-model='username'/>
            </div>
          </div>
          <div style='width:100%;height:1.46rem;position:relative;border-bottom:1px solid #F3F3F3;'>
            <div class='name'>手机号
              <span style="color:#D80000">*</span> +86
            </div>
            <div class='inputName'>
              <input type='text' maxlength='11' style="direction: rtl;" placeholder="请输入手机号" v-model='telphone'/>
            </div>
          </div>
          <div class='MailList'>
            <span class='iconfont icon-tongxunlu Mail'></span>
            <div style='position:absolute;top:1.70rem;font-size:0.34rem;color:#409EFF;right:0.3rem;'>通讯录</div>
          </div>
        </div>
      </div>
      <div class='CertificateNum'>
        <van-cell style="border-bottom:1px solid #F3F3F3 !important" @click="choseAddress" title="所在城市" is-link
                  :value="InAddress"/>
        <div style='width:100%;height:1.46rem; position: relative;border-bottom:1px solid #F3F3F3;'>
          <div class='name'>详细地址
            <span style="color:#D80000">*</span>
          </div>
          <div class='inputName'>
            <input type='text' style="direction: rtl;padding-right:0.53rem;width:6.88rem;" placeholder="小区/楼号/单元/门牌号"
                   v-model='address'/>
          </div>
        </div>
        <div style='width:100%;height:1.46rem; position: relative;border-bottom:1px solid #F3F3F3;'>
          <div class='name'>地址类型</div>

          <div class='tags'>
            <div v-for="(item,index) in addressKindList" :key='index'>
              <van-tag @click="choseAddressKind(item)" plain  :color="type==item.value?'#409EFF':''">{{item.address}}</van-tag>
            </div>
          </div>
        </div>
        <van-switch-cell title="设为默认" v-model="defaultOrNot"/>
      </div>
      <div class='notes'>注：带有“
        <span style="color:#D80000">*</span>”为必填内容
      </div>
      <div class="btn-group" >
        <button class="cancel submit-btn" @click="goBack">取消</button>
        <button class="submit-btn"  @click="EditOrAddInfo">保存地址</button>
      </div>
      <van-popup v-model=" show" position="bottom" :overlay="overlay" bind:close="onClose">
        <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel"/>
      </van-popup>
      <van-toast id="van-toast"/>
    </div>
  </div>
</template>

<script>
  import addressList from '../../utils/address'
  import http from '../../api/public'
  import {Toast} from 'vant';
  export default {
    name: "addAdress",
    data() {
      return {
        overlay: true,
        addressKindList: [
          {
            address: '家庭',
            value: 1
          },
          {
            address: '公司',
            value: 2
          },
          {
            address: '其他',
            value: 3
          }
        ],
        InAddress: '',
        id: '',
        show: false,
        areaList: addressList,
        username: '',
        telphone: '',
        province: '',
        city: '',
        area: '',
        address: '',
        type: '',
        defaultOrNot: false
      }
    },
    mounted() {
      this.getAddressInfo();
    },
    methods: {
      choseAddress() {
        this.show = true
      },
      onClose() {
        this.show = false
      },
      confirm(e) {
        console.log(e)
        if (e[2] == undefined) {
          this.InAddress = e[0].name + '' + [1].name;
          this.province = e[0].name;
          this.city = e[1].name,
            this.area = '',
            this.show = false
        } else {
          this.InAddress = e[0].name + '' + e[1].name + ' ' + e[2].name,
            this.province = e[0].name,
            this.city = e[1].name,
            this.area = e[2].name,
            this.show = false
        }
      },
      cancel() {
        this.show = false
      },
      // 获取地址详细信息
      getAddressInfo() {
        const id = this.$route.query.AddressId
        this.id = id;
        let that = this;
        console.log(id, 'id')
        if (id != undefined) {
          http.get('/customer/address/' + id).then(res => {
            that.username = res.obj.name,
              that.telphone = res.obj.phone,
              that.province = res.obj.province,
              that.city = res.obj.city,
              that.area = res.obj.area,
              that.address = res.obj.address,
              that.type = res.obj.type,
              that.defaultOrNot = res.obj.default,
              that.InAddress = res.obj.province + '' + res.obj.city + '' + res.obj.area
          })
        } else {
          that.username = '',
            that.telphone = '',
            that.province = '',
            that.city = '',
            that.area = '',
            that.address = '',
            that.type = '',
            that.defaultOrNot = ''
        }
      },
      EditOrAddInfo() { //判断是编辑还是新增
        const that = this
        debugger
        if (that.username == '' && !(/^[\u4E00-\u9FA5A-Za-z]+$/.test(that.username))) {
          Toast.fail('填写正确的姓名')
        } else if (that.telphone == '' && !(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(that.telphone))) {
          Toast.fail('填写正确的手机号')
        } else if (that.address == '') {
          Toast.fail('详细地址不能为空')
        } else {
          if (that.id != undefined && that.id != '') {
            that.editInfo(that.id)
          } else {
            that.AddInfo()
          }
        }
      },

      editInfo(id) {
        let that = this;
        let data = {
            "address": that.address,
            "area": that.area,
            "city": that.city,
            "default": that.defaultOrNot,
            "id": that.id,
            "name": that.name,
            "phone": that.telphone,
            "province": that.province,
            "type": that.type
          };
          http.put('/customer/address/' + id,data).then(res => {
            Toast.success(res.msg);
            this.$router.go(-1);//返回上一层
        })
        // wx.request({
        //   url: 'https://www.supconit.net/customer/address/' + id,
        //   data: {
        //     "address": that.data.address,
        //     "area": that.data.area,
        //     "city": that.data.city,
        //     "default": that.data.defaultOrNot,
        //     "id": that.data.id,
        //     "name": that.data.name,
        //     "phone": that.data.telphone,
        //     "province": that.data.province,
        //     "type": that.data.type
        //   },
        //   header: {
        //     'cookie': wx.getStorageSync("sessionid") //读取cookie
        //   },
        //   method: 'PUT',
        //   dataType: 'json',
        //   responseType: 'text',
        //   success: function (res) {
        //     console.log(res, 'ressssss')
        //     wx.redirectTo({
        //       url: '/pages/myAddress/index'    //或者url: '/page/person/goldcoin/index'
        //     })
        //   }
        // })
      },
      AddInfo() {
        let that = this
        console.log('adddddddddInfoooo');
        let   data={
                "address": that.address,
                "area": that.area,
                "city": that.city,
                "default": that.defaultOrNot,
                "customerId": 0,
                "id": 0,
                "name": that.username,
                "phone": that.telphone,
                "province": that.province,
                "type": '2'
              };
        http.post('/customer/address',data).then(res=>{
          Toast.success('地址新增成功');
          this.$router.go(-1);//返回上一层
        })
        // wx.request({
        //   url: 'https://www.supconit.net/customer/address',
        //   data: {
        //     "address": that.data.address,
        //     "area": that.data.area,
        //     "city": that.data.city,
        //     "default": that.data.defaultOrNot,
        //     "customerId": 0,
        //     "id": 0,
        //     "name": that.data.username,
        //     "phone": that.data.telphone,
        //     "province": that.data.province,
        //     "type": '2'
        //   },
        //   header: {
        //     'cookie': wx.getStorageSync("sessionid") //读取cookie
        //   },
        //   method: 'POST',
        //   dataType: 'json',
        //   responseType: 'text',
        //   success: function (res) {
        //     console.log(res, 'addNewinfo')
        //     wx.redirectTo({
        //       url: '/pages/myAddress/index'    //或者url: '/page/person/goldcoin/index'
        //     })
        //   }
        // })
      },
      // 选择地址类型
      choseAddressKind(item) {
        this.type = item.value

      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  /* pages/addNewAddress/index.wxss */

  .container {
    width: 100%;
    height: 100%;
    background: #f3f3f3;
  }

  .input_top {
    width: 100%;
    height: 2.93rem;
    background-color: #fff;
    position: relative;
  }

  .nameAndPhone {
    width: 79%;
    height: 2.93rem;
    display: inline-block;
  }

  .name {
    display: inline-block;
    text-indent: 0.4rem;
    line-height: 1.46rem;
    font-size: 0.37rem;
    font-weight: 400;
    color: #3a3a3a;
  }

  .inputName {
    display: inline-block;
    height: 1.46rem;
    position: absolute;
    right: 0;
    top: 0;
  }

  .inputName > input {
    height: 100%;
    line-height: 1.46rem;
    font-size: 0.42rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-indent: 0.26rem;
    outline: none;
    border: none;
  }

  .CertificateNum {
    width: 100%;
    height: auto;
    margin-top: 0.26rem;
    background-color: #fff;
  }

  .MailList {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: 2.08rem;
    height: 1.46rem;
  }

  .Mail {
    position: absolute;
    right: 0.506rem;
    top: 0.82rem;
  }

  .notes {
    width: 100%;
    font-size: 0.32rem;
    line-height: 0.85rem;
    text-indent: 0.26rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

  .tags {
    display: flex;
    height: 1.46rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 5.69rem;
    justify-content: space-around;
  }

  .tags > div {
    line-height: 1.46rem;
  }

  .button {
    width: 100%;
    height: 1.57rem;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    background: #F3F3F3;
  }

  .button button {
    width: 92%;
    height: 1.173rem;
    outline: none;
    border: none;
    background-color: #409EFF;
    font-size: 0.426rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }

  .MailList .iconfont {
    font-size: 0.7rem;
    color: #409EFF;
  }

</style>
