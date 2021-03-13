<template>
    <div class="modal" ref="modal" @click="modalCloses">
        <div class="modal__wrapper" ref="modalWrapper">
            <label for="city-name">Enter Location:</label>
            <input type="text" id="city-name" name="city-name" placeholder="Enter the name of the city" v-model="city">
            <button @click="addNewCity">add</button>
        </div>

    </div>
</template>

<script>
    // import axios from "axios";
    // import db from "../firebase/firebaseinit"

    export default {
        name: "modal-window",
        props:["APIkey", "cities"],
        data(){
            return {
                city:""
            };
        },
        methods:{
            modalCloses(evt) {
                if(evt.target === this.$refs.modal){
                    this.$emit("modalCloses")
                }
            },
            // Добавление города через input
            addNewCity(){
               // если поле пустое
               if(this.city === ""){
                   alert("please fill in the field");
               }
              //если город уже добавлен
               else if (this.cities.some((res) => res.city === this.city.toLowerCase())) {
                   alert(`${this.city} already exists!`)
               } else {
                   this.$store.dispatch('addCityWeather', this.city).then(
                       () => {
                           this.$emit("modalCloses")
                       }
                   ).catch(
                       //если города нет- ошибка
                       () => {
                           alert(`The city name ${this.city} does not exist, please enter the city name correctly `)
                       }
                   );
               }
            },
        },

    }
</script>

<style scoped lang="scss">
    .modal {
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        label {
            color: #fff;
        }
        button {
            background: #464646;
            color: white;
            padding: 6px 20px;
            width: min-content;
            align-self: flex-end;
            border: none;
            border-radius: 10px;
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);


        }
        &__wrapper {
            max-width: 500px;
            border-radius: 8px;
            width: 80%;
            padding: 20px;
            background-color: #9c9c9c;
            display: flex;
            flex-direction: column;
             box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
        }
        input {
            color: #fff;
            border: none;
            background-color: transparent;
            width: 100%;
            padding: 6px 4px;
            margin: 10px 0 20px;
            &:focus {
                outline: none;
            }
        }
    }

</style>