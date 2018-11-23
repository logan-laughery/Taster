<template>
  <v-layout class="footer-nav">
    <v-btn
      v-if="backRoute"
      outline color="maroon"
      v-on:click="goBack"
    >
      🡰
    </v-btn>
    <span
      v-else
      class="spacer"
    />
    <v-layout column>
      <v-flex class="footer-nav-text">{{upperText}}</v-flex>
      <v-flex class="footer-nav-text">{{lowerText}}</v-flex>
    </v-layout>
    <v-btn
      v-if="forwardRoute"
      outline color="maroon"
      v-on:click="goForward"
    >
      🡲
    </v-btn>
    <span
      v-else
      class="space-holder"
    />
  </v-layout>
</template>

<script>
export default {
  name: 'FooterNav',
  props: {
    forwardRoute: String,
    backRoute: String,
    upperText: String,
    lowerText: String,
  },
  methods: {
    goForward() {
      this.$router.push({ path: this.forwardRoute });
    },
    goBack() {
      this.$router.push({ path: this.backRoute });
    },
  },
};
</script>

<style scoped>
.space-holder {
  width: 88px;
}
.footer-nav-text {
  line-height: 1;
}
.footer-nav {
  position: fixed;
  left: 0px;
  bottom: 8px;
  width: 100%;
}
.v-btn {
  margin-top: 0px!important;
  margin-bottom: 0px!important;
}
</style>
