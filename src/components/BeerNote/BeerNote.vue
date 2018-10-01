<template>
  <v-layout class="beer-note" fill-height align-center justify-center>
    <v-flex v-if="loading">
      <dashed-spinner/>
    </v-flex>
    <router-view v-else :note="note"/>
  </v-layout>
</template>

<script>
import DashedSpinner from '@/components/Shared/DashedSpinner';
import beerNoteService from '../../services/beerNote';

export default {
  name: 'BeerNote',
  components: {
    DashedSpinner,
  },
  data: () => ({
    loading: true,
    note: {},
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
      this.note = await beerNoteService.getBeerNote();
      this.loading = false;

      this.$router.push({ path: '/beer/1/intro' });
    },
  },
};
</script>

<style>
</style>
