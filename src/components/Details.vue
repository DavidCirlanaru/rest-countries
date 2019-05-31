<template>
  <div id="details" class="details">
    <!-- Back button -->
    
    <div class="content-container">

     

      <div class="container countries-container">
              <router-link to="/">Home</router-link>
        <div class="row country-row row-eq-height justify-content-start">
          <div class="col-md-6">
              <div v-for="country in matchingCountry" v-bind:key="country.id">
        <img :src="country.flag" alt=" Flag" />
        </div>
          </div>
           <div class="col-md-6">
            <div v-for="country in matchingCountry" v-bind:key="country.id">
        {{country.name}}
        </div>
          </div>
           

        </div>
        <div class="row justify-content-center">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
//display data from the country that had the alphacode in $route.params.alpha3Code

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
        return match.alpha3Code.includes(this.$route.params.alpha3Code);
      });
    }
  },

  beforeMount() {
    axios
      .get(
        "https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;flag;nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;"
      )
      .then(response => {
        this.countryDetails = response.data;
      });
  }
};
</script>
