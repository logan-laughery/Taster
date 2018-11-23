<template>
  <v-flex class="style-selection">
    <h3 class="headline mb-0">
      What's the style?
    </h3>
    <v-autocomplete
      color="black"
      v-model="note.style"
      :items="options.styles"
    >
    </v-autocomplete>
  </v-flex>
</template>

<script scoped>
export default {
  name: 'StyleSelection',
  props: ['note', 'options'],
  computed: {
    styles() {
      return [];
    },
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/beerinfo',
      backRoute: '/beer/1/intro',
      upperText: 'Intro 2/4',
      lowerText: 'Overall Progress 10%',
    });
  },
};
</script>

<style>
</style>
