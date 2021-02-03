<template>
  <div>
    <app-header v-if="show"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import store from "./store/store";

export default {
  components : {
    appHeader : Header,
    appFooter : Footer
  },
  data() {
    return {
      show : true
    }
  },
  methods : {
    showHeader() {
      return this.$store.getters.getHeaderVisibility;
    }
  },
  beforeUpdate() {
    if(this.$route.path == "/auth/login" || this.$route.path == "/create-account"){
      this.show = false;
    }
    else{
      this.show = true;
    }
  }
}
</script>

<style>
</style>
