<template>
  <div class="wrap">
    <iframe src="/h5/MPH5/index/detailPage.html" scrolling="yes"
            frameborder="0"
            wicket:id="mainPage"
            id="mainPage"
            ref="mainPage" style="width: 100%;
height: 100%;"></iframe>
  </div>
</template>

<script>
  export default {
    name: "qualificationDetails",
    data() {
      return {
        qualificationId: this.$route.query.id,
        type: this.$route.query.type,
        chooseObject: {},
        qualificationObj:{}
      }
    },
    mounted() {

      console.log(this.$route.query)
      document.title=this.$route.query.name
      // 将数据绑定到window下面，提供给外部调用
      // window['qualificationId'] = this.qualificationId;
      window['qualificationId'] = this.qualificationId;
      // let type = 1;
      // switch (this.type) {
      //   case 'hotel':
      //     type = 1;
      //     break;
      //   case 'scenic':
      //     type = 2;
      //     break
      // }
      window['type'] = this.type;
      this.frame();
      //  未登录挂载方法到window
      window['returnLogin'] = this.goLogion,
        window['setChoose'] = data => {
          this.setChooses(data)
        }
      window['goback'] = this.routerGoBack
      window['getpciture'] = data => {
        this.getpciture(data)
      },
        window['goMap']=this.goMap,
        window['setqualificationObj']=data=>{
        this.setObj(data)
        }
    },
    methods: {
      frame() {
        var frame = this.$refs.mainPage;
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
      /**
       * 回到登录页
       */
      goLogion() {
        this.$router.push('/bindphone')
      },
      /**
       * 设置已选择的对象
       */
      setChooses(json) {
        this.$store.commit('setChooseGoodJson', json);
        this.$router.push({
          path: '/fillOrder',

        })
      },
      /**
       * 路由返回
       */
      routerGoBack() {
        this.$router.go(-1)
      },
      /**
       * 获取图片
       */
      getpciture(parmas) {
        this.$router.push({
          path: '/goodPicture',
          query: {
            type: parmas.type,
            id: parmas.id
          }
        })
      },
      setObj(Json){
        this.qualificationObj=Json
      },
      goMap(){
        wx.miniProgram.navigateTo({url:'/pages/map/index?a='+ JSON.stringify(this.qualificationObj)})
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
