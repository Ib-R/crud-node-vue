<template>
  <div class="d-flex flex-column mx-12">
    <v-btn to="companies/create" class="mt-4" v-show="this.$store.getters.isAuthenticated">
      <span class="mr-2">Add New</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-alert v-show="error" class="mt-5" type="error">{{error}}</v-alert>

    <v-card v-show="!error" v-for="company in companies" :key="company.id" class="mx-auto mt-4">
      <v-card-text class="pb-0">
        <div>Company</div>
        <p class="display-1 text--primary">{{company.name}}</p>
        <p>Details</p>
        <div class="text--primary">
          <h2 class="title">Descreption:</h2>
          <p class="subtitle-1">{{company.desc}}</p>
          <h2 class="title">Address:</h2>
          <p class="subtitle-1">{{company.address}}</p>
        </div>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
          :to="{name:'ShowCompany', params:{id: company.id}}"
          text
          color="blue accent-4"
        >More...</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CompaniesIndex",
  data: function() {
    return {
      companies: [],
      error: null
    };
  },
  created: async function() {
    try {
      let res = await fetch(`${process.env.VUE_APP_API_URL}v1/companies`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      res = await res.json();
      if (res.data) {
        this.companies = res.data;
      }
    } catch (error) {
      this.error = "Unexpected error, Please try again later";
    }
  }
};
</script>