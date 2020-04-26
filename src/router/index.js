import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/HelloWorld'
import uploading from '@/components/uploading'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
	{
	  path: '/uploading',
	  name: 'uploading',
	  component: uploading
	}
  ]
})
