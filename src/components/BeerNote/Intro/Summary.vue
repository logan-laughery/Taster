<template>
  <v-flex class="summary">
    <dashed-border>
      <div
        class="beer-image"
        v-bind:style="{ backgroundImage: 'url(' + note.image + ')' }"
        style="width: 100%; height: 100%;"
      />
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

<script>
import DashedBorder from '@/components/Shared/DashedBorder';

export default {
  name: 'Summary',
  props: ['note'],
  components: {
    DashedBorder,
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/head',
      backRoute: '/beer/1/beerinfo',
      upperText: 'Intro 2/2',
      lowerText: 'Overall Progress 20%',
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
</style>
