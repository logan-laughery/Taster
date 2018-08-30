<template>
  <div class="landing-page">
    <v-layout column>
        <div class="landing-page-header">
          <h1 class="landing-page-text">
            TASTER
          </h1>
        </div>
      <v-flex>
        <h2 class="landing-page-sub">
          A simple tool for recording tasting notes. 
        </h2>
        <br/>
        <br/>
        <h2 class="landing-page-sub">
          Open that beer... 
        </h2>
        <img
          class="beer-image"
          src="../assets/beer.svg"
        />
        <h2 class="landing-page-sub">
          and start tasting! 
        </h2>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css?family=Lato:900');

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
  background-color: #d2a468;
  display: flex;
  color: #000000bf;
  background-repeat: initial;
  overflow: auto;
  background-color: #bb8634ed;
  // background-color: #bb8634d1;
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
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
}

.other-paper {
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
}
</style>
