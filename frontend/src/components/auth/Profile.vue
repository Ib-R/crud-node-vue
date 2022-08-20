<template>
  <v-card class="mx-auto mt-4" max-width="400">
    <v-card-text class="pb-0">
      <div>Username</div>
      <p class="display-1 text--primary">{{name}}</p>
      <p>Details</p>
      <div class="text--primary">
        <p class="subtitle-1">Email: {{email}}</p>
        <p class="subtitle-1">Role: {{role}}</p>
      </div>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn @click="logout" text color="red">
        <v-icon>mdi-account-arrow-right</v-icon>Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile",
  data: function() {
    return {
      name: null,
      email: null,
      role: null
    };
  },
  created: async function() {
    let res = await fetch(`${process.env.VUE_APP_API_URL}v1/auth/current`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    res = await res.json();
    if (res.data) {
      this.name = res.data.name;
      this.email = res.data.email;
      this.role = res.data.role;
    }
  },
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["token"])
  }
};
</script>