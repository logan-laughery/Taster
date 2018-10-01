<template>
  <v-flex>
    <dashed-spinner/>
  </v-flex>
</template>

<script>
import DashedSpinner from '@/components/Shared/DashedSpinner';
import beerNoteService from '../../services/beerNote';

export default {
  name: 'Loader',
  components: {
    DashedSpinner,
  },
  props: ['note'],
  async mounted() {
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
