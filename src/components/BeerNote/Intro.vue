<template>
  <v-flex class="intro">
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
                <v-btn v-on:click="increment" flat color="orange">Increment</v-btn>
                <v-btn v-on:click="link" flat color="orange">To Intro Summary</v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'Intro',
  props: ['note'],
  methods: {
    increment() {
      this.note.id = this.note.id + 1;
    },
    link() {
      this.$router.push({ path: 'introsummary' });
    },
  },
};
</script>

<style>
</style>
