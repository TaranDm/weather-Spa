import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      APIkey: "6dfddc0eef08784a697c4a41a452ce2a",
      lang: 'Ru',
      cities:[],
      // iconWeather: `http://openweathermap.org/img/wn/${this.city.currentWeather.weather[0].icon}@2x.png`,



  },
  mutations: {
  },
  actions: {
  },
    getters: {
        APIkey(state) {
            return state.APIkey
        },

        lang(state) {
            return state.lang
        },
        cities(state) {
            return state.cities
        },
        iconWeather(state) {
            return state.iconWeather
        },



    },
  modules: {
  }
})
