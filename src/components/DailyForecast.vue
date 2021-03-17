<!--ежедневный прогноз-->
<template>
    <div class="daily-forecast">
<!--        daily-forecast-->
        <div>
            <span> {{ new Date(this.day.dt * 1000)
                .toLocaleString("en-us", { weekday: "long" }) }} </span>
        </div>
        <div class="condition">
            <img :src="this.iconWeather" alt="">

        </div>
        <div class="weather">
            <span class="high ">
                <span class="icon-arrow-up2"></span>{{ Math.round(this.day.temp.max) }}</span>
            <span  class="low ">
                <span class="icon-arrow-down2"></span>
                {{ Math.round(this.day.temp.min) }}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DailyForecast',
  props: ['day'],
  data() {
    return {
      iconWeather: `http://openweathermap.org/img/wn/${this.day.weather[0].icon}@2x.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
    .daily-forecast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
        div {
            flex: 1;
        }
        .condition {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 30px;

            }
        }
        .weather {
            display: flex;
            justify-content: flex-end;
            span {
                min-width: 30px;
                :before {

                }
            }
            .high {
                font-weight: 500;
                margin-right: 30px;
                span {
                    margin-right: 10px;
                }
            }
            .low {
                span {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
