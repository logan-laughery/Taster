<template>
  <v-flex class="intro">
    <h1 class="headline mb-0">
      Start by taking a picture of the beer
    </h1>

    <br/>

    <image-input v-on:input="imageInput">
      <dashed-circle slot="activator" class="camera-icon">
        <v-icon x-large class="camera">camera_alt</v-icon>
      </dashed-circle>

      <v-btn
        slot="activator"
        class="v-btn-sm"
        outline color="black"
      >
        Take Picture
      </v-btn>
    </image-input>

  </v-flex>
</template>

<script scoped>
import beerNoteOptions from '../../../services/beerNoteOptions';
import DashedCircle from '@/components/Shared/DashedCircle';
import ImageInput from '@/components/Shared/ImageInput';

export default {
  name: 'Intro',
  components: {
    DashedCircle,
    ImageInput,
  },
  mounted() {
    this.note.step = 'intro';
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/photoverification`,
      upperText: 'Intro 1/4',
      lowerText: 'Overall Progress 0%',
    });
  },
  props: ['note'],
  data () {
      return {
        breweries: this.note.brewery ? [this.note.brewery] : [],
        loadingBreweries: false,
        brewerySearch: null,
        beers: this.note.beerName ? [{ name: this.note.beerName }] : [],
        loadingBeers: false,
        beerSearch: null,
      };
  },
  watch: {
    beerSearch (val) {
      val && val !== this.select && val.length > 2 && this.queryBeers(val)
    },
    brewerySearch (val) {
      val && val !== this.select && val.length > 2 && this.queryBreweries(val)
    },
  },
  methods: {
    imageInput(event) {
      this.note.image = event.dataUrl;
      this.$router.push({ path: `/beer/${this.note.id}/photoverification` });
    },
    async queryBreweries(search) {
      this.loadingBreweries = true;
      this.breweries = await beerNoteOptions.queryBreweries(search);
      this.loadingBreweries = false;
    },
    async queryBeers(search) {
      this.loadingBeers = true;
      this.beers = await beerNoteOptions.queryBeers(`${this.brewerySearch} ${search}`);
      this.loadingBeers = false;
    },
    beerChange(beer) {
      const matchingBeer = this.beers
        .find((search) => search.name === beer);

      if (!matchingBeer) {
        return;
      }

      this.note.style = matchingBeer.style;
      this.note.ibu = matchingBeer.ibu;
      this.note.alc = matchingBeer.abv;
    },
  },
};
</script>

<style scoped>
.camera {
  font-size: 60px!important;
  color: #2f1e0f!important;
}
.camera-icon {
  margin-bottom: 15px;
}
</style>
