<template>
  <div class="mx-12">
    <v-card v-if="!error" class="mx-auto mt-4">
      <v-card-text>
        <div>Company</div>
        <p class="display-1 text--primary">{{name}}</p>
        <p>Details</p>
        <div class="text--primary">
          <h2 class="title">Descreption:</h2>
          <p class="subtitle-1">{{desc}}</p>
          <h2 class="title">Address:</h2>
          <p class="subtitle-1">{{address}}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="updateCompany" class="text-left" text color="green">update</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="deleteCompany" class="text-right" text color="red">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-alert v-show="error" class="mt-5" type="error">{{error}}</v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CompaniesShow",
  data: function() {
    return {
      id: null,
      name: null,
      desc: null,
      address: null,
      error: null
    };
  },
  created: async function() {
    let res = await fetch(
      `${process.env.VUE_APP_API_URL}v1/companies/${this.$route.params.id}`,
      {
        headers: { Authorization: `Bearer ${this.token}` }
      }
    );
    res = await res.json();
    if (res.data) {
      this.id = res.data.id;
      this.name = res.data.name;
      this.desc = res.data.desc;
      this.address = res.data.address;
    } else if (res.error) {
      this.error = res.error;
    }
  },
  methods: {
    deleteCompany: function() {
      fetch(
        `${process.env.VUE_APP_API_URL}v1/companies/${this.$route.params.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${this.token}` }
        }
      );
      this.$router.push("/companies");
    },
    updateCompany: function() {
      this.$router.push(`/companies/update/${this.$route.params.id}`);
    }
  },
  computed: {
    ...mapGetters(["token"])
  }
};
</script>