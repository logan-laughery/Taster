<template>
  <div class="color">
    <v-layout>
        <v-flex>
            <v-card>
            <v-card-title primary-title>
                <div>
                <h1 class="headline mb-0">
                    Color
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
  name: 'Color',
  props: ['note'],
};
</script>

<style>
</style>
