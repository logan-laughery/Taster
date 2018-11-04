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
  </v-flex>
</template>

<script scoped>
import DashedCircle from '@/components/Shared/DashedCircle';
import ImageInput from '@/components/Shared/ImageInput';

export default {
  name: 'Intro',
  components: {
    DashedCircle,
    ImageInput,
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/styleselection',
      upperText: 'Intro 1/4',
      lowerText: 'Overall Progress 0%',
    });
  },
  props: ['note'],
  methods: {
    imageInput(event) {
      this.note.image = event.dataUrl;
      this.$router.push({ path: '/beer/1/photoverification' });
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
