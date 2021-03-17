<template>

    <div @click="goToWeather" class="city">
        <div class="city__wrap">
            <span class="city__country">{{city.sys.country}}</span>
            <span class="city__name">{{this.city.name}}</span>
        </div>
        <div class="weather">
            <div class="weather__wrapper">
                <span>{{Math.round(this.city.main.temp)}}&deg;</span>
                <img :src="this.iconWeather" alt="">
            </div>
            <span class="weather__status">{{weatherStatus}}</span>
            <span @click="removeCity" v-show="edit" ref="edit" class="edit icon-bin"></span>
            <span @click="updateCityWeather" class="weather__update icon-loop2"></span>
        </div>
    </div>

</template>
<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);
export default {
  name: 'City',
  props: ['city', 'edit'],
  created() {
  },
  data() {
    return {
      // динмаическая иконка погоды
      iconWeather: `http://openweathermap.org/img/wn/${this.city.weather[0].icon}@2x.png`,
      // статус погоды
      weatherStatus: this.city.weather[0].description,
      id: null,
    };
  },
  methods: {
    updateCityWeather(e) {
      e.stopPropagation();
      this.$store.dispatch('updateCityWeather', this.city.id);
    },
    // удаление города
    removeCity(e) {
      e.stopPropagation();
      this.$store.dispatch('removeCityWeather', this.city.id);
    },
    // открытие детального окна о погоде
    goToWeather() {
      this.$router.push({ name: 'weatherDetails', params: { city: this.city.name, id: this.city.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
    .city {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        height: 100%;
        box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
        background-color: #edeee7;
        &__wrap {
            display: flex;
            width: 100%;
        }
        &__country {
            position: absolute;
        }
        &__name {
            margin: 0 auto;
            word-break: break-word;
            text-transform: capitalize;
        }
        span {
            display: block;
            font-size: 25px;
            font-weight: 600;
        }
        .edit {
            align-self: flex-end;
            color: #4f4f4f;
            z-index: 1;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            margin-right: 15px;

            &:hover, &:focus {
                color: #2f81bd;
                transition: all 0.2s ease 0s;
            }
        }
        .weather {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            z-index: 1;
            width: 100%;

            &__wrapper {
                display: flex;
                align-items: center;
                flex: 1 1 100%;
            }
            span {
                /*font-size: 35px;*/

            }

            img {
                object-fit: cover;
                width: 45px;
            }
            &__status {
                font-weight: 400;
                font-size: 18px;
                flex: 1 1 auto;
                margin-bottom: 3px;
            }
            &__update {
                transition: all 0.2s ease 0s;
                font-size: 20px;

                &:hover, &:focus {
                    color: #2f81bd;
                    transition: all 0.2s ease 0s;
                }
            }
        }
    }
</style>
