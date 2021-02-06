<template>
  <div id="login">
    <form class="form-narrow form-horizontal"  v-on:submit.prevent="onSubmit">
      <fieldset>
        <legend>Please Sign In</legend>
        <div class="form-group">
          <label for="inputUsername" class="col-lg-2 control-label">Username</label>
          <div class="col-lg-10">
            <input type="text"
                   class="form-control"
                   id="inputUsername"
                   placeholder="Username"
                   name="username"
                   v-model="userData.username"
                   @input="$v.userData.username.$touch()"
                   :class="{'is-invalid' : $v.userData.username.$error}"/>
            <small v-if="!$v.userData.username.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.username.minLength" class="form-text text-danger">Your username must be at least {{ $v.userData.password.$params.minLength.min }} characters.</small>
            <small v-if="!$v.userData.username.maxLength" class="form-text text-danger">Your username must contain a maximum of {{ $v.userData.password.$params.maxLength.max  }} characters.</small>
          </div>

        </div>
        <div class="form-group">
          <label for="inputPassword" class="col-lg-2 control-label">Password</label>
          <div class="col-lg-10">
            <input type="password"
                   class="form-control"
                   id="inputPassword"
                   placeholder="Password"
                   name="password"
                   v-model="userData.password"
                   @input="$v.userData.password.$touch()"
                   :class="{'is-invalid' : $v.userData.password.$error}"/>
            <small v-if="!$v.userData.password.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.password.minLength" class="form-text text-danger">Your password must be at least {{ $v.userData.password.$params.minLength.min }} characters.</small>
            <small v-if="!$v.userData.password.maxLength" class="form-text text-danger">Your password must contain a maximum of {{ $v.userData.password.$params.maxLength.max  }} characters.</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-offset-2 col-lg-10">
            <button type="submit" class="btn btn-default" :disabled="$v.$invalid">Sign in</button>
            <router-link to="/" class="btn btn-default">Cancel</router-link>
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
import {required, minLength, maxLength, email} from "vuelidate/lib/validators"
import Vue from "vue";

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
      this.$store.dispatch('login', this.userData).then((p) => {
        this.$router.push("/index");
      })
      .catch((response) => {
        Vue.$toast.open({
          message: 'System error!',
          type: 'error',
          position: 'top-right'
          // all of other options may go here
        });
      })
    }
  },
  validations : {
    userData : {
      username : {
        required,
        minLength : minLength(4),
        maxLength : maxLength(50)
      },
      password : {
        required,
        minLength : minLength(4),
        maxLength : maxLength(20)
      }
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



