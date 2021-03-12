<template>
    <div class="current-weather">
        <div class="current-weather__content">
            <div class="current-weather__weather-info">
<!--                имя города-->
                <span class="city">{{ this.currentWeather.name }}</span>

                <div class="current-weather__wrapper">
                    <span class="current-weather__current-temperature">{{ Math.round(this.currentWeather.main.temp) }}&deg;</span>
                    <div class="current-weather__weather-icon">
                        <img :src=this.weatherIcon alt="">

                    </div>
                </div>
<!--                текущая погода-->

                <div class="high-low-temperatures">
                    <div class="high">
                        <span class="icon-arrow-up2"></span>
<!--                        max темпиратура-->
                        <span>{{ Math.round(this.currentWeather.main.temp_max) }}&deg;</span>
                    </div>
                    <div class="low">
                        <span class="icon-arrow-down2"></span>
                        <!--                        min темпиратура-->
                        <span>{{ Math.round(this.currentWeather.main.temp_min) }}&deg;</span>
                    </div>
                </div>
<!--                описание погоды-->
                <span class="current-weather__condition">{{ this.currentWeather.weather[0].description }}</span>
<!--                человеческое восприятие погоды-->
                <span class="feels-like">Feels like {{ Math.round(this.currentWeather.main.feels_like) }}&deg;</span>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "CurrentWeather",
        props: [ "currentWeather"],
        data() {
            return {
                weatherIcon: `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`,
            }

        }

    }
</script>

<style lang="scss" scoped>
    .current-weather {

        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
        &__content {
            min-height: 305px;
            position: relative;
            display: flex;
            color: #fff;
        }
        span {
            display: block;
        }
        &__weather-info {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .city {
                font-size: 40px;
                line-height: 42px;
                font-weight: 500;
                margin-bottom: 20px;
            }
            .current-weather__current-temperature {
                margin-top: 40px;
                font-size: 80px;
                font-weight: 600;

            }
        }
        &__wrapper{
            display: flex;justify-content: center;
        }
        .high-low-temperatures {
            display: flex;
            gap: 16px;
            .high,
            .low {
                display: flex;
                span {
                    margin-left: 8px;
                }
            }
        }
        .condition {
            text-transform: capitalize;
            font-size: 24px;
            font-weight: 500;
            margin: 60px 0 8px 0;
        }
        .feels-like {
            font-size: 14px;
            font-weight: 400;
        }
        &__weather-icon {
            img {
                width: 146px;
                height: 204px;
                margin-top: -43px;
                object-fit: cover;
            }
        }
    }
</style>