<template>
    <div class="wrap">
      <div class='container'>
        <div class='gobal-serach-content'>
          <van-search v-model="inputValue" placeholder="请输入搜索关键词"   @search="onSearch"    show-action
                      shape="round">
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </div>
        <!-- 搜索历史 -->
        <div class='seach-history'>
          <div class='search-title'>搜索历史
            <span class='clear'  @click='clearSearchHistory'>清空</span> </div>
          <div class='search-words-item' v-for="(item,index) in searckHistoryWords" :key="index"  @click='searchHistorySelect(item)'>{{item.text}}</div>
        </div>
        <!-- 热门历史 -->
        <div class='seach-history'>
          <div class='search-title'>热门搜索
            <div class='clear' @click='foldChange'>展开
              <span class='iconfont  ' :class="fold ? 'icon-jiantou':'icon-xiajiantou' "></span> </div>
          </div>
          <div class='search-words-item' v-for="(item,index) in  hotWordsShow" :key="index"  @click='searchHotSelect(item)'>{{item.text}}</div>
        </div>
      </div>
      <!--返回按钮-->
      <div class="go-back" @click="goBack"></div>
    </div>
</template>

<script>
    export default {
        name: "globalSearch",
      data(){
          return{
            inputValue:'',
            searckHistoryWords:[
              { text: '一日游' }, { text: '一日游' }, { text: '一日游' }, { text: '一日游' }
            ],
            hotWords:[
              {text:'旅游+'},
              { text: '亲子游' },
              { text: '旅游+' },
              { text: '亲子游' },
              { text: '旅游+' },
              { text: '亲子游' },
              { text: '旅游+' },
              { text: '亲子游' },
              { text: '旅游+' },
              { text: '亲子游' },
            ],
            hotWordsShow:[],
            fold:false
          }
      },
      mounted(){
         this.hotWordsShow=this.hotWords.slice(0, 8);
         this.inputValue=this.$route.query.keyWords;
      },
      methods:{
        foldChange(){
          if (this.fold){
            this.hotWordsShow=this.hotWords.slice(0, 8),
              this.fold=!this.fold

          }else{
            this.hotWordsShow=this.hotWords;
              this.fold=!this.fold

          }
        },
        /**
         * 清空搜索历史
         */
        clearSearchHistory(){
          this.searckHistoryWords=[]
        },
        /**
         * 搜索历史点击
         */
        searchHistorySelect(item){
          this.inputValue=item.text
        },
        /**
         * 搜索
         */
        onSearch(){
          console.log(this.inputValue);
          this.$router.push({
            path:'/classificationQueryResult',
            query:{
              keyWord:this.inputValue,
              area:this.$route.query.area
            }
          })
        },
        /**
         * 热门搜索点击
         */
        searchHotSelect(item){
          this.inputValue= item.text

        },
        /**
         * 返回
         */
        goBack(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .container{
    background: #f3f3f3;
  }
  .van-search{
    background: transparent !important;
  }
  /* pages/historySearch/index.wxss */
  .gobal-serach-content .van-search__content{
    height:0.90rem;
    background:rgba(255,255,255,1);
    box-shadow:1px 1px 0.08rem 0px rgba(130,130,130,0.21);
    border-radius:0.45rem;
  }
  .gobal-serach-content .van-search--withaction.van-search--withaction{
    background: transparent !important;
  }
  .search-trrigger{
    font-size:0.34rem;
    font-weight:500;
    color:rgba(102,102,102,1);
  }
  .gobal-serach-content .van-cell__left-icon{
    color:#DADADA !important;
  }
  .seach-history{
    margin-top: 0.8rem;
    padding: 0 0.4rem;
    border:1px solid transparent;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .search-title{
    height: 0.53rem;
    font-size:0.37rem;
    font-weight: bold;
    color:rgba(51,51,51,1);
    line-height: 0.53rem;
    margin-bottom: 0.4rem;
  }
  .search-title .clear{
    display: block;
    height: 0.53rem;
    line-height: 0.6rem;
    float: right;
    font-size:0.32rem;
    color:rgba(64,111,245,1);
    font-weight: normal;
  }
  .search-words-item{
    width:2.08rem;
    height:0.77rem;
    background:rgba(255,255,255,1);
    border-radius:0.4rem;
    font-size:0.29rem;
    color:rgba(51,51,51,1);
    line-height: 0.77rem;
    text-align: center;
    display: inline-block;
    margin-bottom:0.4rem;
    margin-right: 0.2rem;
  }
  .search-words-item:nth-child(5n){
    margin-right: 0;
  }

</style>
