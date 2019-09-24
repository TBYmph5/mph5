<template>
  <div class="order-ticket-wrap">
    <p class="info">时间：2019-09-24至2019-11-24
      <br> 地址：上渚山奇幻谷接待处
      <br>(预约仅限当天入园）
    </p>
    <!--表单-->
    <div class="form-wrap">
      <div class="ticket-order-form-item">
        <i class="order-icon"></i>
        <div class="order-input-wrap">
          <input type="text" v-model="phoneNumber" placeholder="请填写手机号">
        </div>

      </div>
      <div class="ticket-order-form-item">
        <i class="order-icon"></i>
        <div class="order-input-wrap">
          <input type="text" v-model="idenCard" placeholder="请填写身份证号码">
        </div>
      </div>
    </div>
    <!--提交按钮-->
    <div class="ticket-order-submit">
      <button @click="ticketOrder"></button>
    </div>

  </div>
</template>

<script>
  import http from "../api/public";
  import {Toast} from 'vant';
  export default {
    name: "orderTicket",
    data(){
      return{
        phoneNumber:'',
        idenCard:''
      }
    },
methods:{
  ticketOrder(){
if (this.checkPhone(this.phoneNumber)) {
if(this.idCardValid(this.idenCard).status){
  // console.log('校验成功');
http.get('/order/info/binyaOrder?idCard='+this.idenCard+'&phoneNumber='+this.phoneNumber).then(res=>{
  console.log(res);
  this.$router.go(-1)
})
}else{
  Toast.fail("请填写正确的身份证号码")
}
}else{
Toast.fail("请填写正确的手机号")
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
}
  }
</script>

<style scoped>
  .order-ticket-wrap {
    width: 100%;
    height: 100%;
    background: url("https://image.supconit.net/orderTicket-BG.png") center no-repeat;
    background-size: 100% 100%;
    padding: 6.93rem 1.32rem 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }

  .info {
    text-align: center;
    font-size: 0.35rem;
    line-height: 0.54rem;
    font-weight: bold;
    color: rgba(217, 4, 101, 1);
  }

  .form-wrap {
    width: 100%;
    height: auto;
    padding-top: 1.33rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

  }

  .ticket-order-form-item {
    width: 7.46rem;
    height: 1.2rem;
    background: url("https://image.supconit.net/orderTicket_input.png") center no-repeat;
    background-size: 100% 100%;
    margin:0 auto 0.86rem;
    padding: 0.2rem 0.29rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    line-height: 0.8rem;
    position: relative;
  }
  .ticket-order-form-item .order-icon {
    display: inline-block;
    width: 0.39rem;
    height: 0.64rem;
    background: url("https://image.supconit.net/orderTicket_phone.png")center no-repeat;
    background-size: 100% 100%;
    position: relative;
    top:0.05rem;
    float: left;
  }
  .ticket-order-form-item:nth-child(2) .order-icon {
    display: inline-block;
    width: 0.68rem;
    height: 0.49rem;
    background: url("https://image.supconit.net/orderTicket_user.png")center no-repeat;
    background-size: 100% 100%;
    position: relative;
    top:0.15rem;
  }
  .order-input-wrap{
    width: 5rem;
    height: 100%;
    position: relative;
    top:0;
    left:1rem;
  }
  .order-input-wrap input{
    width: 5rem;
    height: 0.8rem;
    line-height: 0.8rem;
    outline: none;
    border:none;
   position: absolute;
    top:0;
    left: 0;
    font-size: 0.37rem;

  }
  .ticket-order-submit{
    width: 4.82rem;
    height: 1.2rem;
   margin: 2rem auto 0;
  }
  .ticket-order-submit button{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: url("https://image.supconit.net/orderTicket_btn.png") center no-repeat;
    background-size: 100% 100%;
  }
  ::-webkit-input-placeholder {
    color: #A8A8A8;
  }

  :-moz-placeholder { /* Firefox 18- */
    color: #A8A8A8;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: #A8A8A8;
  }

  :-ms-input-placeholder {
    color:#A8A8A8;
  }

</style>
