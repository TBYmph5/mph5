<template>
    <div class="wrap">
      <!-- 游记攻略 -->
      <div class="container">
        <van-tabs v-model="active">
          <div v-for="(item,index) in scienceList"  :key="index">
            <van-tab :title="item.name">
              <div>
                <div class="aaa">
                  <div class="aaa-scroll">
                    <div class="scroll-wrap">
                      <div class="scroll-content">
                  <!--<swiper :options="swiperOption"  ref="mySwiperTrigger">-->
                    <!--<swiper-slide v-for="(noteItem,noteIndex) in item.noteList"  :key="noteIndex"  @click="goDetail">-->
                      <div class="scieceImageNotes" v-for="(noteItem,noteIndex) in item.noteList"  :key="noteIndex" @click="goDetail"  >
                        <div class="scieceImage" >
                          <img :src="noteItem.img">
                        </div>
                        <div class="notes">
                          <div class="notesTop">
                            <div class="notesTitle">{{noteItem.name}}</div>
                            <div class="seeAndLike">
                              <div class="see">
                                <img src="../../assets/images/see.png" alt="">
                                <div>{{noteItem.seeTime}}</div>
                              </div>
                              <div class="like">
                                <img src="../../assets/images/focus.png">
                                <div>{{noteItem.LikeTime}}</div>
                              </div>
                            </div>
                          </div>
                          <div class="name">{{noteItem.youke}} {{noteItem.Time}} 发布</div>
                          <div class="showNotes">
                            {{noteItem.notes}}
                          </div>
                        </div>
                      </div>
                    <!--</swiper-slide>-->
                    </div>
                  </div>
                  </div>
                  <!--</swiper>-->
                 </div>
              </div>
            </van-tab>
          </div>
        </van-tabs>
        <button   class="write" @click="publishNote">发表游记</button>
      </div>
    </div>
</template>

<script>
  // 引入swiper相关组件
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  export default {
        name: "travelNote",
    components: {
      swiper,
      swiperSlide
    },
      data(){
          return {
            active: 0,
            swiperOption: {
              loop:true,
              autoplay: false,
              slidesPerView: 4,
              spaceBetween: 14,
              initialSlide: 0,
            },
            scienceList: [
              {
                name: '九曲花街',
                noteList: [
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  }
                ],
              },
              {
                name: '九曲花街',
                noteList: [
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  }
                ],
              },
              {
                name: '九曲花街',
                noteList: [
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  }
                ],
              },
              {
                name: '九曲花街',
                noteList: [
                  {
                    name: '九曲花街',
                    img: 'https://image.supconit.net/Fh-FPpiRqV15QP_pFwFj7eQsRMeB',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://imgs.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  },
                  {
                    name: '九曲花街',
                    img: 'https://imgs.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    seeTime: '22',
                    LikeTime: '23',
                    youke: 'aaaaa',
                    Time: '2019-09-22',
                    notes: '这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略这里是关于九曲花街的相关攻略'
                  }
                ],
              }
            ]
          }
      },
      methods:{
        goDetail(){
          this.$router.push({
            path:'/noteDetail',
          })
        },
        publishNote(){
          this.$router.push({
            path:'/publishNote',
          })
        }
      }
    }
</script>

<style scoped>
  .container{
    background-color: #fff;
  }
  .write{
    width:4.26rem;
    height:1.173rem;
    background:rgba(0,170,77,1);
    box-shadow:0px 0.08rem 0.5rem 0 rgba(0,170,77,0.3);
    border-radius:0.57rem;
    position: fixed;
    bottom: 0.826rem;
    left: 2.85rem;
    font-size:0.4rem;
    font-weight:bold;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height:1.173rem;
    outline: none;
    border:none;
  }
  .aaa{
    width: 100%;
    height: 12rem;
    margin-top:0.26rem;

    /* white-space: nowrap; */
  }
  .swiper-container{
    width: 100%;
    height: 12rem;
  }

  .scieceImageNotes{
    width:7.2rem;
    height:11.7rem;
    border-radius:0.26rem;
    position: relative;
    margin-left:0.26rem;margin-right: 0.26rem;
    display:inline-block;
  }
  .scieceImage{
    width:7.2rem;
    height:9.46rem;
    border-radius:0.26rem;
  }
  .scieceImage>img{
    width: 100%;
    height: 100%;
    border-radius:0.26rem;
  }
  .notes{
    width:5.78rem;
    height:4.04rem;
    padding: 0.37rem 0.32rem 0 0.386rem;
    background:rgba(255,255,255,1);
    border-radius:0.26rem;
    position: absolute;
    bottom:0;
    left: calc( 50% - 3.24rem);
    box-shadow:0 0.093rem 0.186rem 0 rgba(85,85,85,0.1);
  }
  .notesTop{
    display: flex;
    justify-content: space-around;
  }
  .notesTitle{
    width: 60%;
    font-size:0.4rem;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    height: 0.48rem;
  }
  .seeAndLike{
    width: 40%;
    height:0.48rem;
    line-height:0.48rem ;
    display: flex;
    justify-content: space-between;
  }
  .see{
    width: 50%;
    height: 0.48rem;
    display: flex;
    vertical-align: middle;
  }
  .see>img{
    width: 0.48rem;
    height: 0.48rem;
  }
  .see>view{
    display: inline-block;
    font-size:0.26rem;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height: 0.48rem;
    text-indent: 0.13rem;
  }
  .like{
    width: 50%;
    height: 0.48rem;
    display: flex;
    vertical-align: middle;
  }
  .like>img{
    width: 0.48rem;
    height: 0.48rem;
  }
  .like>view{
    display: inline-block;
    font-size:0.26rem;
    font-family:PingFang SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height: 0.48rem;
    text-indent: 0.13rem;
  }
  .name{
    font-size:0.26rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height: 0.8rem;
  }
  .showNotes{
    width:5.78rem;
    font-size:0.34rem;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.48rem;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
    white-space:normal !important;
  }
  .swiper-slide{
   width:7.2rem !important;
    height: 100%;
  }
  .aaa-scroll{
    width: 100%;
    height: 100%;
    /*background: rosybrown;*/
    overflow: hidden;
  }
  .scroll-wrap{
    width: 100%;
    height: 102%;
    overflow-x: auto;
  }
  .scroll-content{
    height: 100%;
    width: 1000px;
  }
</style>
