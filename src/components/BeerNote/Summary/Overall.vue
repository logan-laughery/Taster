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
    <v-radio-group v-model="note.rating" row class="centered-radios">
      <v-radio label="1" value="1" color="black" class="centered-radio"></v-radio>
      <v-radio label="2" value="2" color="black" class="centered-radio"></v-radio>
      <v-radio label="3" value="3" color="black" class="centered-radio"></v-radio>
      <v-radio label="4" value="4" color="black" class="centered-radio"></v-radio>
      <v-radio label="5" value="5" color="black" class="centered-radio"></v-radio>
    </v-radio-group>
  </v-flex>
</template>

<script>
import beerNoteService from '../../../services/beerNote';

export default {
  name: 'Overall',
  props: ['note'],
  mounted() {
    this.note.step = 'overall';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/summary`,
      backRoute: `/beer/${this.note.id}/flavor`,
      upperText: 'Summary 1/2',
      lowerText: 'Overall Progress 90%',
    });
  },
};
</script>

<style>
.character-radar .radar-label {
  font-size: 3px;
}

.character-radar .radar-highlight {
  fill: rgba(114,160,114,.75);
  stroke: rgb(99, 132, 95) !important;
  stroke-width: .5px;
}

.character-radar .radar-point {
  fill: rgb(99, 132, 95) !important;
}

.overall .v-input--radio-group__input {
  justify-content: center !important;
}

.centered-radios {
  justify-content: center;
}

.centered-radios > :first-child > :first-child > :first-child {
  justify-content: center !important;
}

.overall .v-input--selection-controls__input {
  margin-right: 0px !important;
}

.centered-radio > :first-child {
  margin-right: 0px !important;
}
.overall .v-input--radio-group .v-radio {
  flex-direction: column;
}
.overall .v-input--radio-group .v-radio {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
