import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { authGuard } from "./auth-guard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "texts",
        alias: "",
        name: "Texts",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@views/Texts.vue"),
      },
      {
        path: "words",
        alias: "",
        name: "Words",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@views/Words.vue"),
      },
      {
        path: "details/:id",
        alias: "/details/:id",
        name: "TextDetails",
        component: () =>
          import(
            /* webpackChunkName: "text-details" */ "@views/TextDetails.vue"
          ),
      },
      {
        path: "process/:id",
        alias: "/process/:id",
        name: "ProcessText",
        component: () =>
          import(
            /* webpackChunkName: "process-text" */ "@views/ProcessText.vue"
          ),
      },
      {
        path: "learn/:id",
        alias: "/learn/:id",
        name: "Learn",
        component: () =>
          import(/* webpackChunkName: "learn-text" */ "@views/Learn.vue"),
      },
      {
        path: "texts/new",
        alias: "/texts/new",
        name: "AddText",
        component: () =>
          import(/* webpackChunkName: "add-text" */ "@views/AddText.vue"),
      },
    ],
  },
];

let router;

if (!router) {
  router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
}

router.beforeEach(authGuard);

export default router;
