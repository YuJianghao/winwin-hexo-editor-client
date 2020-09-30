<template>
  <q-layout
    view="lHh Lpr lFf"
    @contextmenu.prevent=""
  >
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
          icon="settings"
          v-show="!isLoginPage&&$route.path.indexOf('settings')===-1"
          flat
          stretch
          :to="{name:'settings'}"
        >
          <q-tooltip
            content-style="font-size: 14px"
            transition-show="none"
            transition-hide="none"
            anchor="bottom middle"
            self="center middle"
          >
            设置
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          stretch
          icon="book"
          v-show="!isLoginPage&&$route.path.indexOf('home')===-1"
          :to="{name:'welcome'}"
        >
          <q-tooltip
            content-style="font-size: 14px"
            transition-show="none"
            transition-hide="none"
            anchor="bottom middle"
            self="center middle"
          >
            编辑博客
          </q-tooltip>
        </q-btn>
        <q-btn
          v-show="!isLoginPage"
          flat
          icon="logout"
          stretch
          @click="onLogout"
        >
          <q-tooltip
            content-style="font-size: 14px"
            transition-show="none"
            transition-hide="none"
            anchor="bottom middle"
            self="center middle"
          >
            退出
          </q-tooltip>
        </q-btn>
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
import { DialogService, DialogType } from 'src/service/dialog_service'
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
      const { type } = await DialogService.create(DialogType.ConfirmDialog, {
        title: '退出确认',
        message: '确定要退出么?'
      })
      if (type === 'ok') {
        await this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>
