import Vue from 'vue'
import VueRouter from 'vue-router'
import addNewCity from "../components/addNewCity";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'addNewCity',
    component: addNewCity
  },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
