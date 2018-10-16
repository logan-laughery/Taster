<template>
  <v-layout class="footer-nav">
    <v-btn
      v-if="details.backRoute"
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
      <v-flex class="footer-nav-text">{{details.upperText}}</v-flex>
      <v-flex class="footer-nav-text">{{details.lowerText}}</v-flex>
    </v-layout>
    <v-btn
      v-if="details.forwardRoute"
      outline color="maroon"
      v-on:click="goForward"
    >
      🡲
    </v-btn>
    <span
      v-else
      class="spacer"
    />
  </v-layout>
</template>

<script>
export default {
  name: 'FooterNav',
  computed: {
    details() {
      return this.$store.state.beerNote.footerNav;
    },
  },
  methods: {
    goForward() {
      this.$router.push({ path: this.details.forwardRoute });
    },
    goBack() {
      this.$router.push({ path: this.details.backRoute });
    },
  },
};
</script>

<style scoped>
.spacer {
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
