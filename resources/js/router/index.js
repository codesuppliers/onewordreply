import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/ask',
    name: 'Ask',
    component: () => import('@/views/Ask.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
