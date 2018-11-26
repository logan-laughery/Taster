<template>
  <div class="settings">
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
        <div class="title linked-accounts">Linked Accounts</div>
        <div class="subheading left-align linked-accounts">
          Linking an account gives another taster user the ability to
          view and edit your notes.
        </div>

        <v-flex d-flex xs12>
          <v-layout column>
            <v-flex v-for="(account, i) in linkedAccounts" :key="i">
              <v-layout row wrap justify-space-around>
                <v-flex d-flex xs12>
                  <v-divider d-flex xs10/>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-flex d-flex xs10 align-center justify-center>
                    <div class="subheading left-align">{{account.email}}</div>
                  </v-flex>
                  <v-flex d-flex align-center xs2 justify-center>
                    <v-btn flat icon color="black" v-on:click="removeLinkedAccount(account.key)">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex xs12>
              <v-divider d-flex xs10/>
            </v-flex>
            <v-flex>
              <v-layout row wrap justify-space-around>
                <v-flex d-flex xs12>
                  <v-flex d-flex xs10 align-center justify-center>
                    <v-text-field
                      v-model="newLinkedAccount"
                      label="Email"
                      color="black"
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex align-center xs2 justify-center>
                    <v-btn flat icon color="black" v-on:click="addLinkedAccount">
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script scoped>
import beerNoteService from '../../services/beerNote';
import accountService from '../../services/account';

export default {
  name: 'Settings',
  data() {
    return {
      newLinkedAccount: undefined,
      linkedAccounts: [],
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

    await this.getLinkedAccounts();
  },
  methods: {
    async getLinkedAccounts() {
      this.linkedAccounts = await accountService.getLinkedAccounts();
      this.loading = false;
      setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1);
    },
    async addLinkedAccount() {
      await accountService.addLinkedAccount(this.newLinkedAccount);
      this.newLinkedAccount = undefined;
      await this.getLinkedAccounts();
    },
    async removeLinkedAccount(key) {
      await accountService.removeLinkedAccount(key);
      await this.getLinkedAccounts();
    },
  },
}
</script>

<style scoped>
.settings {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2px;
}
.title {
  padding-left: 0;
}
.linked-accounts.subheading {
  padding-bottom: 10px;
}
.linked-accounts.title {
  padding-bottom: 6px;
}
.left-align {
  text-align: left;
}
</style>
