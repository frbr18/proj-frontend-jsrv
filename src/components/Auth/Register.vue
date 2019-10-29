<template>
  <div class="row">
    <div class="col-lg-4"></div>
    <div class="col-lg-4 text-center">
      <p v-if="errors.length">
        <b>Rätta dess fel.</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
      <form>
        <div class="form-group-lg">
          <h1 for="name" class="control-label">Namn</h1>
          <input v-model="name" type="text" class="form-control text-center" placeholder="Namn..." />
        </div>
        <div class="form-group-lg">
          <h1 class="control-label">Email</h1>
          <input
            v-model="email"
            type="email"
            class="form-control text-center"
            placeholder="Email..."
          />
        </div>
        <div class="form-group-lg">
          <h1 class="control-label">Lösenord</h1>
          <input
            v-model="password"
            type="password"
            class="form-control text-center"
            placeholder="Lösenord..."
          />
        </div>
        <div class="form-group-lg">
          <h1 class="control-label">Lösenord igen</h1>
          <input
            v-model="passwordAgain"
            type="password"
            class="form-control text-center"
            placeholder="Lösenordet igen..."
          />
        </div>
        <div class="checkbox">
          <label for="gdpr">
            <input v-model="gdpr" type="checkbox" /> Jag godkänner gdpr
          </label>
        </div>
        <button v-on:click.prevent="registerUser" class="btn btn-success btn-lg">Registrera</button>
      </form>
    </div>
    <div class="col-lg-4"></div>
  </div>
</template>

<script>
import axios from "axios";
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
export default {
  name: "register",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
      gdpr: "",
      errors: []
    };
  },
  methods: {
    registerUser: function() {
      this.errors = [];
      const url = this.$store.state.baseURL + "/auth/register";
      if (!this.email) {
        this.errors.push("Skriv in ett email.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Ogiltigt email.")
      }
      
      if (!this.name) {
        this.errors.push("Skriv in ett namn");
      }
      if (!this.password) {
        this.errors.push("Skriv in ett lösenord");
      }
      if (this.password != this.passwordAgain) {
        this.errors.push("Lösenorden matchar ej.");
      }
      if (!this.gdpr) {
        console.log("gdpr")
        this.errors.push("Kryssa i gdpr.");
      }
      if (!this.errors.length) {
        axios
          .post(url, {
            name: this.name,
            email: this.email,
            password: this.password
          })
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
        this.$router.push("/");
      }
    },
    validEmail: function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>