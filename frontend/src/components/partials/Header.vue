<template>
  <v-app-bar app clipped-left color="primary" dark>
    <v-app-bar-nav-icon @click.stop="toggleStoreDrawer" />
    <v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1 class="display-1">CRUD</h1>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-show="!this.$store.getters.isAuthenticated" class="mr-1" to="login">
      <span class="mr-2">Login</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn v-show="!this.$store.getters.isAuthenticated" to="register">
      <span class="mr-2">Register</span>
      <v-icon>mdi-clipboard-text-multiple</v-icon>
    </v-btn>
    <v-btn v-show="this.$store.getters.isAuthenticated" to="profile">
      <span class="mr-2">Profile</span>
      <v-icon>mdi-clipboard-text-multiple</v-icon>
    </v-btn>
    <v-btn v-show="this.$store.getters.isAuthenticated" @click="logout">
      <span class="mr-2">Logout</span>
      <v-icon>mdi-account-arrow-right</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({}),
  methods: {
    toggleStoreDrawer: function() {
      this.$store.commit("toggleDrawer");
    },
    ...mapActions([
      'logout'
    ])
  }
};
</script>