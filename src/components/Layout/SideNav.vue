<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <template v-if="!currentUser">
      <v-layout fill-height justify-center align-center>
        <v-btn outline v-on:click="login">
          Login
        </v-btn>
      </v-layout>
    </template>
    <template v-if="currentUser">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar size="48">
            <img :src="currentUser.photoURL">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{currentUser.displayName}}</v-list-tile-title>
            <v-list-tile-title>{{currentUser.email}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-divider></v-divider>

        <v-list-tile v-on:click="newNote">
          <v-list-tile-action>
            <v-icon>note_add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>New Beer Note</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-on:click="list">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Tasting Notes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-on:click="settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-on:click="signOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import accountService from '../../services/account';

export default {
  name: 'SideNav',
  data() {
    return {
      currentUser: null,
    };
  },
  async mounted() {
    accountService.onAuthChange(this.userUpdated);
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.layout.sidebarOpen;
      },
      set(val) {
        this.$store.commit('layout/updateSidebar', val);
      },
    },
  },
  methods: {
    close() {
      this.drawer = false;
    },
    list() {
      this.close();
      this.$router.push({ path: '/beer/list' });
    },
    settings() {
      this.close();
      this.$router.push({ path: '/settings' });
    },
    newNote() {
      this.close();
      this.$router.push({ path: '/beer/new' });
    },
    userUpdated(user) {
      this.currentUser = user;
    },
    async signOut() {
      await accountService.logout();
      this.$router.push({ path: '/' });
      this.close();
    },
    login() {
      this.$router.push({
        name: 'Login',
        params: { route: 'login' },
      });
      this.close();
    },
  },
};
</script>

<style>
</style>
