import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
      {
          path: '*',
          redirect: { name: 'Goods' }
      },
      {
          path: '/',
          redirect: { name: 'Goods' }
      },
      {
          path: '/goods',
          component: Goods,
          name: 'Goods'
      },
      {
          path: '/ratings',
          component: Ratings
      },
      {
          path: '/seller',
          component: Seller
      }
  ]
})
