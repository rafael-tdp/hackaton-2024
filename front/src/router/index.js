import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Planification from "../views/Planification.vue";

const routes = [
  {  path: '/', redirect: '/login' }, 
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: "/planification", name: "Planification", component: Planification },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;