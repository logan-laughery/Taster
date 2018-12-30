<template>
  <v-flex class="intro">
    <h1 class="headline mb-0">
      Snap a photo of the bottle for your records
    </h1>

    <image-input v-on:input="imageInput">
      <dashed-circle slot="activator">
        <v-icon x-large class="camera">camera_alt</v-icon>
      </dashed-circle>
    </image-input>

    <br/>
    <br/>

    <h3 class="headline mb-0">
        or begin entering information about the beer
    </h3>

    <!-- <v-text-field
      class="intro-text"
      label="Brewery"
      color="black"
      v-model="note.brewery"
    /> -->
    <v-combobox
      :loading="loadingBreweries"
      :items="breweries"
      :search-input.sync="brewerySearch"
      v-model="note.brewery"
      cache-items
      hide-no-data
      hide-details
      label="Brewery"
      color="black"
    >
    </v-combobox>
    <v-combobox
      :loading="loadingBeers"
      :items="beers"
      :search-input.sync="beerSearch"
      v-on:change="beerChange"
      v-model="note.beerName"
      cache-items
      hide-no-data
      hide-details
      :return-object="false"
      item-text="name"
      item-value="name"
      label="Beer Name"
      color="black"
    >
    </v-combobox>
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
      forwardRoute: `/beer/${this.note.id}/styleselection`,
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
</style>
