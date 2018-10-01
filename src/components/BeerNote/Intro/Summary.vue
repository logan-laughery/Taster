<template>
  <div class="head">
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
            <v-card-title primary-title>
                <div>
                <h3 class="headline mb-0">Note Id: {{this.note.id}}</h3>
                <div>
                    Step: {{this.note.step}}
                </div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn v-on:click="link" flat color="orange">To Intro</v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Head',
  props: ['note'],
  methods: {
    link() {
      this.$router.push({ path: 'intro' });
    },
  },
};
</script>

<style>
</style>
