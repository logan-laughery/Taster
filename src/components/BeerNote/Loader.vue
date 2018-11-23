<template>
  <v-flex>
    <DashedSpinner/>
  </v-flex>
</template>

<script>
import beerNoteService from '../../services/beerNote';

export default {
  name: 'Loader',
  props: ['note'],
  async mounted() {
    await this.loadBeerNote();
  },
  methods: {
    async loadBeerNote() {
      this.loading = true;
      this.note = await beerNoteService.getBeerNote();
      this.loading = false;

      this.$router.push({ path: '/#/beer/1/intro' });
    },
  },
};
</script>

<style>
</style>
