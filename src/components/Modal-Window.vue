<template>
    <div  class="modal" ref="modal" @click="modalCloses">
        <div class="modal__wrapper" ref="modalWrapper">
            <label for="city-name">Enter Location:</label>
            <input type="text" id="city-name" name="city-name" placeholder="Enter the name of the city" v-model="city">
            <button @click="addNewCity">add</button>
        </div>

    </div>
</template>

<script>
    import axios from "axios";
    import db from "../firebase/firebaseinit"
    export default {
        name: "modal-window",
        props:["APIkey"],
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
            async addNewCity(){
               if(this.city === ""){
                   alert("please fill in the field")
               } else {
                   const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIkey}&units=metric`)
                   //data вызывает запрос города через Api
                   const data = await response.data;
                   // console.log(data)
                   //firebase
                   db.firestore().collection('cities')
                       .doc()
                       .set({
                       city: this.city,
                       currentWeather: data,
                   }).then(()=>{
                       this.$emit("modalCloses")
                       console.log()
                   })

               }

            }
        }

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