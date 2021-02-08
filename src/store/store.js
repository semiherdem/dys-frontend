import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
import {router} from "../router/router";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(Vuex)
Vue.use(VueToast)

const store = new Vuex.Store({
  state : {
    apiAddress : "http://localhost:8081",
    token :  "",
    showHeader : true
  },
  mutations : {
    setToken(state, token){
      state.token = token;
    },
    clearToken(state, token){
      state.token = "";
    },
    setHeaderVisibility(state, value){
      state.showHeader = value;
    }
  },
  actions : {
    initAuth( {commit, dispatch} ) {
      let token = localStorage.getItem("token");
      /*if(token){
        commit("setToken", token);
        router.push("/");
      }
      else{
        router.push("/auth/login");
        return false;
      }*/
      commit("setToken", token);
    },
    login({commit}, userData, ) {
      localStorage.removeItem("token");
      let authUrl = this.state.apiAddress + "/token";

      return new Promise((resolve, reject) => {
        axios.post(authUrl, userData)
          .then((response) => {
            commit("setToken" , response.data);
            localStorage.setItem("token", response.data);
            resolve(response)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    logout({commit, dispatch, state}){
      let authUrl = this.state.apiAddress + "/logout";
      return axios.post(authUrl)
        .then(response =>{
          commit("clearToken");
          localStorage.removeItem("token");
        }).catch( ()=>{

        })
    },
    showMessage({commit, dispatch, state}, err){
      Vue.$toast.open({
        message: err.msg,
        type: err.type,
        position: "top-right"
        // all of other options may go here
      });
    }
  },
  getters : {
    isAuthenticated(state) {
      if(state.token !== "")
        return true;
      else
        return false;
    },
    getHeaderVisibility(state){
      return state.showHeader;
    },
    getApiAddress(state){
      return state.apiAddress;
    }
}
})


export default store
