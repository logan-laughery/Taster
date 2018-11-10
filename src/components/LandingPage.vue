<template>
  <div class="landing-page">
    <v-layout column>
        <div class="landing-page-header">
          <h1 class="landing-page-text">
            TASTER
          </h1>
        </div>
      <v-flex v-on:mouseover="mouseOver">
        <h2 class="landing-page-sub">
          A simple tool for recording tasting notes.
        </h2>
        <br/>
        <br/>
        <h2 class="landing-page-sub">
          <!-- Open that beer... -->
        </h2>
        <img
          class="beer-image"
          src="../assets/beer.svg"
        />
        <h2 class="landing-page-sub">
          <!-- and start tasting! -->
        </h2>
        <br/>
        <h2 v-on:click="getStarted" class="landing-page-sub">
          Click here to get started
        </h2>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    mouseOver() {
      this.active = !this.active;
    },
    getStarted() {
      this.$router.push({ path: '/beer/new' });
    },
  },
};
</script>

<style scoped>
.beer-image {
  width: 108px;
  opacity: .8;
  margin: 10px;
}

.landing-page-header {
  position: relative;
  height: 30%;
}

.landing-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.landing-page-text {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 9px;
  font-size: 55px;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.landing-page-sub {
  font-family: 'Lato', sans-serif;
  padding-left: 10px;
  padding-right: 10px;
}

.other-paper {
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
}
</style>
