<template>
    <div v-if="loading" class="loading">
        <span></span>
    </div>
    <section v-else  class="add-city">
        <div v-if="cities.length === 0" class="no-cities">
            <p>No cities added, add a new one?</p>
            <button @click="addNewCity">Add City</button>
        </div>
        <div class="add-city__content container">
            <v-tooltip bottom
                       v-for="(city, index) in cities" :key="index">
                <template v-slot:activator="{ on, attrs }">
                    <div class="add-city__city-link"
                         data-app
                         v-bind="attrs"
                         v-on="on"
                    >
                        <City :city="city" :edit="edit"/>
                    </div>
                </template>
                <div class="wrap">
                    <span>feels like: {{city.main.feels_like}}&deg;</span>
                    <span>humidity: {{city.main.humidity}}%</span>
                    <span> temp min: {{city.main.temp_min}}&deg;</span>
                    <span> temp max: {{city.main.temp_max}}&deg;</span>
                    <span> wind gust: {{city.wind.speed}} meter/sec</span>
                </div>

            </v-tooltip>
        </div>
    </section>

</template>

<script>

    import City from "./City";
    export default {
        name: "addNewCity",
        components: {
            City,
        },
        props: ['cities', 'edit', 'loading'],
        created() {
            console.log('citiessss', this.cities);


        },
        methods: {
            addNewCity() {
                this.$emit("add-NewCity")
            },
        }
    }

</script>

<style lang="scss" scoped>
    .wrap {
        display: flex;
        flex-direction: column;
    }
.add-city{
    padding-top: 81px;
    min-height: 100%;
    .no-cities {
        position: absolute;
        min-height: calc(100% - 81px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        p{

        }
            button {
                margin-top: 16px;
                padding: 8px 24px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                transition: 500ms ease all;
                font-size: 20px;
                font-weight: 600;
                &:hover {
                    outline: none;
                    transform: scale(0.98);
                }
        }
    }


    @media (max-width: 768px) {
    /*    +*/
    };
    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    &__city-link{
        margin-right: 10px;
        max-width: 300px;
        width: 100%;
        padding: 10px;
        cursor: pointer;

        &:last-child {
            /*margin-right:0;*/
        }
    }
}
</style>