<template>
  <div id="singUp">
    <form class="form-narrow form-horizontal" v-on:submit.prevent="registerNewUserAccount">
      <fieldset>
        <legend>Please Sign Up</legend>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text"
                   class="form-control"
                   id="username"
                   placeholder="Username"
                   name="username"
                   v-model="userData.username"
                   @input="$v.userData.username.$touch()"
                    />
            <small v-if="!$v.userData.username.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.username.minLength" class="form-text text-danger">Your username must be at least {{ $v.userData.password.$params.minLength.min }} characters.</small>
            <small v-if="!$v.userData.username.maxLength" class="form-text text-danger">Your username must contain a maximum of {{ $v.userData.password.$params.maxLength.max  }} characters.</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text"
                   class="form-control"
                   id="firstName"
                   placeholder="First Name"
                   name="firstName"
                   v-model="userData.firstName"
                   @input="$v.userData.firstName.$touch()"
            />
            <small v-if="!$v.userData.firstName.maxLength" class="form-text text-danger">Your first name must contain a maximum of {{ $v.userData.firstName.$params.maxLength.max  }} characters.</small>
            <small v-if="!$v.userData.firstName.required" class="form-text text-danger">This field is required...</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="text"
                   class="form-control"
                   id="lastName"
                   placeholder="Last Name"
                   name="lastName"
                   v-model="userData.lastName"
                   @input="$v.userData.lastName.$touch()"
            />
            <small v-if="!$v.userData.lastName.maxLength" class="form-text text-danger">Your first name must contain a maximum of {{ $v.userData.lastName.$params.maxLength.max  }} characters.</small>
            <small v-if="!$v.userData.lastName.required" class="form-text text-danger">This field is required...</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input
                   v-model="$v.userData.email.$model"
                   type="email"
                   class="form-control"
                   id="inputEmail"
                   placeholder="Email"
                   name="email"
                   @input="$v.userData.email.$touch()"
            />
            <small v-if="!$v.userData.email.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.email.email" class="form-text text-danger">Please enter a valid e-mail address</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input type="password"
                   class="form-control"
                   id="inputPassword"
                   placeholder="Password"
                   name="password"
                   v-model="$v.userData.password.$model"
                   @input="$v.userData.password.$touch()"
            />
            <small v-if="!$v.userData.password.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.password.minLength" class="form-text text-danger">Your password must be at least {{ $v.userData.password.$params.minLength.min }} characters.</small>
            <small v-if="!$v.userData.password.maxLength" class="form-text text-danger">Your password name must contain a maximum of {{ $v.userData.password.$params.maxLength.max  }} characters.</small>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10">
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              v-model="$v.userData.confirmPassword.$model"
              @input="$v.userData.confirmPassword.$touch()"
            />
            <small v-if="!$v.userData.confirmPassword.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.confirmPassword.minLength" class="form-text text-danger">Your confirmPassword must be at least {{ $v.userData.password.$params.minLength.min }} characters.</small>
            <small v-if="!$v.userData.confirmPassword.maxLength" class="form-text text-danger">Your confirmPassword name must contain a maximum of {{ $v.userData.password.$params.maxLength.max }} characters.</small>
            <small v-if="!$v.userData.confirmPassword.sameAs" class="form-text text-danger">The passwords you entered did not match. Try again.</small>
          </div>
        </div>

        <div class="form-group">
          <div class="col-lg-10" style="display: inline">
            <button type="submit" class="btn btn-default" :disabled="$v.$invalid">Sign Up</button>
            <router-link to="/"  class="btn btn-default">Cancel</router-link>
          </div>
        </div>
      </fieldset>
    </form>

  </div>


</template>

<script>
import axios from "axios"
import {required, minLength, maxLength, sameAs, email} from "vuelidate/lib/validators"
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
Vue.use(VueToast);

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
    registerNewUserAccount() {
      axios.post(this.$store.getters.getApiAddress + "/registerNewUserAccount" , this.userData)
        .then(response =>{
          if(response.data === 201){
            this.$store.dispatch("showMessage", {...response, msg : "User sign up successful!", type : "success"  });
            setTimeout( () => this.$router.push("/"), 2000);
          }
          else if(response.data === 409)
            this.$store.dispatch("showMessage", {...response, msg : "This username is taken. Please try another one!", type : "warning"  });
          else
            this.$store.dispatch("showMessage", {...response, msg : "System error!", type : "error"  });
        }).catch( error  =>{
          if(error.status === 500)
            this.$store.dispatch("showMessage", {...error, msg : "Internal Server Error!", type : "error"  });
          else if(error.status === 400)
            this.$store.dispatch("showMessage", {...error, msg : "Validation Error!", type : "error" });
          else
            this.$store.dispatch("showMessage", {...error, msg : "System error!", type : "error"  });
      })
    }
  },
  validations : {
    userData : {
      username : {
        required,
        minLength : minLength(4),
        maxLength : maxLength(40)
      },
      firstName:  {
        required,
        minLength : minLength(1),
        maxLength : maxLength(40)
      },
      lastName:  {
        required,
        minLength : minLength(1),
        maxLength : maxLength(40)
      },
      email : {
        required,
        email
      },
      password : {
        required,
        minLength : minLength(4),
        maxLength : maxLength(40)
      },
      confirmPassword : {
        required,
        minLength : minLength(4),
        maxLength : maxLength(40),
        sameAs : sameAs("password")
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
