<template>
  <div class="order-ticket-wrap">
    <p class="info">时间：2019-09-24至2019-11-24
      <br> 地址：上渚山奇幻谷接待处
      <br>(预约仅限当天入园）
    </p>
    <!--表单-->
    <div class="form-wrap">
      <div class="ticket-order-form-item">

      </div>
      <div class="ticket-order-form-item"></div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "orderTicket"
  }
</script>

<style scoped>
  .order-ticket-wrap {
    width: 100%;
    height: 100%;
    background: url("../assets/images/orderTicket-BG.png") center no-repeat;
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
    background: url("../assets/images/orderTicket_input.png") center no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0.86rem;
    padding: 0.2rem 0.29rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

</style>
