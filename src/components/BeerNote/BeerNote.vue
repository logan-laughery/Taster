<template>
  <v-layout class="beer-note" fill-height align-center justify-center>
    <v-flex v-if="loading">
      <DashedSpinner/>
    </v-flex>
    <template v-else>
      <router-view :note="note" :options="options"/>
      <footer-nav/>
    </template>
  </v-layout>
</template>

<script>
import FooterNav from '@/components/BeerNote/FooterNav';
import beerNoteService from '../../services/beerNote';
import accountService from '../../services/account';
import beerNoteOptionsService from '../../services/beerNoteOptions';

export default {
  name: 'BeerNote',
  components: {
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
    // navigating
    const currentUser = await accountService.getCurrentUser();

    if (!currentUser) {
      this.$router.push({
        name: 'Login',
        params: { route: this.$route.path },
      });

      return;
    }

    // console.log('currentUser', currentUser);

    await this.loadBeerNote();
  },
  methods: {
    async loadBeerNote() {
      this.loading = true;
      this.options = await beerNoteOptionsService.getOptions();

      const id = this.noteId === 'new' ? undefined : this.noteId;

      this.note = await beerNoteService.getBeerNote(id);
      this.loading = false;

      this.$router.push({ path: '/beer/1/intro' });
    },
  },
};
</script>

<style scoped>
.beer-note {
  margin: 0 20px;
  padding: 50px 0;
}
</style>
