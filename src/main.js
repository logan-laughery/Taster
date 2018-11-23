import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import DashedSpinner from '@stout/vue-dashed-spinner';
import RadarInput from '@stout/vue-radar-input';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

console.log(process.env);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATA_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STOREAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
});

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.component('DashedSpinner', DashedSpinner.DashedSpinner);
Vue.component('RadarInput', RadarInput.RadarInput);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
