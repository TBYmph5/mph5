<template>
  <div class="wrap">
    <!--pages/addNewMan/index.wxml-->
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

          <div style='width:100%;height:1.46rem;position:relative'>
            <div class='name'>手机号
              <span style="color:#D80000">*</span> +86
            </div>
            <div class='inputName'>
              <input type='number' maxlength='11' style="direction: rtl;" placeholder="请输入手机号" v-model='telphone'/>
            </div>
          </div>

          <div class='MailList'>
            <span class='iconfont icon-tongxunlu Mail'></span>
            <div style='position:absolute;top:1.70rem;font-size:0.34rem;color:#409EFF;right:0.3rem;'>通讯录</div>
          </div>
        </div>
      </div>
      <div class='CertificateNum'>
        <div style='width:79%;position: relative;'>
          <div class='name'>证件号
            <span style="color:#D80000">*</span>
          </div>
          <div class='inputName'>
            <input type="idcard" style="direction: rtl;" placeholder="请输入证件号" v-model='idcard'/>
          </div>
        </div>
        <div class='notes'>注：带有“<span style="color:#D80000">*</span>”为必填内容</div>
        <div class="btn-group" >
          <button class="cancel submit-btn" @click="goBack">取消</button>
          <button  class="submit-btn"  @click="EditOrAddInfo">保存联系人</button>

        </div>
      </div>
      <van-toast id="van-toast"/>
    </div>

  </div>
</template>

<script>
  import http from '../../api/public'
  import {Toast} from 'vant';

  export default {
    name: "addContact",
    data() {
      return {
        inputValue: '',
        username: '',
        telphone: '',
        idcard: '',
        id: ''
      }
    },
    mounted() {
      this.getinfo();
    },
    methods: {
      getinfo() {
        const id = this.$route.query.contactId
        if (id != undefined) {
          http.get('/customer/contacts/' + id, {}).then(res => {
            this.username = res.obj.name;
            this.telphone = res.obj.phone;
            this.idcard = res.obj.idenCard;
          })
        }
      },
      EditOrAddInfo() { //判断是编辑还是新增
        const that = this
        if (that.username == '') {
          Toast.fail('姓名不能为空')
        } else if (that.telphone == '') {
          Toast.fail('手机号不能为空')
        } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.idcard))) {
          Toast.fail('身份证输入有误')
        } else {
          if (that.$route.query.contactId != undefined && that.$route.query.contactId != '') {
            that.editInfo(that.$route.query.contactId)
          } else {
            that.AddInfo()
          }
        }

      },

      editInfo(id) {
        let parmas = {};
        parmas['idenCard'] = this.idcard;
        parmas['id'] = id;
        parmas['name'] = this.username;
        parmas['phone'] = this.telphone;
        http.put('/customer/contacts/' + id, parmas).then(res => {
          Toast.success(res.msg);
          this.$router.go(-1);//返回上一层
        })
      },
      AddInfo() {
        let data = {
          "idenCard": this.idcard,
          "name": this.username,
          "phone": this.telphone
        };
        http.post("/customer/contacts", data).then(res => {
          Toast.success('新增成功');
          this.$router.go(-1);//返回上一层
        })

      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  /* pages/addNewMan/index.wxss */
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
    font-family: PingFang-SC-Regular;
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
    height: 1.46rem;
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

  .MailList .iconfont {
    font-size: 0.7rem;
    color: #409EFF;
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
    width: 90%;
    height: 1.173rem;
    outline: none;
    border: none;
    background-color: #409EFF;
    font-size: 0.42rem;
    box-shadow: 0 0.08rem 0.13rem 0px rgba(64, 158, 255, 0.5);
    border-radius: 0.10rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }


</style>
