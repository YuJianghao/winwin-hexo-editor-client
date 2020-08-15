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
  </q-toolbar>
</template>

<script>
import { mapState } from 'vuex'
import * as actionTypes from 'src/store/dispatcher/action-types'
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
      published: state => state.editorCore.data.article.published
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
