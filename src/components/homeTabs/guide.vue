<template>
  <div class="guide-wrap">
    <div class="guide-item" v-for="(item,index) in config" :key="index" @click="routerChange(item)">
      <img :src="item.img" />
      <div>{{item.div}}</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "guide",
  props: ["config"],
  data() {
    return {};
  },
  methods: {
    routerChange(item) {

      console.log(item,'item')
      if(item.type == 2){
        if(item.href != 'null'){
          window.location.href = item.href
        }else{
          Toast.fail('正在建设中')
        }
      }else if(item.type == 1){
        if(item.href != 'null'){
          this.$router.push(item.href)
        }else{
          Toast.fail('正在建设中')
        }
      }else if(item.type == 3){
        if(item.href != 'null'){
          wx.miniProgram.navigateTo({url:item.href});
        }else{
          Toast.fail('正在建设中')
        }
      }
      // switch (item.type) {
      //   case "hot":
      //     this.$router.push({
      //       path: "/avtivitiesDetailPage"
      //     });
      //     break;
      //   default:
      //     this.$router.push({
      //       path: "/classificationQueryResult",
      //       query: {
      //         type: item.type
      //       }
      //     });
      // }
    }
  }
};
</script>

<style scoped>
.guide-wrap {
  width: 100%;
  height: auto;
  text-align: center;
  /* display: flex;
    flex-direction: row;
    -ms-flex-direction: row;
    -ms-flex-order: row;
    justify-content: space-around;
    flex-wrap: wrap; */
}

.guide-item {
  /* width: 33.3%; */
  width: 20%;
  height: auto;
  font-size: 0.32rem;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  line-height: 0.4rem;
  /* padding: 0 1rem; */
  margin-bottom: 0.33rem;
  float: left;
  border: 1px solid transparent;
  box-sizing: border-box;
}

.guide-item img {
  width: 1.06rem;
  height: 1.06rem;
  margin-bottom: 0.16rem;
}
</style>
