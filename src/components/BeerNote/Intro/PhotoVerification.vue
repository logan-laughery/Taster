<template>
  <v-flex class="photo-verification">
    <v-flex class="beer-image-container">
      <dashed-border>
        <div
          v-if="image"
          class="beer-image"
          v-bind:style="{ backgroundImage: 'url(' + image + ')' }"
          style="width: 100%; height: 100%;"
        />
        <span v-else>No Image</span>
      </dashed-border>
      <image-input v-on:input="imageInput">
        <v-btn
          slot="activator"
          class="v-btn-sm"
          outline color="black"
          v-on:click="imageInput"
        >
          Select Different Photo
        </v-btn>
      </image-input>
    </v-flex>
    <v-flex class="identification-container">
      <!-- <DashedSpinner v-if="identifying">
        Identifying...
      </DashedSpinner> -->
      <template>
          <h3>
            What are you drinking?
          </h3>
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
      </template>
    </v-flex>
  </v-flex>
</template>

<script>
import beerNoteOptions from '../../../services/beerNoteOptions';
import beerNoteService from '../../../services/beerNote';
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
      breweries: this.note.brewery ? [this.note.brewery] : [],
      loadingBreweries: false,
      brewerySearch: null,
      beers: this.note.beerName ? [{ name: this.note.beerName }] : [],
      loadingBeers: false,
      beerSearch: null,
    };
  },
  async mounted() {
    this.image = this.note.image;
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/styleselection`,
      backRoute: `/beer/${this.note.id}/intro`,
      upperText: 'Intro 2/4',
      lowerText: 'Overall Progress 10%',
    });

    // this.match = await identificationService.identifyBeer(this.note.image);
    // this.identifying = false;
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
    async imageInput(event) {
      if (event.dataUrl) {
        this.image = event.dataUrl;
        this.note.image = event.dataUrl;
        this.identifying = true;
        this.match = await identificationService.identifyBeer(this.note.image);
        this.identifying = false;
      }
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
