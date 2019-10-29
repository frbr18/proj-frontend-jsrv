<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">
          <span class="glyphicon glyphicon-piggy-bank"></span>
        </router-link>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li>
            <router-link to="products">Produkter</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-show="!isUserLoggedIn">
            <router-link to="/register">
              <span class="glyphicon glyphicon-user"></span>Registrera
            </router-link>
          </li>
          <li v-show="isUserLoggedIn">
            <router-link to="/account">
              <span class="glyphicon glyphicon-shopping-cart"></span>Konto
            </router-link>
          </li>
          <li v-show="!isUserLoggedIn">
            <router-link to="/login">
              <span class="glyphicon glyphicon-log-in"></span>Logga in
            </router-link>
          </li>
          <li v-show="isUserLoggedIn">
            <router-link v-on:click.native="logOut" to="/products">
              <span class="glyphicon glyphicon-log-out"></span>Logga ut
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  /*eslint no-console: ["error", { allow: ["log", "error"] }] */
  name: "navbar",
  computed: {
    isUserLoggedIn() {
      return this.$store.state.user.token;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("cleanUser");
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 50px;
  border-radius: 0;
  font-size: 20px;
}

.glyphicon {
  margin-right: 10px;
}
</style>