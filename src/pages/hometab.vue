<template>
  <div class="wrap">
    <iframe
      src="https://www.supconit.net/h5/MPH5/index/index.html"
      scrolling="yes"
      frameborder="0"
      wicket:id="mainPage"
      id="mainPage"
      ref="mainPage"
    ></iframe>
  </div>
</template>
<script>
import { debug } from 'util';
export default {
  name: "hometab",
  data() {
    return {
      chooseQualificationObj:{}
    };


  },
  filters:{

  },
  mounted(){
      console.log(this.$refs['mainPage'])
      this.frame();
  //    挂载路由方法到window
    // 将h5RenderData方法绑定到window下面，提供给外部调用
    /**
     * 挂载gobalSearch
     * */
    window['gobalsearch']= data =>{
      this.goGobalSearch(data);
    }
    window['routerGo'] = data => {
      this.routerPush(data);
    }
    /**
     * 挂载点击获取详情的方法
     */
    window['setChooseQualificationObj']=data=>{
      this.setChooseQualification(data)
    },
      window['setChooseGoodObj']=data=>{
        this.setChooseGood(data)
      }

  },
  methods: {
    /**
     * 全局搜索
     * */
    goGobalSearch(params){
      console.log(params)
      this.$router.push({
        path:'/globalSearch',
        query:{
          keyWords:params.words,
          area:params.area
        }
      })
    },

    /**
     * 路由跳转
     */
    routerPush(data) {
      switch (data) {
        case 'hot':
          this.$router.push({
            path: '/avtivities',
          })
          break
        default:
          this.$router.push({
            path: '/classificationQueryResult',
            query:{
              type:data
            }
          })
      }

    },
    /**
     * 查看资质详情
     */
    setChooseQualification(data){
      debugger
      this.chooseQualificationObj=data;
      if(data.id){
        this.$router.push({
          path: '/qualificationDetails',
          query:{
            type:data.type,
            id:data.id,
            name:data.name
          }
        })
      }

    },
    setChooseGood(data){
      debugger
      this.$router.push({
        path: '/goodDetails',
        query:{
          id:data.id,
          name:data.name
        }
      })
    },
    frame() {
      var frame = this.$refs.mainPage;
      frame.onload = function() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
          var iframebody = frame.contentWindow.document.body;
          console.log(iframebody);
          iframebody.style.width = document.body.clientWidth + "px";
          // alert('iphone')
        }
      };
    }
  }
};
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
