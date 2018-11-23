<template>
  <v-flex d-flex class="color" fill-height>
    <v-layout column fill-height>
      <v-flex d-flex xs6>
        <v-layout column justify-end>
          <div>
            <h3 class="headline mb-0">
              Describe the beer's color.
            </h3>

            <v-combobox
              v-model="note.color"
              :items="options.colorDescriptors"
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
  name: 'Color',
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
      return this.options.colorDescriptors.map(option => ({
        text: option,
        isSelected: this.note.color.includes(option),
      }));
    },
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/clarity',
      backRoute: '/beer/1/head',
      upperText: 'Appearance 2/3',
      lowerText: 'Overall Progress 50%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.color) {
        this.note.color.push(item);
      } else {
        this.note.color = [item];
      }
    },
    remove(item) {
      this.note.color.splice(this.note.color.indexOf(item), 1);
      this.note.color = [...this.note.color];
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
