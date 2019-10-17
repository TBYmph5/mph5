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
                    <div class="scroll-content">
                      <!--<swiper :options="swiperOption"  ref="mySwiperTrigger">-->
                      <!--<swiper-slide v-for="(noteItem,noteIndex) in item.noteList"  :key="noteIndex"  @click="goDetail">-->
                      <div class="scieceImageNotes" v-for="(noteItem,noteIndex) in item.noteList" :key="noteIndex"
                           @click="goDetail(noteItem)">
                        <div class="scieceImage">
                          <img :src="noteItem.banner">
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
                            {{noteItem.noteDiscribe}}
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

  export default {
    name: "travelNote",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        active: 0,
        swiperOption: {
          loop: true,
          autoplay: false,
          slidesPerView: 4,
          spaceBetween: 14,
          initialSlide: 0,
        },
        scienceList: [
          {
            name: '出行路线',
            noteList: [
              {
                name: '出行路线',
                img: [

                  'https://image.supconit.net/TBYgonglve1-1.png'
                ],
                banner:'https://image.supconit.net/TBYgonglve1-1.png',
                noteDiscribe:'田博园园区位于下渚湖街道的上渚山奇幻谷，周边有多条交通路线可以到达园区。如果开着私家车来游玩的游客，只要在任意地图app上搜索德清田博园，只需要跟着导航就能轻松到达田博园啦。',
                seeTime: '24',
                LikeTime: '9',
               commentTime: '5',
                youke: '上渚山奇幻谷官方',
                Time: '2019-10-15',
                notes: [
                  {
                    words: {
                      title: '',
                      discribe: '  田博园园区位于下渚湖街道的上渚山奇幻谷，周边有多条交通路线可以到达园区，如果开着私家车来游玩的游客，只要在任意地图app上搜索德清田博园，只需要跟着导航就能轻松到达田博园啦。\n' +
                      '\n' +
                      '   当然，为了倡导绿色生活与绿色消费，我们更建议游客采用公共交通的方式出行。为了方便每一位前来的游客能够轻松到达田博园进行参观游览，在这里我们为大家整理出周边的公交路线，不仅可以观赏到美丽的绿水青山，也能一起为绿色出行出份力。\n' +
                      '\n' +
                      '  9月23日-11月23日期间特开设田博园专线，起点站为德清火车西站，终点站为田博园，沿途经过沃尔玛、汇丰广场、国税局、行政中心南、德清一中、体育中心南、保利原乡，班次为每隔一小时一班，由于班次间隔时间较长，请大家注意把握时间噢。'
                    },
                    notesImgs: [
                      'https://image.supconit.net/TBYgonglve1-1.png'
                    ]
                  },
                  {
                    words:
                      {
                        title: '',
                        discribe: '  当然，如果是从外地慕名而来的游客，除了打车的选择之外，也可以在德清站旁边的公交站直接乘坐公交大巴，也能够轻松抵达田博园附近站点，不过还需要走一小段路哦。'
                      },
                    notesImgs: [
                      'https://image.supconit.net/TBYgonglve1-2.png'
                    ]
                  }

                ]
              }],
          },
          {
            name: '推荐景点',
            noteList: [
              {
                name: '推荐景点',
                banner:'https://image.supconit.net/TBYgonglve2-5.png',
                noteDiscribe:'既然已经来到田博园，那里面各式各样的田园景观与极具特色的丰富场馆可是不容错过的“打卡圣地”。面对眼花缭乱的景点，是不是会让你感到有些眼晕，不知道自己先迈左腿去看看粉黛花海。',
                img: [
                  'https://image.supconit.net/TBYgonglve2-5.png',
                  'https://image.supconit.net/TBYgonglve2-6.png',
                  'https://image.supconit.net/TBYgonglve2-7.png',
                  'https://image.supconit.net/TBYgonglve2-8.png'
                ],
                seeTime: '185',
                LikeTime: '36',
                commentTime: '72',
                youke: '上渚山奇幻谷官方',
                Time: '2019-10-16',
                notes: [
                  {
                    words:
                      {
                        title: '',
                        discribe: ' 既然已经来到田博园，那里面各式各样的田园景观与极具特色的丰富场馆可是不容错过的“打卡圣地”。面对眼花缭乱的景点，是不是会让你感到有些眼晕，不知道自己先迈左腿去看看粉黛花海，还是先迈右腿感受田园风光？别着急，现在就为你整理每个区域当中最吸引人景点，让你在田博园上闲庭信步，不再随着人潮四处漂泊。'
                      },
                    notesImgs: []
                  },
                  {
                    words:
                      {
                        title: '樱花草甸——“樱花之王”的浪漫',
                        discribe: '  樱花草甸以堪称“樱花之王”的染井吉野樱花为主打，每年3月中下旬至4月上旬进入盛花期，开花时繁茂如云，落英缤纷，极具浪漫主义色彩，是最能代表樱花精神的品种。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-1.png',]
                  },
                  {
                    words:
                      {
                        title: '粉黛花海——漫步仙云花海',
                        discribe: '  由千万粉黛乱子草构建而成的花海，在每年9月至11月迎来最为壮丽的时刻。开花时，花穗呈云雾状，远看如仙云密雾，令人宛如置身仙境。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve3-1.png',]
                  },
                  {
                    words:
                      {
                        title: '紫阳花坡——“千面女郎”绣球花',
                        discribe: '  紫阳花坡借鉴美国旧金山有着 “世界上最弯曲的街道”之称的伦巴底街，犹如童话世界的最美写照。景点由左街、右街和斜街组成。花坡种植素有花中“千面女郎”之称的绣球花，囊括国内外上百个优质品种。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-2.png',]
                  },
                  {
                    words:
                      {
                        title: '民族团结红榴园——56个民族是一家',
                        discribe: '  石榴，多室多子，籽粒饱满，颗颗相抱。园中种有56棵石榴树，象征着56个民族像石榴籽一样紧紧抱在一起。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-3.png',]
                  },
                  {
                    words:
                      {
                        title: '桑基鱼塘——“千年奇观”',
                        discribe: '  桑基鱼塘系统起源于春秋战国时期，是中国传统桑基鱼塘系统最集中、最大、保留最完整的区域。千百年来，湖州劳动人民发明和发展了“塘基种桑、桑叶喂蚕、蚕沙养鱼、鱼粪肥塘、塘泥壅桑”的桑基鱼塘生态模式，形成可持续多层次复合生态农业循环系统。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-4.png',]
                  },
                  {
                    words:
                      {
                        title: '林下花海——百花斗艳的梦境',
                        discribe: '  依山而建的林下花海，抬头是一望无际的树云，脚下是延绵的浪漫花径，这里的黄连木，依势而生，春天嫩绿秋天泛黄，一年四季变幻色彩。水仙、芍药、野百合、大花萱草、白芨、朱顶红、百子莲、大花葱、石蒜等，四季竞相开放，摇曳生姿，不同时节争奇斗艳，美到令人以为跌入了爱丽丝的梦境。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-5.png',]
                  },
                  {
                    words:
                      {
                        title: '生态茶园——一茶一叶一世界',
                        discribe: '  生态茶园种植着名茶莫干黄芽。莫干黄芽是国家地理标志保护产品，茶形似雀舌，色泽嫩黄，清香迥异，采用“一芽一叶”的芽茶制成，炒制过程中独特的闷黄工艺，使得干茶色泽嫩黄，芳香醇厚，味甜鲜爽，堪称是茶中精品。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-6.png',]
                  },
                  {
                    words:
                      {
                        title: '归梦”田园——归田追梦，振兴乡村',
                        discribe: '  稻田中种有首届美丽中国田园博览会会标“归”与放飞田园梦想的“梦”字，表达“归田追梦•振兴乡村”的激情，对党和祖国的热爱及对实现中国梦的坚定信念。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-7.png',]
                  },
                  {
                    words:
                      {
                        title: '紫藤隧道——穿梭在紫色的时光隧道',
                        discribe: ' 七彩紫藤隧道，由数千棵不同花色的紫藤花搭建而成，均为国内外优质品种，不乏上百年的古桩紫藤。除了常见的紫色外，还有白色、紫红、粉红等颜色。每年的4月至5月是最佳观赏时间，结合高科技打造的梦幻光影，夜晚时分，犹如穿梭于紫色的时光隧道。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-8.png',]
                  },
                  {
                    words:
                      {
                        title: '紫环王——情侣打卡“圣地”',
                        discribe: ' 由一个巨大的“8”字形的紫藤廊架组成，仿佛两个紧紧相扣的指环，寓意着忠贞爱情与美好婚姻，此处为情侣们必到打卡点。同时，造型契合国人钟爱的数字“8”，一端连接景观喷泉，让您沉浸在360°的紫色花海之中；一端连接许愿树，快来许下您的美好愿望吧！'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-9.png',]
                  },
                  {
                    words:
                      {
                        title: '英伦花园——英格兰之美',
                        discribe: ' 英伦花园依山而建，错落有致的月季花墙是一大特色。每一处花墙都取自山中原石，覆盖上百品种月季，将山石的粗狂与月季的柔情，碰撞出绝伦的花火。身处中央的欧式圆亭，尽享英格兰什罗普郡之美。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-10.png',]
                  },
                  {
                    words:
                      {
                        title: ' 龙梅仙踪——冬日花瀑下的美景',
                        discribe: ' 作为国内最大的龙梅花园，这里的龙梅品种均引自日本，其中不乏上百年的龙梅桩景。每年新春时节，花枝如瀑布般垂挂盛开，层层叠叠的花瀑，自上而下，蔚为壮观。'
                      },
                    notesImgs: ['https://image.supconit.net/TBYgonglve2-11.png',]
                  },
                  {
                    words:
                      {
                        title: '',
                        discribe: ' 除了这些景点之外，还有许多有趣好玩的景点，比如趣味横生，适合团队互动的户外探险基地，风景优美的精灵湖，接天莲叶无穷碧的荷塘美景……为了让田博园保持一点神秘感，这里就不再向大家“剧透”了，趁现在赶紧准备起来，让我们一起阅读这张属于中国，属于德清的田园文化名片，感受令人流连忘返的田园风光吧！'
                      },
                    notesImgs: []
                  },

                ]
              }],
          },

        ]
      }
    },
    methods: {
      goDetail(item) {
        this.$router.push({
          path: '/noteDetail',
          query:{
            noteDetail:JSON.stringify(item)
          }
        })
      },
      publishNote() {
        this.$router.push({
          path: '/publishNote',
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
  }

  .scieceImage {
    width: 7.2rem;
    height: 9.46rem;
    border-radius: 0.26rem;
    overflow: hidden;
  }

  .scieceImage > img {
    width: auto;
    height: 100%;
    border-radius: 0.26rem;
  }

  .notes {
    width: 5.78rem;
    height: 4.04rem;
    padding: 0.37rem 0.32rem 0 0.386rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.26rem;
    position: absolute;
    bottom: 0;
    left: calc(50% - 3.24rem);
    box-shadow: 0 0.093rem 0.186rem 0 rgba(85, 85, 85, 0.1);
  }

  .notesTop {
    display: flex;
    justify-content: space-around;
  }

  .notesTitle {
    width: 60%;
    font-size: 0.4rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    height: 0.48rem;
  }

  .seeAndLike {
    width: 40%;
    height: 0.48rem;
    line-height: 0.48rem;
    display: flex;
    justify-content: space-between;
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
    width: 5.78rem;
    height: 2.5rem;
    font-size: 0.34rem;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.48rem;
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
    white-space: normal !important;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
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
