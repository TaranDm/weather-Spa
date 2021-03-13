<template>
  <div id="app">
      <modalWindow v-if="openModal" v-on:modalCloses="toggleModal" :cities="cities" :APIkey="APIkey"/>
      <Navigation
              v-on:add-NewCity="toggleModal"
              v-on:editCity="toggleEdit"
              :addCityActive="addCityActive"/>
    <router-view
                 :cities="cities"
                 :edit="edit"
                 :APIkey="APIkey"
                 :loading="loading"
                 v-on:add-NewCity="toggleModal" />
  </div>
</template>
<script>
    // import axios from "axios";
    import { mapGetters, } from 'vuex'
      // import db from "./firebase/firebaseinit";
      import Navigation from "./components/Navigation";
      import modalWindow from "./components/Modal-Window";

    export default {
        name: "App",
        components: {
            Navigation, modalWindow
        },
        data() {
          return {
              errored:false,
               // cities: [],
              openModal: false,
              edit: false,
          //    переменная для хранения информации для каждого отдельного города
              addCityActive: null,
              loading: true,
          }
        },
        created() {
            this.getCityWeather();
            this.checkRoute()
        },
        methods: {
            // Получение данных из firebace
            getCityWeather() {
                this.$store.dispatch('getCitiesWeather').then((resp) => {
                    console.log('then', resp);
                    this.loading = false;
                });
                // getCitiesWeather()
                // let firebaseDB = db.firestore().collection("cities");
                // firebaseDB.onSnapshot((snap)=> {
                //     snap.docChanges().forEach(async (doc) => {
                //         if(doc.type === "added" && !doc.doc.Nd){
                //             try{
                //                 const response = await axios.get(
                //                     `http://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&appid=${this.APIkey}&lang=${this.lang}&units=metric`);
                //                 const data = response.data;
                //                 firebaseDB.doc(doc.doc.id).update({
                //                     currentWeather: data,
                //                 }).then(()=> {
                //                     this.cities.push(doc.doc.data())
                //                 }).then(()=>{
                //
                //                 })
                //             } catch(err) {
                //                  console.log(err);
                //             }
                //         }
                //         else if (doc.type === "added" && doc.doc.Nd){
                //             this.cities.push(doc.doc.data())
                //         } else if (doc.type === "removed"){
                //             this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
                //         }
                //         //вызываем имя города через консоль
                //         // console.log(doc.doc.data());
                //     })
                // })
            },
            toggleModal(){
                this.openModal = !this.openModal;

            },
            toggleEdit(){
                this.edit = !this.edit;

            },

             //получение данных из Api
             // getCurrentWeather() {
             //     axios
             //         .get(
             //         `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIkey}&lang=${this.lang}`)
             //         .then((res =>{
             //             console.log(res.data)
             //         }))
             // }

            //
            checkRoute() {
                if(this.$route.name === "addNewCity") {
                    this.addCityActive = true;
                } else {
                    this.addCityActive = false;
                }
                // console.log(this.addCityActive)
            },
        },
        watch: {
            $route() {
                this.checkRoute();
            },
        },
        computed: {
            ...mapGetters([
                'APIkey',
                'lang',
                'cities',

            ]),
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        height: 100vh;
    }






</style>
