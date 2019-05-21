<template>
  <div class="country-container">
        <div class="card country-card mx-auto" style="width:100%">
                <img class="card-img-top" :src="data.flag" alt=" Flag" />
                <div class="card-body">
                    <h5 class="card-title">{{data.name}}</h5>
                    <p class="card-text">Population: <span>{{formatPrice(data.population)}}</span></p>
                    <p class="card-text">Region: <span>{{data.region}}</span></p>
                    <p class="card-text">Capital: <span>{{data.capital}}</span></p>
                </div>
        </div>
    </div>
</template>


<script>

export default {
  name: 'Country',
  props: {
    data: Object
 },
 methods: {
    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  }
}
</script>

