import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import { OverlayScrollbarsPlugin } from 'overlayscrollbars-vue';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/styles.scss';
import vuetify from './plugins/vuetify';

Vue.use(OverlayScrollbarsPlugin);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
