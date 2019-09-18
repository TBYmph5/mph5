<template>
  <div class="wrap">
    <iframe :src="src" scrolling="yes"
            frameborder="0"
            wicket:id="mainPage"
            id="mainPage"
            ref="goodPage" style="width: 100%;
height: 100%;"></iframe>
    <!--返回按钮-->
    <div class="go-back" @click="goBack"></div>
</div>
</template>

<script>
    export default {
        name: "goodPicture",
      data(){
          return{
            src:''
          }
      },
      mounted(){
          console.log(this.$route.query);
              this.src='/h5/Inpression.html?type='+this.$route.query.type+'&id='+this.$route.query.id

        this.frame();
      },
      methods: {
        frame() {
          var frame = this.$refs.good;
          frame.onload = function () {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isiOS) {
              var iframebody = frame.contentWindow.document.body;
              console.log(iframebody);
              iframebody.style.width = document.body.clientWidth + "px";
              // alert('iphone')
            }
          };
        },
        goBack(){
          this.$router.go(-1)
        }

      }
    }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
