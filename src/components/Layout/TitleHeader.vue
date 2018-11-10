<template>
  <div>
    <v-btn flat icon v-on:click="open" large class="menu-btn">
      <v-icon class="menu-icon">
        menu
      </v-icon>
    </v-btn>
    <div class="title">
      <div>
        TASTER
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleHeader',
  methods: {
    open() {
      this.$store.commit('layout/updateSidebar', true);
    },
  },
};
</script>

<style>
.menu-btn {
  float: left;
}
.menu-icon {
  font-size: 30px;
}
.title {
  height: 56px;
  float: right;
  vertical-align: middle;
  padding: 17px;
  text-align: center;
}
</style>
