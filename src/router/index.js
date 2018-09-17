import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import passport from '@/components/passport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/passport',
      name: 'passport',
      component: passport
    }
  ]
})
