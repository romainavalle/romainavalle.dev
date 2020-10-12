import Vuex from 'vuex'
import datas from '~/assets/datas/datas.json'
import works from '~/assets/datas/works.json'
import about from '~/assets/datas/about.json'
import recognitions from '~/assets/datas/recognitions.json'
import contact from '~/assets/datas/contact.json'

if(process.browser){
  var sniffer = require('sniffer')

}
export const state = () => ({
      datas,
      contact,
      about,
      works,
      recognitions,
      currentWork: 0,
      nextOffset: 0,
      path: process.env.NODE_ENV === 'production' ? 'https://res.cloudinary.com/dqeh75j4f/image/upload/f_auto/romainavalle.dev/' : '/images/',
      vPath: process.env.NODE_ENV === 'production' ? 'https://romainavalle.s3.us-east-2.amazonaws.com/images/' : '/images/'
})
export const mutations = {
  SET_CURRENT_WORK (state, currentWork) {
    state.currentWork = currentWork
  },
  SET_NEXT_OFFSET (state, nextOffset) {
    state.nextOffset = nextOffset
  }
}
export const actions = {
  setCurrentWork ({ commit },currentWork) {
    commit('SET_CURRENT_WORK',currentWork)
  },
  setNextOffset({ commit },nextOffset) {
    commit('SET_NEXT_OFFSET', nextOffset)
  }
}
export const getters = {
  isFF: () =>{
    return sniffer ? sniffer.isFirefox : false
  },
  work: (state) => {
    return state.works.find(el => {return el.slug === state.route.params.slug})
  },
  nextWork: (state, getters) => {
    return getters.workId === state.works.length - 1 ? state.works[0] : state.works[getters.workId + 1]
  },
  workId: (state) => {
    let id = 0
    state.works.forEach((el,i) => {
      if(el.slug === state.route.params.slug) id = i
    });
    return id
  },
  nextWork:(state, getters) =>  {
    return getters.workId < state.works.length - 1 ? state.works[getters.workId + 1] : state.works[0]
  },
  isDevice: () => {
    return sniffer ? sniffer.isDevice : false
  },
  isPhone: () => {
    return sniffer ? sniffer.isPhone : false
  },
  isTablet:(state) => {
    return sniffer ? sniffer.isTablet : false
  },
  isSafari: ()=>{
    return sniffer ? sniffer.isSafari  : false
  }
}
