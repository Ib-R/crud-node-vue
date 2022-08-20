<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="7">
        <v-alert color="red" v-show="error">{{error}}</v-alert>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
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
                :rules="[rules.required]"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click.prevent="submit" type="submit" class="px-5" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      email: null,
      password: null,
      rules: {
        required: value => !!value || "Required.",
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
        email: this.email,
        password: this.password
      });

      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        redirect: "follow"
      };

      const response = await fetch(
        `${process.env.VUE_APP_API_URL}v1/auth/login`,
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
        this.$store.dispatch("login", val.token);
        this.$router.push("/");
      }
    }
  }
};
</script>