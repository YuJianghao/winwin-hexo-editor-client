<template>
  <q-toolbar
    class="bg-grey-2 q-px-none"
    :style="toolbarStyle"
  >
    <q-btn
      flat
      stretch
      color="primary"
      :icon="isFullscreen?'fullscreen_exit':'fullscreen'"
      @click="toggleFull"
    ></q-btn>
    <q-btn
      flat
      stretch
      color="primary"
      icon="save"
      label="保存"
      @click="savePost"
      v-show="false"
    />
    <q-btn
      flat
      stretch
      :icon="published?'close':'publish'"
      :color="published?'red':'primary'"
      :label="published?'取消发布':'发布'"
      @click="onPublish"
    />
    <q-btn
      flat
      stretch
      color="red"
      icon="delete"
      label="删除"
      @click="deletePostById"
    />
    <q-badge class="q-ml-md" color="grey" text-color="white" label="未保存" v-show="!saved"/>
    <q-badge class="q-ml-md" color="grey-4" text-color="grey" :label="lastSavedAt" v-show="lastSavedAt&&saved"/>
  </q-toolbar>
</template>

<script>
import { mapState } from 'vuex'
import * as actionTypes from 'src/store/dispatcher/action-types'
import { date } from 'quasar'
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
        height: '36px',
        'min-height': '36px',
        'border-bottom': '1px solid rgba(0, 0, 0, 0.12)'
      }
    },
    // externals
    ...mapState({
      isFullscreen: state => state.editorUi.full,
      published: state => state.editorCore.data.article.published,
      rawLastSavedAt: state => state.editorCore.status.lastSavedAt,
      saved: state => state.editorCore.status.saved
    })
  },
  methods: {
    async publishPostById () {
      this.$store.dispatch(actionTypes.publishPostById)
    },
    async unpublishPostById () {
      this.$store.dispatch(actionTypes.unpublishPostById)
    },
    async toggleFull () {
      this.$store.dispatch(actionTypes.toggleFull)
    },
    async deletePostById () {
      this.$store.dispatch(actionTypes.deletePostById)
    },
    async savePost () {
      this.$store.dispatch(actionTypes.savePost)
    },
    onPublish () {
      this.published ? this.unpublishPostById() : this.publishPostById()
    }
  }
}
</script>
