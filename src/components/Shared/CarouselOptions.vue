<template>
  <v-layout column class="carousel-options">
    <v-layout fill-height>
      <!--
      <div class="page-icon" v-on:click="prevPage" v-if="pageNumber !== 0">
        <v-icon x-large>chevron_left</v-icon>
      </div>
      -->
      <!-- <div class="page-icon" v-else/> -->
      <v-flex
        v-for="(group, i) in paginatedData"
        :key="i"
      >
        <v-btn
          class="option-btn faded"
          v-bind:class="{ 'option-btn-active': option.isSelected }"
          small
          outline
          v-for="(option, j) in group"
          :key="j"
          v-on:click="optionClicked(option)"
        >
          {{option.text}}
        </v-btn>
      </v-flex>
      <!--
      <div class="page-icon" v-on:click="nextPage" v-if="pageNumber < pageCount - 1">
        <v-icon x-large>chevron_right</v-icon>
      </div>
      -->
      <!-- <div class="page-icon" v-else/> -->
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <template v-for="(group, i) in groups">
        <v-icon
          small
          v-if="i === pageNumber"
          :key="i"
          class="indicator"
          v-on:click="goToPage(i)"
        >
          lens
        </v-icon>
        <v-icon
          small
          v-else
          :key="i"
          class="indicator"
          v-on:click="goToPage(i)"
        >
          panorama_fish_eye
        </v-icon>
      </template>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  name: 'CarouselOptions',
  props: ['options'],
  data: () => ({
    errors: [],
    size: 1,
    pageNumber: 0,
  }),
  computed: {
    groups() {
      const size = 8;

      return this.options.reduce(
        (acc, cur, i) => (i % size ? acc : [...acc, this.options.slice(i, i + size)]),
        [],
      );
    },
    pageCount() {
      const l = this.groups.length;
      const s = this.size;
      return Math.floor(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.groups.slice(start, end);
    },
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
    nextPage() {
      this.pageNumber = this.pageNumber + 1;
    },
    prevPage() {
      this.pageNumber = this.pageNumber - 1;
    },
    goToPage(page) {
      this.pageNumber = page;
    },
    optionClicked(option) {
      if (!option.isSelected) {
        this.$emit('selection', option);
      } else {
        this.$emit('deselection', option);
      }
    },
  },
};
</script>

<style>
.page-icon {
  min-height: 100%;
  display: flex;
  align-items: center;
  min-width: 40px;
}
.option-btn {
  min-width: 0px !important;
  margin-left: 3px;
  margin-right: 3px;
  padding-left: 4px !important;
  padding-right: 4px !important;
}
.option-btn.option-btn-active {
  background-color: rgba(0, 0, 0, 0.09) !important;
}
.indicator {
  margin: 5px;
}
.carousel-options {
  margin-bottom: 20px;
}
.faded {
  color: #00000090 !important;
}
</style>
