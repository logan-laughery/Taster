<template>
  <div class="beer-info">
    <v-layout>
        <v-flex>
            <v-card>
            <v-card-title primary-title>
                <div>
                <h1 class="headline mb-0">
                    Beer Info
                </h1>
                <h3 class="headline mb-0">
                    Note Id: {{this.note.id}}
                </h3>
                </div>
            </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'BeerInfo',
  props: ['note'],
};
</script>

<style>
</style>
