import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../components/pages/HomePage";
import SignUp from "../components/pages/SignUp";
import Login from "../components/pages/Login";
import store from "../store/store";
import MainPage from "../components/pages/MainPage";

Vue.use(VueRouter)

export const router  = new VueRouter({
  routes: [
    {
        path : "/auth/login" ,
        component : Login,
    },
    {
        path : "/" ,
        component : HomePage,
        beforeEnter(to, from, next) {
          if(store.getters.isAuthenticated)
            next("/index");
          else
            next("/");
        }
    },
    {
      path : "/index" ,
      component : MainPage,
      beforeEnter(to, from, next) {
        if(store.getters.isAuthenticated)
          next(true);
        else
          next("/auth/login");
      }
    },
    {
        path : "/create-account" ,
        component : SignUp
    },
    {
        path : "*",
        redirect : "/"
    }
  ],
  mode : "history"
})
