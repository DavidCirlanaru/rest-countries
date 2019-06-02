<template>
  <div id="details" class="details">
    <!-- Back button -->
    <div class="content-container">
      <div class="container countries-container details-container">
        <div class="row back-row">
          <div class="col">
            <router-link class="back-button" to="/">
              <i class="fas fa-arrow-left"></i>Back
            </router-link>
          </div>
        </div>

        <div
          class="row country-row row-eq-height justify-content-start d-flex align-items-center"
          v-for="country in matchingCountry"
          v-bind:key="country.id"
        >
          <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
            <img class="details-image" :src="country.flag" alt=" Flag">
          </div>

          <div class="col-1"></div>

          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <h2 class="card-title details-title">{{country.name}}</h2>
            <p class="card-text">
              Native Name:
              <span class="api-data">{{country.nativeName}}</span>
            </p>
            <p class="card-text">
              Population:
              <span class="api-data">{{formatPrice(country.population)}}</span>
            </p>
            <p class="card-text">
              Region:
              <span class="api-data">{{country.region}}</span>
            </p>
            <p class="card-text">
              Sub Region:
              <span class="api-data">{{country.subregion}}</span>
            </p>
            <p class="card-text">
              Capital:
              <span class="api-data">{{country.capital}}</span>
            </p>

            <p class="card-text border-field">Border countries:</p>
              
              
              <p
                class="api-data border-countries" 
                v-for="border in bordersList(country.borders)"
                v-bind:key="border.id"
                v-on:click="formatRoute(border)"
              >{{ border }}</p>
            
          </div>

          <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <p class="card-text">
              Top Level Domain:
              <span class="api-data">{{country.topLevelDomain[0]}}</span>
            </p>
            <p class="card-text">
              Currencies:
              <span class="api-data">{{country.currencies[0].name}}</span>
            </p>
            <p class="card-text">
              Languages:
              <span class="api-data">{{getLanguagesList(country.languages)}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",

  data() {
    return {
      countryDetails: []
    };
  },

  computed: {
    matchingCountry: function() {
      return this.countryDetails.filter(match => {
        return match.name.includes(this.$route.params.name);
      });
    }
  },

  methods: {
    // Return an array of country names based on a received 
    // array of alphaCodes from the current country borders.
    bordersList(alphaCodesArray) {
      let borders = [];
      if (alphaCodesArray != "") {
        this.countryDetails.forEach(function(country) {
          alphaCodesArray.forEach(function(matchCountryBorder) {
            if (matchCountryBorder.includes(country.alpha3Code)) {
              borders.push(country.name);
            }
          });
        });
      return borders;
      }else {
        return "-";
      }
    },

    //Mapping the languages array into a displayable format
    getLanguagesList(array) {
      return array.map(a => " " + a.name).toString();
    },

    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatRoute(name) {
      this.$router.push( {path: name})
    }
  },

  beforeMount() {
    axios
      .get(
        "https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;flag;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders"
      )
      .then(response => {
        this.countryDetails = response.data;
      });
  }
};
</script>
