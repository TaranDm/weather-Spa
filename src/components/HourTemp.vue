
<!--почасовая темпиратура / импорт в HourWeather-->
<template>
    <div class="hour">
<!--        вывод часов-->
        <span>{{ new Date(this.time.dt * 1000).toLocaleString("en-us", { hour: "numeric" }) }}</span>
        <div>
      <img :src="weatherIcon" alt=""  width="40px" height="40px"/>
    </div>
<!--     темпиратура в каждый отдельный час-->
        <span>{{ Math.round(this.time.temp) }}&deg;</span>
    </div>
</template>

<script>
    export default {
        name: "HourTemp",
        props: ["time"],
        data() {
            return {
                weatherIcon: `http://openweathermap.org/img/wn/${this.time.weather[0].icon}@2x.png`
            }

        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    .hour {
        color: #fff;
        display: flex;
        flex-direction: column;
        text-align: center;
        min-width: 45px;
        margin-right: 30px;
    }
    img {
        width: auto;
        height: 22px;
        display: block;
    }
    span {
        display: block;
        align-self: center;
    }
    span:nth-child(1) {
        font-weight: 300;
        margin-bottom: 12px;
    }
    span:nth-child(2) {
        margin-bottom: 12px;
    }
    span:nth-child(3) {
        font-weight: 500;
    }
</style>