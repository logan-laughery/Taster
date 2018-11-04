<template>
  <v-flex class="overall">
    <h3 class="headline mb-0">
      Plot the beer's overall characteristics.
    </h3>

    <RadarInput
      class="character-radar"
      v-model="note.characteristics"
      :intervalCount="5"
    />
    <h3 class="headline mb-0">
      Rating
    </h3>
    <v-radio-group v-model="note.rating" row>
      <v-radio label="1" value="1" color="black"></v-radio>
      <v-radio label="2" value="2" color="black"></v-radio>
      <v-radio label="3" value="3" color="black"></v-radio>
      <v-radio label="4" value="4" color="black"></v-radio>
      <v-radio label="5" value="5" color="black"></v-radio>
    </v-radio-group>
  </v-flex>
</template>

<script>
export default {
  name: 'Overall',
  props: ['note'],
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/summary',
      backRoute: '/beer/1/flavor',
      upperText: 'Summary 1/2',
      lowerText: 'Overall Progress 90%',
    });
  },
};
</script>

<style scoped>
.character-radar .radar-label {
  font-size: 3px;
}

.character-radar .radar-highlight {
  fill: rgba(114,160,114,.75);
  stroke: rgba(60, 112, 60, 0.56);
  stroke-width: .5px;
}

.character-radar .radar-point {
  fill: rgba(60, 112, 60, 0.56);
}

.overall .v-input--radio-group--row .v-input--radio-group__input {
  justify-content: center;
}

.overall .v-input--radio-group .v-radio {
  flex-direction: column;
}
.overall .v-input--radio-group .v-radio {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
