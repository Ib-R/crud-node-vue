<template>
  <v-app>
    <Header />
    <Menu />
    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<style lang="css" scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
import Header from "./components/partials/Header";
import Menu from "./components/partials/Menu";

export default {
  name: "App",

  components: {
    Header,
    Menu
  },
  created() {
    this.$vuetify.theme.dark = true;
  },

  data: () => ({
    //
  })
};
</script>
