<template>
  <div class="wrap">
    <!-- 游记攻略 -->
    <div class="container">
      <van-tabs v-model="active">
        <div v-for="(item,index) in scienceList" :key="index">
          <van-tab :title="item.name">
            <div>
              <div class="aaa">
                <div class="aaa-scroll">
                  <div class="scroll-wrap">
                    <div class="scroll-content" :style="{width:item.width}">
                      <!--<swiper :options="swiperOption"  ref="mySwiperTrigger">-->
                      <!--<swiper-slide v-for="(noteItem,noteIndex) in item.noteList"  :key="noteIndex"  @click="goDetail">-->
                      <div class="scieceImageNotes" v-for="(noteItem,noteIndex) in item.noteList" :key="noteIndex"
                           @click="goDetail(noteItem)">
                        <div class="scieceImage" style="position: relative">
                          <!--<div class="img-wrap" >-->
                          <img :src="noteItem.banner">
                          <!--</div>-->
                        </div>
                        <div class="notes">
                          <div class="notesTop">
                            <div class="notesTitle">{{noteItem.title}}</div>

                          </div>
                          <div class="seeAndLike">
                            <div class="see">
                              <img src="../../assets/images/see.png" alt="">
                              <div>{{noteItem.visit}}</div>
                            </div>
                            <div class="like">
                              <img src="../../assets/images/focus.png">
                              <div>{{noteItem.like}}</div>
                            </div>
                          </div>
                          <div class="name">{{noteItem.author}} {{noteItem.date| formmatterTimer}} 发布</div>
                          <div class="showNotes">
                            {{noteItem.abstracts}}
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
      <button class="write" @click="publishNote">发表游记</button>
    </div>
  </div>
</template>

<script>
  // 引入swiper相关组件
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import http from '../../api/public'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    name: "travelNote",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        active: 0,
        width: 0,
        swiperOption: {
          loop: true,
          autoplay: false,
          slidesPerView: 4,
          spaceBetween: 14,
          initialSlide: 0,
        },
        scienceList: []
      }
    },
    mounted() {
      this.getTravelNote()
    },
    filters: {
      formmatterTimer: function (value) {
        return moment(value).format("YYYY-MM-DD")

      }
    },
    methods: {
      goDetail(item) {
        if (item.url == undefined || item.url == '') {
          this.$router.push({
            path: '/noteDetail',
            query: {
              noteId: item.id
            }
          })
        } else {
          window.location.href = item.url
        }

      },
      publishNote() {

        http.get('/customer/info/getCurrentInfo').then(res => {
          let nickName;
          if (res.obj.nickName !== '') {
            nickName = res.obj.nickName
          } else {
            nickName = res.obj.phone
          }
          this.$router.push({
            path: '/publishNote',
            query: {
              nickName: nickName
            }
          })
        })
      },
      getTravelNote() {
        http.post('/App/wechat/getTravelNotes', {}).then(res => {
          let travelNoteList = []
          let categoryArray = [];
          res.list.forEach((item) => {
            if (categoryArray.indexOf(item.category) == -1) {
              categoryArray.push(item.category)
            }
            return categoryArray
          });
          categoryArray.forEach((categoryArrayItem, index) => {
            let scienceItem = {};
            scienceItem.name = categoryArrayItem;
            let notArray = res.list.filter(function (travelNoteItem) {
              //元素值，元素的索引，原数组。
              return (travelNoteItem.category == categoryArrayItem);
            });
            notArray.forEach((notItem, notIndex) => {
              if (notItem.logoPic == undefined || notItem.logoPic == '') {
                notItem.banner = 'https://image.supconit.net/%E6%94%BB%E7%95%A5.png';
              } else {
                notItem.banner = notItem.logoPic;
              }
              if (notItem.like == undefined) {
                notItem['like'] = 0
              }
              if (notItem.visit == undefined) {
                notItem['visit'] = 0
              }

              // let discribe = notItem.contentText.replace(/<img.*?>/g, '');
              // notItem['contentText'] = discribe
            })
            scienceItem.width = notArray.length * 8 + 'rem'
            scienceItem.noteList = notArray;
            travelNoteList.push(scienceItem)
          });
          this.scienceList = travelNoteList
          console.log(this.scienceList)
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    background-color: #fff;
  }

  .write {
    width: 4.26rem;
    height: 1.173rem;
    background: rgba(0, 170, 77, 1);
    box-shadow: 0px 0.08rem 0.5rem 0 rgba(0, 170, 77, 0.3);
    border-radius: 0.57rem;
    position: fixed;
    bottom: 0.826rem;
    left: 2.85rem;
    font-size: 0.4rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 1.173rem;
    outline: none;
    border: none;
  }

  .aaa {
    width: 100%;
    height: 12rem;
    margin-top: 0.26rem;

    /* white-space: nowrap; */
  }

  .swiper-container {
    width: 100%;
    height: 12rem;
  }

  .scieceImageNotes {
    width: 7.2rem;
    height: 11.7rem;
    border-radius: 0.26rem;
    position: relative;
    margin-left: 0.26rem;
    margin-right: 0.26rem;
    display: inline-block;
    padding: 0.4rem 0 0 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .scieceImage {
    width: 7.2rem;
    height: 9.46rem;
    border-radius: 0.26rem;
    overflow: hidden;
    position: relative;
  }

  .scieceImage > img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;

  }

  .notes {
    width: 6rem;
    height: 4.04rem;
    padding: 0.37rem 0.32rem 0 0.386rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.26rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 0 0.093rem 0.186rem 0 rgba(85, 85, 85, 0.1);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .notesTop {
    /*display: flex;*/
    /*justify-content: space-around;*/
  }

  .notesTitle {
    width: 100%;
    font-size: 0.4rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    height: 0.48rem;
  }

  .seeAndLike {
    width: 60%;
    height: 0.48rem;
    line-height: 0.48rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
  }

  .see {
    width: 50%;
    height: 0.48rem;
    display: flex;
    vertical-align: middle;
  }

  .see > img {
    width: 0.48rem;
    height: 0.48rem;
    margin-right: 0.1rem;
  }

  .see > view {
    display: inline-block;
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 0.48rem;
    text-indent: 0.13rem;
  }

  .like {
    width: 50%;
    height: 0.48rem;
    display: flex;
    vertical-align: middle;
  }

  .like > img {
    width: 0.48rem;
    height: 0.48rem;
    margin-right: 0.1rem;
  }

  .like > view {
    display: inline-block;
    font-size: 0.26rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 0.48rem;
    text-indent: 0.13rem;
  }

  .name {
    font-size: 0.26rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.8rem;
  }

  .showNotes {
    width: 100%;
    height: 1.6rem;
    font-size: 0.34rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.53rem;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
    white-space: normal !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .swiper-slide {
    width: 7.2rem !important;
    height: 100%;
  }

  .aaa-scroll {
    width: 100%;
    height: 100%;
    /*background: rosybrown;*/
    overflow: hidden;
  }

  .scroll-wrap {
    width: 100%;
    height: 102%;
    overflow-x: auto;
  }

  .scroll-content {
    height: 100%;
    width: 1000px;
  }
</style>
