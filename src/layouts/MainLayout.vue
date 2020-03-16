<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

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
  }
}
</script>
