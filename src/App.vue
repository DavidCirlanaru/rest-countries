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
                      v-model="search"
                    >
                  </div>

                  <div
                    class="col-lg-2 col-md-6 col-sm-6 col-xs-12 text-right align-items-end filter-column"
                  >
                    <span>{{selectedRegion}}</span>
                    <select v-model="selectedRegion" class="form-control" id="regionSelect">
                      <option v-for="region in filteredRegions" v-bind:key="region.id">{{ region }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="container countries-container">
            <div class="row country-row row-eq-height justify-content-center">
              <div
                v-for="country in displayCountries"
                v-bind:key="country.id"
                class="col-lg-3 col-sm-4"
              >
                <Country :data="country"></Country>
              </div>
              <button v-if="storeCountries.length > (currentView + elementsInPage)" v-on:click="loadMore()" class="btn btn-success load-more-button">Load More</button>
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
      storeCountries: [],
      displayCountries: [],
      elementsInPage: 8,
      currentView: 0,
      availableRegions: [],
      selectedRegion: "",
      search: ""
    };
  },

  computed: {
    filteredRegions: function() {
      return [...new Set(this.storeCountries.map(i => i.region))];
    },

    searchResults: function() {
      return this.storeCountries.filter((country) => {
        return country.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  methods: {
    renderCountries() {
      this.displayCountries = this.storeCountries.slice(0, (this.currentView + this.elementsInPage));
    },

    loadMore() {
      this.currentView += this.elementsInPage;
      this.renderCountries()
    },

    filterEmptySpaces(array) {
      array.filter(function(el) {
        return el != null && el != "";
      });
    },

    cloneCountries() {
      this.currentView = 0;
      this.storeCountries = Object.assign([], this.countries);
    },
  },

  watch: {
    search: function() {
      this.cloneCountries();
      this.storeCountries = this.searchResults;
      this.renderCountries();
    }
  },

  beforeMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        this.countries = response.data;
        
        this.cloneCountries();
        this.renderCountries();
      });
  }
};
</script>

<style lang="scss">
@import "../src/styles/style.scss";
</style>