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
        <q-btn-dropdown
          flat
          label="服务器地址"
          dropdown-icon="code"
        >
          <q-img
            :src="qrcode"
            :ratio="1"
            class="bg-grey-2"
            spinner-color="primary"
          />
        </q-btn-dropdown>
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
import { genQRCode } from '../utils/qrcode'
import { Logger } from '../utils/logger'
import AppSidebar from 'components/AppSidebar'
export default {
  name: 'MainLayout',
  components: {
    AppSidebar
  },
  data () {
    return {
      qrcode: '',
      leftDrawerOpen: false
    }
  },
  computed: {
    isLoginPage () {
      return this.$route.path === '/login'
    }
  },
  async created () {
    const qrCodeLogger = new Logger({ prefix: 'QRCode' })
    try {
      qrCodeLogger.log(window.location.origin + process.env.HEXO_SERVER_BASE)
      this.qrcode = await genQRCode(window.location.origin + process.env.HEXO_SERVER_BASE)
    } catch (_) {

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
