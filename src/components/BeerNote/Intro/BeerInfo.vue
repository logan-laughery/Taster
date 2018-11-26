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

<script scoped>
import beerNoteService from '../../../services/beerNote';

export default {
  name: 'BeerInfo',
  props: ['note'],
  mounted() {
    this.note.step = 'beerinfo';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/introsummary`,
      backRoute: `/beer/${this.note.id}/styleselection`,
      upperText: 'Intro 3/4',
      lowerText: 'Overall Progress 20%',
    });
  },
};
</script>

<style>
</style>
