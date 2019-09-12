<template>
  <div class="hello">
    <div class="content-wrap">
      <router-view/>
    </div>
    <div class="footer-wrap">
      <van-tabbar route>
        <van-tabbar-item
          replace
          to="/hometab">
          <span class="icon"></span>
          首页
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/searchtab"
        >
          <span class="icon"></span>
          搜索
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/ordertab"

        >
          <span class="icon"></span>
          订单
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/mytab"
        >
          <span class="icon"></span>
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        active: 0
      }
    },
    methods: {
      tabOnClick(name, title) {
        debugger
        console.log(name, title)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    width: 100%;
    height: 100%;
  }

  .footer-wrap {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 2px 0px rgba(12, 3, 6, 0.22);
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }


  .hello {
    width: 100%;
    height: 100%;
  }

  .content-wrap {
    height: calc(100% - 50px);
    width: 100%;
    overflow: auto;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .van-tabbar-item .icon {
    display: block;
    width: 0.66rem;
    height:0.66rem;
    background: url("../../src/assets/images/index.png") center no-repeat;
    background-size: 100% 100%;
    margin-bottom: 0.1rem;

  }
  .van-tabbar-item.van-tabbar-item--active .icon{
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }

  .van-tabbar-item:nth-child(1).van-tabbar-item--active .icon{
    background: url("../../src/assets/images/index_active.png") center no-repeat;
    background-size: 100% 100%;
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }
  .van-tabbar-item:nth-child(2) .icon{
    background: url("../../src/assets/images/search.png") center no-repeat;
    background-size: 100% 100%;
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }
  .van-tabbar-item:nth-child(2).van-tabbar-item--active   .icon{
    background: url("../../src/assets/images/search_active.png") center no-repeat;
    background-size: 100% 100%;
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }
  .van-tabbar-item:nth-child(3) .icon{
    background: url("../../src/assets/images/order.png") center no-repeat;
    background-size: 100% 100%;
  }
  .van-tabbar-item:nth-child(3).van-tabbar-item--active  .icon{
    background: url("../../src/assets/images/order_active.png") center no-repeat ;
    background-size: 100% 100%;
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }
  .van-tabbar-item:nth-child(4) .icon{
    background: url("../../src/assets/images/my.png") center no-repeat;
    background-size: 100% 100%;
  }
  .van-tabbar-item:nth-child(4).van-tabbar-item--active .icon{
    background: url("../../src/assets/images/my_active.png") center no-repeat ;
    background-size: 100% 100%;
    display: block;
    width: 0.66rem;
    height:0.66rem;
  }
  .van-tabbar-item__text{
    font-size:0.26rem;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
</style>
