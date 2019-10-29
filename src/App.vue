<template>
  <div id="app">
    <Header />
    <Navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Layout/Navbar";
import Header from "./components/Layout/Header";

export default {
  name: "app",
  components: {
    Navbar,
    Header
  }
};
</script>

<style scoped>
.jumbotron {
  margin-bottom: 0;
}
</style>
