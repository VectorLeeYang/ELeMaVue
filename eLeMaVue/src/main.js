// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Network from './common/js/network.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Vuex)
Vue.use(Mint)
// 添加的全局方法最好是加上$标识符 这样好区分
Vue.prototype.$axios = Network

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data: {
        eventHub: new Vue()
    }
})
