<template>
  <div class="title-header" :class="{ shadow: hasShadow }">
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
  props: ['hasShadow'],
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
.title-header {
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.shadow {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
