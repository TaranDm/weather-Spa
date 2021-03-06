import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueCookies);

export default new Vuex.Store({
  state: {
    APIkey: '3cd5da1e33dd228fc5ed5f3d229d771d',
    lang: 'en',
    cities: [],
    city: null,
    forecast: null,
  },
  mutations: {
    GET_CITIES_WEATHER(state, cities) {
      /* eslint-disable */
      state.cities = cities;
        /* eslint-enable */
    },
    DELETE_CITY_WEATHER(state, id) {
      const index = state.cities.findIndex((city) => city.id === id);
      state.cities.splice(index, 1);
    },
    ADD_CITY_WEATHER(state, city) {
      state.cities.push(city);
    },
    UPDATE_CITY_WEATHER(state, updatingCity) {
      const index = state.cities.findIndex((city) => city.id === updatingCity.id);
      state.cities.splice(index, 1, updatingCity);
    },
    GET_CITY_WEATHER(state, city) {
      /* eslint-disable */
      state.city = city;
        /* eslint-enable */
    },
    GET_CITY_FORECAST(state, forecast) {
      /* eslint-disable */
      state.forecast = forecast;
        /* eslint-enable */
    },
  },
  actions: {
    async getCitiesWeather({ commit }) {
      const cityIds = JSON.parse(Vue.$cookies.get('cities'));
      const citiesWeatherData = [];

      const citiesWeather = await Promise.all(cityIds.map((cityId) => axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.state.APIkey}&lang=${this.state.lang}&units=metric`,
      ).then((response) => {
        const { data } = response;

        if (data && data.id) {
          citiesWeatherData.push(data);
        }
        return response;
      })));
      commit('GET_CITIES_WEATHER', citiesWeatherData);
      return citiesWeather;
    },
    removeCityWeather({ commit }, id) {
      let updatingCities = JSON.parse(Vue.$cookies.get('cities'));
      updatingCities = updatingCities.filter((cityId) => cityId !== id);
      Vue.$cookies.set('cities', JSON.stringify(updatingCities));
      commit('DELETE_CITY_WEATHER', id);
    },
    async addCityWeather({ commit }, name) {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this.state.APIkey}&lang=${this.state.lang}&units=metric`);
      // data ???????????????? ???????????? ???????????? ?????????? Api
      const data = await response.data;

      if (data && data.id) {
        let updatingCities = [];
        // ???????????????? ???????????? ?? cookies
        if (Vue.$cookies.isKey('cities')) {
          // ?????????????????????????????? ???????????? ?? ????????????
          updatingCities = JSON.parse(Vue.$cookies.get('cities'));
        }
        //
        if (!updatingCities.find((id) => id === data.id)) {
          updatingCities.push(data.id);
          Vue.$cookies.set('cities', JSON.stringify(updatingCities));
          commit('ADD_CITY_WEATHER', data);
        } else {
          // eslint-disable-next-line
          alert(`${data.name} already exists!`);
        }
      }
      return response;
    },
    async updateCityWeather({ commit }, id) {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.state.APIkey}&lang=${this.state.lang}&units=metric`);
      // data ???????????????? ???????????? ???????????? ?????????? Api
      const data = await response.data;
      if (data && data.id) {
        commit('UPDATE_CITY_WEATHER', data);
      }
      return response;
    },
    async getCityWeather({ commit }, id) {
      const { APIkey, lang } = this.state;

      await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APIkey}&lang=${lang}&units=metric`,
      ).then((currentWeatherResponse) => {
        const currentWeather = currentWeatherResponse.data;
        commit('GET_CITY_WEATHER', currentWeather);
        return axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&exclude=current,minutley,alerts&appid=${APIkey}&lang=${lang}&units=metric`,
          )
          .then((forecast) => {
            commit('GET_CITY_FORECAST', forecast.data);
          });
      });
    },
  },
  getters: {
    APIkey(state) {
      return state.APIkey;
    },

    lang(state) {
      return state.lang;
    },
    cities(state) {
      return state.cities;
    },
    city(state) {
      return state.city;
    },
    forecast(state) {
      return state.forecast;
    },
    iconWeather(state) {
      return state.iconWeather;
    },
  },
  modules: {
  },
});
