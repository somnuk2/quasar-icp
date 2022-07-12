<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            ICPScore card
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />
        <!-- to="/LoginPage" -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
            <q-icon :name="fabYoutube" color="red" size="28px" />
            <q-toolbar-title shrink class="text-weight-bold">
              <router-link
                v-if="!$store.getters.myAuthenticate"
                to="/LoginPage1"
              >
                Sign in
              </router-link>
              <router-link
                v-if="$store.getters.myAuthenticate"
                class="nav-link pr-3"
                to="/LogoutPage"
              >
                Sign out
              </router-link>
            </q-toolbar-title>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <sidebar-view />
    <div :style="{ 'margin-left': sidebarWidth }">
      <router-view />
    </div>
  </q-layout>
</template>

<script>
import SidebarView from "./components/SidebarView/SidebarView.vue";
import { sidebarWidth } from "./components/SidebarView/state";

export default {
  name: "App",
  components: {
    SidebarView,
  },
  setup() {
    return { sidebarWidth };
  },
  data() {
    return {};
  },
  methods: {
    getSignIn() {},
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
container {
  text-align: right;
}
</style>
