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
              :items="items"
              :filter="noFilter"
              :hide-no-data="!search"
              :search-input.sync="search"
              hide-selected color="black"
              placeholder="Search for descriptor or create one"
              multiple
              class="custom-combo"
            >
              <template slot="no-data">
                <v-list-tile @click="addItem(search)">
                  <span class="subheading">Create</span>
                  <v-chip label outline color="black" small>
                    {{ search }}
                  </v-chip>
                </v-list-tile>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <span/>
              </template>
            </v-combobox>
          </div>
        </v-layout>
      </v-flex>
      <v-flex d-flex>
        <v-layout column justify-center>
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
import beerNoteService from '../../../services/beerNote';
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
    items() {
      return [
        { header: 'Start typing to create a descriptor or select from the options below' },
        ...this.options.flavorDescriptors,
      ];
    },
  },
  mounted() {
    this.note.step = 'flavor';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/overall`,
      backRoute: `/beer/${this.note.id}/aroma`,
      upperText: 'Flavor 1/1',
      lowerText: 'Overall Progress 80%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.flavor) {
        this.note.flavor.push(item.toLowerCase());
      } else {
        this.note.flavor = [item.toLowerCase()];
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
    noFilter() {
      return undefined;
    },
  },
};
</script>

<style>
.faded {
  color: #00000090;
}

.v-autocomplete__content .v-select-list .v-list__tile {
  height: auto;
  overflow: hidden;
}
.v-autocomplete__content .v-select-list .v-list__tile__content {
  height: 48px;
}
</style>
