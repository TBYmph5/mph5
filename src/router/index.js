import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'

Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      redirect: '/hometab',
      redirect: '/ordertab',
      meta: {
        title: '上渚山奇幻谷',
      },
      children: [{
          path: '/hometab',
          name: 'hometab',
          component: resolve => require(["@/pages/hometab"], resolve),
          meta: {
            title: '上渚山奇幻谷',
            keepAlive: true
          },
        },
        {
          path: '/searchtab',
          name: 'searchtab',
          component: resolve => require(["@/pages/searchtab"], resolve),
          meta: {
            title: '上渚山奇幻谷',
            keepAlive: false
          },
        },
        {
          path: '/ordertab',
          name: 'ordertab',
          component: resolve => require(["@/pages/ordertab"], resolve),
          meta: {
            title: '上渚山奇幻谷',
            keepAlive: false
          },
        },
        {
          path: '/mytab',
          name: 'mytab',
          component: resolve => require(["@/pages/mytab"], resolve),
          meta: {
            title: '上渚山奇幻谷',
            keepAlive: false
          },
        },
      ]
    },
    {
      path: '/bindphone',
      name: 'bindphone',
      component: resolve => require(["@/pages/bindphone"], resolve),
      meta: {
        title: '绑定手机号',
        keepAlive: false

      }
    },
    {
      path: '/bindemail',
      name: 'bindemail',
      component: resolve => require(["@/pages/bindemail"], resolve),
      meta: {
        title: '绑定邮箱号',
        keepAlive: false

      }
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: resolve => require(["@/pages/evaluation"], resolve),
      meta: {
        title: '评价',
        keepAlive: false

      }
    },
    {
      path: '/myCollection',
      name: 'myCollection',
      component: resolve => require(["@/pages/myCollection"], resolve),
      meta: {
        title: '我的收藏',
        keepAlive: false
      }
    },
    {
      path: '/myContacts',
      name: 'myContacts',
      component: resolve => require(["@/pages/myContacts"], resolve),
      meta: {
        title: '我的联系人',
        keepAlive: false

      },
      redirect: '/myContacts/contactList',
      children: [{
          path: '/myContacts/contactList',
          name: 'contactList',
          component: resolve => require(["@/components/contact/contactList"], resolve)
        },
        {
          path: '/myContacts/addContact',
          name: 'addContact',
          component: resolve => require(["@/components/contact/addContact"], resolve)

        },

      ],
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: resolve => require(["@/pages/myAddress"], resolve),
      meta: {
        title: '我的地址',
        keepAlive: false
      },
      redirect: '/myAddress/addressList',
      children: [{
          path: '/myAddress/addressList',
          name: 'addressList',
          component: resolve => require(["@/components/address/addressList"], resolve)
        },
        {
          path: '/myAddress/addAdress',
          name: 'addAdress',
          component: resolve => require(["@/components/address/addAdress"], resolve)

        },

      ],
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: resolve => require(["@/pages/userInfo"], resolve),
      meta: {
        title: '我的信息',
        keepAlive: false
      }
    },
    {
      path: '/integral',
      name: 'integral',
      component: resolve => require(["@/pages/integral"], resolve),
      meta: {
        title: '我的积分',
        keepAlive: true
      }
    },
    {
      path: '/fillOrder',
      name: 'fillOrder',
      component: resolve => require(["@/pages/fillOrder"], resolve),
      meta: {
        title: '订单填写',
        keepAlive: false
      }
    },

    {
      path: '/hotel',
      name: 'hotel',
      component: resolve => require(["@/pages/hotel"], resolve),
      meta: {
        title: '酒店',
        keepAlive: true
      }
    },
    {
      path: '/scenic',
      name: 'scenic',
      component: resolve => require(["@/pages/scenic"], resolve),
      meta: {
        title: '景区',
        keepAlive: true
      }
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: resolve => require(["@/pages/searchResult"], resolve),
      meta: {
        title: '上渚山奇幻谷',
        keepAlive: true
      }
    },
    {
      path: '/qualificationDetails',
      name: 'qualificationDetails',
      component: resolve => require(["@/pages/qualificationDetails"], resolve),
      meta: {
        title: '详情',
        keepAlive: false
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(["@/pages/payment"], resolve),
      meta: {
        title: '付款',
        keepAlive: false
      }
    },
    {
      path: '/paymentSucess',
      name: 'paymentSucess',
      component: resolve => require(["@/pages/paymentSucess"], resolve),
      meta: {
        title: '付款成功',
        keepAlive: true
      }
    },
    {
      path: '/serverResponseFailed',
      name: 'serverResponseFailed',
      component: resolve => require(["@/pages/serverResponseFailed"], resolve),
      meta: {
        title: '服务器响应失败',
        keepAlive: true
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(["@/pages/pay"], resolve),
      meta: {
        title: '',
        keepAlive: false
      }
    },
    {
      path: '/classificationQueryResult',
      name: 'classificationQueryResult',
      component: resolve => require(["@/pages/classificationQueryResult"], resolve),
      meta: {
        title: '',
        keepAlive: false
      }
    },
    {
      path: '/globalSearch',
      name: 'globalSearch',
      component: resolve => require(["@/pages/globalSearch"], resolve),
      meta: {
        title: '搜索',
        keepAlive: false
      }
    },
    {
      path: '/goodDetails',
      name: 'goodDetails',
      component: resolve => require(["@/pages/goodDetails"], resolve),
      meta: {
        title: '商品详情',
        keepAlive: false
      }
    },
    {
      path: '/goodPicture',
      name: 'goodPicture',
      component: resolve => require(["@/pages/goodPicture"], resolve),
      meta: {
        title: '产品图片',
        keepAlive: false
      }
    },
    {
      path: '/avtivities',
      name: 'avtivities',
      component: resolve => require(["@/pages/avtivities"], resolve),
      meta: {
        title: '热门活动',
        keepAlive: false
      }
    },
    {
      path: '/avtivitiesDetailPage',
      name: 'avtivitiesDetailPage',
      component: resolve => require(["@/pages/avtivitiesDetailPage"], resolve),
      meta: {
        title: '热门活动',
        keepAlive: false
      }
    },


  ]
})
