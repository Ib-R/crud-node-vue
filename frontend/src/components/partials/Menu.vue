<template>
  <v-navigation-drawer :value="drawer" app clipped :mobile-break-point="900">
    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/companies">
        <v-list-item-action>
          <v-icon>mdi-office-building</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Companies</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    drawer() {
      return this.$store.state.drawer;
    }
  },
  methods: {
    toggleStoreDrawer: function() {
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>