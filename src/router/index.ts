import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/SearchView.vue"),
  },
  {
    path: "/protocol/:filename",
    name: "protocol",
    component: () => import("@/views/ProtocolGraph.vue"),
  },
  {
    path: "/protocol/compiled/:filename",
    name: "protocolCompiled",
    component: () => import("@/views/ProtocolGraphCompiled.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
