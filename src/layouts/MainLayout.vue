<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :elevated="!isLoginPage">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Hexo Editor
        </q-toolbar-title>
          <hexo-devices></hexo-devices>
        <q-btn
          class="q-ml-md"
          v-show="!isLoginPage"
          flat
          label="退出"
          @click="onLogout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      content-class="bg-grey-1"
    >
      <app-sidebar></app-sidebar>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppSidebar from 'components/AppSidebar'
import HexoDevices from 'components/HexoDevices'
export default {
  name: 'MainLayout',
  components: {
    AppSidebar,
    HexoDevices
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    isLoginPage () {
      return this.$route.path === '/login'
    }
  },
  methods: {
    async onLogout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
