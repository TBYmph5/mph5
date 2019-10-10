<template>
  <div class="wrap">
    <div class="container">
      <van-cell-group>
        <van-field v-model="username" clearable label="车牌号" placeholder="请输查询车牌号" />
      </van-cell-group>
      <div class="checkButton">查询</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "checkParkingFee",
    data(){
      return{
        username:''
      }
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    padding: 0.4rem 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .wrap {
    width: 100%;
    height: 100%;
  }
  .checkButton{
    width:7.86rem;
    height:1.04rem;
    margin: 0 auto;
    margin-top: 1.4rem;
    background:rgba(0,170,77,1);
    box-shadow:0.06rem 0.06rem 0.186rem 0 rgba(0,170,77,0.2);
    border-radius:0.52rem;
    font-size:0.42rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 1.04rem;
  }

</style>
