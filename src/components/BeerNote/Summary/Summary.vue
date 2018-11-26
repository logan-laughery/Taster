<template>
  <v-flex d-flex class="summary" fill-height>
    <v-layout column fill-height justify-space-around>
      <div class="divider"/>
      <div>
        <v-layout row justify-space-between>
          <v-flex d-flex column xs6>
            <v-layout column>
              <v-flex>
                <v-flex d-flex class="body-2 label">
                  NAME
                </v-flex>
                <v-flex d-flex class="headline font-weight-medium">
                  {{note.beerName}}
                </v-flex>
              </v-flex>
              <div class="divider"/>
              <v-flex>
                <v-flex d-flex class="body-2 label">
                  BREWERY
                </v-flex>
                <v-flex d-flex class="headline font-weight-medium">
                  {{note.brewery}}
                </v-flex>
              </v-flex>
              <div class="divider"/>
              <v-flex>
                <v-flex d-flex class="body-2 label">
                  STYLE
                </v-flex>
                <v-flex d-flex class="headline font-weight-medium">
                  {{note.style}}
                </v-flex>
              </v-flex>
              <div class="divider"/>
              <v-flex>
                <v-layout row>
                  <v-flex column xs6>
                    <v-flex d-flex class="body-2 label">
                      IBU
                    </v-flex>
                    <v-flex d-flex class="headline font-weight-medium">
                      {{note.ibu}}
                    </v-flex>
                  </v-flex>
                  <v-flex column xs6>
                    <v-flex d-flex class="body-2 label">
                      ALC
                    </v-flex>
                    <v-flex d-flex class="headline font-weight-medium">
                      {{note.alc}} %
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex d-flex>
            <dashed-border class="summary-image">
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
          </v-flex>
        </v-layout>
      </div>
      <div class="divider"/>
      <div>
        <v-layout column>
          <v-flex>
            <v-flex d-flex class="body-2 label">
              HEAD
            </v-flex>
            <v-flex d-flex class="subheading font-weight-medium">
              {{note.head.join(', ')}}
            </v-flex>
          </v-flex>
          <div class="divider"/>
          <v-flex>
            <v-flex d-flex class="body-2 label">
              COLOR
            </v-flex>
            <v-flex d-flex class="subheading font-weight-medium">
              {{note.color.join(', ')}}
            </v-flex>
          </v-flex>
          <div class="divider"/>
          <v-flex>
            <v-flex d-flex class="body-2 label">
              CLARITY
            </v-flex>
            <v-flex d-flex class="subheading font-weight-medium">
              {{note.clarity.join(', ')}}
            </v-flex>
          </v-flex>
          <div class="divider"/>
          <v-flex>
            <v-flex d-flex class="body-2 label">
              AROMA
            </v-flex>
            <v-flex d-flex class="subheading font-weight-medium">
              {{note.aroma.join(', ')}}
            </v-flex>
          </v-flex>
          <div class="divider"/>
          <v-flex>
            <v-flex d-flex class="body-2 label">
              FLAVOR
            </v-flex>
            <v-flex d-flex class="subheading font-weight-medium">
              {{note.flavor.join(', ')}}
            </v-flex>
          </v-flex>
        </v-layout>
      </div>
      <div class="divider"/>
      <div>
        <v-flex>
          <v-layout row class="rating-footer">
            <v-flex d-flex row align-center justify-center>
              <div class="rating">
                {{note.rating}}/5
              </div>
            </v-flex>
            <v-flex column xs8 justify-space-between>
              <RadarInput
                class="character-radar"
                v-model="note.characteristics"
                :intervalCount="5"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </div>
      <div class="divider"/>
    </v-layout>
  </v-flex>
</template>

<script>
import beerNoteService from '../../../services/beerNote';
import DashedBorder from '@/components/Shared/DashedBorder';

export default {
  name: 'Summary',
  props: ['note'],
  components: {
    DashedBorder,
  },
  mounted() {
    this.note.step = 'summary';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/list`,
      backRoute: `/beer/${this.note.id}/overall`,
      upperText: 'Summary 2/2',
      lowerText: 'Overall Progress 100%',
    });
  },
};
</script>

<style scoped>
.divider {
  margin: 4px;
}
.summary .label {
  font-size: 12px !important;
  line-height: 12px;
}
.summary .headline {
  font-size: 18px !important;
  line-height: 18px!important;
}
.summary .subheading {
  font-size: 16px !important;
  line-height: 16px!important;
}
.beer-image {
  border-radius: 25px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
svg.summary-image {
  height: 175px;
  width: 150px;
}
.summary {
  text-align: left;
}
.character-radar .radar-label {
  font-size: 3px;
}
.character-radar .radar-highlight {
  fill: rgba(114,160,114,.75);
  stroke: rgb(99, 132, 95);
  stroke-width: .5px;
}
.character-radar .radar-point {
  fill: rgb(99, 132, 95);
}
.summary .character-radar.radar-input {
  width: 225px !important;
  height: 218px;
  margin: 0 auto;
  margin-top: -35px;
}
.rating {
  font-size: 50px;
  text-align: center;
  color: #000000a1;
}
.rating-footer {
  height: 150px;
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
