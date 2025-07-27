import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/Home.vue";
import AboutView from "../pages/About.vue";

import UserManagementView from "../pages/UserManagement.vue";
import TeacherManagementView from "../pages/TeacherManagement.vue";
import StudentManagementView from "../pages/StudentManagement.vue";
import WorkshopManagementView from "../pages/WorkshopManagement.vue";
import LessonManagementView from "../pages/LessonManagement.vue";
import FrequencyManagementView from "../pages/FrequencyManagement.vue";
import HistoryManagementView from "../pages/HistoryManagement.vue";
import UserEditView from "../pages/UserEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/manage/users/edit/:uuid",
      name: "UserEdit",
      component: UserEditView,
    },
    {
      path: "/manage/users",
      name: "UserManagement",
      component: UserManagementView,
    },
    {
      path: "/manage/teachers",
      name: "TeacherManagement",
      component: TeacherManagementView,
    },
    {
      path: "/manage/students",
      name: "StudentManagement",
      component: StudentManagementView,
    },
    {
      path: "/manage/workshops",
      name: "WorkshopManagement",
      component: WorkshopManagementView,
    },
    {
      path: "/manage/lessons",
      name: "LessonManagement",
      component: LessonManagementView,
    },
    {
      path: "/manage/frequency",
      name: "FrequencyManagement",
      component: FrequencyManagementView,
    },
    {
      path: "/manage/history",
      name: "HistoryManagement",
      component: HistoryManagementView,
    },
  ],
});

export default router;
