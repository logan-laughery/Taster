<template>
  <v-flex d-flex class="aroma" fill-height>
    <v-layout column fill-height>
      <v-flex d-flex xs6>
        <v-layout column justify-end>
          <div>
            <h3 class="headline mb-0">
              Finally, you can take a drink.  Describe the flavor.
            </h3>

            <v-combobox
              v-model="note.flavor"
              :items="options.flavorDescriptors"
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
  name: 'Flavor',
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
      return this.options.flavorDescriptors.map(option => ({
        text: option,
        isSelected: this.note.flavor.includes(option),
      }));
    },
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/overall',
      backRoute: '/beer/1/aroma',
      upperText: 'Flavor 1/1',
      lowerText: 'Overall Progress 80%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.flavor) {
        this.note.flavor.push(item);
      } else {
        this.note.flavor = [item];
      }
    },
    remove(item) {
      this.note.flavor.splice(this.note.flavor.indexOf(item), 1);
      this.note.flavor = [...this.note.flavor];
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
