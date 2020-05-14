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
          Hexo Editor Client
        </q-toolbar-title>
        <q-btn
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
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          资源链接
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item>
          <q-item-section avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-chip
                square
                size="10px"
                class="q-ml-none no-border-radius"
                color="primary"
                text-color="white"
                style="font-family:consolas"
              >
                <q-avatar
                  color="grey-8"
                  style="width:auto;"
                  class="no-border-radius"
                >
                  <span style="padding: 0 6px;">
                    hexo-editor-client
                  </span>
                </q-avatar>
                <span style="padding-left:3px;">
                  v{{currentVersion}}
                </span>
              </q-chip>
            </q-item-label>
            <q-item-label
              caption
              lines="2"
            >当前版本</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label><img src="https://img.shields.io/npm/v/@winwin/hexo-editor-client?style=flat-square"></q-item-label>
            <q-item-label
              caption
              lines="2"
            >最新版本</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import packageJson from '../../package.json'
import EssentialLink from '../components/EssentialLink'
import * as editorDispatcher from '../stores/editorDispatcher'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Quasar Docs',
          caption: 'quasar.dev',
          icon: 'school',
          link: 'https://quasar.dev'
        },
        {
          title: 'VueJS Docs',
          caption: 'cn.vuejs.org',
          icon: 'school',
          link: 'https://cn.vuejs.org/'
        },
        {
          title: 'hexo-editor-server',
          caption: '@winwin',
          icon: 'code',
          link: 'https://github.com/YuJianghao/winwin-hexo-editor-server'
        },
        {
          title: 'hexo-editor-sdk',
          caption: '@winwin',
          icon: 'code',
          link: 'https://github.com/YuJianghao/winwin-hexo-editor-sdk'
        },
        {
          title: 'hexo-editor-client',
          caption: '@winwin',
          icon: 'code',
          link: 'https://github.com/YuJianghao/winwin-hexo-editor-client'
        },
        {
          title: '向右拖动文章以编辑',
          caption: '更多功能请自行探索',
          icon: 'edit',
          link: 'https://chat.quasar.dev'
        }
      ]
    }
  },
  computed: {
    currentVersion () {
      return packageJson.version
    },
    isLoginPage () {
      // return Object.keys(this.$route)
      return this.$route.path === '/login'
    }
  },
  methods: {
    async onLogout () {
      await editorDispatcher.logout()
      this.$router.push('/login')
    }
  }
}
</script>
