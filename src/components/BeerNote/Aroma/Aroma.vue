<template>
  <v-flex d-flex class="aroma" fill-height>
    <v-layout column fill-height>
      <v-flex d-flex xs6>
        <v-layout column justify-end>
          <div>
            <h3 class="headline mb-0">
              Smell the beer.  What aromas do you detect?
              Think about the yeast, hop, and malt presence
              in the smell.
            </h3>

            <v-combobox
              v-model="note.aroma"
              :items="options.aromaDescriptors"
              :hide-no-data="!search"
              :search-input.sync="search"
              hide-selected color="black"
              placeholder="Search for descriptor or create one"
              multiple
            >
              <template slot="no-data">
                <v-list-tile @click="addItem(search)">
                  <span class="subheading">Create</span>
                  <v-chip label outline color="black" small>
                    {{ search }}
                  </v-chip>
                </v-list-tile>
              </template>
            </v-combobox>
          </div>
        </v-layout>
      </v-flex>
      <v-flex d-flex>
        <v-layout column justify-end>
          <div class="bottom">
            <h3 class="subheader mb-2 faded">
              Common Descriptors
            </h3>
            <carousel-options
              :options="selectedOptions"
              v-on:selection="carouselSelection"
              v-on:deselection="carouselDeselection"
            />
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import CarouselOptions from '@/components/Shared/CarouselOptions';

export default {
  name: 'Aroma',
  props: ['note', 'options'],
  components: {
    CarouselOptions,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    selectedOptions() {
      return this.options.aromaDescriptors.map(option => ({
        text: option,
        isSelected: this.note.aroma.includes(option),
      }));
    },
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/flavor',
      backRoute: '/beer/1/color',
      upperText: 'Aroma 1/1',
      lowerText: 'Overall Progress 70%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.aroma) {
        this.note.aroma.push(item);
      } else {
        this.note.aroma = [item];
      }
    },
    remove(item) {
      this.note.aroma.splice(this.note.aroma.indexOf(item), 1);
      this.note.aroma = [...this.note.aroma];
    },
    carouselSelection(option) {
      this.addItem(option.text);
    },
    carouselDeselection(option) {
      this.remove(option.text);
    },
  },
};
</script>

<style>
</style>
