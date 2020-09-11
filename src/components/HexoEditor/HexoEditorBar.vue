<template>
  <div class="row" style="max-height:35px;flex-wrap: nowrap" v-if="article">
    <q-btn
      flat
      stretch
      color="primary"
      :icon="isFullscreen?'fullscreen_exit':'fullscreen'"
      @click="toggleFull"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        {{isFullscreen?'退出网页全屏':'网页全屏'}}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      stretch
      :icon="published?'close':'publish'"
      :color="published?'red':'primary'"
      @click="onPublish"
      v-if="!isPage"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >
        {{published?'取消发布':'发布'}}
      </q-tooltip>
    </q-btn>
    <q-btn
      flat
      stretch
      color="red"
      icon="delete"
      @click="deletePostById"
    >
      <q-tooltip
        content-style="font-size: 14px"
        transition-show="none"
        transition-hide="none"
        anchor="bottom middle"
        self="center middle"
      >删除
      </q-tooltip>
    </q-btn>
    <q-badge
      class="q-ml-md"
      color="grey"
      text-color="white"
      label="未保存"
      v-show="!saved"
    />
    <q-badge
      class="q-ml-md"
      color="grey-4"
      text-color="grey"
      :label="lastSavedAt"
      v-show="lastSavedAt&&saved"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'
import DispatcherService from 'src/service/DispatcherService'
export default {
  name: 'HexoEditorBar',
  components: {
  },
  data () {
    return {
      showCatsMenu: false,
      showTagsMenu: false
    }
  },
  computed: {
    lastSavedAt () {
      if (!this.rawLastSavedAt) return null
      return '最后保存于 ' + date.formatDate(new Date(this.rawLastSavedAt), 'HH:mm:ss')
    },
    toolbarStyle () {
      return {
        height: '35px',
        'min-height': '35px',
        'min-width': '100%'
      }
    },
    isPage () {
      return this.article.layout === 'page'
    },
    // externals
    ...mapState({
      isFullscreen: state => state.hexoUi.full,
      article: state => state.hexoCore.data.article,
      published: state => state.hexoCore.data.article.published,
      rawLastSavedAt: state => state.hexoCore.status.lastSavedAt,
      saved: state => state.hexoCore.status.saved
    })
  },
  methods: {
    async publishPostById () {
      DispatcherService.publishPostById()
    },
    async unpublishPostById () {
      DispatcherService.unpublishPostById()
    },
    async toggleFull () {
      DispatcherService.toggleFull()
    },
    async deletePostById () {
      DispatcherService.deletePostById()
    },
    async savePost () {
      DispatcherService.savePost()
    },
    onPublish () {
      this.published ? this.unpublishPostById() : this.publishPostById()
    }
  }
}
</script>
