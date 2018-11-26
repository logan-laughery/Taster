<template>
  <div class="beer-note-container">
      <v-layout v-if="loading" class="beer-note" fill-height align-center justify-center>
        <v-flex>
          <DashedSpinner/>
        </v-flex>
      </v-layout>
      <template v-else>
        <v-layout class="beer-note" fill-height align-center justify-center>
          <router-view :note="note" :options="options"/>
        </v-layout>
        <footer-nav/>
      </template>
  </div>
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
    const currentUser = await accountService.getCurrentUser();

    if (!currentUser) {
      this.$router.push({
        name: 'Login',
        params: { route: this.$route.path },
      });

      return;
    }

    await this.loadBeerNote();
  },
  watch: {
    noteId: async function(newVal, oldVal) {
      await this.loadBeerNote();
    }
  },
  methods: {
    async loadBeerNote() {
      this.loading = true;
      this.options = await beerNoteOptionsService.getOptions();

      const id = this.noteId === 'new' ? undefined : this.noteId;

      this.note = await beerNoteService.getBeerNote(id);
      this.loading = false;

      this.$router.push({ path: `/beer/${this.note.id}/${this.note.step}` });
    },
  },
};
</script>

<style scoped>
.beer-note {
  margin: 0 20px;
  min-height: min-content;
}

.beer-note-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2px;
}
.beer-note > * {
  max-width: 500px;
}
</style>
