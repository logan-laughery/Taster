<template>
  <v-flex class="photo-verification">
    <v-flex class="beer-image-container">
      <dashed-border>
        <div
          class="beer-image"
          v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
          style="width: 100%; height: 100%;"
        />
      </dashed-border>
      <image-input v-on:input="imageInput">
        <v-btn
          slot="activator"
          class="v-btn-sm"
          outline color="black"
          v-on:click="imageInput"
        >
          Select Another Photo
        </v-btn>
      </image-input>
    </v-flex>
    <v-flex class="identification-container">
      <DashedSpinner v-if="identifying">
        Identifying...
      </DashedSpinner>
      <template v-else>
        <template v-if="match">
          <h3>A match was found!</h3>
        </template>
        <template v-else>
          <h3>
            Beer couldn't be identified.  You'll have to enter
            info about the beer manually.
          </h3>
          <v-text-field
            class="intro-text"
            label="Brewery"
            color="black"
            v-model="note.brewery"
          />
          <v-text-field
            class="intro-text"
            label="Beer Name"
            color="black"
            v-model="note.beerName"
          />
        </template>
      </template>
    </v-flex>
  </v-flex>
</template>

<script>
import DashedBorder from '@/components/Shared/DashedBorder';
import ImageInput from '@/components/Shared/ImageInput';
import identificationService from '@/services/beerIdentification';

export default {
  name: 'PhotoVerification',
  components: {
    DashedBorder,
    ImageInput,
  },
  props: ['note'],
  data() {
    return {
      image: '',
      identifying: true,
      match: {},
    };
  },
  async mounted() {
    this.image = this.note.image;
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/styleselection',
      backRoute: '/beer/1/intro',
      upperText: 'Intro 2/4',
      lowerText: 'Overall Progress 10%',
    });

    this.match = await identificationService.identifyBeer(this.note.image);
    this.identifying = false;
  },
  methods: {
    async imageInput(event) {
      if (event.dataUrl) {
        this.image = event.dataUrl;
        this.note.image = event.dataUrl;
        this.identifying = true;
        this.match = await identificationService.identifyBeer(this.note.image);
        this.identifying = false;
      }
    },
  },
};
</script>

<style scoped>
.beer-image-container {
  padding-bottom: 30px;
}
.beer-image {
  border-radius: 25px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.identification-container {
  min-height: 210px
}
.v-btn-sm {
  height: 28px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
