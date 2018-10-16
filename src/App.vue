<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  display: flex;
  color: #000000bf;
  background-repeat: initial;
  overflow: auto;
  background-color: #bb8634ed;
  /* // background-color: #bb8634d1; */
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
  justify-content: center;
  font-family: 'Lato', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0px;
  overflow: auto;
  display: flex;
  color: #000000bf;
  background-repeat: initial;
  overflow: auto;
  background-color: #bb8634ed;
  /* // background-color: #bb8634d1; */
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
  justify-content: center;
  font-family: 'Lato', sans-serif;
}

.maroon--text {
    color: #800000!important;
}
.maroon--text.text--darken-1 {
    color: #740000!important;
}
.maroon--text.text--darken-2 {
    color: #680000!important;
}
.maroon--text.text--darken-3 {
    color: #5d0000!important;
}
</style>
