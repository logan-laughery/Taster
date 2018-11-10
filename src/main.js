// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import DashedSpinner from '@stout/vue-dashed-spinner';
import RadarInput from '@stout/vue-radar-input';
import store from './store/index';
import App from './App';
import router from './router';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STOREAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
});

Vue.use(Vuetify);
Vue.config.productionTip = false;
Vue.component('DashedSpinner', DashedSpinner.DashedSpinner);
Vue.component('RadarInput', RadarInput.RadarInput);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
