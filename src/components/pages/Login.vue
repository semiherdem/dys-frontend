<template>
  <div id="login">
    <form class="form-narrow form-horizontal"  v-on:submit.prevent="onSubmit">
      <fieldset>
        <legend>Please Sign In</legend>
        <div class="form-group">
          <label for="inputEmail" class="col-lg-2 control-label">Email</label>
          <div class="col-lg-10">
            <input type="text" class="form-control" id="inputEmail" placeholder="Email" name="username" v-model="userData.username" />
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword" class="col-lg-2 control-label">Password</label>
          <div class="col-lg-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password" v-model="userData.password" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-offset-2 col-lg-10">
            <button type="submit" class="btn btn-default">Sign in</button>
            <router-link to="/ class="btn btn-default">Cancel</router-link>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-offset-2 col-lg-10">
            <p>New here? <router-link to="/create-account">Sign Up</router-link></p>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import store from "../../store/store";

export default {
  data() {
    return {
      userData : {
        username : '',
        password : '',
        token : ''
      }
    }
  },
  methods : {
    onSubmit() {
      this.$store.dispatch("login", this.userData)
        .then(response =>{
          this.$router.push("/index");
        }).catch(function (error) {
          alert("hata");
      })
    },
    toggleNavbar () {
      document.body.classList.toggle('nav-open')
    },
    closeMenu () {
      document.body.classList.remove('nav-open')
      document.body.classList.remove('off-canvas-sidebar')
    },
    mounted() {
      // if back button is pressed
      window.onpopstate = function(event) {
        alert("deneme");
        //this.$store.commit('setHeaderVisibility', true);
      };
    }
  }
}
</script>

<style>
body {
  padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-narrow {
  max-width: 490px;
  padding: 19px 29px 29px;
  margin: 0 auto 20px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
  -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
  box-shadow: 0 1px 2px rgba(0,0,0,.05);
}

</style>
