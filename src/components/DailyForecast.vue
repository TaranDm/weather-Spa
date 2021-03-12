<!--ежедневный прогноз-->

<template>
    <div class="daily-forecast">
<!--        <div>-->
<!--&lt;!&ndash;            <span> {{ new Date(this.day.dt * 1000).toLocaleString("en-us", { weekday: "long" }) }}</span>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="condition">-->
<!--&lt;!&ndash;            <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" alt="" />&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="weather">-->
<!--&lt;!&ndash;            <span class="high">{{ Math.round(this.day.temp.max) }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="low">{{ Math.round(this.day.temp.min) }}</span>&ndash;&gt;-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {
        name: "DailyForecast"
    }
</script>

<style scoped>

</style>