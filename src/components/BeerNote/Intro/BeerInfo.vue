<template>
  <v-flex class="beer-info">
    <h3 class="headline mb-0">
      What's the IBU and alchohol percentage?
    </h3>
    <v-text-field
      label="IBU"
      color="black"
      v-model="note.ibu"
    />
    <v-text-field
      label="Alcohol Percentage"
      color="black"
      v-model="note.alc"
    />
  </v-flex>
</template>

<script>
export default {
  name: 'BeerInfo',
  props: ['note'],
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/summary',
      backRoute: '/beer/1/styleselection',
      upperText: 'Intro 3/3',
      lowerText: 'Overall Progress ?%',
    });
  },
};
</script>

<style>
</style>
