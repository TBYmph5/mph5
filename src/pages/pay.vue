<template>
    <div class="wrap">
      <!--<iframe :src="URL" frameborder="0"></iframe>-->
      <a :href="URL">333</a>
      <!--<span  @click="go">333</span>-->
    </div>
</template>

<script>
    export default {
        name: "pay",
      data(){
          return{
            URL:''
          }
      },
      mounted(){
          console.log(this.$route.query.requestUrl)
          this.URL=this.$route.query.requestUrl
      },
      methods:{
        go(){
          // wx.miniProgram.postMessage({ data: {foo: 'bar'} })
          let path='/pages/payment/index'
          wx.miniProgram.navigateTo({ url: path });
        }
      }
    }
</script>

<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
  }
  .wrap iframe{
    width: 100%;
    height: 100%;
  }
</style>
