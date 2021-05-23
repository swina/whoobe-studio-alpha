import Vue from 'vue'
import Vuex from 'vuex'
import desktop from './modules/desktop'
import datastore from './modules/datastore'
import editor from './modules/editor'
//import moka from './modules/components'
//import user from './modules/user'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    desktop,
    datastore,
    editor,
    //moka,
    //user,
  }
})
