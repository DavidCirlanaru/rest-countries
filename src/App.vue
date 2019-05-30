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
                      v-model="searchByName"
                    >
                  </div>

                  <div
                    class="col-lg-2 col-md-6 col-sm-6 col-xs-12 text-right align-items-end filter-column"
                  >
                    <select v-model="selectedRegion" class="form-control" id="regionSelect">
                      <option value disabled selected>Select a region</option>
                      <option v-for="region in filteredRegions" v-bind:key="region.id">{{ region }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="container countries-container">
            
            <div class="row country-row row-eq-height justify-content-start">
              <div
                v-for="country in displayCountries"
                v-bind:key="country.id"
                class="col-lg-3 col-sm-4"
              >
                <Country :data="country"></Country>
              </div>
            </div>
            <div class="row justify-content-center"> 
                <button
                class="btn btn-success load-more-button"
                v-if="storeCountries.length > (currentView + elementsInPage)"
                v-on:click="loadMore()"
              >Load More</button>
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
      selectedRegion: "",
      availableRegions: "",
      searchByName: ""
    };
  },

  computed: {
    //Returning an array of unique regions and removing empty strings
    filteredRegions: function() {
      return [...new Set(this.storeCountries.map(i => i.region))].filter(
        function(el) {
          return el != "";
        }
      );
    },

    matchingRegions: function() {
      return this.availableRegions.filter(match => {
        return match.region.includes(this.selectedRegion);
      });
    },

    searchResults: function() {
      return this.storeCountries.filter(country => {
        return country.name
          .toLowerCase()
          .includes(this.searchByName.toLowerCase());
      });
    }
  },

  methods: {
    //Rendering only 8 countries on the page at first
    renderCountries() {
      this.displayCountries = this.storeCountries.slice(
        0,
        this.currentView + this.elementsInPage
      );
    },

    loadMore() {
      this.currentView += this.elementsInPage;
      this.renderCountries();
    },

    //Duplicating the data recieved from the API
    cloneCountries() {
      this.currentView = 0;
      this.storeCountries = Object.assign([], this.countries);
    }
  },

  watch: {
    searchByName: function() {
      this.cloneCountries();
      this.storeCountries = this.searchResults;
      this.renderCountries();
    },

    selectedRegion: function() {
      this.availableRegions = Object.assign([], this.countries);
      this.displayCountries = this.matchingRegions;
    }
  },

  beforeMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.countries = response.data;

      //Duplicating the data as soon as we recieve it
      this.cloneCountries();
      //Rendering only 8 elements from the duplicated object.
      this.renderCountries();
    });
  }
};
</script>

<style lang="scss">
@import "../src/styles/style.scss";
</style>