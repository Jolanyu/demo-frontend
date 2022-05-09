const asyncRoutes = [
  {
    path: "",
    component: () => import("@/views/Index.vue"),
    children: [


      {
        path: "/admin",
        component: () => import("@/views/Admin/Admin.vue"),
        meta: {
          menuIcon: "true",
          roles: [],
          title: "管理员",
        },
      },
      {
        path: "/book",
        component: () => import("@/views/Book/Book.vue"),
        meta: {
          menuIcon: "true",
          roles: [],
          title: "书籍管理",
        },
      },
      {
        path: "/account",
        component: () => import("@/views/Account/Account.vue"),
        meta: {
          roles: [],
          title: "账号设置",
        },
      },
    ],
  },
];
export default asyncRoutes;
