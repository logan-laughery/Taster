<template>
  <v-flex d-flex class="head" fill-height>
    <v-layout column fill-height>
      <v-flex d-flex xs6>
        <v-layout column justify-end>
          <div>
            <h3 class="headline mb-0">
              Describe the beer's head.
            </h3>

            <v-combobox
              v-model="note.head"
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
            <!-- <dashed-divider/> -->
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
  name: 'Head',
  components: {
    CarouselOptions,
  },
  data() {
    return {
      search: '',
    };
  },
  props: ['note', 'options'],
  computed: {
    selectedOptions() {
      return this.options.headDescriptors.map(option => ({
        text: option,
        isSelected: this.note.head.includes(option),
      }));
    },
    items() {
      return [
        { header: 'Start typing to create a descriptor or select from the options below' },
        ...this.options.headDescriptors,
      ];
    },
  },
  mounted() {
    this.note.step = 'head';
    beerNoteService.saveBeerNote(this.note);
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: `/beer/${this.note.id}/color`,
      backRoute: `/beer/${this.note.id}/introsummary`,
      upperText: 'Appearance 1/3',
      lowerText: 'Overall Progress 40%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.head) {
        this.note.head.push(item.toLowerCase());
      } else {
        this.note.head = [item.toLowerCase()];
      }
    },
    remove(item) {
      this.note.head.splice(this.note.head.indexOf(item), 1);
      this.note.head = [...this.note.head];
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
