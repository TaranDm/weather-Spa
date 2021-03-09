<template>
  <div id="app">
      <modalWindow v-if="openModal" v-on:modalCloses="toggleModal" :APIkey="APIkey"/>
      <Navigation v-on:add-NewCity="toggleModal" v-on:editCity="toggleEdit" />
    <router-view :cities="cities" :edit="edit"/>
  </div>
</template>
<script>
    import axios from "axios";
      import db from "./firebase/firebaseinit";
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
              APIkey: "6dfddc0eef08784a697c4a41a452ce2a",
               lang: 'Ru',
              cities: [],
              openModal: false,
              edit: false,

          }
        },
        created() {
            this.getCityWeather();
        },
        methods: {
            // Получение данных из firebace
            getCityWeather() {
                let firebaseDB = db.firestore().collection("cities");
                firebaseDB.onSnapshot((snap)=> {
                    snap.docChanges().forEach(async (doc) => {
                        if(doc.type === "added" && !doc.doc.Nd){
                            try{
                                const response = await axios.get(
                                    `http://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&appid=${this.APIkey}&lang=${this.lang}&units=metric`);
                                const data = response.data;
                                firebaseDB.doc(doc.doc.id).update({
                                    currentWeather: data,
                                }).then(()=> {
                                    this.cities.push(doc.doc.data())
                                }).then(()=>{

                                })
                            } catch(err) {
                                 console.log(err);
                            }
                        }
                        else if (doc.type === "added" && doc.doc.Nd){
                            this.cities.push(doc.doc.data())
                        } else if (doc.type === "removed"){
                            this.cities = this.cities.filter(city => city.city !== doc.doc.data().city)
                        }
                        //вызываем имя города через консоль
                        // console.log(doc.doc.data());
                    })
                })
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

        },
    }
</script>

<style lang="scss" scoped>
    #app {
        height: 100vh;
    }






</style>
