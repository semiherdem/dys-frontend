<template>
  <div id="singUp">
    <form class="form-narrow form-horizontal" action="#" method="post">
      <fieldset>
        <legend>Please Sign Up</legend>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text" class="form-control" id="username" placeholder="Username" name="username" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text" class="form-control" id="firstName" placeholder="First Name" name="firstName" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text" class="form-control" id="lastName" placeholder="Last Name" name="lastName" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text" class="form-control" id="inputEmail" placeholder="Email" name="email" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password" />
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" name="confirmPassword" />
          </div>
        </div>

        <div class="form-group">
          <div class="col-lg-10" style="display: inline">
            <button type="submit" class="btn btn-default">Sign Up</button>
            <router-link to="/"  class="btn btn-default">Cancel</router-link>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      userData : {
        username : "",
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : ""
      }
    }
  },
  methods : {
    onSubmit() {
      axios.post("" , this.user)
        .then(response =>{

        }).catch( ()=>{

      })
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
