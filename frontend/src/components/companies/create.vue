<template>
  <v-form v-model="form" ref="form">
    <v-container>
      <h2>
        {{ this.$route.name == "CreateCompany" ? "Create" : "Update" }} Company
      </h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="requiredString"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="address"
            :rules="requiredString"
            label="Address"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="12">
          <v-text-field
            v-model="desc"
            :rules="requiredString"
            label="Description"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn
            :disabled="!form"
            color="success"
            class="mr-4"
            @click="this.submit"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: "",
      requiredString: [
        (v) => !!v || "Field is required",
        (v) => (v && v.length >= 5) || "Field must be more than 5 characters",
      ],
      name: "",
      desc: "",
      address: "",
    };
  },
  created: async function () {
    if (this.$route.name == "UpdateCompany") {
      let res = await fetch(
        `${process.env.VUE_APP_API_URL}v1/companies/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
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
    }
  },
  methods: {
    submit: async function () {
      let id = this.$route.params.id || ""
      let method = id ? 'PUT' : 'POST';
      let res = await fetch(
        `${process.env.VUE_APP_API_URL}v1/companies/${id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            address: this.address,
            desc: this.desc,
          }),
        }
      );
      res = await res.json();
      if (res.data) {
        alert("Submitted Successfuly");
      } else if (res.error) {
        this.error = res.error;
      }
      this.$router.push("/companies");
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
};
</script>