import Vue from 'vue'
import VueRouter from 'vue-router'
import addNewCity from "../components/addNewCity"
import weatherDetails from "../views/Weather-details"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'addNewCity',
    component: addNewCity
  },
    {
        path: '/weatherDetails/:id/:city',
        name: 'weatherDetails',
        component: weatherDetails
    },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
