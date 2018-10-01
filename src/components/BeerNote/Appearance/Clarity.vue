<template>
  <div class="clarity">
    <v-layout>
        <v-flex>
            <v-card>
            <v-card-title primary-title>
                <div>
                <h1 class="headline mb-0">
                    Clarity
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
  name: 'Clarity',
  props: ['note'],
};
</script>

<style>
</style>
