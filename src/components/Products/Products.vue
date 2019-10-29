<template>
  <div>
    <div class="row text-center">
      <div v-for="product in products" v-bind:key="product.id" class="col-lg-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h2>{{ product.name.toUpperCase() }}</h2>
          </div>
          <div class="panel-body">
            <h1>{{ product.startingPoint.toFixed(2) }}kr</h1>
          </div>
          <div v-show="loggedIn" class="panel-footer">
            <button
              v-on:click="buyStock(product.name, product.startingPoint)"
              class="btn btn-lg btn-success"
            >KÖP</button>
            <button
              v-on:click.prevent="sellStock(product.name, product.startingPoint)"
              class="btn btn-lg btn-danger"
            >SÄLJ</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <canvas id="cakeChart"></canvas>
      </div>
      <div class="col-md-4">
        <canvas id="almondChart"></canvas>
      </div>
      <div class="col-md-4">
        <canvas id="cookieChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import Chart from "chart.js";
/*eslint no-console: ["error", { allow: ["log", "info", "error"] }] */
export default {
  name: "products",
  components: {},
  data() {
    return {
      socket: io("https://proj-socket.frbr18-jsramverk.me"),
      products: [],
      chartData: {
        cake: {
          name: "tårta",
          data: []
        },
        cookie: {
          name: "kaka",
          data: []
        },
        almond: {
          name: "mandel",
          data: []
        }
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.token;
    }
  },
  methods: {
    listen() {
      this.socket.on("connect", function() {
        console.info("Connected");
      });

      this.socket.on("disconnect", function() {
        console.info("Disconnected");
      });

      this.socket.on("stocks", message => {
        this.products = message;
        message.forEach(product => {
          if (product.name == "tårta") {
            this.chartData.cake.data.push({
              x: new Date(),
              y: product.startingPoint
            });
          } else if (product.name == "kaka") {
            this.chartData.cookie.data.push({
              x: new Date(),
              y: product.startingPoint
            });
          } else if (product.name == "mandel") {
            this.chartData.almond.data.push({
              x: new Date(),
              y: product.startingPoint
            });
          }
        });
        this.createCharts();
      });
    },
    buyStock(product, cost) {
      const owner = this.$store.state.user.user;
      const url = this.$store.state.baseURL + "/products/buy";
      const newMoney = this.$store.state.user.money - cost;
      axios
        .post(url, {
          owner: owner,
          product: product,
          newMoney: newMoney
        })
        .then(() => (this.$store.state.user.money = newMoney))
        .catch(err => console.log(err));
    },
    sellStock(product, cost) {
      const owner = this.$store.state.user.user;
      const url = this.$store.state.baseURL + "/products/sell";
      const newMoney = this.$store.state.user.money + cost;
      axios
        .post(url, {
          owner: owner,
          product: product,
          newMoney: newMoney
        })
        .then(() => (this.$store.state.user.money = newMoney))
        .catch(err => console.log(err));
    },
    createChart(chartName, data, name) {
      var ctx = document.getElementById(chartName).getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              label: name,
              data: data,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "minute"
                }
              }
            ]
          }
        }
      });
    },
    createCharts() {
      this.createChart("cakeChart", this.chartData.cake.data, "Tårta pris");
      this.createChart("cookieChart", this.chartData.cookie.data, "Kaka pris");
      this.createChart(
        "almondChart",
        this.chartData.almond.data,
        "Mandel pris"
      );
    }
  },
  mounted() {
    const url = this.$store.state.baseURL + "/products";
    axios.get(url).then(res => (this.products = res.data));
    //Draw the charts
    this.createCharts();
    this.listen();
  }
};
</script>

<style scoped>
.btn {
  margin-left: 20px;
  margin-right: 20px;
  min-width: 100px;
}
</style>