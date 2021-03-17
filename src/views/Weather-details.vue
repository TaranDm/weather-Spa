<template>
    <div class="main">
        <div v-if="loading" class="loading">
            <span></span>
        </div>
<!--        eslint-disable-->
        <div v-else-if="loading" class="loading">
            <span>Sorry, the city does not found.</span>
        </div>
<!--         eslint-enable -->
        <div v-else class="weather">
            <div class="container">
                <current-weather :currentWeather = "city"/>
                <HourWeather :forecast="forecast" />
<!--                недельный прогноз-->
                <weekly-forecast :forecast="forecast"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Vue from 'vue';
import CurrentWeather from '../components/CurrentWeather.vue';
import HourWeather from '../components/HourWeather.vue';
import WeeklyForecast from '../components/WeeklyForecast.vue';

export default {
  name: 'weatherDetails',
  components: { CurrentWeather, HourWeather, WeeklyForecast },
  data() {
    return {
      loading: true,
      is404: false,
    };
  },
  created() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      const isExist = Vue.$cookies.isKey('cities') && JSON.parse(Vue.$cookies.get('cities')).find((id) => id === this.$route.params.id);
      if (isExist) {
        this.$store.dispatch('getCityWeather', this.$route.params.id)
          .then(() => {
            // убираем значок загрузки
            this.loading = false;
          });
      } else {
        this.is404 = true;
      }
    },
  },
  computed: {
    ...mapGetters([
      'APIkey',
      'lang',
      'city',
      'forecast',
    ]),
  },
};
</script>

<style lang="scss" scoped>
    .loading {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        @keyframes spin {
            to {
                transform: rotateZ(360deg);
            }
        }
        span {
            display: block;
            width: 60px;
            height: 60px;
            margin: 0 auto;
            border: 2px solid transparent;
            border-top-color: #142a5f;
            border-radius: 50%;
            animation: spin ease 1000ms infinite;
        }
    }
    .weather {
        transition: 500ms ease;
        width: 100%;
        height: 100%;

    }
</style>
