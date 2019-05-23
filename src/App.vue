<template>
  <div id="app">
    <div class="container-fluid app-container">
      <Header></Header>
      <div class="content">
        <div class="content-container">
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
                    <span>{{selectedRegion}}</span>
                    <select
                      v-model="selectedRegion"
                      class="form-control"
                      id="regionSelect"
                    >
                      <option
                        v-for="region in filteredRegions"
                        v-bind:key="region.id"
                      >{{ region }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="container countries-container">
            <div class="row country-row row-eq-height justify-content-center">
              <div
                v-for="country in initialCountries(currentPage, elementsInPage)"
                v-bind:key="country.id"
                class="col-lg-3 col-sm-4"
              >
                <Country :data="country"></Country>
              </div>
              <button v-on:click="loadMore()" class="btn btn-success load-more-button">Load More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Country from "./components/Country.vue";
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
      countries: [],
      currentPage: 0,
      elementsInPage: 8,
      availableRegions: [],
      selectedRegion: " "
    };
  },

  computed: {
    filteredRegions: function () {
      return [...new Set(this.countries.map(i => i.region))]
    }
  },

  methods: {
    initialCountries(pageNumber, requestedPages) {
      let itemsPerPage = requestedPages;
      return this.countries.slice(itemsPerPage * pageNumber, itemsPerPage);
    },

    loadMore() {
      return (this.elementsInPage += 12);
    },

  },

  

  mounted() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => (this.countries = response.data));
  }
};
</script>

<style lang="scss">
@import "../src/styles/style.scss";
</style>