import { createRouter, createWebHistory } from "vue-router";
import constantRoutes from "./constantRoutes";
import asyncRoutes from "./asyncRoutes";

const routes = asyncRoutes.concat(constantRoutes);

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: routes,
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("access_token");
  // const token = 1;
  const userRole = sessionStorage.getItem("role");
  const target = to.matched[to.matched.length - 1];
  if (to.matched.length !== 0) {
    // 404
    if (token) {
      // login
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        // role 
        if (!target.meta || !target.meta.roles || target.meta.roles.length == 0 || target.meta.roles.indexOf(userRole) !== -1) {
          // if (userRole == "notActivated") {
          //   if (to.path === "/activate") {
          //     next();
          //   } else {
          //     next({ path: "/activate" });
          //   }
          // } else {
          next();
          // }
        } else {
          next("/NotAuthorized");
        }
      }
    } else {
      if (to.path === "/login") {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    next({ path: "/NotFound" });
  }
});
export default router;
