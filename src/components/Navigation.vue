<template>
    <header class=" header">
        <nav class="nav container">
            <span>Add City</span>
            <div class="right">
<!--                icons-->
                <span @click="editCity" ref="editCities" class="icon-pencil"></span>
                <span @click="reloadApp" class="icon-loop2" ></span>
                <span @click="addNewCity" class="icon-plus"></span>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Navigation",
        methods: {
            addNewCity() {
                this.$emit("add-NewCity")
            },
            reloadApp() {
                location.reload();
            },
            editCity() {
                this.$refs.editCities.classList.toggle("edit-active")
                this.$emit("editCity")
            }

        }
    }
</script>

<style scoped lang="scss"  >
    .header {
        background: rgba(69, 69, 69, 0.99);
        position: fixed;
        box-shadow: -1px 13px 14px -12px #000000;
        z-index: 10;
        width: 100% ;
        .nav {
            display: flex;
            color: #ffffff;
            padding: 30px 10px;
            justify-content: space-between;
            span {
                font-weight: 700;
            }
        }

    }
    .edit-active {
        color: #2f81bd;
    }
.right{
    display: flex;
span{
    cursor: pointer;
    margin-right: 20px;
    transition: all 0.2s ease 0s;
    &:hover, &:focus{
        color: #2f81bd;
        transition: all 0.2s ease 0s;

    }
    &:last-child{
        margin-right: 0;
    }
}
}


</style>