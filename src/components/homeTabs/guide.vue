<template>
  <div class="guide-wrap">
    <van-swipe :loop="false"
               style="height:100%;">
      <van-swipe-item v-for="(item,index) in menuData"
                      :key="index">
        <div class="guide-item"
             @click="routerChange(child)"
             v-for="(child,childIndex) in item"
             :key="childIndex">
          <img :src="child.img" />
          <div>{{child.div}}</div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "guide",
  props: ["config"],
  data () {
    return {
      menuData: [],
      current: 0
    };
  },
  methods: {
    routerChange (item) {
      if (item.type == 2) {
        if (item.href != 'null') {
          window.location.href = item.href
        } else {
          Toast.fail('正在建设中')
        }
      } else if (item.type == 1) {
        if (item.href != 'null') {
          this.$router.push(item.href)
        } else {
          Toast.fail('正在建设中')
        }
      } else if (item.type == 3) {
        if (item.href != 'null') {
          wx.miniProgram.navigateTo({ url: item.href });
        } else {
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
  },
  mounted () {
    let len = this.config.length
    let n = 10
    let pages = len % 10 === 0 ? len / 10 : Math.floor((len / 10) + 1)
    let menuData = []
    for (let i = 0; i < pages; i++) {
      let temp = this.config.slice(i * n, i * n + n)
      menuData.push(temp)
    }
    this.menuData = menuData
  }
};
</script>

<style scoped>
.guide-wrap {
  width: 100%;
  height: 4.5rem;
  text-align: center;
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
