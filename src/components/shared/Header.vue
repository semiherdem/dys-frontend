<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <!--div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">My project</a>
        </div-->
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li >
              <router-link to="/" v-if="this.$store.getters.isAuthenticated">
                Home
              </router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/auth/login" v-if="!this.$store.getters.isAuthenticated" >
                <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>&nbsp;Login
              </router-link>
            </li>
            <li>
              <router-link to="/create-account" v-if="!this.$store.getters.isAuthenticated">
                <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>&nbsp;Sign up
              </router-link>
            </li>
            <li>
              <router-link to="/logout" v-if="this.$store.getters.isAuthenticated">
                <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span>&nbsp;Logout
              </router-link>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods : {
    logout() {
      this.$store.dispatch("logout")
        .then(response => {
          this.$router.replace("/auth/login");
        });
    }
  },
  computed : {

  }
}
</script>

<style>
</style>
