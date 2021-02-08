<template>
  <div id="login">
    <form class="form-narrow form-horizontal"  v-on:submit.prevent="onSubmit">
      <fieldset>
        <legend>Please Sign In</legend>
        <div class="form-group">
          <label for="inputEmail" class="col-lg-2 control-label">Email</label>
          <div class="col-lg-10">
            <input type="text"
                   class="form-control"
                   id="inputEmail"
                   placeholder="E-mail"
                   name="email"
                   v-model="userData.email"
                   @input="$v.userData.email.$touch()"
                   :class="{'is-invalid' : $v.userData.email.$error}"/>
            <small v-if="!$v.userData.email.required" class="form-text text-danger">This field is required...</small>
            <small v-if="!$v.userData.email.email" class="form-text text-danger">Please enter a valid e-mail address</small>
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
        email : '',
        password : '',
        token : ''
      }
    }
  },
  methods : {
    onSubmit() {
      this.$store.dispatch("login", this.userData).then((response) => {
        this.$store.dispatch("showMessage", {...response, msg : "User sign up successful!", type : "success"  });
        setTimeout( () => this.$router.push("/index"), 2000);
      })
      .catch((error) => {
        console.log(error);
        if(error.status === 401)
          this.$store.dispatch("showMessage", {...error, msg : "Invalid Username and Password!", type : "error" });
        else if(error.status === 500)
            this.$store.dispatch("showMessage", {...error, msg : "Internal Server Error!", type : "error" });
        else if(error.status === 400)
          this.$store.dispatch("showMessage", {...error, msg : "Validation Error!", type : "error" });
        else
          this.$store.dispatch("showMessage", {...error, msg : "System Error!", type : "error" });
      })
    }
  },
  validations : {
    userData : {
      email : {
        required,
        email
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



