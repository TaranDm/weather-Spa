<!--импортируется в weather-details-->
<template>
    <div class="hourly-weather">
        <div class="container">
            <span class="hourly-temp" v-for="(time, index) in filteredList" :key="index">
<!--                time массив отдельного часа-->
                <HourTemp :time="time" />
            </span>
        </div>
    </div>
</template>

<script>
import HourTemp from "./HourTemp";
    export default {
        name: "HourWeather",
        components: {HourTemp,},
        props:['forecast',],
        data() {
            return {
                time: ''
            }
        },
        created() {
            // массив с подробной информацией о погоде
            console.log('forecast', this.forecast)
        },
        computed: {
            //метод фильтрации массива. Выбираем 24 часа с прогнозом из 48
            filteredList() {
                return this.forecast.hourly.slice(0, 23)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hourly-weather {
        padding: 15px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        .container {
            display: flex;
            max-width: 100vw;
            overflow: auto;
            overflow-y: hidden;
            overflow-x: scroll;
            padding-bottom: 20px;
            cursor: auto;
            &::-webkit-scrollbar {
                margin-bottom: 10px;
                max-width: 4px;

                height: 4px;
                background-color: #aaa;


                /*display: none;*/
            }
            &::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 5px;

            }
        }
    }
</style>