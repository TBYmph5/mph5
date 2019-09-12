import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  qiNiuLink: 'http://image.supconit.net',
  evaluationId:'',
chooseGoodJson:{},
  feeDetail:{},
  orderSnapshot:{},
  creatOrderTime: ''
}

const mutations = {
    setqiNiuLink(state, value) {
      state.qiNiuLink = value;
    },
  setevaluationId(state,value){
    state.evaluationId= value;
  },
setChooseGoodJson(state, value){
  state.chooseGoodJson= value;
},
  setfeeDetail(state, value){
    state. feeDetail= value;
  },
  setorderSnapshot(state, value){
    state.orderSnapshot= value;
  },
  setcreatorderTime(state, val) {
    state.creatOrderTime = val;
  }


}
  const getters={
    getcreatorderTime:state => state.creatOrderTime
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
