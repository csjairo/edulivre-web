import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

import UserManagementView from '../views/UserManagementView.vue'
import TeacherManagementView from '../views/TeacherManagementView.vue'
import StudentManagementView from '../views/StudentManagementView.vue'
import WorkshopManagementView from '../views/WorkshopManagementView.vue'
import LessonManagementView from '../views/LessonManagementView.vue'
import FrequencyManagementView from '../views/FrequencyManagementView.vue'
import HistoryManagementView from '../views/HistoryManagementView.vue'
import UserEditView from '../views/UserEditView.vue'

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
      path: '/manage/users/edit/:uuid',
      name: 'UserEdit',
      component: UserEditView
    },
    {
      path: '/manage/users',
      name: 'UserManagement',
      component: UserManagementView
    },
    {
      path: '/manage/teachers',
      name: 'TeacherManagement',
      component: TeacherManagementView
    },
    {
      path: '/manage/students',
      name: 'StudentManagement',
      component: StudentManagementView
    },
    {
      path: '/manage/workshops',
      name: 'WorkshopManagement',
      component: WorkshopManagementView
    },
    {
      path: '/manage/lessons',
      name: 'LessonManagement',
      component: LessonManagementView
    },
    {
      path: '/manage/frequency',
      name: 'FrequencyManagement',
      component: FrequencyManagementView
    },
    {
      path: '/manage/history',
      name: 'HistoryManagement',
      component: HistoryManagementView
    }
  ]
})

export default router