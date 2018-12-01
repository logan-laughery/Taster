<template>
  <div class="list">
    <v-layout v-if="loading" row fill-height align-center justify-center>
      <v-flex>
        <DashedSpinner/>
      </v-flex>
    </v-layout>
    <v-container
      id="grid"
      fluid
      grid-list-sm
      tag="section"
      v-else
    >
      <v-layout row wrap>
        <div class="title in-progress" v-if="notesInProgress.length > 0">Tastings In Progress</div>
        <v-flex d-flex xs12 v-if="notesInProgress.length > 0">
          <v-layout column>
            <v-flex v-for="note in notesInProgress" :key="note.id">
              <v-layout row wrap justify-space-around>
                <v-flex d-flex xs12>
                  <v-divider d-flex xs10/>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-flex xs6>
                    <v-layout row wrap>
                      <v-flex d-flex xs12>
                        <div class="subheading" v-if="note.beerName">{{note.beerName}}</div>
                        <div class="subheading none" v-else>No Beer Name Provided</div>
                      </v-flex>
                      <v-flex d-flex xs12>
                        <div class="subheading" v-if="note.brewery">{{note.brewery}}</div>
                        <div class="subheading none" v-else>No Brewery Provided</div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex align-center xs4 justify-center>
                    <div class="subheading">{{getFriendlyStep(note.step)}}</div>
                  </v-flex>
                  <v-flex d-flex align-center xs2 justify-center>
                    <v-btn flat icon color="black" v-on:click="view(note.id)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-flex d-flex xs12>
                    <div class="caption">Created By: {{note.uid.replace(/%2E/g,'.')}}</div>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex xs12>
              <v-divider d-flex xs10/>
            </v-flex>
          </v-layout>
        </v-flex>
        <div class="title completed">Completed Tastings</div>
        <v-flex d-flex xs12>
          <v-layout column>
            <v-flex v-for="note in notesCompleted" :key="note.id">
              <v-layout row wrap justify-space-around>
                <v-flex d-flex xs12>
                  <v-divider d-flex xs10/>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-flex d-flex xs2>
                    <div
                      v-if="note.image"
                      class="icon-image"
                      v-bind:style="{ backgroundImage: 'url(' + note.image + ')' }"
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-layout row wrap>
                      <v-flex d-flex xs12>
                        <div class="subheading" v-if="note.beerName">{{note.beerName}}</div>
                        <div class="subheading none" v-else>No Beer Name Provided</div>
                      </v-flex>
                      <v-flex d-flex xs12>
                        <div class="subheading" v-if="note.brewery">{{note.brewery}}</div>
                        <div class="subheading none" v-else>No Brewery Provided</div>
                      </v-flex>
                      <v-flex d-flex xs12>
                        <div class="subheading" v-if="note.style">{{note.style}}</div>
                        <div class="subheading none" v-else>No Style Provided</div>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex align-center xs2 justify-center>
                    <v-flex d-flex xs12>
                      <div class="headline">{{note.rating}} / 5</div>
                    </v-flex>
                  </v-flex>
                  <v-flex d-flex align-center xs2 justify-center>
                    <v-btn flat icon color="black" v-on:click="view(note.id)">
                      <v-icon>visibility</v-icon>
                    </v-btn>
                  </v-flex>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-flex d-flex xs12>
                    <div class="caption">Created By: {{note.uid.replace(/%2E/g,'.')}}</div>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <br/>
          <v-btn outline v-on:click="newNote">
            Start A New Note
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script scoped>
import beerNoteService from '../../../services/beerNote';
import accountService from '../../../services/account';

export default {
  name: 'List',
  data() {
    return {
      notes: [],
      loading: true,
    };
  },
  async mounted() {
    const currentUser = await accountService.getCurrentUser();

    if (!currentUser) {
      this.$router.push({
        name: 'Login',
        params: { route: this.$route.path },
      });

      return;
    }

    this.notes = await beerNoteService.getBeerNotes();
    this.loading = false;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1);
  },
  computed: {
    notesInProgress() {
      return this.notes.filter(note => note.step !== 'summary');
    },
    notesCompleted() {
      return this.notes.filter(note => note.step === 'summary');
    },
  },
  methods: {
    newNote() {
      this.$router.push({ path: '/beer/new' });
    },
    view(noteId) {
      this.$router.push({ path: `/beer/${noteId}` });
    },
    getFriendlyStep(step) {
      if (step === 'styleselection') {
        return 'Style Selection';
      }
      if (step === 'beerinfo') {
        return 'Beer Info';
      }
      if (step === 'clarity') {
        return 'Clarity';
      }
      if (step === 'color') {
        return 'Color';
      }
      if (step === 'head') {
        return 'Head';
      }
      if (step === 'aroma') {
        return 'Aroma';
      }
      if (step === 'flavor') {
        return 'Flavor';
      }
      if (step === 'intro') {
        return 'Intro';
      }
      if (step === 'introsummary') {
        return 'Intro Summary';
      }
      if (step === 'overall') {
        return 'Overall';
      }

      return 'Unknown Step';
    },
  },
};
</script>

<style scoped>
.list {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2px;
}
.subheading {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.caption {
  text-align: left;
}
.icon-image {
  max-width: 80px;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.radar-icon .radar-label{
  display: none;
}
.title.in-progress {
  padding-left: 0px;
}
.title.completed {
  padding-left: 0px;
  margin-top: 20px;
}
.subheading.none {
  font-style: italic;
  font-size: 14px !important;
}
</style>
