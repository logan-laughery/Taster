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
              :items="options.headDescriptors"
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
              <!--
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  label
                  outline
                  color="black"
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  {{ data.item }}
                </v-chip>
              </template>
              -->
            </v-combobox>
          </div>
        </v-layout>
      </v-flex>
      <v-flex d-flex>
        <v-layout column justify-end>
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
import CarouselOptions from '@/components/Shared/CarouselOptions';
import DashedDivider from '@/components/Shared/DashedDivider';

export default {
  name: 'Head',
  components: {
    CarouselOptions,
    DashedDivider,
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
  },
  mounted() {
    this.$store.commit('beerNote/updateFooterNav', {
      forwardRoute: '/beer/1/color',
      backRoute: '/beer/1/introsummary',
      upperText: 'Appearance 1/3',
      lowerText: 'Overall Progress 40%',
    });
  },
  methods: {
    addItem(item) {
      if (this.note.head) {
        this.note.head.push(item);
      } else {
        this.note.head = [item];
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
  },
};
</script>

<style scoped>
.faded {
  color: #00000090;
}
</style>
