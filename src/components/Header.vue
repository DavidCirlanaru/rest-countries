<template>
  <div id="header" class="header">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 text-left">
           <router-link class="header-question" to="/">Where in the world?</router-link>
        </div>

        <div class="col-6 text-right">
          <!-- <span class="dark-mode-button">
            <i class="far fa-moon moon-icon"></i>Dark Mode
          </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

