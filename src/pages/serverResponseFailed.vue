<template>
  <div class="wrap">
    <div class="serverce-wrap">
     <div class="serverce-img-wrap">
       服务器响应失败
     </div>
      <span class="go-back-span" @click="goBack">返回</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "serverResponseFailed",
    methods:{
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  body, html {
    width: 100%;
    height: 100%;
  }

  wrap {
    width: 100%;
    height: 100%;
    position: relative;

  }

  .serverce-wrap {
    height: 5.73rem;
    width: 5.2rem;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
  }
  .serverce-img-wrap{
    width: 5.2rem;
    height: 5.2rem;
    background: url("https://image.supconit.net/noservece.png") center no-repeat;
    background-size: 100% 100%;
    padding-top:4.4rem;
    font-size:0.42rem;
    font-weight:500;
    color:rgba(102,102,102,1);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border:1px solid transparent;

  }
  .go-back-span{
    display: inline-block;
    width:1.48rem;
    line-height: 0.54rem;
    height:0.54rem;
    background:rgba(64,158,255,1);
    border-radius:0.08rem;
    color: #fff;
    font-size:0.32rem ;
    margin-top: 0.2rem;
  }

</style>
