<template>
    <div class="main">
        <div v-if="loading" class="loading">
            <span></span>
        </div>
        <div v-else class="weather">
            <div class="container">
                <current-weather :currentWeather = "currentWeather"/>
                <HourWeather :forecast="forecast" />
<!--                недельный прогноз-->
                <weekly-forecast :forecast="forecast"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import db from "../firebase/firebaseinit";
    import CurrentWeather from "../components/CurrentWeather";
    import HourWeather from "../components/HourWeather";
    import { mapGetters, } from 'vuex'
    import WeeklyForecast from "../components/WeeklyForecast";
    // import DailyForecast from "../components/DailyForecast";
    export default {
        name: "weatherDetails",
        components:{CurrentWeather, HourWeather, WeeklyForecast, },
        data() {
            return {
                //храним всю инфо о погоде
                forecast: "",
                //текущая погода
                currentWeather: "",
                //значек загрузки вызова
                loading: true,
            }
        },
        created() {
            this.getWeather()
        },
        methods:{
            getWeather() {
                let firebaseDB = db.firestore().collection("cities");
                firebaseDB.where('city', '==', `${this.$route.params.city}`).get().then((docs) => {
                    docs.forEach(doc =>{
                    //    текущая погода = данным текущего города (текущего документа)10v 11:50
                        this.currentWeather = doc.data().currentWeather;
                        axios
                            .get(
                                `https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${
                                    doc.data().currentWeather.coord.lon
                                }&exclude=current,minutley,alerts&appid=${this.APIkey}&lang=${this.lang}&units=metric`).then(res => {
                                    //присвоили данные с прогнозом в переменную
                                    this.forecast = res.data;
                        })
                            //убираем значок загрузки
                            .then(()=>{
                            this.loading = false;
                                // console.log(this.loading);
                            // console.log(this.forecast);
                             console.log(this.currentWeather)
                        })

                    })
                })
            }
        },
        computed: {
            ...mapGetters([
                'APIkey',
                'lang',

            ]),
        }
    }
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