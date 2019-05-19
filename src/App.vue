<template>
  <div id="app">
    <div class="container-fluid app-container">
      <Header></Header>
      <div class="content">
        <div class=" content-container">
          <div id="filter-section" class="container">
            <form>
              <div class="form-group">
                <div class="row">
                  <div
                    class="col-lg-4 col-md-6 col-sm-6 col-xs-12 text-left align-items-start search-column"
                  >
                    <input
                      type="text"
                      class="form-control search-input"
                      placeholder="Search for a country.."
                    >
                  </div>

                  <div
                    class="col-lg-2 col-md-6 col-sm-6 col-xs-12 text-right align-items-end filter-column"
                  >
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Filter by Region</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="container countries-container">
              <div class="row country-row row-eq-height">
                <div v-for="country in countries" v-bind:key="country.id" class="col-lg-2 col-sm-3 col-md-4">
                  <Country :data="country"></Country>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Country from './components/Country.vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

export default {
  name: "app",
  components: {
    Header,
    Country
  },
  data() {
    return {
      countries: null
    };
  },
  mounted() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => (this.countries = response.data))
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
@import "../src/styles/style.scss";
</style>