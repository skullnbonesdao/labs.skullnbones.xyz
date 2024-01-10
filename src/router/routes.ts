import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/starbase",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/StarbasePage.vue") }],
  },

  {
    path: "/cargo",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/CargoPage.vue") }],
  },
  {
    path: "/fleets",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/FleetsPage.vue") }],
  },
  {
    path: "/permissions",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PermissionPage.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
