<template>
  <v-layout fill-height align-center justify-center column>
    <div>
      <h3 class="headline mb-0">
        You need to log in to start tasting.
      </h3>
    </div>
    <br/>
    <div>
      <v-btn outline v-on:click="googleAuth">
        Login With Google
      </v-btn>
    </div>
  </v-layout>
</template>

<script scoped>
import accountService from '../../services/account';

export default {
  name: 'Login',
  props: ['route'],
  methods: {
    async googleAuth() {
      await accountService.googleAuth();
      this.$router.push({ path: '/beer/new' });
    },
  },
};
</script>

<style>
</style>
