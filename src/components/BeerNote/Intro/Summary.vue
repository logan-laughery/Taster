<template>
  <v-flex class="summary">
    <dashed-border>
      <div
        v-if="note.image"
        class="beer-image"
        v-bind:style="{ backgroundImage: 'url(' + note.image + ')' }"
        style="width: 100%; height: 100%;"
      />
      <span
        v-else
        class="no-image"
      >
        No Image Selected
      </span>
    </dashed-border>
    <h3 class="headline mb-0">
      Looks like you'll be drinking
      <strong>{{note.beerName}}</strong>. A(n)
      <strong>{{note.style}}</strong> brewed by
      <strong>{{note.brewery}}</strong> coming in at
      <strong>{{note.ibu}} IBUs</strong> and
      <strong>{{note.alc}}% alcohol</strong>.
    </h3>
  </v-flex>
</template>

<script scoped>
import beerNoteService from '../../../services/beerNote';
import DashedBorder from '@/components/Shared/DashedBorder';

export default {
  name: 'Summary',
  props: ['note'],
  components: {
    DashedBorder,
  },
  mounted() {
    this.note.step = 'introsummary';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/head`,
      backRoute: `/beer/${this.note.id}/beerinfo`,
      upperText: 'Intro 4/4',
      lowerText: 'Overall Progress 30%',
    });
  },
};
</script>

<style>
.beer-image {
  border-radius: 25px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.no-image {
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
