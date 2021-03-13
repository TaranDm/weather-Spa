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
            <div class="add-city__city-link"
                 v-for="(city, index) in cities" :key="index"
            >
                <City :city="city" :edit="edit"  />

            </div>
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
            console.log(this.cities);

        },
        methods: {
            addNewCity() {
                this.$emit("add-NewCity")
            },
        }
    }

</script>

<style lang="scss" scoped>
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

        &:last-child {
            /*margin-right:0;*/
        }
    }
}
</style>