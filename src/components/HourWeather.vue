<!--импортируется в weather-details-->
<template>
    <div class="hourly-weather">
            <overlay-scrollbars>
                <div class="container">
                 <span class="hourly-temp" v-for="(time, index) in filteredList" :key="index">
<!--                time массив отдельного часа-->
                <HourTemp :time="time"/>
            </span>
                </div>
            </overlay-scrollbars>
    </div>
</template>
<script>
import HourTemp from './HourTemp.vue';

export default {
  name: 'HourWeather',
  components: { HourTemp },
  props: ['forecast'],
  data() {
    return {
      time: '',
    };
  },
  computed: {
    // метод фильтрации массива. Выбираем 24 часа с прогнозом из 48
    filteredList() {
      return this.forecast.hourly.slice(0, 23);
    },
  },
};
</script>
<style lang="scss" scoped>
    .hourly-weather {
        padding: 15px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        .container {
            display: flex;
            max-width: 100vw;
            padding-bottom: 20px;
        }
    }

</style>
