import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";
import {router} from "../router/router";

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    api : "http://localhost:8081",
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
    login({commit, dispatch, state}, authData){
      console.log(authData);
      let authUrl = this.state.api + "/token";
      return axios.post(authUrl , authData)
        .then(function (response) {
          commit("setToken" , response.data);
          localStorage.setItem("token", response.data);
        }).catch(()=>{

      })
    },
    logout({commit, dispatch, state}){
      let authUrl = this.state.api + "/logout";
      return axios.post(authUrl)
        .then(response =>{
          commit("clearToken");
          localStorage.removeItem("token");
        }).catch( ()=>{

        })

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
    }
}
})


export default store
