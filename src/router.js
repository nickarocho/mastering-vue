import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true // send params in as props
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      // runs BEFORE the global beforeEach
      beforeEnter(routeTo, routeFrom, next) {
        // for this approach to work, the fetchEvent action MUST return a promise!
        // i.e. has to have a 'return' statement
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          routeTo.params.event = event
          next()
          // on error, redirect to 404 with name of resource missing
        }).catch(() => next({ name: '404', params: { resource: 'event' } }))
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
