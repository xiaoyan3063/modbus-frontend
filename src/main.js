import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Chart from 'chart.js'
import VueChart from 'vue-chartjs'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')