<template>
    <section class="add-city">
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
        props: ['cities', 'edit'],
        created() {
            console.log(this.cities);

        }
    }

</script>

<style lang="scss" scoped>
.add-city{
    background-color: #9c9c9c;
    padding-top: 81px;
    min-height: 100%;


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