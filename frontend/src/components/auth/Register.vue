<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="7">
        <v-alert color="red" v-show="error">{{error}}</v-alert>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Register form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="[rules.required]"
                name="name"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                label="Email"
                v-model="email"
                :rules="[rules.required, rules.email]"
                name="login"
                prepend-icon="mdi-email"
                type="email"
              />
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :rules="[rules.required, rules.password]"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-card-text>
            <v-select
              id="role"
              class="mx-4"
              v-model="role"
              label="Role"
              :items="roles"
              :rules="[rules.required]"
              prepend-icon="mdi-account-alert"
              outlined
            ></v-select>
            <v-card-actions>
              <v-spacer />
              <v-btn @click.prevent="submit" type="submit" class="px-5" color="primary">Resgiter</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => {
    return {
      name: null,
      email: null,
      password: null,
      role: "user",
      roles: ["publisher", "user"],
      rules: {
        required: value => !!value || "Required.",
        password: value =>
          (value && value.length >= 6) || "Password must be at least 6",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      error: null,
      res: null
    };
  },
  methods: {
    submit: async function() {
      let body = JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role
      });

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        redirect: "follow"
      };

      const response = await fetch(
        `${process.env.VUE_APP_API_URL}v1/auth/register`,
        requestOptions
      );
      this.res = await response.json();
    }
  },
  watch: {
    res: function(val) {
      // Handling the response
      if (val.error) {
        this.error = val.error;
      }
      if (val.success && val.token) {
        this.$store.commit("storeToken", val.token);
        this.$router.push("/");
      }
    }
  }
};
</script>