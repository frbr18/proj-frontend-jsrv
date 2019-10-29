<template>
  <div class="row text-center">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <h1>Logga in</h1>
      <form>
        <div class="form-group-lg">
          <h3 for="email" class="control-label">Email</h3>
          <input
            v-model="userName"
            type="email"
            class="form-control text-center"
            placeholder="Skriv in email..."
          />
        </div>
        <div class="form-group-lg">
          <h3 for="pwd">Lösenord</h3>
          <input
            v-model="password"
            type="password"
            class="form-control text-center"
            placeholder="Skriv in lösenord..."
          />
        </div>
        <button v-on:click.prevent="loginUser" class="btn btn-lg btn-success">Logga in</button>
      </form>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",
      errors: []
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.user.token;
    }
  },
  methods: {
    loginUser: async function() {
      /*eslint no-console: ["error", { allow: ["log", "error"] }] */
      const userName = this.userName;
      const password = this.password;
      const url = this.$store.state.baseURL + "/auth/login";
      if (!userName) {
        this.errors.push("Skriv in ditt email.");
      }
      if (!password) {
        this.errors.push("Skriv in ditt lösenord.");
      }
      if (!this.errors.length) {
        await axios
          .post(url, {
            email: userName,
            password: password
          })
          .then(res => this.$store.dispatch("setUser", res.data.data))
          .catch(err => console.log(err));
        this.$router.push("/account");
      }
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>