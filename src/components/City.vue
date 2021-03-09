<template>
    <div class="city">
        <span>{{city.city}}</span>
        <div class="weather">
            <div class="weather__wrapper">
            <span>{{Math.round(this.city.currentWeather.main.temp)}}&deg;</span>
            <img :src="iconWeather" alt="">
            </div>
            <span class="weather__status">{{weatherStatus}}</span>
            <span @click="removeCity" v-if="edit" class="edit icon-bin"></span>
        </div>


    </div>
</template>


<script>
     import db from "../firebase/firebaseinit";
    export default {
        name: "City",
        props: ["city", "edit"],
        created() {
            console.log(this.city);
        },
        data() {
            return {
                  //динмаическая иконка погоды
                  iconWeather: `http://openweathermap.org/img/wn/${this.city.currentWeather.weather[0].icon}@2x.png`,
                //статус погоды
                weatherStatus: this.city.currentWeather.weather[0].description,
                id: null,
            }
        },
        methods:{
            //удаление города
            removeCity(){
                console.log('db', db)
                db.firestore().collection("cities")
                    .where("city", "==", `${this.city.city}`)
                .get()
                    .then((docs) => {
                     docs.forEach((doc)=> {this.id = doc.id})
                }).then(()=>{
                    db.firestore().collection("cities").doc(this.id).delete()
                })
            }
        }
    }
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
        box-shadow: 0 1px 2px 0 #fff;
        color: #fff;
        span {
            z-index: 1;

            display: block;
            font-size: 25px;
            font-weight: 600;
        }
        .edit {
            align-self: flex-end;
            color: #fff;
            z-index: 1;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            &:hover, &:focus{
                color: #2f81bd;
                transition: all 0.2s ease 0s;

            }

        }
        .weather {
            display: flex;
            flex-wrap: wrap;
            flex:1;
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
        }
    }

</style>