<template>
  <v-layout class="beer-note" fill-height align-center justify-center>
    <v-flex v-if="loading">
      <dashed-spinner/>
    </v-flex>
    <template v-else>
      <router-view :note="note" :options="options"/>
      <footer-nav/>
    </template>
  </v-layout>
</template>

<script>
import DashedSpinner from '@/components/Shared/DashedSpinner';
import FooterNav from '@/components/BeerNote/FooterNav';
import beerNoteService from '../../services/beerNote';
import beerNoteOptionsService from '../../services/beerNoteOptions';

export default {
  name: 'BeerNote',
  components: {
    DashedSpinner,
    FooterNav,
  },
  data: () => ({
    loading: true,
    note: {},
    options: {},
  }),
  props: ['noteId'],
  async mounted() {
    // Grab the note id from the params and load the note object
    // Create one if no param is passed
    // this.note = {
    //   id: this.noteId,
    //   step: 'intro',
    // };

    await this.loadBeerNote();
  },
  methods: {
    async loadBeerNote() {
      this.loading = true;
      this.options = await beerNoteOptionsService.getOptions();
      this.note = await beerNoteService.getBeerNote();
      this.loading = false;

      this.$router.push({ path: '/beer/1/intro' });
    },
  },
};
</script>

<style>
.beer-note {
  margin: 0 20px;
  padding: 50px 0;
}
</style>
