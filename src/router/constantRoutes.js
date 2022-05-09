const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path:"/activate",
    component: () => import("@/views/Activate/Activate.vue"),
  },
  {
    path: "/NotFound",
    name: "NotFound",
    component: () => import("@/views/ErrorPage/NotFound.vue"),
  },
  {
    path: "/NotAuthorized",
    name: "NotAuthorized",
    component: () => import("@/views/ErrorPage/NotAuthorized.vue"),
  },
];
export default constantRoutes;
