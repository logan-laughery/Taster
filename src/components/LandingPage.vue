<template>
  <div class="landing-page">
    <v-layout column class="landing-page-container">
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
        <h2 v-if="!isMobile" class="landing-page-sub">
          This application is intended for mobile use only.
          <br/>
          Large screen size support may be added in the future.
        </h2>
        <template v-else>
          <template v-if="deferredPrompt">
            <br/>
            <h2 class="landing-page-sub">
              To use taster, please install the application
            </h2>
            <br/>
            <v-btn outline v-on:click="prompt">
              Install Application
            </v-btn>
            <br/>
          </template>
          <template v-if="!deferredPrompt && !isStandalone">
            <br/>
            <h2 class="landing-page-sub">
              Have you already installed the app?
            </h2>
            <br/>
            <v-btn outline href="https://taster-216901.firebaseapp.com" target="_blank">
              Open Application
            </v-btn>
            <br/>
          </template>
          <br/>
          <h2 v-if="isStandalone" v-on:click="getStarted" class="landing-page-sub">
            Click here to get started
          </h2>
        </template>
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
      isPwa: '',
      deferredPrompt: undefined,
      isStandalone: false,
      isMobile: false,
    };
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.isStandalone = true;
    }

    if (window.screen.width < 600) {
      this.isMobile = true;
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isStandalone = true;
    }
  },
  methods: {
    prompt() {
      this.deferredPrompt.prompt();
    },
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
  min-height: 72px;
}

.landing-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.landing-page-container {
  min-height: min-content;
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
  user-select: none;
}

.other-paper {
  background-image: url(https://www.transparenttextures.com/patterns/paper-3.png);
}
</style>
