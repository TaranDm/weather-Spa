<template>
  <div id="app">
      <transition name="fade" >
          <modalWindow key="modal" v-if="openModal"
                       v-on:modalCloses="toggleModal"
                       :cities="cities"
                       :APIkey="APIkey"/>
      </transition>
      <Navigation
              v-on:add-NewCity="toggleModal"
              v-on:editCity="toggleEdit"
              :addCityActive="addCityActive"/>
      <transition name="fade">
          <router-view
                  key="detail-window"
                  :cities="cities"
                  :edit="edit"
                  :APIkey="APIkey"
                  :loading="loading"
                  v-on:add-NewCity="toggleModal"/>
      </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import Navigation from './components/Navigation.vue';
import modalWindow from './components/Modal-Window.vue';

export default {
  name: 'App',
  components: {
    Navigation, modalWindow,
  },
  data() {
    return {
      errored: false,
      openModal: false,
      edit: false,
      //    переменная для хранения информации для каждого отдельного города
      addCityActive: null,
      loading: true,
    };
  },
  created() {
    const hasCities = Vue.$cookies.isKey('cities')
        && JSON.parse(Vue.$cookies.get('cities')).length > 0;
    if (hasCities) {
      this.getCityWeather();
    } else {
      this.loading = false;
    }
    this.checkRoute();
  },
  methods: {
    getCityWeather() {
      this.$store.dispatch('getCitiesWeather').then(() => {
        this.loading = false;
      });
    },
    toggleModal() {
      this.openModal = !this.openModal;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === 'addNewCity') {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
  computed: {
    ...mapGetters([
      'APIkey',
      'lang',
      'cities',
    ]),
  },
};
</script>
<style lang="scss" scoped>
    #app {
        height: 100vh;
    }

</style>
