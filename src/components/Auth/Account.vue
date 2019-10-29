<template>
  <div class="text-center">
    <h1>Dina aktieandelar.</h1>
    <div class="row">
      <div class="col-md-3" v-for="stock in stocks" v-bind:key="stock.id">
        <div class="panel panel-primary">
          <div class="panel-body">
            <h1>{{ stock.product.toUpperCase() }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="form-group">
          <label>Fyll på saldo:</label>
          <input v-model="addMoney" class="form-control input-lg" type="number" />
          <button v-on:click.prevent="addSaldo" class="btn btn-lg btn-primary">Fyll på</button>
        </div>
      </div>
      <div class="col-md-4"></div>
    </div>
    <h2>Ditt saldo: {{ parseFloat(userMoney).toFixed(2) }}kr</h2>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import axios from "axios";
export default {
  name: "account",
  data() {
    return {
      stocks: [],
      addMoney: 0
    };
  },
  computed: {
    userMoney() {
      return this.$store.state.user.money;
    }
  },
  mounted() {
    const url = this.$store.state.baseURL + "/products/stocks";
    const owner = this.$store.state.user.user;
    axios
      .post(url, {
        owner: owner
      })
      .then(res => (this.stocks = res.data))
      .catch(err => console.log(err));
  },
  methods: {
    addSaldo() {
      const money = this.$store.state.user.money;
      const owner = this.$store.state.user.user;
      const addMoney = this.addMoney;
      const url = this.$store.state.baseURL + "/auth/addmoney";
      const newMoney = this.$store.state.user.money + parseInt(this.addMoney);
      axios
        .post(url, {
          money: money,
          email: owner,
          addMoney: parseInt(addMoney)
        })
        .then(() => (this.$store.state.user.money = newMoney))
        .catch(err => console.log(err));
      this.addMoney = 0;
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>