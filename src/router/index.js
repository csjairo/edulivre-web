import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkshopsView from '../views/WorkshopsView.vue'
import WorkshopDetailsView from '../views/WorkshopDetailsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/workshops',
      name: 'Workshops',
      component: WorkshopsView
    },
    {
      path: '/workshops/:workshop_uuid',
      name: 'WorkshopDetails',
      component: WorkshopDetailsView,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    }
  ]
})

export default router
